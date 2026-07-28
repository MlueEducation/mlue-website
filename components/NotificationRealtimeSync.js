'use client';

import { useAuth } from '@/components/AuthProvider';
import { useNotificationRealtimeSync } from '@/hooks/useNotifications';

/* Renders nothing — opens the logged-in user's notifications Realtime
   subscription once at the app root (see hooks/useNotifications.js). */
export default function NotificationRealtimeSync() {
  const { user } = useAuth();
  useNotificationRealtimeSync(user?.id);
  return null;
}
