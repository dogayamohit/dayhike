import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";

const initialCategoryData = [
    { id: 1, name: "Services", createdAt: "2024-05-30" },
    { id: 2, name: "Retail", createdAt: "2024-05-30" },
];

export default function EditPlaceCategory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");


    useEffect(() => {
      const selectedRole = initialCategoryData.find(
        (r) => Number(r.id) === Number(id)
      );
  
      if (selectedRole) {
        setName(selectedRole);
      } else {
        navigate("/place/category");
      }
    }, [id, navigate]);

  const handleSubmit = () => {
    if (!name.trim()) return toast.error("Name is required");
    // API call to update category
    console.log("Updated Category:", { id, name });
    toast.success("Category updated successfully");
    navigate("/place/category");
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Edit Place Category" />

      <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-6 max-w-lg">
        <div>
          <Label>Name</Label>
          <Input
            type="text"
            value={name.name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </>
  );
}
