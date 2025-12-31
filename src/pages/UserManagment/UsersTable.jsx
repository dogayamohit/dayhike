import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { Modal } from "../../components/ui/fullScreenModal/Modal";
import Input from "../../components/form/input/InputField";
import { CiEdit } from "react-icons/ci";
import { IoIosEye } from "react-icons/io";
import { TbPasswordUser } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";

/* ---------------- DATA ---------------- */
export const initialData = [
    { id: 1, userId: "U001", image: "https://i.pravatar.cc/40?img=1", name: "Lindsey Curtis", username: "lindsey.c", email: "lindsey.c@example.com", mobile: "+1234567890", createdAt: "2025-12-01", status: "Active" },
    { id: 2, userId: "U002", image: "https://i.pravatar.cc/40?img=2", name: "Abram Schleifer", username: "abram.s", email: "abram.s@example.com", mobile: "+1987654321", createdAt: "2025-11-25", status: "Inactive" },
    { id: 3, userId: "U003", image: "https://i.pravatar.cc/40?img=3", name: "Ekstrom Bothman", username: "ekstrom.b", email: "ekstrom.b@example.com", mobile: "+1122334455", createdAt: "2025-12-15", status: "Active" },
    { id: 4, userId: "U004", image: "https://i.pravatar.cc/40?img=4", name: "Tiger Nixon", username: "tiger.n", email: "tiger.n@example.com", mobile: "+1415123456", createdAt: "2025-10-01", status: "Active" },
    { id: 5, userId: "U005", image: "https://i.pravatar.cc/40?img=5", name: "Garrett Winters", username: "garrett.w", email: "garrett.w@example.com", mobile: "+1987123456", createdAt: "2025-09-15", status: "Inactive" },
    { id: 6, userId: "U006", image: "https://i.pravatar.cc/40?img=6", name: "Ashton Cox", username: "ashton.c", email: "ashton.c@example.com", mobile: "+1234987654", createdAt: "2025-08-20", status: "Active" },
    { id: 7, userId: "U007", image: "https://i.pravatar.cc/40?img=7", name: "Cedric Kelly", username: "cedric.k", email: "cedric.k@example.com", mobile: "+1321654987", createdAt: "2025-07-05", status: "Active" },
    { id: 8, userId: "U008", image: "https://i.pravatar.cc/40?img=8", name: "Airi Satou", username: "airi.s", email: "airi.s@example.com", mobile: "+1765432198", createdAt: "2025-06-18", status: "Inactive" },
    { id: 9, userId: "U009", image: "https://i.pravatar.cc/40?img=9", name: "Brielle Williamson", username: "brielle.w", email: "brielle.w@example.com", mobile: "+1547896321", createdAt: "2025-05-30", status: "Active" },
    { id: 10, userId: "U010", image: "https://i.pravatar.cc/40?img=10", name: "Herrod Chandler", username: "herrod.c", email: "herrod.c@example.com", mobile: "+1654321879", createdAt: "2025-05-12", status: "Active" },
    { id: 11, userId: "U011", image: "https://i.pravatar.cc/40?img=11", name: "Rhona Davidson", username: "rhona.d", email: "rhona.d@example.com", mobile: "+1432567890", createdAt: "2025-04-10", status: "Inactive" },
    { id: 12, userId: "U012", image: "https://i.pravatar.cc/40?img=12", name: "Colleen Hurst", username: "colleen.h", email: "colleen.h@example.com", mobile: "+1543678921", createdAt: "2025-03-09", status: "Active" },
    { id: 13, userId: "U013", image: "https://i.pravatar.cc/40?img=13", name: "Sonya Frost", username: "sonya.f", email: "sonya.f@example.com", mobile: "+1765984321", createdAt: "2025-02-13", status: "Inactive" },
    { id: 14, userId: "U014", image: "https://i.pravatar.cc/40?img=14", name: "Jena Gaines", username: "jena.g", email: "jena.g@example.com", mobile: "+1234987123", createdAt: "2025-01-19", status: "Active" },
    { id: 15, userId: "U015", image: "https://i.pravatar.cc/40?img=15", name: "Quinn Flynn", username: "quinn.f", email: "quinn.f@example.com", mobile: "+1342567890", createdAt: "2025-01-03", status: "Active" },
    { id: 16, userId: "U016", image: "https://i.pravatar.cc/40?img=16", name: "Charde Marshall", username: "charde.m", email: "charde.m@example.com", mobile: "+1456789123", createdAt: "2024-12-16", status: "Inactive" },
    { id: 17, userId: "U017", image: "https://i.pravatar.cc/40?img=17", name: "Haley Kennedy", username: "haley.k", email: "haley.k@example.com", mobile: "+1567891234", createdAt: "2024-11-18", status: "Active" },
    { id: 18, userId: "U018", image: "https://i.pravatar.cc/40?img=18", name: "Tatyana Fitzpatrick", username: "tatyana.f", email: "tatyana.f@example.com", mobile: "+1678912345", createdAt: "2024-10-17", status: "Active" },
    { id: 19, userId: "U019", image: "https://i.pravatar.cc/40?img=19", name: "Michael Silva", username: "michael.s", email: "michael.s@example.com", mobile: "+1789123456", createdAt: "2024-09-27", status: "Inactive" },
    { id: 20, userId: "U020", image: "https://i.pravatar.cc/40?img=20", name: "Paul Byrd", username: "paul.b", email: "paul.b@example.com", mobile: "+1891234567", createdAt: "2024-08-09", status: "Active" },
    { id: 21, userId: "U021", image: "https://i.pravatar.cc/40?img=21", name: "Gloria Little", username: "gloria.l", email: "gloria.l@example.com", mobile: "+1987654321", createdAt: "2024-07-12", status: "Active" },
    { id: 22, userId: "U022", image: "https://i.pravatar.cc/40?img=22", name: "Bradley Greer", username: "bradley.g", email: "bradley.g@example.com", mobile: "+1234876590", createdAt: "2024-06-05", status: "Inactive" },
    { id: 23, userId: "U023", image: "https://i.pravatar.cc/40?img=23", name: "Dai Rios", username: "dai.r", email: "dai.r@example.com", mobile: "+1321546789", createdAt: "2024-05-21", status: "Active" },
    { id: 24, userId: "U024", image: "https://i.pravatar.cc/40?img=24", name: "Jenette Caldwell", username: "jenette.c", email: "jenette.c@example.com", mobile: "+1432569871", createdAt: "2024-04-18", status: "Active" },
    { id: 25, userId: "U025", image: "https://i.pravatar.cc/40?img=25", name: "Yuri Berry", username: "yuri.b", email: "yuri.b@example.com", mobile: "+1543987621", createdAt: "2024-03-25", status: "Inactive" },
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
export default function UsersTable() {
    const [data, setData] = useState(initialData);
    const [search, setSearch] = useState("");
    const [perPage, setPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [deleteRow, setDeleteRow] = useState(null);
    const [passwordRow, setPasswordRow] = useState(null);

    const navigate = useNavigate();

    /* ---------------- FILTER ---------------- */
    const filteredData = useMemo(() => {
        return data.filter(
            (item) =>
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.username.toLowerCase().includes(search.toLowerCase()) ||
                item.email.toLowerCase().includes(search.toLowerCase()) ||
                item.userId.toLowerCase().includes(search.toLowerCase())
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
        if (sortConfig.key === key) {
            setSortConfig({
                key,
                direction: sortConfig.direction === "asc" ? "desc" : "asc",
            });
        } else {
            setSortConfig({ key, direction: "asc" });
        }
    };

    return (
        <>
            <PageBreadcrumb pageTitle="Users Data Table" />

            <div
                className="
                    rounded-2xl border border-gray-200 bg-white shadow-sm
                    p-4 sm:p-6 md:p-6 lg:p-8
                    w-full mx-auto
                    max-w-[calc(100vw-var(--sidebar-space))]
                    transition-all duration-300
                "
            >
                {/* <h3 className="mb-4 text-lg font-semibold">Users</h3> */}

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
                <div className="relative overflow-x-auto max-w-[calc(100vw-20px)] rounded-xl border border-gray-200">
                    <table className="w-full text-sm whitespace-nowrap">
                        <thead className="sticky top-0 z-10 bg-gray-50">
                            <tr>
                                {[
                                    { key: "id", label: "ID" },
                                    { key: "userId", label: "User ID" },
                                    { key: "image", label: "Image" },
                                    { key: "name", label: "Name" },
                                    { key: "username", label: "Username" },
                                    { key: "email", label: "Email" },
                                    { key: "mobile", label: "Mobile Number" },
                                    { key: "createdAt", label: "Created at" },
                                    { key: "status", label: "Status" },
                                    { key: "actions", label: "Action" },
                                ].map((col) => (
                                    <th
                                        key={col.key}
                                        className="px-4 py-3 text-left font-semibold text-gray-600 cursor-pointer select-none"
                                        onClick={() => col.key !== "image" && col.key !== "actions" && handleSort(col.key)}
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

                        <tbody className="divide-y divide-gray-100">
                            {paginatedData.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className={`transition hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50/40"
                                        }`}
                                >
                                    <td className="px-4 py-4 font-medium text-gray-800">{item.id}</td>
                                    <td className="px-4 py-4 text-gray-600">{item.userId}</td>
                                    <td className="px-4 py-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-10 w-10 rounded-full object-cover"
                                        />
                                    </td>
                                    <td className="px-3 py-4 text-gray-800">{item.name}</td>
                                    <td className="px-3 py-4 text-gray-600">{item.username}</td>
                                    <td className="px-3 py-4 text-gray-600">{item.email}</td>
                                    <td className="px-3 py-4 text-gray-600">{item.mobile}</td>
                                    <td className="px-3 py-4 text-gray-600">{item.createdAt}</td>
                                    <td className="px-3 py-4">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${item.status === "Active"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-red-100 text-red-600"
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-2 py-4 flex gap-1">
                                        <Button
                                            onClick={() => navigate(`/users/view/${item.id}`)}
                                            size="sm"
                                            variant="view"
                                            startIcon={<IoIosEye size={20} />}
                                        />

                                        <Button
                                            onClick={() => navigate(`/users/edit/${item.id}`)}
                                            size="sm"
                                            variant="edit"
                                            startIcon={<CiEdit size={20} className="size-5" />}
                                        />

                                        <Button
                                            onClick={() => setDeleteRow(item)}
                                            size="sm"
                                            variant="delete"
                                            startIcon={<MdDeleteOutline size={20} className="size-5" />}
                                        />

                                        {/* <button
                                            onClick={() => navigate(`/users/edit/${item.id}`)}
                                            className="rounded-lg bg-yellow-50 p-2 hover:bg-yellow-100"
                                            title="Edit"
                                        >
                                            <CiEdit size={20} />
                                        </button>

                                        <button
                                            onClick={() => setDeleteRow(item)}
                                            className="rounded-lg bg-red-50 p-2 hover:bg-red-100"
                                            title="Delete"
                                        >
                                            <MdDeleteOutline size={20} />
                                        </button> */}

                                        <Button
                                            onClick={() => setPasswordRow(item)}
                                            size="sm"
                                            variant="changePassword"
                                            startIcon={<TbPasswordUser size={20} />}
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

            {/* DELETE MODAL */}
            <Modal isOpen={!!deleteRow} onClose={() => setDeleteRow(null)} className="max-w-[350px] m-4">
                <div className="rounded-3xl bg-white p-6">
                    <h4 className="mb-4 text-lg font-semibold">Are you sure?</h4>
                    <div className="flex justify-end gap-3">
                        <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
                        <button onClick={() => setDeleteRow(null)} className="border px-4 py-2 rounded">Cancel</button>
                    </div>
                </div>
            </Modal>

            {/* PASSWORD MODAL */}
            <Modal isOpen={!!passwordRow} onClose={() => setPasswordRow(null)} className="max-w-[400px] m-4">
                <div className="rounded-3xl bg-white p-6">
                    <h4 className="mb-4 text-lg font-semibold">Change Password</h4>
                    <Label>New Password</Label>
                    <Input type="password" placeholder="New Password" className="mb-4" />
                    <Label>Set Password</Label>
                    <Input type="password" placeholder="Confirm Password" className="mb-4" />
                    <div className="flex justify-end gap-3">
                        {/* <button onClick={() => setPasswordRow(null)} className="border px-4 py-2 rounded">Cancel</button> */}
                        <button onClick={() => setPasswordRow(null)} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
