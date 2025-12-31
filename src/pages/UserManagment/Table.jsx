const emptyData = [];
import { useState, useMemo } from "react";
import Input from "../../components/form/input/InputField"; // your input component
import Button from "../../components/ui/button/Button";
import { IoIosEye } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export const Table = ({ columns, data, renderAction }) => {
  const [search, setSearch] = useState("");
  const isLongTextColumn = (key) =>
    ["bio", "title", "message"].includes(key);

  const isImageUrl = (value) => {
    if (!value) return false;
    return (
      typeof value === "string" &&
      (value.startsWith("http") &&
        (value.endsWith(".jpg") ||
          value.endsWith(".jpeg") ||
          value.endsWith(".png") ||
          value.endsWith(".webp") ||
          value.includes("picsum.photos")))
    );
  };


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
    <div className="overflow-x-auto max-w rounded-xl border border-gray-200 p-4">
      {/* Search Input */}
      <div className="mb-4 max-w-[350px]">
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="min-w-full divide-y divide-gray-200 text-sm whitespace-nowrap">
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
              <tr key={idx} className="border-b border-gray-200">
                {columns.map((col) => {
                  const key = col.toLowerCase().replace(/\s/g, "");

                  if (key === "action") {
                    return (
                      <td key={col} className="px-4 py-3">
                        {renderAction ? renderAction(row) : "-"}
                      </td>
                    );
                  }

                  return (
                    <td
                      key={col}
                      className={`px-4 py-3 ${isLongTextColumn(key)
                        ? "min-w-[250px] sm:min-w-[300px] max-w-[400px] whitespace-normal break-words"
                        : "whitespace-nowrap"
                        }`}
                    >
                      {isImageUrl(row[key]) ? (
                        <img
                          src={row[key]}
                          alt="preview"
                          className="h-10 w-10 rounded-md object-cover cursor-pointer"
                        />
                      ) : (
                        row[key] ?? "-"
                      )}

                      {/* {row[key] ?? "-"} */}
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


export const PurchasedSubscriptions = () => {
  const data = [
    // Example data
    { id: 1, plan: "Pro", startdate: "2025-01-01", enddate: "2025-12-31", purchasedatetime: "2025-01-01 12:00", amount: "$99" },
  ];

  return (
    <Table
      columns={["ID", "Plan", "Start Date", "End Date", "Purchase Date / Time", "Amount"]}
      data={data}
    />
  );
};

export const CreatedGroup = () => {
  const createdGroupData = [
    {
      id: 101,
      featureimage: "https://picsum.photos/80?random=1",
      title: "Morning Trek Lovers",
      bio: "A group for people who love early morning treks, sunrise views, and peaceful nature walks.",
      visibility: "Public",
      createdat: "2025-01-12",
    },
    {
      id: 102,
      featureimage: "https://picsum.photos/80?random=2",
      title: "Weekend Adventure Squad",
      bio: "Join us for weekend adventures including hiking, camping, cycling, and offbeat travel experiences.",
      visibility: "Private",
      createdat: "2025-01-18",
    },
    {
      id: 103,
      featureimage: "https://picsum.photos/80?random=3",
      title: "Fitness & Wellness Circle",
      bio: "A supportive community focused on fitness, wellness routines, yoga sessions, and healthy lifestyle habits.",
      visibility: "Public",
      createdat: "2025-01-25",
    },
  ];

  return (
    <Table
      columns={[
        "ID",
        "Feature Image",
        "Title",
        "Bio",
        "Visibility",
        "Created At",
        "Action",
      ]}
      data={createdGroupData}
      renderAction={(row) => (
        <Button
          size="sm"
          variant="view"
          startIcon={<IoIosEye size={18} />}
          onClick={() => navigate(`/groups/view/${row.id}`)}
        />
      )}
    />
  )
};

export const GroupJoin = () => (
  <Table
    columns={[
      "ID",
      "Feature Image",
      "Title",
      "Bio",
      "Visibility",
      "Created At",
      "Action",
    ]}
    data={emptyData}
  />
);

export const ActivityCreated = () => (
  <Table
    columns={[
      "ID",
      "Title",
      "Activity Hour",
      "Start Time",
      "End Time",
      "Created At",
      "Action",
    ]}
    data={emptyData}
  />
);

export const ActivityJoin = () => (
  <Table
    columns={[
      "ID",
      "Title",
      "Activity Hour",
      "Start Time",
      "End Time",
      "Created At",
      "Action",
    ]}
    data={emptyData}
  />
);

export const BeaconActivity = () => (
  <Table
    columns={[
      "ID",
      "Message",
      "Type",
      "Beacon Status",
      "Map View",
      "Created At",
      "Action",
    ]}
    data={emptyData}
  />
);

export const BeaconActivityJoin = () => (
  <Table
    columns={[
      "ID",
      "Message",
      "Type",
      "Beacon Status",
      "Map View",
      "Created At",
      "Action",
    ]}
    data={emptyData}
  />
);

export const TrailCrush = () => {
  const navigate = useNavigate();
  const trailData = [
    {
      id: 1,
      crushname: "Ananya",
      friendstatus: "Friend",
      crushstatus: "Pending",
      createdat: "2025-01-05",
    },
    {
      id: 2,
      crushname: "Riya",
      friendstatus: "Not Friend",
      crushstatus: "Accepted",
      createdat: "2025-01-10",
    },
    {
      id: 3,
      crushname: "Sneha",
      friendstatus: "Friend",
      crushstatus: "Rejected",
      createdat: "2025-01-15",
    },
  ];

  return (

    <Table
      columns={[
        "ID",
        "Crush Name",
        "Friend Status",
        "Crush Status",
        "Created At",
        "Action",
      ]}
      data={trailData}
      renderAction={(row) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="view"
            startIcon={<IoIosEye size={18} />}
            onClick={() => navigate(`/users/`)}
          />
        </div>
      )}
    />
  )
};