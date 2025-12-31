// src/pages/users/EditUserFull.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Input from "../../components/form/input/InputField";
import Textarea from "../../components/form/input/TextArea";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";
import Button from "../../components/ui/button/Button";
import FileInput from "../../components/form/input/FileInput";
import DatePicker from "../../components/form/DatePicker";
import { toast } from "react-toastify";

import { initialData } from "./UsersTable";

export default function EditUserFull() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [dob, setDob] = useState(""); // DatePicker state
    const [previewUrl, setPreviewUrl] = useState(null); // image preview

    // Load user data
    useEffect(() => {
        const selectedUser = initialData.find((u) => Number(u.id) === Number(id));
        if (selectedUser) {
            setUser({
                ...selectedUser,
                dob: "2001-01-01",
                gender: "Male",
                zodiac: "Capricorn",
                relationshipStatus: "Single",
                homeTown: "Indore, MP, 452016",
                profileVisibility: "public",
                postVisibility: "public",
                about: "Testing",
                dobVisibility: "on",
                imageFile: null, // for new uploads
            });
            setDob("2001-01-01");
            setPreviewUrl(selectedUser.image); // initial preview
        } else {
            navigate("/users");
        }
    }, [id, navigate]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setUser((prev) => ({ ...prev, imageFile: files[0] }));
        } else {
            setUser((prev) => ({ ...prev, [name]: value }));
        }
    };

    // Handle FileInput change
    const handleFileChange = (file) => {
        setUser((prev) => ({ ...prev, imageFile: file }));
    };

    // Update preview when user.imageFile changes
    useEffect(() => {
        if (user?.imageFile instanceof File) {
            const objectUrl = URL.createObjectURL(user.imageFile);
            setPreviewUrl(objectUrl);
            return () => URL.revokeObjectURL(objectUrl); // cleanup old URL
        } else if (user?.image) {
            setPreviewUrl(user.image);
        } else {
            setPreviewUrl(null);
        }
    }, [user?.imageFile, user?.image]);

    // Save user
    const handleSave = () => {
        console.log("Updated user data:", user);

        toast.success("User updated successfully");

        setTimeout(() => {
            navigate("/users");
        }, 1000); // small delay so user sees toast
    };

    if (!user) return <div>Loading...</div>;

    return (
        <>
            <PageBreadcrumb pageTitle="Edit User" />

            <div className="max-w rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                <h3 className="mb-8 text-2xl font-semibold">Edit User: {user.name}</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                        <Label>Name</Label>
                        <Input type="text" name="name" value={user.name} onChange={handleChange} />
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <DatePicker
                            id="date-picker"
                            label="Date of Birth"
                            placeholder="Select a date"
                            value={dob}
                            onChange={(dates, currentDateString) => {
                                setDob(currentDateString);
                                setUser((prev) => ({ ...prev, dob: currentDateString }));
                            }}
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <Label>Gender</Label>
                        <Select
                            name="gender"
                            value={user.gender}
                            onChange={handleChange}
                            options={[
                                { value: "Male", label: "Male" },
                                { value: "Female", label: "Female" },
                                { value: "Other", label: "Other" },
                            ]}
                        />
                    </div>

                    {/* Zodiac */}
                    <div>
                        <Label>Zodiac</Label>
                        <Input type="text" name="zodiac" value={user.zodiac} onChange={handleChange} />
                    </div>

                    {/* Relationship Status */}
                    <div>
                        <Label>Relationship Status</Label>
                        <Input
                            type="text"
                            name="relationshipStatus"
                            value={user.relationshipStatus}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Home Town */}
                    <div>
                        <Label>Home Town</Label>
                        <Input type="text" name="homeTown" value={user.homeTown} onChange={handleChange} />
                    </div>

                    {/* Profile Visibility */}
                    <div>
                        <Label>Profile Visibility</Label>
                        <Select
                            name="profileVisibility"
                            value={user.profileVisibility}
                            onChange={handleChange}
                            options={[
                                { value: "public", label: "Public" },
                                { value: "private", label: "Private" },
                            ]}
                        />
                    </div>

                    {/* Post Visibility */}
                    <div>
                        <Label>Post Visibility</Label>
                        <Select
                            name="postVisibility"
                            value={user.postVisibility}
                            onChange={handleChange}
                            options={[
                                { value: "public", label: "Public" },
                                { value: "private", label: "Private" },
                            ]}
                        />
                    </div>

                    {/* About */}
                    <div className="md:col-span-2">
                        <Label>About</Label>
                        <Textarea name="about" value={user.about} onChange={handleChange} rows={4} />
                    </div>

                    {/* DOB Visibility */}
                    <div>
                        <Label>DOB Visibility</Label>
                        <Select
                            name="dobVisibility"
                            value={user.dobVisibility}
                            onChange={handleChange}
                            options={[
                                { value: "on", label: "On" },
                                { value: "off", label: "Off" },
                            ]}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <Label>Email</Label>
                        <Input type="email" name="email" value={user.email} onChange={handleChange} />
                    </div>

                    {/* File Upload */}
                    <div className="md:col-span-2">
                        <Label>Select Image</Label>
                        <FileInput onChange={handleFileChange} className="custom-class" />

                        {/* Preview */}
                        {previewUrl && (
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="mt-3 h-30 w-30 rounded-full object-cover border"
                            />
                        )}
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4 mt-8">
                    <Button onClick={() => navigate("/users")} variant="outline">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} variant="primary">
                        Save
                    </Button>
                </div>
            </div>
        </>
    );
}
