import { useState } from "react";
import { useSidebar } from "../contexts/SideBarContext";
import { LoginForm } from "./forms/loginForm";
import { RegisterForm } from "./forms/registerForm";
import { useAuth } from "@/contexts/AuthContext";
import LogoutButton from "./LogoutButton";
import { ModeToggle } from "./mode-toggle";
import { LogIn, UserPlus, X, Sparkles } from "lucide-react";

const tabs = [
  { id: "Login", label: "Login", icon: LogIn },
  { id: "Signup", label: "Signup", icon: UserPlus },
];

export default function Sidebar() {
  const { user } = useAuth();
  const { isOpen, closeSidebar } = useSidebar();
  const [activeTab, setActiveTab] = useState("Login");

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-gradient-to-br from-white via-gray-50 to-green-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-green-900/30 shadow-2xl z-50 transform transition-all duration-500 ease-out backdrop-blur-sm ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="relative flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                SmartCart
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                User Panel
              </p>
            </div>
          </div>
          <button
            onClick={closeSidebar}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200 transition-all duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!user ? (
          <div className="flex-1 flex flex-col">
            {/* Tabs */}
            <div className="flex bg-gray-100/50 dark:bg-gray-800/50 mx-4 mt-4 rounded-xl p-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium rounded-lg transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-md transform scale-105"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="max-w-sm mx-auto">
                {activeTab === "Login" && (
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Welcome back!
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        log in to your account to continue
                      </p>
                    </div>
                    <LoginForm />
                  </div>
                )}
                {activeTab === "Signup" && (
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Create an account
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Join us and start shopping!
                      </p>
                    </div>
                    <RegisterForm />
                  </div>
                )}
                {activeTab === "Settings" && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Customize your experience
                      </p>
                    </div>
                    <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Theme Mode
                        </span>
                        <ModeToggle />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
            {/* User Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-blue-500 text-white flex items-center justify-center text-3xl font-bold shadow-lg">
                {user.name?.charAt(0)}
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>

            {/* User Info */}
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                hello, {user.name}!
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.email}
              </p>
            </div>

            {/* User Stats */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  12
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  groceries
                </div>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  ₪248
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  saving
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="w-full max-w-xs space-y-3">
              <LogoutButton />
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Theme mode
                  </span>
                  <ModeToggle />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
