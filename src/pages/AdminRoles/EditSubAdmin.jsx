// src/pages/admin/subAdmin/EditSubAdmin.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";
import Button from "../../components/ui/button/Button";
import { toast } from "react-toastify";

/* ---- TEMP DATA (replace with API later) ---- */
const initialSubAdminData = [
  {
    id: 3,
    name: "saif",
    email: "saif@mailinator.com",
    password: "*123*s",
    role: "Admin",
    createdAt: "2023-12-07",
  },
];

/* ---- ROLE OPTIONS ---- */
const roleOptions = [
  { value: "Admin", label: "Admin" },
  { value: "Prime", label: "Prime" },
];

export default function EditSubAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [subAdmin, setSubAdmin] = useState(null);
  const [password, setPassword] = useState("");

  /* ---------------- LOAD DATA ---------------- */
  useEffect(() => {
    const selected = initialSubAdminData.find(
      (u) => Number(u.id) === Number(id)
    );

    if (selected) {
      setSubAdmin(selected);
    } else {
      navigate("/admin/sub-admins");
    }
  }, [id, navigate]);

  /* ---------------- HANDLE CHANGE ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubAdmin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ---------------- SAVE ---------------- */
  const handleSave = () => {
    const payload = {
      ...subAdmin,
      ...(password && { password }), // send only if changed
    };

    console.log("Updated Sub Admin:", payload);

    toast.success("Sub admin updated successfully");

    setTimeout(() => {
      navigate("/admin/sub-admins");
    }, 1000);
  };

  if (!subAdmin) return <div>Loading...</div>;

  return (
  <>
    <PageBreadcrumb pageTitle="Edit Sub Admin" />

    <div className="mx-auto max-w">
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        
        {/* Header */}
        {/* <div className="border-b border-gray-200 px-8 py-5">
          <h3 className="text-xl font-semibold text-gray-800">
            Edit Sub Admin
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Update sub admin details and permissions
          </p>
        </div> */}

        {/* Form Body */}
        <div className="px-8 py-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            {/* Name */}
            <div>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                value={subAdmin.name}
                onChange={handleChange}
              />
            </div>

            {/* Role */}
            <div>
              <Label>Role</Label>
              <Select
                name="role"
                value={subAdmin.role}
                onChange={handleChange}
                options={roleOptions}
              />
            </div>

            {/* Email */}
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={subAdmin.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Leave blank to keep current password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-4 border-t border-gray-200 px-8 py-5">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/sub-admins")}
          >
            Cancel
          </Button>

          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  </>
);

}
