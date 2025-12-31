import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";

export default function AddPlaceCategory() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return toast.error("Name is required");
    // API call to add category can go here
    console.log("New Category:", name);
    toast.success("Category added successfully");
    navigate("/place/category");
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Add Place Category" />

      <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-6 max-w-lg">
        <div>
          <Label>Name</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
          />
        </div>

        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </>
  );
}
