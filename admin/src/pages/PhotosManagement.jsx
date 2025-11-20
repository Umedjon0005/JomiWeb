import { useState, useEffect } from "react";
import { getPhotos, deletePhoto } from "../services/api";
import PhotoModal from "../components/PhotoModal";

const MEDIA_BASE_URL =
  import.meta.env.VITE_MEDIA_URL || "http://localhost:5001";

const buildImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${MEDIA_BASE_URL}${path}`;
};

const PhotosManagement = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await getPhotos();
      setPhotos(response.data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingPhoto(null);
    setIsModalOpen(true);
  };

  const handleEdit = (photo) => {
    setEditingPhoto(photo);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this photo?")) {
      try {
        await deletePhoto(id);
        fetchPhotos();
      } catch (error) {
        console.error("Error deleting photo:", error);
        alert("Error deleting photo");
      }
    }
  };

  const handleSave = () => {
    setIsModalOpen(false);
    setEditingPhoto(null);
    fetchPhotos();
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
            Photo Showcase Gallery
          </h1>
          <p className="text-[#6b7280] text-xs font-medium uppercase tracking-wider">Content Administration</p>
        </div>
        <button
          onClick={handleCreate}
          className="px-4 py-2.5 bg-[#1e3a8a] hover:bg-[#1e40af] text-white text-sm font-medium rounded-md transition-colors duration-150 border border-[#3b82f6]/30"
        >
          + Add Photo
        </button>
      </div>

      {photos.length === 0 ? (
        <div className="bg-[#111827] border border-[#1f2937] rounded-lg p-12 text-center">
          <div className="text-6xl mb-4">📸</div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No photos yet
          </h3>
          <p className="text-[#9ca3af] mb-6">
            Get started by adding your first photo to the showcase
          </p>
          <button
            onClick={handleCreate}
            className="px-4 py-2.5 bg-[#1e3a8a] hover:bg-[#1e40af] text-white text-sm font-medium rounded-md transition-colors border border-[#3b82f6]/30"
          >
            Add First Photo
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="bg-[#111827] border border-[#1f2937] rounded-lg overflow-hidden hover:border-[#374151] transition-all duration-300"
            >
              <div className="h-64 overflow-hidden bg-[#0f172a]">
                {photo.image_url ? (
                  <img
                    src={buildImageUrl(photo.image_url)}
                    alt={photo.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#6b7280]">
                    No Image
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-white mb-2">
                  {photo.title}
                </h3>
                {photo.description && (
                  <p className="text-[#9ca3af] text-sm mb-4 line-clamp-2">
                    {photo.description}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#6b7280]">
                    Order: {photo.sort_order}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(photo)}
                      className="px-3 py-1.5 bg-[#1e293b] hover:bg-[#334155] text-[#e5e7eb] text-xs font-medium rounded-md transition-colors border border-[#334155]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(photo.id)}
                      className="px-3 py-1.5 bg-[#7f1d1d]/20 hover:bg-[#991b1b]/30 text-[#fca5a5] text-xs font-medium rounded-md transition-colors border border-[#991b1b]/30"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <PhotoModal
          photo={editingPhoto}
          onClose={() => {
            setIsModalOpen(false);
            setEditingPhoto(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default PhotosManagement;

