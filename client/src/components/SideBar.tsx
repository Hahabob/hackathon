import { useState } from "react";
import { useSidebar } from "../contexts/SideBarContext";

const tabs = ["Login", "Signup", "Settings"];

export default function Sidebar() {
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
        {activeTab === "Login" && (
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border rounded"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              Log In
            </button>
          </form>
        )}

        {activeTab === "Signup" && (
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border rounded"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded"
            >
              Sign Up
            </button>
          </form>
        )}

        {activeTab === "Settings" && (
          <div>
            <p className="text-sm text-gray-700">
              You're not logged in. Please login to access settings.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
