import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { Modal } from "../../components/ui/fullScreenModal/Modal";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { AiOutlinePlus } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosEye } from "react-icons/io";

/* ---------------- DATA ---------------- */
const initialGallery = [
    { id: 1, image: "https://picsum.photos/200?1", createdAt: "2024-07-01" },
    { id: 2, image: "https://picsum.photos/200?2", createdAt: "2024-07-02" },
    { id: 3, image: "https://picsum.photos/200?3", createdAt: "2024-07-03" },
    { id: 4, image: "https://picsum.photos/200?4", createdAt: "2024-07-04" },
];

/* ---------------- SORT ICONS ---------------- */
const icons = {
    asc: "▲",
    desc: "▼",
};

export default function GalleryTable() {
    const navigate = useNavigate();

    const [data, setData] = useState(initialGallery);
    const [search, setSearch] = useState("");
    const [perPage, setPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [deleteRow, setDeleteRow] = useState(null);

    /* ---------------- FILTER ---------------- */
    const filteredData = useMemo(() => {
        return data.filter(
            (item) =>
                item.id.toString().includes(search) ||
                item.createdAt.includes(search)
        );
    }, [search, data]);

    /* ---------------- SORT ---------------- */
    const sortedData = useMemo(() => {
        if (!sortConfig.key) return filteredData;

        const sorted = [...filteredData].sort((a, b) => {
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];

            if (typeof aVal === "string") {
                return aVal.localeCompare(bVal);
            }
            return aVal - bVal;
        });

        return sortConfig.direction === "asc" ? sorted : sorted.reverse();
    }, [filteredData, sortConfig]);

    /* ---------------- PAGINATION ---------------- */
    const start = (currentPage - 1) * perPage;
    const paginatedData = sortedData.slice(start, start + perPage);
    const totalPages = Math.ceil(sortedData.length / perPage);

    /* ---------------- SORT HANDLER ---------------- */
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

    /* ---------------- DELETE ---------------- */
    const handleDelete = () => {
        setData((prev) => prev.filter((item) => item.id !== deleteRow.id));
        setDeleteRow(null);
    };

    return (
        <>
            <PageBreadcrumb pageTitle="Gallery" />

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
                                placeholder="Search ..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full"
                            />
                        </div>

                        <Button
                            variant="primary"
                            startIcon={<AiOutlinePlus />}
                            onClick={() => navigate("/gallery/day-hikes/add")}
                            className="text-xs sm:text-sm h-11"
                        >
                            Add Image
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
                                    { key: "image", label: "Image" },
                                    { key: "createdAt", label: "Created at" },
                                    { key: "actions", label: "Action" },
                                ].map((col) => (
                                    <th
                                        key={col.key}
                                        className="px-4 py-3 text-left font-semibold text-gray-600 cursor-pointer"
                                        onClick={() =>
                                            col.key !== "image" &&
                                            col.key !== "actions" &&
                                            handleSort(col.key)
                                        }
                                    >
                                        {col.label}
                                        {sortConfig.key === col.key && (
                                            <span className="ml-1 text-xs">
                                                {icons[sortConfig.direction]}
                                            </span>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody className="border border-gray-200">
                            {paginatedData.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className={index % 2 === 0 ? "bg-white border border-gray-200" : "bg-gray-50/40 border border-gray-200"}
                                >
                                    <td className="px-4 py-4 font-medium">{item.id}</td>

                                    <td className="px-4 py-4">
                                        <img
                                            src={item.image}
                                            alt="Gallery"
                                            className="h-12 w-12 rounded-lg object-cover border border-gray-200"
                                        />
                                    </td>

                                    <td className="px-4 py-4 text-gray-600">
                                        {item.createdAt}
                                    </td>

                                    {/* Actions */}
                                    <td className="px-4 py-4 flex gap-2">

                                        <Button
                                            onClick={() => navigate(`/gallery/day-hikes/edit/${item.id}`)}
                                            size="sm"
                                            variant="edit"
                                            startIcon={<CiEdit size={18} />}
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
