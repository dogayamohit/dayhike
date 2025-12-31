import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { Modal } from "../../components/ui/fullScreenModal/Modal";
import Button from "../../components/ui/button/Button";
import { CiEdit } from "react-icons/ci";
import { IoIosEye } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import Input from "../../components/form/input/InputField";

/* ---------------- DATA ---------------- */
export const initialPosts = [
    {
        id: 1,
        postId: 425,
        headline: "Tag line",
        text: "Test tagger",
        address: "Indore, MP, 452016",
        postType: "Public",
        createdAt: "2025-12-08",
    },
    {
        id: 2,
        postId: 424,
        headline: "Hiiiiii",
        text: "Hiiiii",
        address: "Indore, MP, 452016",
        postType: "Public",
        createdAt: "2025-12-03",
    },
];


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

export default function UserPostsTable() {
    const [data, setData] = useState(initialPosts);
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
                item.headline.toLowerCase().includes(search.toLowerCase()) ||
                item.postId.toString().includes(search)
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

    const start = (currentPage - 1) * perPage;
    const paginatedData = sortedData.slice(start, start + perPage);
    const totalPages = Math.ceil(sortedData.length / perPage);

    const handleDelete = () => {
        setData((prev) => prev.filter((item) => item.id !== deleteRow.id));
        setDeleteRow(null);
    };

    const handleSort = (key) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
        }));
    };

    return (
        <>
            <PageBreadcrumb pageTitle="User Posts" />

            <div className="rounded-2xl border border-gray-200 bg-white p-6 w-full mx-auto
                    max-w-[calc(100vw-var(--sidebar-space))]
                    transition-all duration-300">
                {/* Controls */}
                <div className="mb-4 flex flex-col sm:flex-row items-start justify-between items-center gap-3">
                    <select
                        value={perPage}
                        onChange={(e) => setPerPage(Number(e.target.value))}
                        className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
                    >
                        <option value={5}>5 rows</option>
                        <option value={10}>10 rows</option>
                    </select>

                    <div className="flex flex-row items-center gap-3">
                        <Input
                            type="text"
                            placeholder="Search post..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="max-w-[160px] sm:max-w-[260px] rounded-lg border border-gray-200 px-3 py-2 text-sm h-11"
                        />

                        <Button
                            variant="primary"
                            onClick={() => navigate("/user/posts/add")}
                            startIcon={<AiOutlinePlus />}
                            className="h-11 whitespace-nowrap"
                        >
                            Add Post
                        </Button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto max-w-[calc(100vw-70px)] rounded-xl border border-gray-200">
                    <table className="w-full text-sm whitespace-nowrap">
                        <thead className="bg-gray-50">
                            <tr>
                                {[
                                    { key: "id", label: "ID" },
                                    { key: "postId", label: "Post ID" },
                                    { key: "headline", label: "Post Headline" },
                                    { key: "text", label: "Post Text" },
                                    { key: "address", label: "Address" },
                                    { key: "postType", label: "Post Type" },
                                    { key: "createdAt", label: "Created At" },
                                    { key: "actions", label: "Action" },
                                ].map((col) => (
                                    <th
                                        key={col.key}
                                        className="px-4 py-3 text-left font-semibold text-gray-600 cursor-pointer"
                                        onClick={() =>
                                            col.key !== "actions" && handleSort(col.key)
                                        }
                                    >
                                        {col.label}
                                        {sortConfig.key === col.key && (
                                            <span>
                                                {sortConfig.direction === "asc" ? icons.sortAsc : icons.sortDesc}
                                            </span>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody className="">
                            {paginatedData.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 border border-gray-200">
                                    <td className="px-4 py-3">{item.id}</td>
                                    <td className="px-4 py-3">{item.postId}</td>
                                    <td className="px-4 py-3 font-medium">{item.headline}</td>
                                    <td className="px-4 py-3 text-gray-600">{item.text}</td>
                                    <td className="px-4 py-3">{item.address}</td>
                                    <td className="px-4 py-3">{item.postType}</td>
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
                                            variant="edit"
                                            startIcon={<CiEdit size={18} />}
                                            onClick={() => navigate(`/user/posts/edit/${item.id}`)}
                                        />

                                        <Button
                                            size="sm"
                                            variant="delete"
                                            startIcon={<MdDeleteOutline size={18} />}
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

            {/* Delete modal */}
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
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>

                        <h3 className="text-xl font-semibold mb-2 text-gray-800">Delete this item?</h3>
                        <p className="text-gray-500 mb-6">
                            This action cannot be undone. Are you sure you want to delete{" "}
                            <span className="font-medium text-gray-700">{deleteRow?.name}</span>?
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
