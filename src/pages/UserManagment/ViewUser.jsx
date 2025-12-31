import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import TabsWithIcons from "../Tabs/TabsWithIcons";
import { initialData } from "./UsersTable";
import { userTabs } from "./UserTabs";



const userMetrics = [
    {
        name: "Activity Created",
        value: "0",
        gradient: "from-green-200 to-white",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                className="h-6 w-6 text-green-600">
                <path d="M12 5v14M5 12h14" />
            </svg>
        ),
    },
    {
        name: "Activity Join",
        value: "0",
        gradient: "from-blue-200 to-white",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                className="h-6 w-6 text-blue-600">
                <circle cx="12" cy="12" r="3" />
                <path d="M19 12h3M2 12h3" />
            </svg>
        ),
    },
    {
        name: "Beacon Activity",
        value: "0",
        gradient: "from-purple-200 to-white",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                className="h-6 w-6 text-purple-600">
                <circle cx="12" cy="12" r="2" />
                <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
            </svg>
        ),
    },
    {
        name: "Beacon Activity Join",
        value: "0",
        gradient: "from-indigo-200 to-white",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                className="h-6 w-6 text-indigo-600">
                <path d="M16 16l4-4M20 16v-4h-4" />
            </svg>
        ),
    },
    {
        name: "Created Group",
        value: "0",
        gradient: "from-orange-200 to-white",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                className="h-6 w-6 text-orange-600">
                <circle cx="8" cy="8" r="3" />
                <path d="M2 20a6 6 0 0 1 12 0" />
            </svg>
        ),
    },
    {
        name: "Group Join",
        value: "0",
        gradient: "from-teal-200 to-white",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                className="h-6 w-6 text-teal-600">
                <path d="M12 5v14M5 12h14" />
            </svg>
        ),
    },
    {
        name: "Trail Crush",
        value: "1",
        gradient: "from-pink-200 to-white",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                className="h-6 w-6 text-pink-600">
                <path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.65-7 10-7 10z" />
            </svg>
        ),
    },
];


export default function ViewUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const selectedUser = initialData.find(
            (u) => Number(u.id) === Number(id)
        );

        if (selectedUser) {
            setUser({
                ...selectedUser,
                dob: "2001-01-01",
                gender: "Male",
                zodiac: "Capricorn",
                relationshipStatus: "Single",
                homeTown: "Indore, MP, 452016",
                profileVisibility: "Public",
                postVisibility: "Public",
                about: "Testing bio content here",
                dobVisibility: "On",
            });
        } else {
            navigate("/users");
        }
    }, [id, navigate]);

    if (!user) return <div>Loading...</div>;

    return (
        <>
            <PageBreadcrumb pageTitle="View User" />
            {/* ACTIONS */}
            {/* <div className="mt-5 mb-5 flex justify-end gap-4">
          <Button variant="outline" onClick={() => navigate("/users")}>
            Back
          </Button>
          <Button onClick={() => navigate(`/users/edit/${user.id}`)}>
            Edit User
          </Button>
        </div> */}

            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm w-full mx-auto
                    max-w-[calc(100vw-var(--sidebar-space))]
                    transition-all duration-300">
                {/* HEADER */}
                <div className="mb-10 flex flex-col sm:flex-row items-center gap-5">
                    <img
                        src={user.image}
                        alt={user.name}
                        className="h-40 w-40 rounded-full object-cover border"
                    />
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">
                            {user.name}
                        </h2>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                </div>

                {/* PERSONAL INFO */}
                <Section title="Personal Information">
                    <Grid>
                        <Item label="User ID" value={user.userId} />
                        <Item label="Username" value={user.username} />
                        <Item label="Mobile" value={user.mobile} />
                        <Item label="Date of Birth" value={user.dob} />
                        <Item label="Gender" value={user.gender} />
                        <Item label="Zodiac" value={user.zodiac} />
                        <Item label="Relationship Status" value={user.relationshipStatus} />
                        <Item label="Home Town" value={user.homeTown} />
                    </Grid>
                </Section>

                {/* ACCOUNT INFO */}
                <Section title="Account Information">
                    <Grid>
                        <Item label="Status" value={user.status} />
                        <Item label="Created At" value={user.createdAt} />
                    </Grid>
                </Section>

                {/* VISIBILITY */}
                <Section title="Privacy & Visibility">
                    <Grid>
                        <Item label="Profile Visibility" value={user.profileVisibility} />
                        <Item label="Post Visibility" value={user.postVisibility} />
                        <Item label="DOB Visibility" value={user.dobVisibility} />
                    </Grid>
                </Section>

                {/* ABOUT */}
                <Section title="About">
                    <p className="text-sm font-medium text-gray-800">
                        {user.about || "-"}
                    </p>
                </Section>

                {/* USER ACTIVITY METRICS */}
                <div className="mt-12">
                    <h4 className="mb-6 text-lg font-semibold text-gray-800">
                        User Activity Summary
                    </h4>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {userMetrics.map((item, index) => (
                            <div
                                key={index}
                                className={`flex items-center gap-5 rounded-2xl border border-gray-200
                                            bg-gradient-to-br ${item.gradient} p-6 transition hover:shadow-md`}
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/70">
                                    {item.icon}
                                </div>

                                <div>
                                    <h4 className="text-2xl font-bold text-gray-800">
                                        {item.value}
                                    </h4>
                                    <span className="text-sm text-gray-500">
                                        {item.name}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-12 overflow-x-auto max-w-[calc(100vw-20px)]">

                    <TabsWithIcons
                        tabs={userTabs}
                        defaultTab="subscriptions"
                    />
                </div>
            </div>
        </>
    );
}

/* ===================== REUSABLE UI ===================== */

const Section = ({ title, children }) => (
    <div className="mb-10">
        <h4 className="mb-6 text-lg font-semibold text-gray-800">
            {title}
        </h4>
        {children}
    </div>
);

const Grid = ({ children }) => (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-7 2xl:gap-x-32">
        {children}
    </div>
);

const Item = ({ label, value }) => (
    <div>
        <p className="mb-1 text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-800">
            {value || "-"}
        </p>
    </div>
);


