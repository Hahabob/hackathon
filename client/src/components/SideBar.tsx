import { useState } from "react";
import { useSidebar } from "../contexts/SideBarContext";
import { LoginForm } from "./forms/loginForm";
import { RegisterForm } from "./forms/registerForm";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import LogoutButton from "./logOutButton";

const tabs = ["Login", "Signup", "Settings"];

export default function Sidebar() {
  const { user } = useAuth();
  const { isOpen, closeSidebar } = useSidebar();
  const [activeTab, setActiveTab] = useState("Login");

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-semibold">User Panel</h2>
        <button
          onClick={closeSidebar}
          className="text-gray-500 hover:text-black"
        >
          ✕
        </button>
      </div>

      {!user ? (
        <div>
          <div className="flex border-b">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`flex-1 py-2 text-sm font-medium border-b-2 ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-black"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-4">
            {activeTab === "Login" && <LoginForm />}
            {activeTab === "Signup" && <RegisterForm />}
            {activeTab === "Settings" && (
              <div>
                <Button>toggle theme</Button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
          <div className="w-16 h-16 rounded-full bg-blue-500">
            {user.name?.charAt(0)}
          </div>
          <LogoutButton />
        </div>
      )}
    </div>
  );
}
