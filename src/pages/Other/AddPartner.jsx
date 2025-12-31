import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function AddPartner() {
  const navigate = useNavigate();

  const [url, setUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your API call or state update here
    console.log({ url, imageFile });

    toast.success("Partner added successfully!");
    navigate("/partners");
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Add Partner" />

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
              required
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
            <Button type="submit" variant="primary">Add Partner</Button>
            <Button type="button" variant="outline" onClick={() => navigate("/partners")}>Cancel</Button>
          </div>
        </form>
      </div>
    </>
  );
}
 