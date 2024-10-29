"use server";

import Request from "@/models/Request";
import { connectDB } from "@/lib/mongodb";

export const getRequests = async () => {
  try {
    await connectDB();
    
    const requests = await Request.find();
    console.log("Fetched requests:", requests); // This should now show the data from seedrequests collection
    return JSON.parse(JSON.stringify(requests));
  } catch (e) {
    console.log("Error fetching requests:", e);
    return [];
  }
};
