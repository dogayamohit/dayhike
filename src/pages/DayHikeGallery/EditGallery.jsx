import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";

export default function EditGallery() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  /* -------- FETCH IMAGE -------- */
  useEffect(() => {
    // 🔹 Replace with API
    const galleryData = {
      image: "https://picsum.photos/300",
    };

    setPreview(galleryData.image);
  }, [id]);

  /* -------- IMAGE CHANGE -------- */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    const previewUrl = URL.createObjectURL(file);
    setImage(file);
    setPreview(previewUrl);
  };

  /* -------- CLEANUP -------- */
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  /* -------- SUBMIT -------- */
  const handleSubmit = () => {
    const payload = new FormData();
    if (image) payload.append("image", image);

    console.log("Gallery Update Payload:", image);

    toast.success("Image updated successfully");
    navigate("/gallery/day-hikes");
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Edit Gallery Image" />

      <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-6 max-w-xl">
        <div>
          <Label>Select Image</Label>
          <Input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        {preview && (
          <div>
            <Label>Preview</Label>
            <img
              src={preview}
              alt="Preview"
              className="h-40 w-40 rounded-xl object-cover border border-gray-200"
            />
          </div>
        )}

        <Button variant="primary" onClick={handleSubmit}>
          Update Image
        </Button>
      </div>
    </>
  );
}
