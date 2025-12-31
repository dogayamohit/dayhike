import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const initialPartnersData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop&q=60",
    url: "https://www.cirqueseries.com",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1604079628001-4fdd303c3cbb?w=500&auto=format&fit=crop&q=60",
    url: "https://www.example.com",
  },
];

export default function EditPartner() {
  const { id } = useParams();
  const navigate = useNavigate();

  const partner = initialPartnersData.find((p) => p.id === Number(id));

  const [url, setUrl] = useState(partner?.url || "");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(partner?.image || null);

  useEffect(() => {
    if (!partner) navigate("/partners");
  }, [partner, navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ id, url, imageFile });

    toast.success("Partner updated successfully!");
    navigate("/partners");
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Edit Partner" />

      <div className="rounded-2xl border border-gray-100 bg-white p-6 max-w">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">URL</label>
            <Input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter partner URL"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">Partner Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="rounded-lg border border-gray-200 px-3 py-2 w-full"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded"
              />
            )}
          </div>

          <div className="flex gap-3 mt-4">
            <Button type="submit" variant="primary">Save Changes</Button>
            <Button type="button" variant="outline" onClick={() => navigate("/partners")}>Cancel</Button>
          </div>
        </form>
      </div>
    </>
  );
}
