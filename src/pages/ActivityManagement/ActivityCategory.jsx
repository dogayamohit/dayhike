import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/fullScreenModal/Modal";
import PageBreadCrumb from "../../components/common/PageBreadCrumb";

const ActivityCategory = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [deleteRow, setDeleteRow] = useState(null);

  const [data, setData] = useState([
    { id: 1, name: "Hiking", createdat: "2025-12-22" },
    { id: 2, name: "Camping", createdat: "2025-12-21" },
  ]);

  const filteredData = data.filter((row) =>
    search
      ? row.name.toLowerCase().includes(search.toLowerCase())
      : true
  );

  const handleDelete = () => {
    setData((prev) => prev.filter((d) => d.id !== deleteRow.id));
    setDeleteRow(null);
  };

  return (
    <div className="p-4">
      <PageBreadCrumb pageTitle="Activity Category" />

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        {/* Search + Add */}
        <div className="flex flex-row items-center gap-3 mb-3">
          <div className="max-w-[160px] sm:max-w-[260px]">
            <Input
              placeholder="Search activity..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
          </div>

          <Button
            size="sm"
            variant="primary"
            onClick={() => navigate("/activity/category/add")}
            className="text-xs sm:text-sm h-11"
          >
            Add Category
          </Button>
        </div>

        <div className="overflow-x-auto max-w-[calc(100vw-70px)] rounded-xl border border-gray-200">
          <table className="w-full divide-y whitespace-nowrap divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="cursor-pointer px-4 py-3 text-left font-semibold text-gray-600">ID</th>
                <th className="cursor-pointer px-4 py-3 text-left font-semibold text-gray-600">Name</th>
                <th className="cursor-pointer px-4 py-3 text-left font-semibold text-gray-600">Created At</th>
                <th className="cursor-pointer px-4 py-3 text-left font-semibold text-gray-600">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((row) => (
                <tr key={row.id} className="border-b border-gray-200">
                  <td className="px-4 py-3">{row.id}</td>
                  <td className="px-4 py-3">{row.name}</td>
                  <td className="px-4 py-3">{row.createdat}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <Button
                      size="sm"
                      variant="edit"
                      onClick={() =>
                        navigate(`/activity/category/edit/${row.id}`)
                      }
                      startIcon={<CiEdit size={20} />}
                    />

                    {/* Delete */}
                    <Button
                      size="sm"
                      variant="delete"
                      onClick={() => setDeleteRow(row)}
                      startIcon={<MdDeleteOutline size={20} />}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
    </div>
  );
};

export default ActivityCategory;
