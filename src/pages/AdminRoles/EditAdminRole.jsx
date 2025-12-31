import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import { toast } from "react-toastify";

/* ---- TEMP ROLE DATA (replace with API later) ---- */

import { initialRoleData } from "./AdminRolesTable"

export default function EditAdminRole() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [role, setRole] = useState(null);

  /* ---------------- LOAD ROLE ---------------- */
  useEffect(() => {
    const selectedRole = initialRoleData.find(
      (r) => Number(r.id) === Number(id)
    );

    if (selectedRole) {
      setRole(selectedRole);
    } else {
      navigate("/admin/admin-role");
    }
  }, [id, navigate]);

  /* ---------------- HANDLE CHANGE ---------------- */
  const handleChange = (e) => {
    setRole((prev) => ({
      ...prev,
      roleName: e.target.value,
    }));
  };

  /* ---------------- SAVE ROLE ---------------- */
  const handleSave = () => {
    console.log("Updated Role:", role);

    toast.success("Role updated successfully");

    setTimeout(() => {
      navigate("/admin/admin-role");
    }, 1000);
  };

  if (!role) return <div>Loading...</div>;

  return (
    <>
      <PageBreadcrumb pageTitle="Edit Admin Role" />

      <div className="mx-auto max-w">
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

          {/* Header */}
          {/* <div className="border-b border-gray-200 px-8 py-5">
            <h3 className="text-xl font-semibold text-gray-800">
              Edit Role
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Update role name and manage role settings
            </p>
          </div> */}

          {/* Form Body */}
          <div className="px-8 py-6">
            <div className="max-w-md">

              {/* Role Name */}
              <div>
                <Label>Role Name</Label>
                <Input
                  type="text"
                  name="roleName"
                  value={role.roleName}
                  onChange={handleChange}
                  placeholder="Enter role name"
                />
              </div>

            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-4 border-t border-gray-200 px-8 py-5">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/admin-role")}
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
