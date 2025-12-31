import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Dashboard/Home";
import UserProfiles from "./pages/UserProfile";
import UsersTable from "./pages/UserManagment/UsersTable";
import NotFound from "./pages/OtherPage/NotFound";
import EditUser from "./pages/UserManagment/EditUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css'
import ViewUser from "./pages/UserManagment/ViewUser";
import Timeline from "./pages/Timeline/Timeline";
import ActivityCategory from "./pages/ActivityManagement/ActivityCategory";
import ActivitiesTable from "./pages/ActivityManagement/ActivitiesTable";
import ActivityView from "./pages/ActivityManagement/ActivityView";
import BeaconActivityTable from "./pages/ActivityManagement/BeaconActivityTable";
import AdminRolesTable from "./pages/AdminRoles/AdminRolesTable";
import EditAdminRole from "./pages/AdminRoles/EditAdminRole";
import SubAdminTable from "./pages/AdminRoles/SubAdminTable";
import ViewSubAdmin from "./pages/AdminRoles/ViewSubAdmin";
import EditSubAdmin from "./pages/AdminRoles/EditSubAdmin";
import AdminRolePermission from "./pages/AdminRoles/AdminRolePermission";
import AddAdminRole from "./pages/AdminRoles/AddAdminRole";
import AddSubAdmin from "./pages/AdminRoles/AddSubAdmin";
import AddActivityCategory from "./pages/ActivityManagement/AddActivityCategory";
import EditActivityCategory from "./pages/ActivityManagement/EditActivityCategory";
import CreateActivity from "./pages/ActivityManagement/CreateActivity";
import Places from "./pages/PlacesManagement/Places";
import EditPlace from "./pages/PlacesManagement/EditPlace";
import AddPlace from "./pages/PlacesManagement/AddPlace";
import AddPlaceGallery from "./pages/PlacesManagement/AddPlaceGallery";
import PlaceCategory from "./pages/PlacesManagement/PlaceCategory";
import EditPlaceCategory from "./pages/PlacesManagement/EditPlaceCategory";
import AddPlaceCategory from "./pages/PlacesManagement/AddPlaceCategory";
import GroupsTable from "./pages/GroupManagement/GroupsTable";
import ViewGroup from "./pages/GroupManagement/ViewGroup";
import EditGroup from "./pages/GroupManagement/EditGroup";
import AddGroup from "./pages/GroupManagement/AddGroup";
import UserPostsTable from "./pages/UserPostManagement/UserPostTable";
import ViewPost from "./pages/UserPostManagement/ViewPost";
import EditPost from "./pages/UserPostManagement/EditPost";
import AddPost from "./pages/UserPostManagement/AddPost";
import GalleryTable from "./pages/DayHikeGallery/GalleryTable";
import EditGallery from "./pages/DayHikeGallery/EditGallery";
import AddGallery from "./pages/DayHikeGallery/AddGallery";
import SubscriptionTable from "./pages/SubscriptionManagement/SubscriptionTable";
import EditSubscription from "./pages/SubscriptionManagement/EditSubscription";
import BoostSubscriptionTable from "./pages/SubscriptionManagement/BoostSubscriptionTable";
import EditBoostPlan from "./pages/SubscriptionManagement/EditBoostPlan";
import AboutGroup from "./pages/More/About";
import FaqTable from "./pages/More/FaqTable";
import AddFaq from "./pages/More/AddFaq";
import EditFaq from "./pages/More/EditFaq";
import TermsAndConditions from "./pages/More/TermsAndConditions";
import ProfileSetupGuide from "./pages/More/ProfileSetupGuide";
import PrivacyPolicy from "./pages/More/PrivacyPolicy";
import FeedbackTable from "./pages/Other/FeedbackTable";
import Partners from "./pages/Other/Partners";
import EditPartner from "./pages/Other/EditPartner";
import AddPartner from "./pages/Other/AddPartner";
import ModalsTable from "./pages/Other/ModalsTable";
import EditModal from "./pages/Other/EditModal";
import AddModal from "./pages/Other/AddModal";
import BadgesTable from "./pages/Other/BadgesTable";
import EditBadge from "./pages/Other/EditBadge";
import ShowGroupReports from "./pages/Report/ShowGroupReports";
import ShowActivityReports from "./pages/Report/ShowActivityReports";
import ShowProfileReports from "./pages/Report/ShowProfileReports";
import ShowPostReports from "./pages/Report/ShowPostReports";
import SignIn from "./pages/Auth/SignIn";


function App() {
  return (
    <>

      <Routes>
        {/* Dashboard Layout */}
        <Route element={<ProtectedRoute />}>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<UserProfiles />} />


          <Route path="users" element={<UsersTable />} />
          <Route path="users/view/:id" element={<ViewUser />} />
          <Route path="users/edit/:id" element={<EditUser />} />

          <Route path="timeline" element={<Timeline />} />

          <Route path="activity/category" element={<ActivityCategory />} />
          <Route path="activity/category/add" element={<AddActivityCategory />} />
          <Route path="activity/category/edit/:id" element={<EditActivityCategory />} />

          <Route path="activity/activities" element={<ActivitiesTable />} />
          <Route path="activity/activities/view/:id" element={<ActivityView />} />
          <Route path="/activity/activities/create" element={<CreateActivity />} />

          <Route path="activity/activities/beacon-activity" element={<BeaconActivityTable />} />

          <Route path="admin/admin-role" element={<AdminRolesTable />} />
          <Route path="/admin/admin-role/edit/:id" element={<EditAdminRole />} />
          <Route path="/admin/admin-role/permissions/:id" element={<AdminRolePermission />} />
          <Route path="/admin/admin-role/add" element={<AddAdminRole />} />

          <Route path="/admin/sub-admins" element={<SubAdminTable />} />
          <Route path="/admin/sub-admins/view/:id" element={<ViewSubAdmin />} />
          <Route path="/admin/sub-admins/edit/:id" element={<EditSubAdmin />} />
          <Route path="/admin/sub-admins/add" element={<AddSubAdmin />} />

          <Route path="places" element={<Places />} />
          <Route path="places/edit/:id" element={<EditPlace />} />
          <Route path="places/gallery/:id" element={<AddPlaceGallery />} />
          <Route path="places/add" element={<AddPlace />} />

          <Route path="place/category" element={<PlaceCategory />} />
          <Route path="places/category/edit/:id" element={<EditPlaceCategory />} />
          <Route path="places/category/add" element={<AddPlaceCategory />} />

          <Route path="groups" element={<GroupsTable />} />
          <Route path="groups/view/:id" element={<ViewGroup />} />
          <Route path="groups/edit/:id" element={<EditGroup />} />
          <Route path="groups/add" element={<AddGroup />} />

          <Route path="user/posts" element={<UserPostsTable />} />
          <Route path="user/posts/view/:id" element={<ViewPost />} />
          <Route path="user/posts/edit/:id" element={<EditPost />} />
          <Route path="user/posts/add" element={<AddPost />} />

          <Route path="gallery/day-hikes" element={<GalleryTable />} />
          <Route path="gallery/day-hikes/edit/:id" element={<EditGallery />} />
          <Route path="gallery/day-hikes/add" element={<AddGallery />} />

          <Route path="subscriptions/plans/" element={<SubscriptionTable />} />
          <Route path="subscriptions/plans/edit/:id" element={<EditSubscription />} />
          <Route path="subscriptions/boost-plans" element={<BoostSubscriptionTable />} />
          <Route path="subscriptions/boost-plans/edit/:id" element={<EditBoostPlan />} />

          <Route path="about-us" element={<AboutGroup />} />
          <Route path="faq" element={<FaqTable />} />
          <Route path="faq/add" element={<AddFaq />} />
          <Route path="faq/edit/:id" element={<EditFaq />} />
          <Route path="terms-conditions" element={<TermsAndConditions />} />
          <Route path="profile-setup-guide" element={<ProfileSetupGuide />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />

          <Route path="feedback" element={<FeedbackTable />} />
          <Route path="partners" element={<Partners />} />
          <Route path="partners/edit/:id" element={<EditPartner />} />
          <Route path="partners/add" element={<AddPartner />} />

          <Route path="modals" element={<ModalsTable />} />
          <Route path="modals/edit/:id" element={<EditModal />} />
          <Route path="modals/add" element={<AddModal />} />
          <Route path="badges" element={<BadgesTable />} />
          <Route path="badges/edit/:id" element={<EditBadge />} />


          <Route path="reports/groups" element={<ShowGroupReports />} />
          <Route path="reports/activities" element={<ShowActivityReports />} />
          <Route path="reports/profiles" element={<ShowProfileReports />} />
          <Route path="reports/posts" element={<ShowPostReports />} />

          <Route path="*" element={<NotFound />} />
        </Route>
        </Route>

        <Route path="sign-in" element={<SignIn />} />


      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </>


  );
}

export default App;
