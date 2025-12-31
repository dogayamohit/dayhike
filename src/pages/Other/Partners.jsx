import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { Modal } from "../../components/ui/fullScreenModal/Modal";
import Button from "../../components/ui/button/Button";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import Input from "../../components/form/input/InputField";

/* ---------------- INITIAL DATA ---------------- */
const initialPartnersData = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop&q=60",
        url: "https://www.cirqueseries.com",
        createdAt: "2025-03-31",
    },
    {
        id: 2,
        image: "https://plus.unsplash.com/premium_photo-1764546983177-c2342bef9ebf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D",
        url: "https://www.example.com",
        createdAt: "2025-04-05",
    },
];

/* ---------------- SORT ICONS ---------------- */
const icons = { asc: "▲", desc: "▼" };

export default function Partners() {
    const [data, setData] = useState(initialPartnersData);
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
                item.url.toLowerCase().includes(search.toLowerCase()) ||
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

    const handleDelete = () => {
        setData((prev) => prev.filter((i) => i.id !== deleteRow.id));
        setDeleteRow(null);
    };

    return (
        <>
            <PageBreadcrumb pageTitle="Partners" />

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

                        <Button
                            variant="primary"
                            onClick={() => navigate("/partners/add")}
                            startIcon={<AiOutlinePlus />}
                            className="text-xs sm:text-sm h-11"
                        >
                            Add Partner
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
                                    { key: "image", label: "Image" },
                                    { key: "url", label: "URL" },
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

                        <tbody className="divide-y divide-gray-200 text-sm">
                            {paginatedData.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3">{item.id}</td>
                                    <td className="px-4 py-3">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={`Partner ${item.id}`}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                                                No Image
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-600 hover:underline"
                                        >
                                            {item.url}
                                        </a>
                                    </td>
                                    <td className="px-4 py-3">{item.createdAt}</td>
                                    <td className="px-4 py-5 flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="edit"
                                            onClick={() => navigate(`/partners/edit/${item.id}`)}
                                            startIcon={<CiEdit size={20} />}
                                        />
                                        <Button
                                            size="sm"
                                            variant="delete"
                                            onClick={() => setDeleteRow(item)}
                                            startIcon={<MdDeleteOutline size={20} />}
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
                <div className="bg-gray-200 rounded-2xl shadow-xl w-full max-w-md p-6 animate-fadeIn">
                    <div className="flex flex-col items-center text-center">
                        <div className="bg-red-100 text-red-600 rounded-full p-4 mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </div>

                        <h3 className="text-xl font-semibold mb-2 text-gray-800">
                            Delete this partner?
                        </h3>
                        <p className="text-gray-500 mb-6">
                            This action cannot be undone. Are you sure you want to delete{" "}
                            <span className="font-medium text-gray-700">{deleteRow?.url}</span>?
                        </p>

                        <div className="flex justify-center gap-4 w-full">
                            <button
                                onClick={handleDelete}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setDeleteRow(null)}
                                className="flex-1 border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-colors"
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
