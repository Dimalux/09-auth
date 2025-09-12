// components/AuthProvider/AuthProvider.tsx

"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { authApi } from "@/lib/api/clientApi";
import { usePathname, useRouter } from "next/navigation";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser, setLoading, isLoading } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authApi.checkSession();

        if (user) {
          // Якщо сесія валідна (користувач отриманий)
          setUser(user);

          if (pathname === "/sign-in" || pathname === "/sign-up") {
            router.push("/profile");
          }
        } else {
          setUser(null);

          // Redirect unauthenticated users from protected pages
          if (
            pathname.startsWith("/profile") ||
            pathname.startsWith("/notes")
          ) {
            router.push("/sign-in");
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setUser(null);

        // Redirect unauthenticated users from protected pages
        if (pathname.startsWith("/profile") || pathname.startsWith("/notes")) {
          router.push("/sign-in");
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router, setUser, setLoading]);

  // Show loading state for protected routes
  if (
    isLoading &&
    (pathname.startsWith("/profile") || pathname.startsWith("/notes"))
  ) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}
