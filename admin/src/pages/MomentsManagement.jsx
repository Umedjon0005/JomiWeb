import { useState, useEffect } from "react";
import { getMoments, deleteMoment } from "../services/api";
import MomentModal from "../components/MomentModal";

const MEDIA_BASE_URL =
  import.meta.env.VITE_MEDIA_URL || "http://localhost:5001";

const buildImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${MEDIA_BASE_URL}${path}`;
};

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
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7dd3fc]" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Campus Moments Gallery
        </h1>
        <button
          onClick={handleCreate}
          className="px-6 py-3 bg-gradient-to-r from-[#7dd3fc] to-[#c084fc] text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          + Add Moment
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Image
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Caption
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Order
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {moments.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No moments yet. Use "Add Moment" to create the first slide.
                  </td>
                </tr>
              ) : (
                moments.map((moment) => (
                  <tr key={moment.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      {moment.image_url ? (
                        <img
                          src={buildImageUrl(moment.image_url)}
                          alt={moment.title}
                          className="w-16 h-16 object-cover rounded-xl border border-gray-100"
                        />
                      ) : (
                        <span className="text-gray-400 text-sm">No image</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {moment.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {moment.caption?.slice(0, 80) || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {moment.sort_order}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(moment)}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(moment.id)}
                        className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded-lg transition-colors"
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
