import { useState, useEffect } from "react";
import { getContactRequests, markContactAsRead, deleteContactRequest } from "../services/api";

const ContactManagement = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, unread, read

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await getContactRequests();
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching contact requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markContactAsRead(id);
      fetchRequests();
    } catch (error) {
      console.error("Error marking as read:", error);
      alert("Error updating request");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this contact request?")) {
      try {
        await deleteContactRequest(id);
        fetchRequests();
      } catch (error) {
        console.error("Error deleting request:", error);
        alert("Error deleting request");
      }
    }
  };

  const filteredRequests = requests.filter((req) => {
    if (filter === "unread") return !req.read_status;
    if (filter === "read") return req.read_status;
    return true;
  });

  const unreadCount = requests.filter((req) => !req.read_status).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#3b82f6] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6 border-b border-[#1f2937] pb-4">
        <div>
          <h1 className="text-2xl font-semibold text-white mb-1 tracking-tight">
            Contact Requests
          </h1>
          <p className="text-[#6b7280] text-xs font-medium uppercase tracking-wider">
            Manage Contact Form Submissions
          </p>
        </div>
        <div className="flex items-center gap-4">
          {unreadCount > 0 && (
            <span className="px-3 py-1.5 bg-[#7f1d1d]/20 text-[#fca5a5] text-sm font-medium rounded-md border border-[#991b1b]/30">
              {unreadCount} Unread
            </span>
          )}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === "all"
                  ? "bg-[#1e3a8a] text-white"
                  : "bg-[#1e293b] text-[#9ca3af] hover:bg-[#334155]"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === "unread"
                  ? "bg-[#1e3a8a] text-white"
                  : "bg-[#1e293b] text-[#9ca3af] hover:bg-[#334155]"
              }`}
            >
              Unread
            </button>
            <button
              onClick={() => setFilter("read")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === "read"
                  ? "bg-[#1e3a8a] text-white"
                  : "bg-[#1e293b] text-[#9ca3af] hover:bg-[#334155]"
              }`}
            >
              Read
            </button>
          </div>
        </div>
      </div>

      {filteredRequests.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[#6b7280] text-lg">
            {filter === "all"
              ? "No contact requests yet"
              : filter === "unread"
              ? "No unread requests"
              : "No read requests"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <div
              key={request.id}
              className={`bg-[#111827] border rounded-lg p-6 ${
                !request.read_status
                  ? "border-[#3b82f6] bg-[#1e3a8a]/10"
                  : "border-[#1f2937]"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-display text-lg font-bold text-white">
                      {request.name}
                    </h3>
                    {!request.read_status && (
                      <span className="px-2 py-0.5 bg-[#3b82f6] text-white text-xs font-semibold rounded">
                        New
                      </span>
                    )}
                    <span className="px-2 py-0.5 bg-[#1e293b] text-[#9ca3af] text-xs font-medium rounded uppercase">
                      {request.language || "en"}
                    </span>
                  </div>
                  <p className="text-[#9ca3af] text-sm mb-1">
                    <span className="text-[#6b7280]">Email:</span> {request.email}
                  </p>
                  {request.subject && (
                    <p className="text-white font-semibold mb-2">
                      {request.subject}
                    </p>
                  )}
                  <p className="text-[#d1d5db] leading-relaxed">
                    {request.message}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#1f2937]">
                <span className="text-xs text-[#6b7280]">
                  {new Date(request.created_at).toLocaleString()}
                </span>
                <div className="flex gap-2">
                  {!request.read_status && (
                    <button
                      onClick={() => handleMarkAsRead(request.id)}
                      className="px-3 py-1.5 bg-[#1e293b] hover:bg-[#334155] text-[#e5e7eb] text-xs font-medium rounded-md transition-colors border border-[#334155]"
                    >
                      Mark as Read
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(request.id)}
                    className="px-3 py-1.5 bg-[#7f1d1d]/20 hover:bg-[#991b1b]/30 text-[#fca5a5] text-xs font-medium rounded-md transition-colors border border-[#991b1b]/30"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactManagement;

