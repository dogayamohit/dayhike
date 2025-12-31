const emptyData = [];
import { useState, useMemo } from "react";
import Input from "../../components/form/input/InputField"; // your input component

export const Table = ({ columns, data }) => {
  const [search, setSearch] = useState("");

  // Filter data based on search query
  const filteredData = useMemo(() => {
    if (!search) return data;

    return data.filter((row) =>
      columns.some((col) => {
        const value = row[col.toLowerCase().replace(/\s/g, "")]; // normalize key
        return value?.toString().toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [search, data, columns]);

  return (
    <div className="overflow-x-auto max-w rounded-xl border border-gray-200 p-2 sm:p-4 md:p-6 lg:p-8">
      {/* Search Input */}
      <div className="mb-4 max-w-[200px] sm:max-w-[350px]">
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-6 text-center text-gray-400"
              >
                No records found
              </td>
            </tr>
          ) : (
            filteredData.map((row, idx) => (
              <tr key={idx} className="border-b border-gray-300">
                {columns.map((col) => {
                  const key = col.toLowerCase().replace(/\s/g, "");
                  return (
                    <td key={col} className="px-4 py-3">
                      {row[key] || "-"}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};


export const ActivityParticipants = () => {
  const data = [
    {
      id: 1,
      name: "Tasmiya",
      email: "tasmiya@mailinator.com",
      phonenumber: "9399045960",
    },
  ];

  return (
    <Table
      columns={["ID", "Name", "Email", "Phone Number"]}
      data={data}
    />
  );
};