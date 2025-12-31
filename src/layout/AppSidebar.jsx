import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { LuLayoutGrid } from "react-icons/lu";
import { HiOutlineUserCircle } from "react-icons/hi";
import { FaTimeline, FaHand } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { MdGroup } from "react-icons/md";
import { HiNewspaper } from "react-icons/hi2";
import { RiGalleryLine } from "react-icons/ri";
import { CgMoreO } from "react-icons/cg";
import { TbReport } from "react-icons/tb";
import { CiViewList } from "react-icons/ci";
import { LuCalendarDays } from "react-icons/lu";

import Logo from '/images/logo/dayhike-logo.png'

/* ================= ICON WRAPPER ================= */
const ICON_WRAPPER = "flex items-center justify-center shrink-0";

/* ================= SVG ICONS ================= */
export const ChevronDownIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    width="100%"
    height="100%"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

/* ================= SIDEBAR CONFIG ================= */
export const sidebarConfig = [
  {
    section: "MAIN",
    items: [
      { label: "Dashboard", path: "/", icon: LuLayoutGrid, size: 18 },
      { label: "User Management", path: "/users", icon: HiOutlineUserCircle, size: 20 },
      { label: "Timeline", path: "/timeline", icon: FaTimeline, size: 20 },

      {
        label: "Activity Management",
        icon: FaHand,
        size: 16,
        children: [
          { label: "Activity Categories", path: "/activity/category", size: 16 },
          { label: "Activities", path: "/activity/activities", size: 16 },
          { label: "Beacon Activity", path: "/activity/activities/beacon-activity", size: 16 },
        ],
      },

      {
        label: "Admin Access",
        icon: FaUserTie,
        size: 16,
        children: [
          { label: "Admin Role", path: "/admin/admin-role", size: 16 },
          { label: "Sub Admin", path: "/admin/sub-admins", size: 16 },
        ],
      },

      {
        label: "Place Management",
        icon: AiFillHome,
        size: 18,
        children: [
          { label: "Place Category", path: "/place/category", size: 16 },
          { label: "Places", path: "/places", size: 16 },
        ],
      },

      { label: "Group Management", path: "/groups", icon: MdGroup, size: 20 },

      {
        label: "Other",
        icon: CiViewList,
        size: 20,
        children: [
          { label: "Feedback", path: "/feedback", size: 16 },
          { label: "Partners", path: "/partners", size: 16 },
          { label: "Modals", path: "/modals", size: 16 },
          { label: "Badge Management", path: "/badges", size: 16 },
        ],
      },

      {
        label: "Report",
        icon: TbReport,
        size: 20,
        children: [
          { label: "Group Reports", path: "/reports/groups", size: 16 },
          { label: "Activity Reports", path: "/reports/activities", size: 16 },
          { label: "Profile Reports", path: "/reports/profiles", size: 16 },
          { label: "Post Reports", path: "/reports/posts", size: 16 },
        ],
      },

      { label: "User Post Management", path: "/user/posts", icon: HiNewspaper, size: 20 },
      { label: "Day Hike Gallery", path: "/gallery/day-hikes", icon: RiGalleryLine, size: 20 },

      {
        label: "Subscription Plans",
        icon: LuCalendarDays,
        size: 18,
        children: [
          { label: "Subscription Plan", path: "/subscriptions/plans", size: 16 },
          { label: "Boost Subscription Plan", path: "/subscriptions/boost-plans", size: 16 },
        ],
      },

      {
        label: "More",
        icon: CgMoreO,
        size: 20,
        children: [
          { label: "About Us", path: "/about-us", size: 16 },
          { label: "FAQ", path: "/faq", size: 16 },
          { label: "Terms & Conditions", path: "/terms-conditions", size: 16 },
          { label: "Profile Setup Guide", path: "/profile-setup-guide", size: 16 },
          { label: "Privacy Policy", path: "/privacy-policy", size: 16 },
        ],
      },
    ],
  },
];

/* ================= SIDEBAR ITEM ================= */
function SidebarItem({ item, pathname }) {
  const hasChildren = item.children?.length;
  const isActive = item.path === pathname;
  const Icon = item.icon;
  const iconSize = item.size || 18; // fallback size
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (hasChildren) {
      setOpen(item.children.some(c => c.path === pathname));
    }
  }, [pathname, hasChildren, item.children]);

  /* ---------- PARENT ITEM ---------- */
  if (hasChildren) {
    return (
      <div className="space-y-1">
        <button
          onClick={() => setOpen(!open)}
          className={`group w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition
            ${open
              ? "bg-gray-100 text-gray-900"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className={`${ICON_WRAPPER} text-gray-400 group-hover:text-gray-600`}>
              <Icon size={iconSize} />
            </span>

            <span className="truncate">{item.label}</span>
          </div>

          <span className="w-4 h-4 shrink-0">
            <ChevronDownIcon
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          </span>
        </button>

        {open && (
          <ul className="ml-8 space-y-1 border-l border-gray-300 pl-4">
            {item.children.map(child => {
              const active = pathname === child.path;
              const ChildIcon = child.icon;
              const childSize = child.size || 16;
              return (
                <li key={child.path}>
                  <Link
                    to={child.path}
                    className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition
                      ${active
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                      }`}
                  >
                    {ChildIcon && (
                      <ChildIcon size={childSize} className="flex-shrink-0" />
                    )}
                    <span
                      className={`h-1.5 w-1.5 rounded-full
                        ${active ? "bg-blue-600" : "bg-gray-300"}`}
                    />
                    {child.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }

  /* ---------- SINGLE ITEM ---------- */
  return (
    <Link
      to={item.path}
      className={`group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition
        ${isActive
          ? "bg-blue-50 text-blue-600"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`}
    >
      {isActive && (
        <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r bg-blue-600" />
      )}

      <span
        className={`${ICON_WRAPPER} ${isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"}`}
      >
        <Icon size={iconSize} />
      </span>

      {item.label}
    </Link>
  );
}

/* ================= SIDEBAR ================= */
export default function AppSidebar({ sidebarOpen }) {
  const { pathname } = useLocation();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-65 bg-white border-r border-gray-300
        transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* Logo */}
      <div className="flex h-20 items-center px-6 border-b border-gray-300">
        <img src={Logo} alt="Logo" className="h-16 w-28" />
      </div>

      {/* Menu */}
      <nav className="h-[90vh] overflow-y-auto px-3 py-6 space-y-8 scrollbar-hide">
        {sidebarConfig.map(section => (
          <div key={section.section}>
            <p className="mb-3 px-3 text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
              {section.section}
            </p>

            <div className="space-y-1">
              {section.items.map(item => (
                <SidebarItem key={item.label} item={item} pathname={pathname} />
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
