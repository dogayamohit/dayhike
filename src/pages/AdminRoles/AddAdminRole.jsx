import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import { toast } from "react-toastify";

export default function AddAdminRole() {
  const navigate = useNavigate();
  const [roleName, setRoleName] = useState("");

  const handleSave = () => {
    if (!roleName.trim()) {
      toast.error("Role name is required");
      return;
    }

    const newRole = {
      id: Date.now(),
      roleName,
      createdAt: new Date().toISOString().split("T")[0],
    };

    console.log("New Role:", newRole); // API later

    toast.success("Role added successfully");

    setTimeout(() => {
      navigate("/admin/admin-role");
    }, 1000);
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Add Admin Role" />

      <div className="max-w-xl rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
        <h3 className="mb-6 text-2xl font-semibold">
          Add New Role
        </h3>

        {/* Role Name */}
        <div className="mb-6">
          <Label>Role Name</Label>
          <Input
            type="text"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            placeholder="Enter role name"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/admin-role")}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </>
  );
}
