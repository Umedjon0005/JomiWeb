import { useState, useEffect } from "react";
import { createPhoto, updatePhoto } from "../services/api";
import { SUPPORTED_LANGS } from "../constants/languages";
import { normalizeLanguageFields, buildImageUrl } from "../utils/formHelpers";

const PhotoModal = ({ photo, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    title_ru: "",
    title_tj: "",
    description: "",
    description_ru: "",
    description_tj: "",
    sort_order: 0,
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [activeLang, setActiveLang] = useState("en");

  useEffect(() => {
    if (photo) {
      // Normalize all language fields
      const normalized = normalizeLanguageFields(photo, ['title', 'description']);
      
      setFormData({
        title: normalized.title || "",
        title_ru: normalized.title_ru || "",
        title_tj: normalized.title_tj || "",
        description: normalized.description || "",
        description_ru: normalized.description_ru || "",
        description_tj: normalized.description_tj || "",
        sort_order: photo.sort_order || 0,
        image: null,
      });
      setPreview(photo.image_url ? buildImageUrl(photo.image_url) : null);
    } else {
      setFormData({
        title: "",
        title_ru: "",
        title_tj: "",
        description: "",
        description_ru: "",
        description_tj: "",
        sort_order: 0,
        image: null,
      });
      setPreview(null);
    }
  }, [photo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!photo && !formData.image) {
      alert("Please select an image");
      return;
    }
    const requiredFields = [
      "title",
      "title_ru",
      "title_tj",
      "description",
      "description_ru",
      "description_tj",
    ];
    const missing = requiredFields.filter(
      (field) => !formData[field] || formData[field].trim() === ""
    );
    if (missing.length > 0) {
      alert("Please fill all languages for title and description.");
      return;
    }
    setLoading(true);
    try {
      if (photo) {
        await updatePhoto(photo.id, formData);
      } else {
        await createPhoto(formData);
      }
      onSave();
    } catch (error) {
      console.error("Error saving photo:", error);
      alert("Error saving photo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#111827] border border-[#1f2937] rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-[#1f2937] flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">
            {photo ? "Edit Photo" : "Add Photo"}
          </h2>
          <button
            onClick={onClose}
            className="text-[#9ca3af] hover:text-white text-3xl font-bold leading-none transition-colors"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-medium text-[#9ca3af] uppercase tracking-wider">
                Title *
              </label>
              <div className="flex gap-2">
                {SUPPORTED_LANGS.map((lang) => (
                  <button
                    key={lang.key}
                    type="button"
                    onClick={() => setActiveLang(lang.key)}
                    className={`px-3 py-1 text-xs font-semibold rounded-md border ${
                      activeLang === lang.key
                        ? "bg-gray-700 text-white border-transparent"
                        : "text-[#9ca3af] border-[#374151]"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
            <input
              type="text"
              name={activeLang === "en" ? "title" : `title_${activeLang}`}
              value={formData[activeLang === "en" ? "title" : `title_${activeLang}`]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 bg-[#1f2937] border border-[#374151] rounded-md text-white placeholder-[#6b7280] focus:outline-none focus:border-gray-500 transition-colors"
              placeholder="e.g., Immersive Labs"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-2 text-[#9ca3af] uppercase tracking-wider">
              Description *
            </label>
            <textarea
              name={activeLang === "en" ? "description" : `description_${activeLang}`}
              value={formData[activeLang === "en" ? "description" : `description_${activeLang}`]}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2.5 bg-[#1f2937] border border-[#374151] rounded-md text-white placeholder-[#6b7280] focus:outline-none focus:border-gray-500 transition-colors"
              placeholder="Brief description of the photo"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium mb-2 text-[#9ca3af] uppercase tracking-wider">
                Sort Order
              </label>
              <input
                type="number"
                name="sort_order"
                value={formData.sort_order}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2.5 bg-[#1f2937] border border-[#374151] rounded-md text-white focus:outline-none focus:border-[#3b82f6] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-2 text-[#9ca3af] uppercase tracking-wider">
                Image {!photo && "*"}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required={!photo}
                className="w-full px-4 py-2.5 bg-[#1f2937] border border-[#374151] rounded-md text-[#9ca3af] focus:outline-none focus:border-gray-500 transition-colors"
              />
            </div>
          </div>
          {preview && (
            <div className="mt-4">
              <label className="block text-xs font-medium mb-2 text-[#9ca3af] uppercase tracking-wider">
                Preview
              </label>
              <div className="relative rounded-lg overflow-hidden border-2 border-[#374151]">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          )}
          <div className="flex gap-3 justify-end pt-4 border-t border-[#1f2937]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#1e293b] hover:bg-[#334155] text-[#e5e7eb] text-sm font-medium rounded-md transition-colors border border-[#334155]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-md transition-colors border border-gray-600 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PhotoModal;

