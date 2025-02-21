"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useSearchStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { AuroraText } from "@/components/ui/aurora-text";
import { CheckIcon } from "@heroicons/react/24/outline";

const tabs = [
  { name: "Account", id: "account" },
  { name: "Subscription", id: "subscription" }
];

export default function SettingsClient() {
  const { isAuthenticated, subscriptionLevel, setSubscriptionLevel } = useSearchStore();
  const [currentTab, setCurrentTab] = useState("account");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const deleteInputRef = useRef(null);
  const { reset } = useSearchStore();
  const router = useRouter();

  const handleDeleteAccount = () => {
    if (deleteConfirmation.toLowerCase() === "delete account") {
      // Here you would make an API call to delete the account
      reset(); // Clear all stored data
      setShowDeleteDialog(false);
      router.push("/");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] px-4">
        <div className="text-center space-y-4 max-w-md">
          <h1 className="text-2xl font-bold tracking-tight">
            <AuroraText>Settings</AuroraText>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Please sign in to access your account settings
          </p>
          <div className="flex gap-4 justify-center mt-6">
            <button
              onClick={() => router.push("/signin")}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-300"
            >
              Sign in
            </button>
            <button
              onClick={() => router.push("/signup")}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 border border-indigo-600 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 rounded-lg transition-colors"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <main>
      <div className="mx-auto max-w-[95%] sm:max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your account settings and preferences
            </p>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-800">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={cn(
                    "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium",
                    currentTab === tab.id
                      ? "border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300"
                  )}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Account Settings */}
          {currentTab === "account" && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
                <div>
                  <h2 className="text-base font-semibold text-gray-900 dark:text-white">Email Settings</h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Update your email address.
                  </p>
                </div>

                <form className="md:col-span-2">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl">
                    <div className="col-span-full">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white">
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:focus:ring-indigo-400 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex">
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                    >
                      Save changes
                    </button>
                  </div>
                </form>
              </div>

              <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3 border-t border-gray-200 dark:border-gray-800 pt-10">
                <div>
                  <h2 className="text-base font-semibold text-gray-900 dark:text-white">Change Password</h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Update your password to keep your account secure.
                  </p>
                </div>

                <form className="md:col-span-2">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                    <div className="col-span-full">
                      <label htmlFor="current-password" className="block text-sm font-medium text-gray-900 dark:text-white">
                        Current password
                      </label>
                      <input
                        type="password"
                        name="current-password"
                        id="current-password"
                        className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:focus:ring-indigo-400 sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="new-password" className="block text-sm font-medium text-gray-900 dark:text-white">
                        New password
                      </label>
                      <input
                        type="password"
                        name="new-password"
                        id="new-password"
                        className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:focus:ring-indigo-400 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex">
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                    >
                      Update password
                    </button>
                  </div>
                </form>
              </div>

              <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3 border-t border-gray-200 dark:border-gray-800 pt-10">
                <div>
                  <h2 className="text-base font-semibold text-red-600 dark:text-red-500">Delete Account</h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Permanently delete your account and all associated data.
                  </p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowDeleteDialog(true)}
                    className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 dark:bg-red-500 dark:hover:bg-red-400"
                  >
                    Delete account
                  </button>
                </div>
              </div>

              <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Delete Account
                  </DialogTitle>
                  <div className="mt-2 space-y-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                    </p>
                    <div className="space-y-2">
                      <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Please type <span className="font-mono text-red-600 dark:text-red-500">delete account</span> to confirm
                      </label>
                      <input
                        ref={deleteInputRef}
                        type="text"
                        id="confirm"
                        value={deleteConfirmation}
                        onChange={(e) => setDeleteConfirmation(e.target.value)}
                        className="mt-1 block w-full rounded-md border-0 px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-red-600 dark:focus:ring-red-500 sm:text-sm sm:leading-6"
                        placeholder="delete account"
                      />
                    </div>
                    <div className="mt-5 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setShowDeleteDialog(false);
                          setDeleteConfirmation("");
                        }}
                        className="rounded-md px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        disabled={deleteConfirmation.toLowerCase() !== "delete account"}
                        onClick={handleDeleteAccount}
                        className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-red-500 dark:hover:bg-red-400"
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}

          {/* Subscription Settings */}
          {currentTab === "subscription" && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
                <div>
                  <h2 className="text-base font-semibold text-gray-900 dark:text-white">Current Plan</h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                    {subscriptionLevel === "basic" 
                      ? "You are currently on the Basic plan. Upgrade to Pro to access premium features."
                      : "You are currently on the Pro plan with access to all premium features."}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <div className="rounded-lg bg-white/5 p-6 ring-1 ring-gray-300 dark:ring-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {subscriptionLevel === "basic" ? "Basic Plan" : "Pro Plan"}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      {subscriptionLevel === "basic" 
                        ? "Basic features for getting started"
                        : "Full access to all premium features"}
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <CheckIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                        Basic data visualization
                      </li>
                      <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <CheckIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                        Standard API access
                      </li>
                      {subscriptionLevel === "pro" && (
                        <>
                          <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <CheckIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                            Advanced analytics
                          </li>
                          <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <CheckIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                            Priority support
                          </li>
                        </>
                      )}
                    </ul>
                    <div className="mt-6">
                      {subscriptionLevel === "basic" ? (
                        <button
                          type="button"
                          onClick={() => setSubscriptionLevel("pro")}
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                        >
                          Upgrade to Pro
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setSubscriptionLevel("basic")}
                          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:hover:bg-gray-700"
                        >
                          Cancel subscription
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}