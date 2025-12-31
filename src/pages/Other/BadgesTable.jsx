import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Button from "../../components/ui/button/Button";
import { CiEdit } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai";
import Input from "../../components/form/input/InputField";

/* ---------------- INITIAL DATA ---------------- */
const initialBadgeData = [
  {
    id: 1,
    image:
      "https://php-files-upload-dayhikedev-staging.s3.us-east-1.amazonaws.com/public/uploads/badges/badges1720701669.png",
    name: "5 Activities Created",
    badgeType: "Activity_Create",
    createdAt: "2024-07-11",
  },
  {
    id: 2,
    image:
      "https://php-files-upload-dayhikedev-staging.s3.us-east-1.amazonaws.com/public/uploads/badges/badges1720701669.png",
    name: "10 Activities Created",
    badgeType: "Activity_Create",
    createdAt: "2024-07-11",
  },
  {
    id: 3,
    image:
      "https://php-files-upload-dayhikedev-staging.s3.us-east-1.amazonaws.com/public/uploads/badges/badges1720701669.png",
    name: "25 Activities Created",
    badgeType: "Activity_Create",
    createdAt: "2024-07-11",
  },
  {
    id: 4,
    image:
      "https://php-files-upload-dayhikedev-staging.s3.us-east-1.amazonaws.com/public/uploads/badges/badges1720701669.png",
    name: "50 Activities Created",
    badgeType: "Activity_Create",
    createdAt: "2024-07-11",
  },
  {
    id: 5,
    image:
      "https://php-files-upload-dayhikedev-staging.s3.us-east-1.amazonaws.com/public/uploads/badges/badges1720701669.png",
    name: "100 Activities Created",
    badgeType: "Activity_Create",
    createdAt: "2024-07-11",
  },
  {
    id: 6,
    image:
      "https://php-files-upload-dayhikedev-staging.s3.us-east-1.amazonaws.com/public/uploads/badges/badges1720701669.png",
    name: "250 Activities Created",
    badgeType: "Activity_Create",
    createdAt: "2024-07-11",
  },
  {
    id: 7,
    image:
      "https://php-files-upload-dayhikedev-staging.s3.us-east-1.amazonaws.com/public/uploads/badges/badges1720701669.png",
    name: "5 Activities Joined",
    badgeType: "Join_Activity",
    createdAt: "2024-07-11",
  },
  {
    id: 8,
    image:
      "https://php-files-upload-dayhikedev-staging.s3.us-east-1.amazonaws.com/public/uploads/badges/badges1720701669.png",
    name: "10 Activities Joined",
    badgeType: "Join_Activity",
    createdAt: "2024-07-11",
  },
  {
    id: 9,
    image:
      "https://php-files-upload-dayhikedev-staging.s3.us-east-1.amazonaws.com/public/uploads/badges/badges1720701669.png",
    name: "25 Activities Joined",
    badgeType: "Join_Activity",
    createdAt: "2024-07-11",
  },
  {
    id: 10,
    image:
      "https://php-files-upload-dayhikedev-staging.s3.us-east-1.amazonaws.com/public/uploads/badges/badges1720701669.png",
    name: "50 Activities Joined",
    badgeType: "Join_Activity",
    createdAt: "2024-07-11",
  },
];


/* ---------------- SORT ICONS ---------------- */
const icons = { asc: "▲", desc: "▼" };

export default function BadgesTable() {
  const [data] = useState(initialBadgeData);
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
        item.badgeType.toLowerCase().includes(search.toLowerCase()) ||
        item.createdAt.includes(search)
    );
  }, [search, data]);

  /* ---------------- SORT ---------------- */
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    const sorted = [...filteredData].sort((a, b) =>
      a[sortConfig.key]?.toString().localeCompare(b[sortConfig.key]?.toString())
    );
    return sortConfig.direction === "asc" ? sorted : sorted.reverse();
  }, [filteredData, sortConfig]);

  /* ---------------- PAGINATION ---------------- */
  const start = (currentPage - 1) * perPage;
  const paginatedData = sortedData.slice(start, start + perPage);
  const totalPages = Math.ceil(sortedData.length / perPage);

  /* ---------------- HANDLERS ---------------- */
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Badges" />

      <div className="rounded-2xl border border-gray-100 bg-white">
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
          <div className="flex flex-row items-center gap-3">
            <div className="max-w-[160px] sm:max-w-[260px]">
              <Input
                placeholder="Search ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
            </div>

          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto max-w-[calc(100vw-70px)] rounded-xl border border-gray-200">
          <table className="w-full divide-y divide-gray-200 text-sm whitespace-nowrap">
            <thead className="bg-gray-50">
              <tr>
                {[
                  { key: "id", label: "ID" },
                  { key: "image", label: "Image" },
                  { key: "name", label: "Name" },
                  { key: "badgeType", label: "Badge Type" },
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
                      <span className="ml-1">{icons[sortConfig.direction]}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{item.id}</td>

                  <td className="px-4 py-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-15 h-15 rounded object-cover"
                    />
                  </td>

                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.badgeType}</td>
                  <td className="px-4 py-3">{item.createdAt}</td>

                  <td className="px-4 py-3">
                    <Button
                      size="sm"
                      variant="edit"
                      onClick={() => navigate(`/badges/edit/${item.id}`)}
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
