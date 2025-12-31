import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";

/* ---------------- INITIAL FORM ---------------- */
const initialPostData = {
  headline: "",
  text: "",
  postType: "Public",
  address: "",
  latitude: "",
  longitude: "",
  images: [],
  videos: [],
};

export default function AddPost() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialPostData);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreviews, setVideoPreviews] = useState([]);

  /* ---------------- INPUT HANDLER ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------------- IMAGE UPLOAD ---------------- */
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validImages = [];
    const previews = [];

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`Unsupported file type: ${file.name}`);
        return;
      }
      validImages.push(file);
      previews.push(URL.createObjectURL(file));
    });

    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...validImages],
    }));
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  /* ---------------- VIDEO UPLOAD ---------------- */
  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files);
    const validVideos = [];
    const previews = [];

    files.forEach((file) => {
      if (!file.type.startsWith("video/")) {
        toast.error(`Unsupported file type: ${file.name}`);
        return;
      }
      validVideos.push(file);
      previews.push(URL.createObjectURL(file));
    });

    setForm((prev) => ({
      ...prev,
      videos: [...prev.videos, ...validVideos],
    }));
    setVideoPreviews((prev) => [...prev, ...previews]);
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = () => {
    const payload = new FormData();

    Object.keys(form).forEach((key) => {
      if (Array.isArray(form[key])) {
        form[key].forEach((item) => payload.append(key, item));
      } else {
        payload.append(key, form[key]);
      }
    });

    console.log("Create Post Payload:", payload);

    toast.success("Post created successfully");
    navigate("/user/posts");
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Add Post" />

      <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-6">
        {/* BASIC INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Post Headline</Label>
            <Input
              name="headline"
              value={form.headline}
              onChange={handleChange}
              placeholder="Enter post headline"
            />
          </div>

          <div>
            <Label>Post Type</Label>
            <Select
              name="postType"
              value={form.postType}
              onChange={handleChange}
              options={[
                { label: "Public", value: "Public" },
                { label: "Private", value: "Private" },
              ]}
            />
          </div>
        </div>

        {/* POST TEXT */}
        <div>
          <Label>Post Text</Label>
          <textarea
            name="text"
            rows={4}
            value={form.text}
            onChange={handleChange}
            placeholder="Enter post content"
            className="w-full rounded-lg border border-gray-300 p-3"
          />
        </div>

        {/* LOCATION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label>Address</Label>
            <Input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Enter address"
            />
          </div>

          <div>
            <Label>Latitude</Label>
            <Input
              name="latitude"
              value={form.latitude}
              onChange={handleChange}
              placeholder="22.72470"
            />
          </div>

          <div>
            <Label>Longitude</Label>
            <Input
              name="longitude"
              value={form.longitude}
              onChange={handleChange}
              placeholder="75.86646"
            />
          </div>
        </div>

        {/* VIDEO UPLOAD */}
        <div>
          <Label>Multiple Video</Label>
          <Input type="file" multiple accept="video/*" onChange={handleVideoChange} />

          {videoPreviews.length > 0 && (
            <div className="mt-3 grid grid-cols-4 gap-4">
              {videoPreviews.map((src, i) => (
                <video
                  key={i}
                  src={src}
                  controls
                  className="h-40 w-full rounded-lg border"
                />
              ))}
            </div>
          )}
        </div>

        {/* IMAGE UPLOAD */}
        <div>
          <Label>Multiple Image</Label>
          <Input type="file" multiple accept="image/*" onChange={handleImageChange} />

          {imagePreviews.length > 0 && (
            <div className="mt-3 grid grid-cols-6 gap-4">
              {imagePreviews.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Preview"
                  className="h-32 w-32 rounded-lg object-cover border border-gray-200"
                />
              ))}
            </div>
          )}
        </div>

        {/* SUBMIT */}
        <div>
          <Button variant="primary" onClick={handleSubmit}>
            Create Post
          </Button>
        </div>
      </div>
    </>
  );
}
