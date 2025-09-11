// components/AuthProvider/AuthProvider.tsx


'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { authApi } from '@/lib/api/clientApi';
import { usePathname, useRouter } from 'next/navigation';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading, isAuthenticated, isLoading } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authApi.checkSession();
        setUser(user);
        
        if (user && (pathname === '/sign-in' || pathname === '/sign-up')) {
          router.push('/profile');
        }
      } catch (error) {
        setUser(null);
        
        if (pathname.startsWith('/profile') || pathname.startsWith('/notes')) {
          router.push('/sign-in');
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router, setUser, setLoading]);

  if (isLoading && (pathname.startsWith('/profile') || pathname.startsWith('/notes'))) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}