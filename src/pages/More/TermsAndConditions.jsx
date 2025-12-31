import React, { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import CKTextEditor from "../../components/editor/CKTextEditor";
import Button from "../../components/ui/button/Button";
import { toast } from "react-toastify";

/* ---------- INITIAL TERMS CONTENT ---------- */
const initialTermsContent = `
<h2>Day Hike Terms of Service</h2>
<p><strong>Last Updated:</strong> November 5, 2024</p>

<h3>1. Introduction</h3>
<p>
Welcome to Day Hike! These Terms of Service ("Terms") govern your use of the
Day Hike mobile application, website, and related services.
</p>

<h3>2. User Eligibility</h3>
<p>
You must be at least 18 years old to use the App.
</p>

<h3>3. Account Registration</h3>
<p>
You are responsible for maintaining the confidentiality of your account.
</p>

<h3>4. User Conduct</h3>
<ul>
  <li>Do not violate any laws</li>
  <li>Do not impersonate others</li>
  <li>Do not post objectionable content</li>
</ul>

<h3>5. Content Ownership</h3>
<p>
All content is owned by Day Hike or its licensors.
</p>

<p>... (continue full terms here)</p>
`;
export default function TermsAndConditions() {
  const [content, setContent] = useState(initialTermsContent);

  const handleSave = async () => {
    try {
      await fetch("/api/terms", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: content }),
      });

      toast.success("Terms & Conditions updated successfully");
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Terms & Conditions" />

      <div className="">
        <CKTextEditor
          value={content}
          onChange={setContent}
          placeholder="Write Terms & Conditions here..."
        />

        <div className="mt-6 flex justify-end">
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </>
  );
}
