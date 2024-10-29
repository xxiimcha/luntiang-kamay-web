"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

import { Tabs, useTabs } from "@/stores/sidebar-store";

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tab = useTabs((state) => state.currentTab);
  const updateTab = useTabs((state) => state.updateTab);
  const activeTabClass =
    "flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90";
  const inactiveTabClass =
    "cursor-pointer flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground";

  return (
    <div className="flex min-h-screen w-full">
      <aside className="hidden w-64 flex-col border-r bg-background p-6 sm:flex">
        <div className="flex items-center gap-2">
          <svg
            className="size-6"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="18 8 22 12 18 16" />
            <polyline points="6 8 2 12 6 16" />
            <line x1="2" x2="22" y1="12" y2="12" />
          </svg>
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        <nav className="mt-8 flex flex-col gap-4">
          <Link
            href="/users"
            className={tab === "Users" ? activeTabClass : inactiveTabClass}
            prefetch={false}
            onClick={() => updateTab(Tabs.Users)}
          >
            <svg
              className="size-5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
              <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
              <path d="M12 3v6" />
            </svg>
            Users
          </Link>
          <Link
            href="/request"
            className={tab === "Request" ? activeTabClass : inactiveTabClass}
            prefetch={false}
            onClick={() => updateTab(Tabs.Users)}
          >
            <svg
              className="size-5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
              <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
              <path d="M12 3v6" />
            </svg>
            Users
          </Link>
          <span
            onClick={() => {
              signOut();
            }}
            className={inactiveTabClass}
          >
            <svg
              className="size-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
              />
            </svg>
            Logout
          </span>
        </nav>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center border-b bg-background px-4 sm:px-6">
          <div className="flex-1 text-lg font-semibold">
            {tab === Tabs.Users ? "Users" : "User Progress"}
          </div>
          {/* ! INGAT SA PAG CLICK NITO PAG INALIS sa COMMENT. 500 data to  */}
          {/* <Button
        onClick={async () => {
          const res = await addMockData();

          if (res) {
            toast({
              title: "Success",
              description: "Successfully migrated fake data.",
            });
          }
        }}
      >
        Migrate Fake Data
      </Button> */}
        </header>
        <main className="flex-1 overflow-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
