import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";

export default function AddGallery() {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

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
    if (!image) {
      toast.error("Please select an image");
      return;
    }

    const payload = new FormData();
    payload.append("image", image);

    console.log("Gallery Add Payload:", image);

    toast.success("Image added successfully");
    navigate("/gallery/day-hikes");
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Add Gallery Image" />

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
          Add Image
        </Button>
      </div>
    </>
  );
}
