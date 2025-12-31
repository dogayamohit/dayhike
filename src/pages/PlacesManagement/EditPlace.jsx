import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function EditPlace() {
  const navigate = useNavigate();
  const { id } = useParams();

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

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    // Fetch existing place data using id
    // Example API call:
    // fetch(`/api/places/${id}`).then(res => res.json()).then(data => setForm(data));

    // For demo, using static data
    const data = {
      addedBy: "Sachin",
      title: "Hockey",
      placeCategory: "Bus Stop",
      address: "Industry House iBus Stop, Indore, MP, India",
      city: "Indore",
      state: "Madhya Pradesh",
      zipCode: "452001",
      website: "test",
      phone: "1236547896",
      moderator: "Reyansh",
      description: "test",
      image: "/images/sample.jpg",
      hours: {
        Sunday: { open: true, startTime: "09:02", endTime: "10:02" },
        Monday: { open: false, startTime: "", endTime: "" },
        Tuesday: { open: false, startTime: "", endTime: "" },
        Wednesday: { open: false, startTime: "", endTime: "" },
        Thursday: { open: false, startTime: "", endTime: "" },
        Friday: { open: false, startTime: "", endTime: "" },
        Saturday: { open: false, startTime: "", endTime: "" },
      },
    };
    setForm(data);
    setImagePreview(data.image);
  }, [id]);

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

  const handleSubmit = () => {
    console.log("Edit Place Payload:", form);
    toast.success("Place updated successfully");
    navigate("/places");
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Edit Place" />

      <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Added by (Writer)</Label>
            <Input name="addedBy" value={form.addedBy} onChange={handleChange} />
          </div>
          <div>
            <Label>Title</Label>
            <Input name="title" value={form.title} onChange={handleChange} />
          </div>
          <div>
            <Label>Place Category</Label>
            <Select
              name="placeCategory"
              value={form.placeCategory}
              onChange={handleChange}
              options={[
                { label: "Bus Stop", value: "Bus Stop" },
                { label: "Park", value: "Park" },
              ]}
            />
          </div>
          <div>
            <Label>Address</Label>
            <Input name="address" value={form.address} onChange={handleChange} />
          </div>
          <div>
            <Label>City</Label>
            <Input name="city" value={form.city} onChange={handleChange} />
          </div>
          <div>
            <Label>State</Label>
            <Input name="state" value={form.state} onChange={handleChange} />
          </div>
          <div>
            <Label>Zip Code</Label>
            <Input name="zipCode" value={form.zipCode} onChange={handleChange} />
          </div>
          <div>
            <Label>Website</Label>
            <Input name="website" value={form.website} onChange={handleChange} />
          </div>
          <div>
            <Label>Phone</Label>
            <Input name="phone" value={form.phone} onChange={handleChange} />
          </div>
          <div>
            <Label>Moderator</Label>
            <Input name="moderator" value={form.moderator} onChange={handleChange} />
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
            Update Place
          </Button>
        </div>
      </div>
    </>
  );
}
