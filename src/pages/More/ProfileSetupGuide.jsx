import React, { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import CKTextEditor from "../../components/editor/CKTextEditor";
import Button from "../../components/ui/button/Button";
import { toast } from "react-toastify";

/* ---------- INITIAL GUIDE CONTENT ---------- */
const initialGuideContent = `
<h2>Profile Setup Guide</h2>
<p>
Follow these steps to complete your profile and get the best experience.
</p>

<h3>Step 1: Add Profile Photo</h3>
<p>
Upload a clear photo so other users can recognize you.
</p>

<h3>Step 2: Complete Personal Details</h3>
<p>
Fill in your name, bio, and location accurately.
</p>

<h3>Step 3: Interests & Preferences</h3>
<p>
Select your interests to get better recommendations.
</p>

<h3>Step 4: Verify Account</h3>
<p>
Verify your email or phone number to secure your account.
</p>

<p>... (continue full guide)</p>
`;

export default function ProfileSetupGuide() {
  const [content, setContent] = useState(initialGuideContent);

  const handleSave = () => {
    console.log("PROFILE GUIDE HTML:", content);

    // 🔹 Send content to API
    toast.success("Profile Setup Guide updated successfully");
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Profile Setup Guide" />

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        {/* SINGLE EDITOR */}
        <CKTextEditor
          value={content}
          onChange={setContent}
          placeholder="Write Profile Setup Guide here..."
        />

        {/* ACTION */}
        <div className="mt-6 flex justify-end">
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </>
  );
}
