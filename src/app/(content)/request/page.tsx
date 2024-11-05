"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {RequestTable} from "@/components/table/RequestTable"; // Import the RequestTable component
import { requestColumns } from "@/components/table/request-columns";
import { RequestDocument } from "@/models/Request";
import { getRequests } from "@/actions/getRequests";
import { Tabs, useTabs } from "@/stores/sidebar-store";

export default function RequestPage() {
  const { status } = useSession();
  const [requests, setRequests] = useState<RequestDocument[]>([]);
  const router = useRouter();
  const tab = useTabs((state) => state.currentTab);
  const updateTab = useTabs((state) => state.updateTab);

  useEffect(() => {
    if (tab !== Tabs.Request) {
      updateTab(Tabs.Request);
    }
  }, [tab]);

  useEffect(() => {
    const fetchRequests = async () => {
      const requests = await getRequests();
      setRequests(requests);
    };

    fetchRequests().catch(console.error);

    const intervalId = setInterval(fetchRequests, 10000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-slate-600"></div>
      </div>
    );
  }

  return (
    <main className="flex-1 overflow-auto p-4 sm:p-6">
      <RequestTable columns={requestColumns} data={requests} />
    </main>
  );
}
