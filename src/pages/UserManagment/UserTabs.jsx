import {
  PurchasedSubscriptions,
  CreatedGroup,
  GroupJoin,
  ActivityCreated,
  ActivityJoin,
  BeaconActivity,
  BeaconActivityJoin,
  TrailCrush,
} from "./Table";

import {
  SubscriptionIcon,
  CreatedGroupIcon,
  GroupJoinIcon,
  ActivityCreatedIcon,
  ActivityJoinIcon,
  BeaconActivityIcon,
  BeaconJoinIcon,
  HeartIcon,
} from "./UserTabIcons";
// export const userTabs = [
//   {
//     id: "subscriptions",
//     label: "Subscriptions",
//     icon: OverviewIcon,
//     content: <PurchasedSubscriptions />,
//   },
//   {
//     id: "created-group",
//     label: "Created Group",
//     icon: CustomersIcon,
//     content: <CreatedGroup />,
//   },
//   {
//     id: "group-join",
//     label: "Group Join",
//     icon: CustomersIcon,
//     content: <GroupJoin />,
//   },
//   {
//     id: "activity-created",
//     label: "Activity Created",
//     icon: AnalyticsIcon,
//     content: <ActivityCreated />,
//   },
//   {
//     id: "activity-join",
//     label: "Activity Join",
//     icon: AnalyticsIcon,
//     content: <ActivityJoin />,
//   },
//   {
//     id: "beacon-activity",
//     label: "Beacon Activity",
//     icon: NotificationIcon,
//     content: <BeaconActivity />,
//   },
//   {
//     id: "beacon-activity-join",
//     label: "Beacon Join",
//     icon: NotificationIcon,
//     content: <BeaconActivityJoin />,
//   },
//   {
//     id: "trail-crush",
//     label: "Trail Crush",
//     icon: NotificationIcon,
//     content: <TrailCrush />,
//   },
// ];


export const userTabs = [
  {
    id: "subscriptions",
    label: "Subscriptions",
    icon: SubscriptionIcon,
    content: <PurchasedSubscriptions />,
  },
  {
    id: "created-group",
    label: "Created Group",
    icon: CreatedGroupIcon,
    content: <CreatedGroup />,
  },
  {
    id: "group-join",
    label: "Group Join",
    icon: GroupJoinIcon,
    content: <GroupJoin />,
  },
  {
    id: "activity-created",
    label: "Activity Created",
    icon: ActivityCreatedIcon,
    content: <ActivityCreated />,
  },
  {
    id: "activity-join",
    label: "Activity Join",
    icon: ActivityJoinIcon,
    content: <ActivityJoin />,
  },
  {
    id: "beacon-activity",
    label: "Beacon Activity",
    icon: BeaconActivityIcon,
    content: <BeaconActivity />,
  },
  {
    id: "beacon-activity-join",
    label: "Beacon Join",
    icon: BeaconJoinIcon,
    content: <BeaconActivityJoin />,
  },
  {
    id: "trail-crush",
    label: "Trail Crush",
    icon: HeartIcon,
    content: <TrailCrush />,
  },
];