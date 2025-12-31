import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { Modal } from "../../components/ui/fullScreenModal/Modal";
import Button from "../../components/ui/button/Button";
import { MdDeleteOutline } from "react-icons/md";
import Input from "../../components/form/input/InputField";
import { IoIosEye } from "react-icons/io";

/* ---------------- INITIAL DATA ---------------- */
const initialReportsData = [
    {
        id: 1,
        postId: 425,
        reportedBy: "shubhijaiswal",
        typeName: "Bike riding",
        email: "shubhi@mailinator.com",
        mobile: "+91 8770722563",
        reportType: "Post",
        reason: "Abc",
        createdAt: "2025-04-22",
    },
];

/* ---------------- SORT ICONS ---------------- */
const icons = { asc: "▲", desc: "▼" };

export default function ShowPostReports() {
    const [data, setData] = useState(initialReportsData);
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
                item.reportedBy.toLowerCase().includes(search.toLowerCase()) ||
                item.typeName.toLowerCase().includes(search.toLowerCase()) ||
                item.email.toLowerCase().includes(search.toLowerCase()) ||
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
            <PageBreadcrumb pageTitle="Post Reports" />

            <div className="rounded-2xl border border-gray-100 bg-white w-full mx-auto
                    max-w-[calc(100vw-var(--sidebar-space))]
                    transition-all duration-300">
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
                                    { key: "reportedBy", label: "User Reported By" },
                                    { key: "typeName", label: "Type Name" },
                                    { key: "email", label: "User Email" },
                                    { key: "mobile", label: "User Mobile No." },
                                    { key: "reportType", label: "Type" },
                                    { key: "reason", label: "Reason" },
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
                                    <td className="px-4 py-3">{item.reportedBy}</td>
                                    <td className="px-4 py-3">{item.typeName}</td>
                                    <td className="px-4 py-3">{item.email}</td>
                                    <td className="px-4 py-3">{item.mobile}</td>
                                    <td className="px-4 py-3">{item.reportType}</td>
                                    <td className="px-4 py-3">{item.reason}</td>
                                    <td className="px-4 py-3">{item.createdAt}</td>
                                    <td className="px-4 py-3 flex gap-2">
                                        <Button
                                            onClick={() => navigate(`/user/posts/view/${item.postId}`)}
                                            size="sm"
                                            variant="view"
                                            startIcon={<IoIosEye size={20} />}
                                        />
                                        <Button
                                            size="sm"
                                            variant="delete"
                                            startIcon={<MdDeleteOutline size={20} />}
                                            onClick={() => setDeleteRow(item)}
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
                <div className="bg-gray-200 rounded-2xl shadow-xl w-full max-w-md p-6">
                    <div className="flex flex-col items-center text-center">
                        <div className="bg-red-100 text-red-600 rounded-full p-4 mb-4">
                            ✕
                        </div>

                        <h3 className="text-xl font-semibold mb-2 text-gray-800">
                            Delete this report?
                        </h3>
                        <p className="text-gray-500 mb-6">
                            This action cannot be undone.
                        </p>

                        <div className="flex justify-center gap-4 w-full">
                            <button
                                onClick={handleDelete}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setDeleteRow(null)}
                                className="flex-1 border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold"
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
