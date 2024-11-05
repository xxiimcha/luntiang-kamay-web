export const approveRequest = async (requestId) => {
    try {
      await fetch(`/api/requests/${requestId}/approve`, {
        method: "POST",
      });
      // Optionally, update state or refetch requests here
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };
  
  export const declineRequest = async (requestId) => {
    try {
      await fetch(`/api/requests/${requestId}/decline`, {
        method: "POST",
      });
      // Optionally, update state or refetch requests here
    } catch (error) {
      console.error("Error declining request:", error);
    }
  };
  