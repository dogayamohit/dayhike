import React, { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";

export default function AddPlaceGallery() {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null); // store selected file

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Add Place Gallery" />

      {/* File Upload Section */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-6">
        <div>
          <Label>Select File</Label>
          <Input type="file" onChange={handleFileChange} />

          {/* Only show preview if image is selected */}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="preview"
              className="mt-2 w-32 h-32 object-cover rounded"
            />
          )}
        </div>

        <Button
          variant="primary"
          onClick={() => {
            if (!imageFile) return alert("Please select an image!");
            console.log("Submitting file:", imageFile);
          }}
        >
          Submit
        </Button>
      </div>

      {/* Gallery Table Section */}
      <div className="mt-6 rounded-2xl max-w-[calc(100vw-70px)] border border-gray-200 bg-white p-6">
        <table className="min-w-full table-auto whitespace-nowrap">
          <thead>
            <tr className="bg-gray-50 border border-gray-300">
              <th className="px-4 py-2 text-left text-gray-600">ID</th>
              <th className="px-4 py-2 text-left text-gray-600">Image</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((id) => (
              <tr key={id} className="border-b border-gray-200">
                <td className="px-4 py-2">{id}</td>
                <td className="px-4 py-2">
                  <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                    Image
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
