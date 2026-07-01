'use client';

import type { ReactNode } from 'react';
import { ToastProvider } from 'chiselui';

/**
 * Client-side provider boundary.
 *
 * chiselui ships without `"use client"` directives, so its stateful pieces
 * (like ToastProvider) must be mounted inside a Client Component. Keeping this
 * wrapper thin lets the root layout stay a Server Component.
 */
export function Providers({ children }: { children: ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}
