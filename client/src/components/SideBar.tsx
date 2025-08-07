import { useState } from "react";
import { useSidebar } from "../contexts/SideBarContext";
import { LoginForm } from "./forms/loginForm";
import { RegisterForm } from "./forms/registerForm";
import { useAuth } from "@/contexts/AuthContext";
import LogoutButton from "./LogoutButton";
import { ModeToggle } from "./mode-toggle";

const tabs = ["Login", "Signup", "Settings"];

export default function Sidebar() {
  const { user } = useAuth();
  const { isOpen, closeSidebar } = useSidebar();
  const [activeTab, setActiveTab] = useState("Login");

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-black shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <h2 className="text-xl font-semibold dark:text-white">User Panel</h2>
        <button
          onClick={closeSidebar}
          className="text-gray-500 hover:text-black dark:hover:text-white"
        >
          ✕
        </button>
      </div>

      {!user ? (
        <div>
          <div className="flex border-b dark:border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`flex-1 py-2 text-sm font-medium border-b-2 ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
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
              <div className="mt-4">
                <ModeToggle />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4 px-4">
          <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl">
            {user.name?.charAt(0)}
          </div>
          <LogoutButton />
          <ModeToggle />
        </div>
      )}
    </div>
  );
}
