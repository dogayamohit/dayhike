import { useNavigate } from "react-router-dom";

const metrics = [
    {
        name: "All Users",
        value: "466",
        path: "/users",
        gradient: "from-purple-200 to-white",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-purple-600"
            >
                <circle cx="12" cy="8" r="3" />
                <path d="M6 20v-1a6 6 0 0 1 12 0v1" />
                <circle cx="5" cy="9" r="2" />
                <path d="M1 20v-1a4 4 0 0 1 4-4" />
                <circle cx="19" cy="9" r="2" />
                <path d="M23 20v-1a4 4 0 0 0-4-4" />
            </svg>
        ),
    },
    {
        name: "Reported Incidents",
        value: "6",
        path: "/reports/groups",
        gradient: "from-red-200 to-white",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-red-600"
            >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <circle cx="12" cy="16" r="1" />
            </svg>
        ),
    },
    {
        name: "Activities",
        value: "120",
        path: "/activity/category",
        gradient: "from-green-200 to-white",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-green-600"
            >
                <path d="M3 12h7l2-5 4 10 2-5h3" />
            </svg>
        ),
    },
    {
        name: "Events",
        value: "389",
        path: "/activity/activities",
        gradient: "from-blue-200 to-white",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-blue-600"
            >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="16" y1="2" x2="16" y2="6" />
            </svg>
        ),
    },
    {
        name: "User Beacons",
        value: "0",
        path: "/activity/activities/beacon-activity",
        gradient: "from-gray-200 to-white",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-gray-500"
            >
                <circle cx="12" cy="12" r="2" />
                <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
            </svg>
        ),
    },
    {
        name: "Groups",
        value: "59",
        path: "/groups",
        gradient: "from-indigo-200 to-white",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-indigo-600"
            >
                <circle cx="8" cy="8" r="3" />
                <circle cx="16" cy="8" r="3" />
                <path d="M2 20a6 6 0 0 1 12 0" />
                <path d="M10 20a6 6 0 0 1 12 0" />
            </svg>
        ),
    },
    {
        name: "Posts",
        value: "290",
        path: "/user/posts",
        gradient: "from-orange-200 to-white",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-orange-500"
            >
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <line x1="7" y1="8" x2="17" y2="8" />
                <line x1="7" y1="12" x2="17" y2="12" />
            </svg>
        ),
    },
    {
        name: "Trail Crush",
        value: "102",
        path: "#",
        gradient: "from-pink-200 to-white",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-pink-600"
            >
                <path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.65-7 10-7 10z" />
            </svg>
        ),
    },
];

export default function DashboardMetrics() {
    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((item, index) => (
                <div
                    key={index}
                    onClick={() => navigate(item.path)}
                    className={`flex cursor-pointer items-center gap-5 rounded-2xl border border-gray-200 bg-gradient-to-br ${item.gradient} p-6 transition hover:scale-[1.02] hover:shadow-lg`}
                >
                    {/* Icon */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/70">
                        {item.icon}
                    </div>

                    {/* Text */}
                    <div>
                        <h4 className="text-2xl font-semibold text-gray-800">
                            {item.value}
                        </h4>
                        <span className="text-sm text-gray-500">
                            {item.name}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
