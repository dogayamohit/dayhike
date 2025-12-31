import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Dropdown from "../../components/ui/dropdown/Dropdown";
import DropdownItem from "../../components/ui/dropdown/DropdownItem";

const DropdownWithIcon = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isOpen) {
            closeDropdown();
        } else {
            setIsOpen(true);
        }
    };


    const closeDropdown = () => setIsOpen(false);

    const ProfileIcon = () => (
        <svg
            className="size-5 stroke-current"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 21a8 8 0 0 0-16 0" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
    const SettingsIcon = () => (
        <svg
            className="size-5 stroke-current"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c0 .66.39 1.26 1 1.51H21a2 2 0 1 1 0 4h-.09c-.66 0-1.26.39-1.51 1Z" />
        </svg>
    );
    const FileIcon = () => (
        <svg
            className="size-5 stroke-current"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
        </svg>
    );
    const SupportIcon = () => (
        <svg
            className="size-5 stroke-current"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* Headband */}
            <path d="M4 12a8 8 0 0 1 16 0" />

            {/* Left ear */}
            <rect x="3" y="12" width="4" height="6" rx="2" />

            {/* Right ear */}
            <rect x="17" y="12" width="4" height="6" rx="2" />

            {/* Mic */}
            <path d="M12 18v2" />
            <path d="M9 20h6" />
        </svg>
    );
    const DeleteIcon = () => (
        <svg
            className="size-5 stroke-current"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 6h18" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
        </svg>
    );

    return (
        <>
            <PageBreadcrumb pageTitle="Dropdown" />

            <div className="rounded-2xl border border-gray-200 bg-white">
                {/* Header */}
                <div className="px-6 py-5">
                    <h3 className="text-base font-medium text-gray-800">
                        Dropdown with Icon & Divider
                    </h3>
                </div>

                {/* Content */}
                <div className="border-t border-gray-100 p-6">
                    <div className="relative inline-block">
                        {/* Button */}
                        <button
                            onClick={toggleDropdown}
                            className="dropdown-toggle inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-3 text-sm font-medium text-white hover:bg-brand-600"
                        >

                            Options
                            <svg
                                className={`stroke-current transition-transform ${isOpen ? "rotate-180" : ""
                                    }`}
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                            >
                                <path
                                    d="M4.792 7.396L10 12.604L15.209 7.396"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>

                        {/* Dropdown */}
                        <Dropdown
                            isOpen={isOpen}
                            onClose={closeDropdown}
                            className="mt-2 w-[260px] left-0 rounded-2xl border border-gray-200 bg-white p-2 shadow-lg"
                        >
                            <DropdownItem
                                onItemClick={closeDropdown}
                                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                            >
                                <ProfileIcon />
                                Edit Profile
                            </DropdownItem>

                            <DropdownItem
                                onItemClick={closeDropdown}
                                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                            >
                                <SettingsIcon />
                                Settings
                            </DropdownItem>

                            {/* Divider */}
                            <span className="my-1.5 block h-px w-full bg-gray-200" />

                            <DropdownItem
                                onItemClick={closeDropdown}
                                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                            >
                                <FileIcon />
                                Files
                            </DropdownItem>

                            <DropdownItem
                                onItemClick={closeDropdown}
                                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                            >
                                <SupportIcon />
                                Support
                            </DropdownItem>

                            {/* Divider */}
                            <span className="my-1.5 block h-px w-full bg-gray-200" />

                            <DropdownItem
                                onItemClick={closeDropdown}
                                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50"
                            >
                                <DeleteIcon />
                                Delete
                            </DropdownItem>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DropdownWithIcon;
