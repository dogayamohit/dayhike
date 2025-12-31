import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Button from "../../components/ui/button/Button";

const permissionsList = [
  "Dashboard",
  "User",
  "Admin role",
  "Sub Admin",
  "Place Category",
  "Place",
  "Activity Type",
  "Create Activity",
  "Group",
  "News",
  "Badges",
  "DayHike Gallery",
  "Partners",
  "Reports",
  "Feedback",
  "Models",
];

const AdminRolePermission = () => {
  const { id } = useParams();

  const [permissions, setPermissions] = useState(
    permissionsList.map((menu) => ({
      menu,
      add: false,
      edit: false,
      view: true,
      delete: false,
    }))
  );

  const handleChange = (index, field) => {
    const updated = [...permissions];
    updated[index][field] = !updated[index][field];
    setPermissions(updated);
  };

  return (
    <div className="p-6">
      <PageBreadcrumb pageTitle="Admin Roles Permission" />

      <div className="mt-6 overflow-x-auto max-w-[calc(100vw-70px)] rounded-xl border border-gray-200 bg-white">
        <table className="min-w-full text-sm whitespace-nowrap">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3 text-left">S.No</th>
              <th className="px-4 py-3 text-left">Menu Name</th>
              <th className="px-4 py-3 text-center">Add</th>
              <th className="px-4 py-3 text-center">Edit</th>
              <th className="px-4 py-3 text-center">View</th>
              <th className="px-4 py-3 text-center">Delete</th>
            </tr>
          </thead>

          <tbody>
            {permissions.map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-50" : ""}
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 font-medium">{item.menu}</td>

                {["add", "edit", "view", "delete"].map((key) => (
                  <td key={key} className="px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={item[key]}
                      onChange={() => handleChange(index, key)}
                      className="w-5 h-5 accent-blue-600"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end">
        <Button variant="primary">Save Permissions</Button>
      </div>
    </div>
  );
};

export default AdminRolePermission;
