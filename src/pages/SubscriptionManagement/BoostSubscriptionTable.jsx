import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { Modal } from "../../components/ui/fullScreenModal/Modal";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

/* ---------------- DATA ---------------- */
const initialBoostSubscriptions = [
  {
    id: 1,
    name: "5 year",
    amount: 1000,
    duration: 1825,
    createdAt: "2023-08-29",
  },
];

/* ---------------- ICONS ---------------- */
const icons = {
  sortAsc: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" className="w-4 h-4 inline-block ml-1">
      <path d="M5 10l5-5 5 5H5z" />
    </svg>
  ),
  sortDesc: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" className="w-4 h-4 inline-block ml-1">
      <path d="M5 10l5 5 5-5H5z" />
    </svg>
  ),
};

/* ---------------- COMPONENT ---------------- */
export default function BoostSubscriptionTable() {
  const navigate = useNavigate();

  const [data, setData] = useState(initialBoostSubscriptions);
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [deleteRow, setDeleteRow] = useState(null);

  /* ---------------- FILTER ---------------- */
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);

  /* ---------------- SORT ---------------- */
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    const sorted = [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key] ?? "";
      const bVal = b[sortConfig.key] ?? "";
      if (typeof aVal === "string") return aVal.localeCompare(bVal);
      return aVal - bVal;
    });

    return sortConfig.direction === "asc" ? sorted : sorted.reverse();
  }, [filteredData, sortConfig]);

  /* ---------------- PAGINATION ---------------- */
  const start = (currentPage - 1) * perPage;
  const paginatedData = sortedData.slice(start, start + perPage);
  const totalPages = Math.ceil(sortedData.length / perPage);

  /* ---------------- HANDLERS ---------------- */
  const handleSort = (key) => {
    if (sortConfig.key === key) {
      setSortConfig({
        key,
        direction: sortConfig.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSortConfig({ key, direction: "asc" });
    }
  };

  const handleDelete = () => {
    setData((prev) => prev.filter((item) => item.id !== deleteRow.id));
    setDeleteRow(null);
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Boost Subscription Plans" />

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
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
                type="text"
                placeholder="Search boost plan..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="relative overflow-x-auto max-w-[calc(100vw-70px)] rounded-xl border border-gray-200">
          <table className="w-full text-sm whitespace-nowrap">
            <thead className="sticky top-0 bg-gray-50">
              <tr>
                {[
                  { key: "id", label: "ID" },
                  { key: "name", label: "Name" },
                  { key: "amount", label: "Amount" },
                  { key: "duration", label: "Duration" },
                  { key: "createdAt", label: "Created at" },
                  { key: "actions", label: "Action" },
                ].map((col) => (
                  <th
                    key={col.key}
                    onClick={() => col.key !== "actions" && handleSort(col.key)}
                    className="px-4 py-3 text-left font-semibold text-gray-600 cursor-pointer"
                  >
                    {col.label}
                    {sortConfig.key === col.key && (
                      <span>
                        {sortConfig.direction === "asc"
                          ? icons.sortAsc
                          : icons.sortDesc}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{item.id}</td>
                  <td className="px-4 py-3 font-medium">{item.name}</td>
                  <td className="px-4 py-3">${item.amount}</td>
                  <td className="px-4 py-3">{item.duration}</td>
                  <td className="px-4 py-3">{item.createdAt}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <Button
                      size="sm"
                      variant="edit"
                      onClick={() =>
                        navigate(`/subscriptions/boost-plans/edit/${item.id}`)
                      }
                      startIcon={<CiEdit size={18} />}
                    />
                    <Button
                      size="sm"
                      variant="delete"
                      onClick={() => setDeleteRow(item)}
                      startIcon={<MdDeleteOutline size={18} />}
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
          <span className="text-sm font-medium">
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
        <div className="bg-gray-200 rounded-2xl shadow-xl w-full max-w-md p-6">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Delete this item?
            </h3>
            <p className="text-gray-500 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium">{deleteRow?.name}</span>?
            </p>

            <div className="flex justify-center gap-4 w-full">
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteRow(null)}
                className="flex-1 border border-gray-300 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
