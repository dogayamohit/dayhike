import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";
import Button from "../../components/ui/button/Button";
import { toast } from "react-toastify";

/* ---- ROLE OPTIONS ---- */
const roleOptions = [
  { value: "Admin", label: "Admin" },
  { value: "Prime", label: "Prime" },
];

export default function AddSubAdmin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Admin",
  });

  /* ---------------- HANDLE CHANGE ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ---------------- SAVE ---------------- */
  const handleSave = () => {
    if (!form.name || !form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }

    const payload = {
      ...form,
      id: Date.now(),
      createdAt: new Date().toISOString().split("T")[0],
    };

    console.log("New Sub Admin:", payload); // API later

    toast.success("Sub admin added successfully");

    setTimeout(() => {
      navigate("/admin/sub-admins");
    }, 1000);
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Add Sub Admin" />

      <div className="max-w-xl rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
        <h3 className="mb-6 text-2xl font-semibold">
          Add Sub Admin
        </h3>

        {/* Name */}
        <div className="mb-5">
          <Label>Name</Label>
          <Input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter name"
          />
        </div>

        {/* Role */}
        <div className="mb-5">
          <Label>Role</Label>
          <Select
            name="role"
            value={form.role}
            onChange={handleChange}
            options={roleOptions}
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/sub-admins")}
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
