import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Button from "../../components/ui/button/Button";
import { CiEdit } from "react-icons/ci";
import { IoArrowBack } from "react-icons/io5";
import { initialActivityData } from "./ActivitiesTable";
import { ActivityParticipants } from "./Table";


export default function ActivityView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const activity = initialActivityData.find(
    (item) => Number(item.id) === Number(id)
  );

  if (!activity) {
    return (
      <div className="p-6 text-center text-red-500">
        Activity not found
      </div>
    );
  }

  return (
    <>
      <PageBreadcrumb pageTitle="View Activity" />

      <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 md:p-6 lg:p-8 shadow-sm max-w-[calc(100vw-20px)]">

        {/* <div className="mb-4 flex gap-3">
              <Button
                variant="outline"
                size="sm"
                startIcon={<IoArrowBack />}
                onClick={() => navigate(-1)}
              >
                Back
              </Button>

              <Button
                variant="edit"
                size="sm"
                startIcon={<CiEdit />}
                onClick={() =>
                  navigate(`/activities/edit/${activity.id}`)
                }
              >
                Edit Activity
              </Button>
            </div> */}
        {/* HEADER */}
        <div className="mb-10 flex flex-col md:flex-row items-center md:items-center gap-6">

          <img
            src={activity.image}
            alt={activity.title}
            className="h-40 w-40 rounded-2xl object-cover border"
          />

          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-900">
              {activity.title}
            </h2>
            <p className="text-sm text-gray-500">
              Activity ID: {activity.activityId}
            </p>

            
          </div>
        </div>

        {/* BASIC INFO */}
        <Section title="Basic Information">
          <Grid>
            <Item label="Creator Name" value={activity.creatorName} />
            <Item label="Activity Type" value={activity.activityType} />
            <Item label="Difficulty Level" value={activity.difficulty} />
            <Item label="People Limit" value={activity.peopleLimit} />
            <Item label="Select Group" value={activity.selectGroup} />
            <Item label="Activity Hours" value={`${activity.activityHours} hrs`} />
            <Item label="Created At" value={activity.createdAt} />
          </Grid>
        </Section>

        {/* SCHEDULE */}
        <Section title="Schedule">
          <Grid>
            <Item label="Start Date" value={activity.startDate} />
            <Item label="End Date" value={activity.endDate} />
            <Item label="Start Time" value={activity.startTime} />
            <Item label="End Time" value={activity.endTime} />
          </Grid>
        </Section>

        {/* LOCATION */}
        <Section title="Location Information">
          <Grid>
            <Item label="Latitude" value={activity.latitude} />
            <Item label="Longitude" value={activity.longitude} />
          </Grid>

          <div className="mt-6">
            <p className="mb-1 text-xs text-gray-500">Address</p>
            <div className="rounded-lg border border-gray-50 p-4 text-sm text-gray-800">
              {activity.address}
            </div>
          </div>
        </Section>


        <Section title="ActivityParticipants">
          <ActivityParticipants />
        </Section>
      </div>
    </>
  );
}


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


