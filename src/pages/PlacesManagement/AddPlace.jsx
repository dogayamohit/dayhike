import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import MultiSelect from "../../components/form/MultiSelect";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function AddPlace() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    addedBy: "",
    title: "",
    placeCategory: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    website: "",
    phone: "",
    moderator: "",
    description: "",
    image: null,
    hours: daysOfWeek.reduce((acc, day) => {
      acc[day] = { open: false, startTime: "", endTime: "" };
      return acc;
    }, {}),
  });

  const initialModalData = {
    moderators: [],
    placeCategory: [],
    moderator: [], // renamed logically, or keep if required
  };

  // Options
const moderatorOptions = [
  { label: "Dani Perry", value: "Dani Perry" },
  { label: "Day Hike", value: "Day Hike" },
  { label: "Evan Birenbaum", value: "Evan Birenbaum" },
  { label: "Tyler Ahles", value: "Tyler Ahles" },
  { label: "Brad", value: "Brad" },
];

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleHourChange = (day, field, value) => {
    setForm((prev) => ({
      ...prev,
      hours: {
        ...prev.hours,
        [day]: { ...prev.hours[day], [field]: value },
      },
    }));
  };

  const handleMultiSelect = (name, values) => {
    setForm((prev) => ({
      ...prev,
      [name]: values,
    }));
  };


  const handleSubmit = () => {
    console.log("Add Place Payload:", form);
    toast.success("Place added successfully");
    navigate("/places");
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Add Place" />

      <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Added by (Writer)</Label>
            <Input name="addedBy" value={form.addedBy} onChange={handleChange} />
          </div>
          <div>
            <Label>Title</Label>
            <Input name="title" value={form.title} onChange={handleChange} placeholder={"Enter Title"} />
          </div>
          {/* Place Category */}
          <div>
            <MultiSelect
              label="Place Category"
              options={[
                { value: "Bus Stop", text: "Bus Stop" },
                { value: "Park", text: "Park" },
              ]}
              value={form.placeCategory}
              onChange={(values) =>
                handleMultiSelect("placeCategory", values)
              }
            />
          </div>

          <div>
            <Label>Address</Label>
            <Input name="address" value={form.address} onChange={handleChange} placeholder={"Enter Location"} />
          </div>
          <div>
            <Label>Website</Label>
            <Input name="website" value={form.website} onChange={handleChange} placeholder={"Enter URL"} />
          </div>
          <div>
            <Label>Phone</Label>
            <Input name="phone" value={form.phone} onChange={handleChange} placeholder={"Enter The Phone Number"} />
          </div>
          {/* Moderator */}
          <div>
            <MultiSelect
              label="Moderator"
              options={moderatorOptions.map((opt) => ({
                value: opt.value,
                text: opt.label,
              }))}
              value={form.moderator}
              onChange={(values) =>
                handleMultiSelect("moderator", values)
              }
            />
          </div>

        </div>

        {/* Description */}
        <div>
          <Label>Description</Label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-3"
          />
        </div>

        {/* Image */}
        <div>
          <Label>Image</Label>
          <Input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              setForm((prev) => ({ ...prev, image: file }));
              setImagePreview(URL.createObjectURL(file));
            }}
          />
          {imagePreview && (
            <img src={imagePreview} alt="preview" className="mt-2 w-32 h-32 object-cover rounded" />
          )}
        </div>

        {/* Hours */}
        <div className="space-y-4">
          <Label>Hours</Label>
          {daysOfWeek.map((day) => (
            <div key={day} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div>{day}</div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={form.hours[day].open}
                  onChange={() => handleHourChange(day, "open", true)}
                />
                <span>Open</span>
                <input
                  type="radio"
                  checked={!form.hours[day].open}
                  onChange={() => handleHourChange(day, "open", false)}
                />
                <span>Close</span>
              </div>
              <div>
                <Input
                  type="time"
                  value={form.hours[day].startTime}
                  onChange={(e) => handleHourChange(day, "startTime", e.target.value)}
                  disabled={!form.hours[day].open}
                />
              </div>
              <div>
                <Input
                  type="time"
                  value={form.hours[day].endTime}
                  onChange={(e) => handleHourChange(day, "endTime", e.target.value)}
                  disabled={!form.hours[day].open}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Submit */}
        <div>
          <Button variant="primary" onClick={handleSubmit}>
            Add Place
          </Button>
        </div>
      </div>
    </>
  );
}
