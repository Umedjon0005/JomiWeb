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
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#87CEEB]"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Olympiads Management
        </h1>
        <button
          onClick={handleCreate}
          className="px-6 py-3 bg-gradient-to-r from-[#7dd3fc] to-[#c084fc] text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          + Add Olympiad
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Winner
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Project
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {olympiads.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No olympiads found. Click "Add Olympiad" to create one.
                  </td>
                </tr>
              ) : (
                olympiads.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(item.olympiad_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.winner_name || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.project_name || "—"}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
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
