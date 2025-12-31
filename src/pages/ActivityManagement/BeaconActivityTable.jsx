import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { Modal } from "../../components/ui/fullScreenModal/Modal";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { IoIosEye } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";

/* ---------------- BEACON DATA ---------------- */
const initialBeaconActivityData = [
    // {
    //   id: 1,
    //   beaconId: "BCN-1023",
    //   userName: "John Doe",
    //   activityName: "Mountain Hiking",
    //   message: "Looking for advanced hikers",
    //   skillLevel: "Intermediate",
    //   createdAt: "2025-12-01",
    // },
];

/* ---------------- SORT ICONS ---------------- */
const icons = {
  asc: "▲",
  desc: "▼",
};

/* ---------------- COMPONENT ---------------- */
export default function BeaconActivityTable() {
  const [data, setData] = useState(initialBeaconActivityData);
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [deleteRow, setDeleteRow] = useState(null);

  const navigate = useNavigate();

  /* ---------------- FILTER ---------------- */
  const filteredData = useMemo(() => {
    return data.filter(
      (item) =>
        item.beaconId.toLowerCase().includes(search.toLowerCase()) ||
        item.userName.toLowerCase().includes(search.toLowerCase()) ||
        item.activityName.toLowerCase().includes(search.toLowerCase())
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

  const handleDelete = () => {
    setData((prev) => prev.filter((i) => i.id !== deleteRow.id));
    setDeleteRow(null);
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Show User Beacon Activity" />

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
          <div className="flex flex-row items-center gap-3">
            <div className="max-w-[160px] sm:max-w-[260px]">
              <Input
                placeholder="Search beacon..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto max-w-[calc(100vw-70px)] rounded-xl border border-gray-200">
          <table className="w-full divide-y whitespace-nowrap divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                {[
                  { key: "id", label: "ID" },
                  { key: "beaconId", label: "Beacon ID" },
                  { key: "userName", label: "User Name" },
                  { key: "activityName", label: "Activity Name" },
                  { key: "message", label: "Message" },
                  { key: "skillLevel", label: "Skill Level" },
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

            <tbody className="divide-y">
              {paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{item.id}</td>
                  <td className="px-4 py-3">{item.beaconId}</td>
                  <td className="px-4 py-3">{item.userName}</td>
                  <td className="px-4 py-3 font-medium">{item.activityName}</td>
                  <td className="px-4 py-3 truncate max-w-[200px]">
                    {item.message}
                  </td>
                  <td className="px-4 py-3">{item.skillLevel}</td>
                  <td className="px-4 py-3">{item.createdAt}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <Button
                      size="sm"
                      variant="view"
                      onClick={() =>
                        navigate(`/beacon-activity/view/${item.id}`)
                      }
                      startIcon={<IoIosEye size={20} />}
                    />

                    <Button
                      size="sm"
                      variant="delete"
                      onClick={() => setDeleteRow(item)}
                      startIcon={<MdDeleteOutline />}
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

      {/* Delete Modal */}
      <Modal
        isOpen={!!deleteRow}
        onClose={() => setDeleteRow(null)}
        className="flex items-center justify-center max-w-[350px] m-4"
      >
        <div className="bg-white rounded-2xl shadow-xl w-full p-6">
          <h3 className="text-lg font-semibold mb-2">
            Delete Beacon Activity?
          </h3>
          <p className="text-gray-500 mb-6">
            Are you sure you want to delete{" "}
            <span className="font-medium">{deleteRow?.activityName}</span>?
          </p>

          <div className="flex gap-4">
            <button
              onClick={handleDelete}
              className="flex-1 bg-red-600 text-white py-2 rounded-lg"
            >
              Delete
            </button>
            <button
              onClick={() => setDeleteRow(null)}
              className="flex-1 border py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
