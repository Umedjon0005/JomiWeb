import { useState, useEffect } from "react";
import { createMoment, updateMoment } from "../services/api";

const MomentModal = ({ moment, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    caption: "",
    sort_order: 0,
    image: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (moment) {
      setFormData({
        title: moment.title || "",
        caption: moment.caption || "",
        sort_order: moment.sort_order || 0,
        image: null,
      });
    } else {
      setFormData({
        title: "",
        caption: "",
        sort_order: 0,
        image: null,
      });
    }
  }, [moment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (moment) {
        await updateMoment(moment.id, formData);
      } else {
        await createMoment(formData);
      }
      onSave();
    } catch (error) {
      console.error("Error saving moment:", error);
      alert("Error saving moment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {moment ? "Edit Moment" : "Add Moment"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#7dd3fc] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900">
              Caption / Description
            </label>
            <textarea
              name="caption"
              value={formData.caption}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#7dd3fc] transition-colors"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900">
                Sort Order
              </label>
              <input
                type="number"
                name="sort_order"
                value={formData.sort_order}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#7dd3fc] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#7dd3fc] transition-colors"
              />
              {moment?.image_url && !formData.image && (
                <p className="mt-2 text-sm text-gray-500">
                  Current: {moment.image_url}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-4 justify-end pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-[#7dd3fc] to-[#c084fc] text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MomentModal;
