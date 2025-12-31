import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import MultiSelect from "../../components/form/MultiSelect";

// Initial form structure
const initialGroupData = {
  title: "",
  visibility: "Public",
  bio: "",
  member: "",
  moderators: [],
  activityTypes: [],
  address: "",
  latitude: "",
  longitude: "",
  state: "",
  city: "",
  image: null,
};

// Options
const moderatorOptions = [
  { label: "Dani Perry", value: "Dani Perry" },
  { label: "Day Hike", value: "Day Hike" },
  { label: "Evan Birenbaum", value: "Evan Birenbaum" },
  { label: "Tyler Ahles", value: "Tyler Ahles" },
  { label: "Brad", value: "Brad" },
];

const activityTypeOptions = [
  { label: "Boating", value: "boating" },
  { label: "Camping", value: "camping" },
];

export default function AddGroup() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialGroupData);
  const [imagePreview, setImagePreview] = useState(null);

  // Cleanup image preview
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMultiSelect = (name, values) => {
    setForm((prev) => ({
      ...prev,
      [name]: values,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    const previewUrl = URL.createObjectURL(file);

    setForm((prev) => ({
      ...prev,
      image: file,
    }));

    setImagePreview(previewUrl);
  };

  const handleSubmit = () => {
    const payload = new FormData();

    Object.keys(form).forEach((key) => {
      payload.append(key, form[key]);
    });

    console.log("Create Group Payload:", Object.fromEntries(payload));

    toast.success("Group created successfully");
    navigate("/groups");
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Add Group" />

      <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Group Title</Label>
            <Input name="title" value={form.title} onChange={handleChange} />
          </div>

          <div>
            <Label>Visibility</Label>
            <Select
              name="visibility"
              value={form.visibility}
              onChange={handleChange}
              options={[
                { label: "Public", value: "Public" },
                { label: "Private", value: "Private" },
              ]}
            />
          </div>

          {/* Moderators */}
          <div>
            <MultiSelect
              label="Moderators"
              options={moderatorOptions.map((opt) => ({
                value: opt.value,
                text: opt.label,
              }))}
              value={form.moderators}
              onChange={(values) => handleMultiSelect("moderators", values)}
            />
          </div>


          {/* Activity Type */}
          <div>
            <MultiSelect
              label="Activity Type"
              options={activityTypeOptions.map((opt) => ({
                value: opt.value,
                text: opt.label,
              }))}
              value={form.activityTypes}
              onChange={(values) => handleMultiSelect("activityTypes", values)}
            />
          </div>

        </div>

        {/* Bio */}
        <div>
          <Label>Bio</Label>
          <textarea
            name="bio"
            rows={4}
            value={form.bio}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3"
          />
        </div>

        {/* Members */}
        <div>
          <Label>Members (optional)</Label>
          <Input name="member" value={form.member} onChange={handleChange} />
        </div>

        {/* Address */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label>Address</Label>
            <Input name="address" value={form.address} onChange={handleChange} />
          </div>

          <div>
            <Label>Latitude</Label>
            <Input name="latitude" value={form.latitude} onChange={handleChange} />
          </div>

          <div>
            <Label>Longitude</Label>
            <Input name="longitude" value={form.longitude} onChange={handleChange} />
          </div>

          <div>
            <Label>State</Label>
            <Input name="state" value={form.state} onChange={handleChange} />
          </div>

          <div>
            <Label>City</Label>
            <Input name="city" value={form.city} onChange={handleChange} />
          </div>
        </div>

        {/* Image */}
        <div>
          <Label>Group Image</Label>
          <Input type="file" accept="image/*" onChange={handleImageChange} />

          {imagePreview && (
            <div className="mt-3">
              <Label>Preview</Label>
              <img
                src={imagePreview}
                alt="Preview"
                className="h-32 w-32 rounded-lg object-cover border border-gray-200"
              />
            </div>
          )}
        </div>

        {/* Submit */}
        <div>
          <Button variant="primary" onClick={handleSubmit}>
            Create Group
          </Button>
        </div>
      </div>
    </>
  );
}
