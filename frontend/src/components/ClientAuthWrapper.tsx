"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import LoadingIcon from "./ui/loadingIcon";
import { getUserInBackend } from "@/lib/api/users";


export default function ClientAuthWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/login");
        return;
      }

      try {
        const token = await user.getIdToken();

        const res = await getUserInBackend(token);
        if (res.status === 401) {
          router.replace("/login");
          return;
        }

        setLoading(false);
      } catch (err) {
        console.error("Error en la llamada al backend:", err);
        router.replace("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <LoadingIcon />;
  }

  return <>{children}</>;
}
