import { useState, useEffect } from "react";
import { createOlympiad, updateOlympiad } from "../services/api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const OlympiadModal = ({ olympiad, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    olympiad_date: "",
    location: "",
    reference_url: "",
    winner_name: "",
    project_name: "",
    image: null,
    project_image: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (olympiad) {
      setFormData({
        title: olympiad.title || "",
        description: olympiad.description || "",
        olympiad_date: olympiad.olympiad_date || "",
        location: olympiad.location || "",
        reference_url: olympiad.reference_url || "",
        winner_name: olympiad.winner_name || "",
        project_name: olympiad.project_name || "",
        image: null,
        project_image: null,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        olympiad_date: "",
        location: "",
        reference_url: "",
        winner_name: "",
        project_name: "",
        image: null,
        project_image: null,
      });
    }
  }, [olympiad]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDescriptionChange = (value) => {
    setFormData({
      ...formData,
      description: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleProjectImageChange = (e) => {
    setFormData({
      ...formData,
      project_image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (olympiad) {
        await updateOlympiad(olympiad.id, formData);
      } else {
        await createOlympiad(formData);
      }
      onSave();
    } catch (error) {
      console.error("Error saving olympiad:", error);
      alert("Error saving olympiad");
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
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {olympiad ? "Edit Olympiad" : "Create Olympiad"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#87CEEB] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900">
                Olympiad Date *
              </label>
              <input
                type="date"
                name="olympiad_date"
                value={formData.olympiad_date}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#87CEEB] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900">
              Description *
            </label>
            <div className="bg-white">
              <ReactQuill
                value={formData.description}
                onChange={handleDescriptionChange}
                theme="snow"
                style={{ minHeight: "200px" }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#87CEEB] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900">
                Olympiad Website (optional)
              </label>
              <input
                type="url"
                name="reference_url"
                value={formData.reference_url}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#87CEEB] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900">
                Winner Name
              </label>
              <input
                type="text"
                name="winner_name"
                value={formData.winner_name}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#87CEEB] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900">
                Project Name
              </label>
              <input
                type="text"
                name="project_name"
                value={formData.project_name}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#87CEEB] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900">
                Olympiad Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#87CEEB] transition-colors"
              />
              {olympiad?.image_url && !formData.image && (
                <p className="mt-2 text-sm text-gray-500">
                  Current: {olympiad.image_url}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900">
                Project Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleProjectImageChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#87CEEB] transition-colors"
              />
              {olympiad?.project_image_url && !formData.project_image && (
                <p className="mt-2 text-sm text-gray-500">
                  Current: {olympiad.project_image_url}
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
              className="px-6 py-3 bg-gradient-to-r from-[#7dd3fc] to-[#c084fc] text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OlympiadModal;
