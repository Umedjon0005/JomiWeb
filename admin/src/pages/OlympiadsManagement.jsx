import { useState, useEffect } from "react";
import { getOlympiads, deleteOlympiad } from "../services/api";
import OlympiadModal from "../components/OlympiadModal";

const OlympiadsManagement = () => {
  const [olympiads, setOlympiads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOlympiad, setEditingOlympiad] = useState(null);

  useEffect(() => {
    fetchOlympiads();
  }, []);

  const fetchOlympiads = async () => {
    try {
      const response = await getOlympiads();
      setOlympiads(response.data);
    } catch (error) {
      console.error("Error fetching olympiads:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingOlympiad(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingOlympiad(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this olympiad?")) {
      try {
        await deleteOlympiad(id);
        fetchOlympiads();
      } catch (error) {
        console.error("Error deleting olympiad:", error);
        alert("Error deleting olympiad");
      }
    }
  };

  const handleSave = () => {
    setIsModalOpen(false);
    setEditingOlympiad(null);
    fetchOlympiads();
  };

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
            Olympiads Management
          </h1>
          <p className="text-[#6b7280] text-xs font-medium uppercase tracking-wider">Content Administration</p>
        </div>
        <button
          onClick={handleCreate}
          className="px-4 py-2.5 bg-[#1e3a8a] hover:bg-[#1e40af] text-white text-sm font-medium rounded-md transition-colors duration-150 border border-[#3b82f6]/30"
        >
          + Add Olympiad
        </button>
      </div>

      <div className="bg-[#111827] border border-[#1f2937] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0f172a] border-b border-[#1f2937]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">
                  Winner
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f2937]">
              {olympiads.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-[#6b7280]"
                  >
                    No olympiads found. Click "Add Olympiad" to create one.
                  </td>
                </tr>
              ) : (
                olympiads.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-[#1f2937] transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-white">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#9ca3af]">
                      {new Date(item.olympiad_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#9ca3af]">
                      {item.winner_name || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#9ca3af]">
                      {item.project_name || "—"}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="px-3 py-1.5 bg-[#1e293b] hover:bg-[#334155] text-[#e5e7eb] text-xs font-medium rounded-md transition-colors border border-[#334155]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-3 py-1.5 bg-[#7f1d1d]/20 hover:bg-[#991b1b]/30 text-[#fca5a5] text-xs font-medium rounded-md transition-colors border border-[#991b1b]/30"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <OlympiadModal
          olympiad={editingOlympiad}
          onClose={() => {
            setIsModalOpen(false);
            setEditingOlympiad(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default OlympiadsManagement;
