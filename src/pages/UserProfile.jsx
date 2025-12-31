import React from "react";
import PageBreadCrumb from "../components/common/PageBreadCrumb";
import UserMetaCard from "../components/userProfile/UserMetaCard";
import UserInfoCard from "../components/userProfile/UserInfoCard";

export default function UserProfiles() {
  return (
    <>

      <PageBreadCrumb pageTitle="Profile" />

      {/* <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 lg:mb-7">
          Profile
        </h3> */}
        <div className="space-y-6">
          <UserMetaCard />
          <UserInfoCard />
        </div>
      {/* </div> */}
    </>
  );
}
