'use client';

import { createContext, useContext } from 'react';

export const StudioContext = createContext({ user: null, staffRole: null });

export function useStudio() {
  return useContext(StudioContext);
}
