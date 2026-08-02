'use client';

import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';

/* In-memory only, no persistence — carts are ephemeral by design (no
   existing cart infra anywhere in this app to persist against, and a
   half-finished purchase intent isn't worth surviving a reload). */
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]); // { type: 'course'|'bundle', id, title, price }
  const [drawerOpen, setDrawerOpen] = useState(false);
  const prevUserId = useRef(user ? user.id : null);

  useEffect(() => {
    const currentId = user ? user.id : null;
    if (prevUserId.current && currentId !== prevUserId.current) {
      // Genuine identity change (sign-out, account switch, cross-tab
      // SIGNED_OUT) — never fires from a TOKEN_REFRESHED, since that keeps
      // the same user.id. A stale cart must never carry over to the next
      // account, or the wrong person's balance could get charged.
      setItems([]);
      setDrawerOpen(false);
    }
    prevUserId.current = currentId;
  }, [user]);

  function addCourse(course) {
    setItems((cur) => (cur.some((i) => i.type === 'course' && i.id === course.id)
      ? cur
      : [...cur, { type: 'course', id: course.id, title: course.title, price: course.price }]));
    setDrawerOpen(true);
  }

  function addBundle(bundle) {
    setItems((cur) => (cur.some((i) => i.type === 'bundle' && i.id === bundle.id)
      ? cur
      : [...cur, { type: 'bundle', id: bundle.id, title: bundle.title, price: bundle.discountedPrice }]));
    setDrawerOpen(true);
  }

  function remove(type, id) {
    setItems((cur) => cur.filter((i) => !(i.type === type && i.id === id)));
  }

  function clear() {
    setItems([]);
  }

  const total = useMemo(() => items.reduce((sum, i) => sum + Number(i.price || 0), 0), [items]);
  const courseIds = useMemo(() => items.filter((i) => i.type === 'course').map((i) => i.id), [items]);
  const bundleIds = useMemo(() => items.filter((i) => i.type === 'bundle').map((i) => i.id), [items]);

  const value = {
    items, total, courseIds, bundleIds,
    addCourse, addBundle, remove, clear,
    drawerOpen, setDrawerOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside a CartProvider');
  return ctx;
}
