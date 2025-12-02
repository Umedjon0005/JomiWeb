import { useState, useEffect } from "react";
import { getMoments, deleteMoment } from "../services/api";
import MomentModal from "../components/MomentModal";
import { buildImageUrl } from "../utils/formHelpers";

const MomentsManagement = () => {
  const [moments, setMoments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMoment, setEditingMoment] = useState(null);

  useEffect(() => {
    fetchMoments();
  }, []);

  const fetchMoments = async () => {
    try {
      const response = await getMoments();
      setMoments(response.data);
    } catch (error) {
      console.error("Error fetching moments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingMoment(null);
    setIsModalOpen(true);
  };

  const handleEdit = (moment) => {
    setEditingMoment(moment);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this moment?")) {
      try {
        await deleteMoment(id);
        fetchMoments();
      } catch (error) {
        console.error("Error deleting moment:", error);
        alert("Error deleting moment");
      }
    }
  };

  const handleSave = () => {
    setIsModalOpen(false);
    setEditingMoment(null);
    fetchMoments();
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
            Campus Moments Gallery
          </h1>
          <p className="text-[#6b7280] text-xs font-medium uppercase tracking-wider">Content Administration</p>
        </div>
        <button
          onClick={handleCreate}
          className="px-4 py-2.5 bg-[#1e3a8a] hover:bg-[#1e40af] text-white text-sm font-medium rounded-md transition-colors duration-150 border border-[#3b82f6]/30"
        >
          + Add Moment
        </button>
      </div>

      <div className="bg-[#111827] border border-[#1f2937] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0f172a] border-b border-[#1f2937]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">
                  Caption
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f2937]">
              {moments.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-[#6b7280]"
                  >
                    No moments yet. Use "Add Moment" to create the first slide.
                  </td>
                </tr>
              ) : (
                moments.map((moment) => (
                  <tr key={moment.id} className="hover:bg-[#1f2937] transition-colors">
                    <td className="px-6 py-4">
                      {moment.image_url ? (
                        <img
                          src={buildImageUrl(moment.image_url)}
                          alt={moment.title}
                          className="w-16 h-16 object-cover rounded-xl border border-[#334155]"
                        />
                      ) : (
                        <span className="text-[#6b7280] text-sm">No image</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-white">
                      {moment.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#9ca3af]">
                      {moment.caption?.slice(0, 80) || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#9ca3af]">
                      {moment.sort_order}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(moment)}
                        className="px-3 py-1.5 bg-[#1e293b] hover:bg-[#334155] text-[#e5e7eb] text-xs font-medium rounded-md transition-colors border border-[#334155]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(moment.id)}
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
        <MomentModal
          moment={editingMoment}
          onClose={() => {
            setIsModalOpen(false);
            setEditingMoment(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default MomentsManagement;
