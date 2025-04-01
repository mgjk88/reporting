"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export default function LogoutButton() {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        const logout = fetch("/api/v1/auth/logout", {method: "POST", credentials: "same-origin"}).then((res)=>{
          if (!res.ok) throw new Error(res.statusText);
          return res.json();
        }).then((res) => {
          if(res.redirect) router.replace(res.redirect);
        });
        toast.promise(logout, {
          loading: "Logging out",
          success: "Logout successful",
          error: (err) => `Logout failed: ${err}`,
        });
      }}
    >
      Logout
    </Button>
  );
}
