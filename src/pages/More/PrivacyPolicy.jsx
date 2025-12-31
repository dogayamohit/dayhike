import React, { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import CKTextEditor from "../../components/editor/CKTextEditor";
import Button from "../../components/ui/button/Button";
import { toast } from "react-toastify";

/* ---------- INITIAL PRIVACY POLICY ---------- */
const initialPrivacyContent = `
<h2>Privacy Policy</h2>
<p><strong>Last Updated:</strong> November 5, 2024</p>

<h3>1. Introduction</h3>
<p>
Your privacy is important to us. This Privacy Policy explains how we collect,
use, and protect your information.
</p>

<h3>2. Information We Collect</h3>
<ul>
  <li>Personal information</li>
  <li>Usage data</li>
  <li>Device information</li>
</ul>

<h3>3. How We Use Information</h3>
<p>
We use your information to improve our services and user experience.
</p>

<h3>4. Data Security</h3>
<p>
We implement reasonable security measures to protect your data.
</p>

<p>... (continue full privacy policy)</p>
`;

export default function PrivacyPolicy() {
  const [content, setContent] = useState(initialPrivacyContent);

  const handleSave = () => {
    console.log("PRIVACY POLICY HTML:", content);

    // 🔹 Send content to API
    toast.success("Privacy Policy updated successfully");
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Privacy Policy" />

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        {/* SINGLE EDITOR */}
        <CKTextEditor
          value={content}
          onChange={setContent}
          placeholder="Write Privacy Policy here..."
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
