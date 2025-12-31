import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { IoIosEye } from "react-icons/io";
import { CiEdit } from "react-icons/ci";

/* ---------------- SUB ADMIN DATA ---------------- */
export const initialSubAdminData = [
  {
    id: 3,
    name: "saif",
    email: "saif@mailinator.com",
    createdAt: "2023-12-07",
  },
  {
    id: 4,
    name: "Rahul",
    email: "rahul@mailinator.com",
    createdAt: "2024-01-15",
  },
];

/* ---------------- SORT ICONS ---------------- */
const icons = {
  asc: "▲",
  desc: "▼",
};

/* ---------------- COMPONENT ---------------- */
export default function SubAdminTable() {
  const [data, setData] = useState(initialSubAdminData);
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const navigate = useNavigate();

  /* ---------------- FILTER ---------------- */
  const filteredData = useMemo(() => {
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);

  /* ---------------- SORT ---------------- */
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    const sorted = [...filteredData].sort((a, b) =>
      a[sortConfig.key]?.toString().localeCompare(
        b[sortConfig.key]?.toString()
      )
    );

    return sortConfig.direction === "asc" ? sorted : sorted.reverse();
  }, [filteredData, sortConfig]);

  /* ---------------- PAGINATION ---------------- */
  const start = (currentPage - 1) * perPage;
  const paginatedData = sortedData.slice(start, start + perPage);
  const totalPages = Math.ceil(sortedData.length / perPage);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Sub Admins" />

      <div className="rounded-2xl border border-gray-100 bg-white p-6">
        {/* Controls */}
        <div className="mb-4 flex flex-col sm:flex-row items-start justify-between gap-3">
          {/* Left */}
          <select
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
          >
            <option value={5}>5 rows</option>
            <option value={10}>10 rows</option>
          </select>

          {/* Right */}
          <div className="flex flex-col sm:flex-row items-start gap-3">
            <div className="max-w-full sm:max-w-[260px]">
              <Input
                placeholder="Search sub admin..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
            </div>

            <Button
              variant="primary"
              onClick={() => navigate("/admin/sub-admins/add")}
              className="text-xs sm:text-sm h-11"
            >
              + Add Sub Admin
            </Button>
          </div>
        </div>


        {/* Table */}
        <div className="overflow-x-auto max-w-[calc(100vw-70px)] rounded-xl border border-gray-200">
          <table className="w-full divide-y divide-gray-200 text-sm whitespace-nowrap">
            <thead className="bg-gray-50">
              <tr>
                {[
                  { key: "id", label: "ID" },
                  { key: "name", label: "Name" },
                  { key: "email", label: "Email" },
                  { key: "createdAt", label: "Created At" },
                  { key: "actions", label: "Action" },
                ].map((col) => (
                  <th
                    key={col.key}
                    onClick={() =>
                      col.key !== "actions" && handleSort(col.key)
                    }
                    className="cursor-pointer px-4 py-3 text-left font-semibold text-gray-600"
                  >
                    {col.label}
                    {sortConfig.key === col.key && (
                      <span className="ml-1">
                        {icons[sortConfig.direction]}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{item.id}</td>
                  <td className="px-4 py-3 font-medium">{item.name}</td>
                  <td className="px-4 py-3">{item.email}</td>
                  <td className="px-4 py-3">{item.createdAt}</td>
                  <td className="px-4 py-3 flex gap-2">
                    {/* View */}
                    <Button
                      size="sm"
                      variant="view"
                      onClick={() =>
                        navigate(`/admin/sub-admins/view/${item.id}`)
                      }
                      startIcon={<IoIosEye size={20} />}
                    />

                    {/* Edit */}
                    <Button
                      size="sm"
                      variant="edit"
                      onClick={() =>
                        navigate(`/admin/sub-admins/edit/${item.id}`)
                      }
                      startIcon={<CiEdit size={20} />}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="rounded-lg border px-3 py-1 text-sm disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm font-medium text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="rounded-lg border px-3 py-1 text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
