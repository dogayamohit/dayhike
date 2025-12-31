import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import Select from "../../components/form/Select";
import MultiSelect from "../../components/form/MultiSelect";

/* ---------------- INITIAL FORM ---------------- */
const initialModalData = {
  userSegmentation: "",
  activityType: [],
  groups: [],
  address: "",
  description: "",
  relationshipStatus: "",
  radius: 50,
  expirationDate: "",
  allUsers: [],
  modalStartDate: "",
  frequencyCount: 0,
  actionButtons: [{ label: "", url: "" }],
  videoImages: [],
  imagePreview: null,
};

const activityTypeOptions = [
  "Hiking", "Biking", "Yoga", "Running", "Skiing/Snowboarding", "Ski Touring", "Snowmobiling",
  "Mountain Biking", "Road Biking", "Gravel"
];

const groupOptions = ["Jackson Hiking Group", "Jackson Hole Ski"];

const allUserOptions = ["Ahles", "Evan Birenbaum", "Day Hike", "Dani Perry"];

export default function EditModal() {
  const navigate = useNavigate();
  const { modalId } = useParams();
  const [form, setForm] = useState(initialModalData);
  const [imagePreview, setImagePreview] = useState(null);

  /* ---------------- LOAD EXISTING DATA ---------------- */
  useEffect(() => {
    // Replace with real API call
    const modalData = {
      userSegmentation: "poorvi test",
      activityType: ["Hiking", "Biking"],
      groups: ["Jackson Hiking Group"],
      address: "Onam Plaza, AB Road, near Bapu ki kootiya, Near Industry House, Old Palasia, Indore, Madhya Pradesh, India",
      description: "testing",
      relationshipStatus: "",
      radius: 50,
      expirationDate: "2025-12-02",
      allUsers: ["Ahles", "Dani Perry"],
      modalStartDate: "2025-12-02",
      frequencyCount: 10,
      actionButtons: [{ label: "test button", url: "https://work.mobidudes.in/TM/stayezy/#/" }],
      videoImages: [],
      imagePreview: null,
    };
    setForm(modalData);
    setImagePreview(null);
  }, [modalId]);

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (name, values) => {
    setForm((prev) => ({ ...prev, [name]: values }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, videoImages: [file] }));
    setImagePreview(previewUrl);
  };

  const handleSubmit = () => {
    // Prepare payload for backend
    const payload = { ...form };
    console.log("Updated Modal Payload:", payload);

    toast.success("Modal updated successfully");
    navigate("/modals");
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Edit Modal" />

      <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-6">
        {/* User Segmentation */}
        <div>
          <Label>User Segmentation and Targeting</Label>
          <Input name="userSegmentation" value={form.userSegmentation} onChange={handleChange} />
        </div>

        {/* Activity Type & Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <MultiSelect
              label="Activity Type"
              options={activityTypeOptions.map((val) => ({
                value: val,
                text: val,
              }))}
              value={form.activityType}
              onChange={(values) => handleMultiSelect("activityType", values)}
            />
          </div>

          <div>
            <MultiSelect
              label="Groups"
              options={groupOptions.map((val) => ({
                value: val,
                text: val,
              }))}
              value={form.groups}
              onChange={(values) => handleMultiSelect("groups", values)}
            />
          </div>
        </div>


        {/* Address & Description */}
        <div>
          <Label>Address</Label>
          <Input name="address" value={form.address} onChange={handleChange} />
        </div>

        <div>
          <Label>Description</Label>
          <textarea
            name="description"
            rows={4}
            value={form.description}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3"
          />
        </div>

        {/* Radius & Expiration */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label>Radius</Label>
            <Input type="number" name="radius" value={form.radius} onChange={handleChange} />
          </div>

          <div>
            <Label>Expiration Date</Label>
            <Input type="date" name="expirationDate" value={form.expirationDate} onChange={handleChange} />
          </div>

          <div>
            <MultiSelect
              label="All Users"
              options={allUserOptions.map((val) => ({
                value: val,
                text: val,
              }))}
              value={form.allUsers}
              onChange={(values) => handleMultiSelect("allUsers", values)}
            />
          </div>

        </div>

        {/* Modal Scheduling & Frequency */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Start Date</Label>
            <Input type="date" name="modalStartDate" value={form.modalStartDate} onChange={handleChange} />
          </div>

          <div>
            <Label>Frequency Count</Label>
            <Input type="number" name="frequencyCount" value={form.frequencyCount} onChange={handleChange} />
          </div>
        </div>

        {/* Action Buttons */}
        <div>
          <Label>Action Buttons</Label>
          {form.actionButtons.map((btn, idx) => (
            <div key={idx} className="flex gap-3 mb-2">
              <Input
                placeholder="Label"
                value={btn.label}
                onChange={(e) => {
                  const newBtns = [...form.actionButtons];
                  newBtns[idx].label = e.target.value;
                  setForm((prev) => ({ ...prev, actionButtons: newBtns }));
                }}
              />
              <Input
                placeholder="URL"
                value={btn.url}
                onChange={(e) => {
                  const newBtns = [...form.actionButtons];
                  newBtns[idx].url = e.target.value;
                  setForm((prev) => ({ ...prev, actionButtons: newBtns }));
                }}
              />
            </div>
          ))}
        </div>

        {/* Video/Image Upload */}
        <div>
          <Label>Video / Images</Label>
          <Input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <div className="mt-3">
              <Label>Preview</Label>
              <img src={imagePreview} alt="Preview" className="h-32 w-32 object-cover rounded-lg border border-gray-200" />
            </div>
          )}
        </div>

        {/* Submit */}
        <div>
          <Button variant="primary" onClick={handleSubmit}>
            Update Modal
          </Button>
        </div>
      </div>
    </>
  );
}
