import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
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
  "Hiking", "Biking", "Yoga", "Running", "Skiing/Snowboarding", "Ski Touring",
  "Snowmobiling", "Mountain Biking", "Road Biking", "Gravel"
];

const groupOptions = ["Jackson Hiking Group", "Jackson Hole Ski"];
const allUserOptions = ["Ahles", "Evan Birenbaum", "Day Hike", "Dani Perry"];

export default function AddModal() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialModalData);
  const [imagePreview, setImagePreview] = useState(null);

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
    const payload = { ...form };
    console.log("New Modal Payload:", payload);
    toast.success("Modal added successfully");
    navigate("/modals");
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Add Modal" />

      <div className="rounded-2xl border border-gray-200 bg-white p-8 space-y-8 shadow-sm">

        {/* Basic Info Section */}
        <Section title="User Segmentation and Targeting">
          <Grid>
            <Item label="Text">
              <Input name="userSegmentation" value={form.userSegmentation} onChange={handleChange} />
            </Item>

            <Item label="Activity Type">
              <MultiSelect
                options={activityTypeOptions.map((val) => ({
                  value: val,
                  text: val,
                }))}
                value={form.activityType}
                onChange={(values) => handleMultiSelect("activityType", values)}
              />
            </Item>


            <Item label="Groups">
              <MultiSelect
                options={groupOptions.map((val) => ({
                  value: val,
                  text: val,
                }))}
                value={form.groups}
                onChange={(values) => handleMultiSelect("groups", values)}
              />
            </Item>


            <Item label="Address">
              <Input name="address" value={form.address} onChange={handleChange} />
            </Item>

            <Item label="Description">
              <textarea
                name="description"
                rows={3}
                value={form.description}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-2"
              />
            </Item>

            <Item label="Relationship Status">
              <Input name="relationshipStatus" value={form.relationshipStatus} onChange={handleChange} />
            </Item>

            <Item label="Radius">
              <Input type="number" name="radius" value={form.radius} onChange={handleChange} />
            </Item>

            <Item label="Expiration Date">
              <Input type="date" name="expirationDate" value={form.expirationDate} onChange={handleChange} />
            </Item>

            <Item label="All Users">
              <MultiSelect
                options={allUserOptions.map((val) => ({
                  value: val,
                  text: val,
                }))}
                value={form.allUsers}
                onChange={(values) => handleMultiSelect("allUsers", values)}
              />
            </Item>

          </Grid>
        </Section>

        {/* Modal Scheduling Section */}
        <Section title="Modal Scheduling & Frequency">
          <Grid>
            <Item label="Start Date">
              <Input type="date" name="modalStartDate" value={form.modalStartDate} onChange={handleChange} />
            </Item>
            <Item label="Frequency Count">
              <Input type="number" name="frequencyCount" value={form.frequencyCount} onChange={handleChange} />
            </Item>
          </Grid>
        </Section>

        {/* Action Buttons Section */}
        <Section title="Action Buttons">
          {form.actionButtons.map((btn, idx) => (
            <Grid key={idx} className="mb-3">
              <Item label="Label">
                <Input
                  placeholder="Label"
                  value={btn.label}
                  onChange={(e) => {
                    const newBtns = [...form.actionButtons];
                    newBtns[idx].label = e.target.value;
                    setForm((prev) => ({ ...prev, actionButtons: newBtns }));
                  }}
                />
              </Item>
              <Item label="URL">
                <Input
                  placeholder="URL"
                  value={btn.url}
                  onChange={(e) => {
                    const newBtns = [...form.actionButtons];
                    newBtns[idx].url = e.target.value;
                    setForm((prev) => ({ ...prev, actionButtons: newBtns }));
                  }}
                />
              </Item>
            </Grid>
          ))}
        </Section>

        {/* Video / Images Section */}
        <Section title="Images">
          <Item label="Upload">
            <Input type="file" accept="image/*" onChange={handleImageChange} />
          </Item>
          {imagePreview && (
            <div>
              <Label>Preview</Label>
              <img
                src={imagePreview}
                alt="Preview"
                className="h-32 w-32 object-cover rounded-lg border border-gray-200 mt-2"
              />
            </div>
          )}
        </Section>

        {/* Submit */}
        <div className="mt-6">
          <Button variant="primary" onClick={handleSubmit}>
            Add Modal
          </Button>
        </div>
      </div>
    </>
  );
}

/* ----------------- Layout Helpers ----------------- */
const Section = ({ title, children }) => (
  <div className="mb-8">
    <h4 className="mb-4 text-lg font-semibold text-gray-800">{title}</h4>
    {children}
  </div>
);

const Grid = ({ children, className = "" }) => (
  <div className={`grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 ${className}`}>{children}</div>
);

const Item = ({ label, children }) => (
  <div>
    <p className="mb-1 text-xs text-gray-500">{label}</p>
    {children}
  </div>
);
