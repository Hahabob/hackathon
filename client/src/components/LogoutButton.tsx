import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/utils/api";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { logout } = useAuth();
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout", null, { withCredentials: true });
      logout();
      queryClient.removeQueries({ queryKey: ["currentUser"] });
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 active:bg-red-800 transition px-4 py-2 rounded-md text-white font-medium shadow-sm select-none whitespace-nowrap"
      aria-label="Logout"
    >
      Logout
    </button>
  );
}
