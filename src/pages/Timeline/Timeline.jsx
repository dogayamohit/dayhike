import { ChatIcon, UserIcon } from "../../icons";

const timelineData = [
  { id: 1, user: "Tasmiya", action: "added comment on user activity", content: "Test2", time: "1 week ago", type: "comment" },
  { id: 2, user: "Tasmiya", action: "", content: "Tasmiya Test2", time: "1 week ago", type: "activity" },
  { id: 3, user: "Tasmiya", action: "added comment on user activity", content: "Test", time: "1 week ago", type: "comment" },
  { id: 4, user: "Tasmiya", action: "", content: "Tasmiya Test", time: "1 week ago", type: "activity" },
  { id: 5, user: "Shubhi", action: "created a new Beacon", content: "", time: "1 week ago", type: "activity" },
  { id: 6, user: "Shubhi", action: "created a new Beacon", content: "", time: "1 week ago", type: "activity" },
  { id: 7, user: "Shubhi", action: "created a new Beacon", content: "", time: "1 week ago", type: "activity" },
  { id: 8, user: "Tasmiya", action: "created a new Activity", content: "", time: "1 week ago", type: "activity" },
  { id: 9, user: "Sachin", action: "created a new New_user", content: "", time: "1 week ago", type: "activity" },
  { id: 10, user: "Tasmiya", action: "created a new Activity", content: "", time: "1 week ago", type: "activity" },
  { id: 11, user: "Tasmiya", action: "created a new Activity", content: "", time: "1 week ago", type: "activity" },
  { id: 12, user: "Abhi", action: "created a new New_user", content: "", time: "2 weeks ago", type: "activity" },
  { id: 13, user: "Tasmiya", action: "created a new Activity", content: "", time: "2 weeks ago", type: "activity" },
];

const Timeline = () => {
  return (
    <div className="max-w p-4">
      <h2 className="text-xl font-bold mb-6">Timeline</h2>
      <div className="relative border-l border-gray-200">
        {timelineData.map((item) => (
          <div key={item.id} className="mb-8 ml-6">
            <span
              className={`absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full ${
                item.type === "comment" ? "bg-blue-500 text-white" : "bg-orange-300 text-gray-700"
              }`}
            >
              {item.type === "comment" ? <ChatIcon /> : <UserIcon />}
            </span>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">{item.time}</p>
            </div>
            <div className="mt-1 p-4 bg-white rounded-lg shadow border border-gray-100">
              <p className="text-sm">
                <span className="font-bold text-blue-500">{item.user}</span>{" "}
                {item.action && <span className="font-semibold text-gray-700">{item.action}</span>}
              </p>
              {item.content && <p className="mt-1 text-gray-700">{item.content}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;