// src/pages/admin/subAdmin/ViewSubAdmin.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";

/* ---- TEMP DATA (replace with API later) ---- */
const initialSubAdminData = [
  {
    id: 3,
    name: "saif",
    email: "saif@mailinator.com",
    role: "Admin",
    password: "*123*s",
    createdAt: "2023-12-07",
  },
];

export default function ViewSubAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subAdmin, setSubAdmin] = useState(null);

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

  if (!subAdmin) return <div>Loading...</div>;

  return (
    <>
      <PageBreadcrumb pageTitle="View Sub Admin" />

      <div className="max-w rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
        <h3 className="mb-6 text-2xl font-semibold">Sub Admin Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <Label>Name</Label>
            <p className="mt-1 text-gray-800 font-medium">
              {subAdmin.name}
            </p>
          </div>

          {/* Role */}
          <div>
            <Label>Role</Label>
            <p className="mt-1 text-gray-800 font-medium">
              {subAdmin.role}
            </p>
          </div>
          
          {/* Email */}
          <div className="">
            <Label>Email</Label>
            <p className="mt-1 text-gray-800 font-medium">
              {subAdmin.email}
            </p>
          </div>

          {/* Password */}
          <div>
            <Label>Password</Label>
            <p className="mt-1 text-gray-800 font-medium">
              {subAdmin.password}
            </p>
          </div>


        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 mt-8">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/sub-admins")}
          >
            Back
          </Button>

          <Button
            variant="primary"
            onClick={() =>
              navigate(`/admin/sub-admins/edit/${subAdmin.id}`)
            }
          >
            Edit
          </Button>
        </div>
      </div>
    </>
  );
}
