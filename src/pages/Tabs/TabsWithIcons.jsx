import { useState } from "react";

export default function TabsWithIcons({
  tabs,
  defaultTab,
}) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-2 overflow-x-auto scrollbar-thin">
          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 border-b-2 px-3 py-2 text-sm font-medium transition
                  ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-500"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
              >
                {/* <Icon /> */}
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="p-2">
        {tabs.find((t) => t.id === activeTab)?.content}
      </div>
    </div>
  );
}

/* ================= ICONS ================= */
