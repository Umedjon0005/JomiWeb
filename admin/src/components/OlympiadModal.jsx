import { useState, useEffect } from "react";
import { createOlympiad, updateOlympiad } from "../services/api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { SUPPORTED_LANGS } from "../constants/languages";

const OlympiadModal = ({ olympiad, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    title_ru: "",
    title_tj: "",
    description: "",
    description_ru: "",
    description_tj: "",
    olympiad_date: "",
    location: "",
    location_ru: "",
    location_tj: "",
    reference_url: "",
    winner_name: "",
    winner_name_ru: "",
    winner_name_tj: "",
    project_name: "",
    project_name_ru: "",
    project_name_tj: "",
    image: null,
    project_image: null,
  });
  const [loading, setLoading] = useState(false);
  const [activeLang, setActiveLang] = useState("en");

  useEffect(() => {
    if (olympiad) {
      setFormData({
        title: olympiad.title || "",
        title_ru: olympiad.title_ru || "",
        title_tj: olympiad.title_tj || "",
        description: olympiad.description || "",
        description_ru: olympiad.description_ru || "",
        description_tj: olympiad.description_tj || "",
        olympiad_date: olympiad.olympiad_date || "",
        location: olympiad.location || "",
        location_ru: olympiad.location_ru || "",
        location_tj: olympiad.location_tj || "",
        reference_url: olympiad.reference_url || "",
        winner_name: olympiad.winner_name || "",
        winner_name_ru: olympiad.winner_name_ru || "",
        winner_name_tj: olympiad.winner_name_tj || "",
        project_name: olympiad.project_name || "",
        project_name_ru: olympiad.project_name_ru || "",
        project_name_tj: olympiad.project_name_tj || "",
        image: null,
        project_image: null,
      });
    } else {
      setFormData({
        title: "",
        title_ru: "",
        title_tj: "",
        description: "",
        description_ru: "",
        description_tj: "",
        olympiad_date: "",
        location: "",
        location_ru: "",
        location_tj: "",
        reference_url: "",
        winner_name: "",
        winner_name_ru: "",
        winner_name_tj: "",
        project_name: "",
        project_name_ru: "",
        project_name_tj: "",
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

  const handleDescriptionChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
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
      const langKeys = ["en", "ru", "tj"];
      const requiredFields = ["title", "description", "location", "winner_name", "project_name"];
      const isRichTextEmpty = (value) => {
        if (!value) return true;
        const stripped = value.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "").trim();
        return stripped === "";
      };
      for (const lang of langKeys) {
        for (const field of requiredFields) {
          const key = lang === "en" ? field : `${field}_${lang}`;
          const value = formData[key];
          const empty = field === "description" ? isRichTextEmpty(value) : !value || value.trim() === "";
          if (empty) {
            alert("Please fill all languages for title, description, location, winner, and project.");
            setLoading(false);
            return;
          }
        }
      }

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
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#111827] border border-[#1f2937] rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-[#1f2937] flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">
            {olympiad ? "Edit Olympiad" : "Create Olympiad"}
          </h2>
          <button
            onClick={onClose}
            className="text-[#9ca3af] hover:text-white text-2xl font-bold transition-colors"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="flex gap-2 justify-end">
            {SUPPORTED_LANGS.map((lang) => (
              <button
                key={lang.key}
                type="button"
                onClick={() => setActiveLang(lang.key)}
                className={`px-3 py-1 text-xs font-semibold rounded-md border ${
                  activeLang === lang.key
                    ? "bg-[#1e3a8a] text-white border-transparent"
                    : "text-[#9ca3af] border-[#374151]"
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium mb-2 text-[#9ca3af] uppercase tracking-wider">
                Title *
              </label>
              <input
                type="text"
                name={activeLang === "en" ? "title" : `title_${activeLang}`}
                value={formData[activeLang === "en" ? "title" : `title_${activeLang}`]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-[#1f2937] border border-[#374151] rounded-md text-white placeholder-[#6b7280] focus:outline-none focus:border-[#3b82f6] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-2 text-[#9ca3af] uppercase tracking-wider">
                Olympiad Date *
              </label>
              <input
                type="date"
                name="olympiad_date"
                value={formData.olympiad_date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-[#1f2937] border border-[#374151] rounded-md text-white focus:outline-none focus:border-[#3b82f6] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium mb-2 text-[#9ca3af] uppercase tracking-wider">
              Description *
            </label>
            <div className="bg-[#1f2937] border border-[#374151] rounded-md">
              <ReactQuill
                value={formData[activeLang === "en" ? "description" : `description_${activeLang}`]}
                onChange={(value) =>
                  handleDescriptionChange(
                    activeLang === "en" ? "description" : `description_${activeLang}`,
                    value
                  )
                }
                theme="snow"
                style={{ minHeight: "200px" }}
                className="bg-[#1f2937]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium mb-2 text-[#9ca3af] uppercase tracking-wider">
                Location
              </label>
              <input
                type="text"
                name={activeLang === "en" ? "location" : `location_${activeLang}`}
                value={formData[activeLang === "en" ? "location" : `location_${activeLang}`]}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#1f2937] border border-[#374151] rounded-md text-white placeholder-[#6b7280] focus:outline-none focus:border-[#3b82f6] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-2 text-[#9ca3af] uppercase tracking-wider">
                Olympiad Website (optional)
              </label>
              <input
                type="url"
                name="reference_url"
                value={formData.reference_url}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#1f2937] border border-[#374151] rounded-md text-white placeholder-[#6b7280] focus:outline-none focus:border-[#3b82f6] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium mb-2 text-[#9ca3af] uppercase tracking-wider">
                Winner Name
              </label>
              <input
                type="text"
                name={activeLang === "en" ? "winner_name" : `winner_name_${activeLang}`}
                value={formData[activeLang === "en" ? "winner_name" : `winner_name_${activeLang}`]}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#1f2937] border border-[#374151] rounded-md text-white placeholder-[#6b7280] focus:outline-none focus:border-[#3b82f6] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-2 text-[#9ca3af] uppercase tracking-wider">
                Project Name
              </label>
              <input
                type="text"
                name={activeLang === "en" ? "project_name" : `project_name_${activeLang}`}
                value={formData[activeLang === "en" ? "project_name" : `project_name_${activeLang}`]}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#1f2937] border border-[#374151] rounded-md text-white placeholder-[#6b7280] focus:outline-none focus:border-[#3b82f6] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium mb-2 text-[#9ca3af] uppercase tracking-wider">
                Olympiad Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2.5 bg-[#1f2937] border border-[#374151] rounded-md text-[#9ca3af] focus:outline-none focus:border-[#3b82f6] transition-colors"
              />
              {olympiad?.image_url && !formData.image && (
                <p className="mt-2 text-xs text-[#6b7280]">
                  Current: {olympiad.image_url}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium mb-2 text-[#9ca3af] uppercase tracking-wider">
                Project Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleProjectImageChange}
                className="w-full px-4 py-2.5 bg-[#1f2937] border border-[#374151] rounded-md text-[#9ca3af] focus:outline-none focus:border-[#3b82f6] transition-colors"
              />
              {olympiad?.project_image_url && !formData.project_image && (
                <p className="mt-2 text-xs text-[#6b7280]">
                  Current: {olympiad.project_image_url}
                </p>
              )}
            </div>
          </div>

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
              className="px-4 py-2 bg-[#1e3a8a] hover:bg-[#1e40af] text-white text-sm font-medium rounded-md transition-colors border border-[#3b82f6]/30 disabled:opacity-50"
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
