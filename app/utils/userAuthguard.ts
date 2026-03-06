"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser, User } from "./auth";

export default function useAuthGuard(allowedRoles: string[]) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedUser = getUser();

    // Not logged in → go to login
    if (!loggedUser) {
      router.replace("/loginForm");
      return;
    }

    // Role not allowed → redirect to their page
    if (!allowedRoles.includes(loggedUser.role)) {
      router.replace(`/${loggedUser.role.toLowerCase()}`);
      return;
    }

    // Allowed → give access setUser
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(loggedUser);
    setLoading(false);
  }, []);

  return { user, loading };
}