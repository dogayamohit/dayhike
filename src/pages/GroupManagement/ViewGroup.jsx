import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

const groupData = [
  {
    id: 181,
    image: "https://i.pravatar.cc/40?img=1",
    title: "Testing",
    bio: "Hello",
    visibility: "Public",
    state: "Madhya Pradesh",
    city: "Indore",
    address: "Indore, MP, 452016",
    groupInterest: "Adaptive sports",
    members: [
      {
        id: 1,
        image: "https://i.pravatar.cc/40?img=1",
        name: "Tasmiya",
        username: "tasmiya",
        email: "tasmiya@mailinator.com",
        mobile: "(91)9399045960",
        createdAt: "2024-10-22",
        role: "Group admin",
      },
      // Add more members if needed
    ],
  },
];

export default function ViewGroup() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null); // null initially

  useEffect(() => {
    const selectedGroup = groupData.find((g) => Number(g.id) === Number(id));

    if (!selectedGroup) {
      navigate("/groups", { replace: true });
      return;
    }
    setGroup(selectedGroup);
  }, [id, navigate]);

  if (!group) return <div>Loading...</div>;



  return (
    <>
      <PageBreadcrumb pageTitle="View Group" />

      <div className="
          rounded-2xl border border-gray-200 
          bg-white p-8 shadow-sm 
          w-full mx-auto max-w-[calc(100vw-var(--sidebar-space))] 
          transition-all duration-300"
      >
        {/* HEADER */}
        <div className="mb-10 flex items-center gap-5">
          <div className="h-40 w-40 rounded-full border bg-gray-100 flex items-center justify-center">
            {/* Placeholder for group image */}
            <img
              src={group.image}
              className="h-40 w-40 rounded-full object-cover border"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{group.title}</h2>
            <p className="text-sm text-gray-500">{group.bio}</p>
          </div>
        </div>

        {/* GROUP INFO */}
        <Section title="Group Information">
          <Grid>
            <Item label="Title" value={group.title} />
            <Item label="Bio" value={group.bio} />
            <Item label="Visibility" value={group.visibility} />
            <Item label="State" value={group.state} />
            <Item label="City" value={group.city} />
            <Item label="Group ID" value={group.id} />
            <Item label="Address" value={group.address} />
            <Item label="Group Interest" value={group.groupInterest} />
          </Grid>
        </Section>

        {/* GROUP MEMBERS TABLE */}
        <Section title="Group Members">
          <div className="overflow-x-auto rounded-xl">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200 whitespace-nowrap">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    ID
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Image
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Username
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Mobile Number
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Created At
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {group.members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-700">{member.id}</td>
                    <td className="px-4 py-2">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                          N/A
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">{member.name}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{member.username}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{member.email}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{member.mobile}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{member.createdAt}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{member.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </div>
    </>
  );
}

/* ===================== REUSABLE UI ===================== */
const Section = ({ title, children }) => (
  <div className="mb-10">
    <h4 className="mb-6 text-lg font-semibold text-gray-800">{title}</h4>
    {children}
  </div>
);

const Grid = ({ children }) => (
  <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-7 2xl:gap-x-32">{children}</div>
);

const Item = ({ label, value }) => (
  <div>
    <p className="mb-1 text-xs text-gray-500">{label}</p>
    <p className="text-sm font-medium text-gray-800">{value || "-"}</p>
  </div>
);
