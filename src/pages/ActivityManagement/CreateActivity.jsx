import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";

export default function CreateActivity() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        type: "",
        users: "",
        mode: "single",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        difficulty: "Easy",
        peopleLimit: "",
        group: "",
        address: "",
        latitude: "",
        longitude: "",
        hours: "",
        description: "",
        draft: false,
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = () => {
        console.log("Activity Payload:", form);
        toast.success("Activity created successfully");
        navigate("/activity/activities");
    };

    const dayTabs = [
        { id: "single", label: "Single Day" },
        { id: "multi", label: "Multiple Day" },
    ];

    return (
        <>
            <PageBreadcrumb pageTitle="Create Activity" />

            <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-6">
                {/* Activity Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <Label>Activity Title</Label>
                        <Input name="title" onChange={handleChange} />
                    </div>

                    <div>
                        <Label>Activity Type</Label>
                        <Select
                            name="type"
                            onChange={handleChange}
                            options={[
                                { label: "Farmers Market", value: "Farmers Market" },
                                { label: "Hiking", value: "Hiking" },
                            ]}
                        />
                    </div>

                    <div>
                        <Label>Users (optional)</Label>
                        <Input name="users" onChange={handleChange} />
                    </div>
                </div>

                {/* Day Mode Tabs */}
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex">
                        {dayTabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setForm({ ...form, mode: tab.id })}
                                className={`inline-flex items-center px-4 py-2 text-sm font-medium transition
                  ${form.mode === tab.id
                                        ? "border-b-2 border-blue-500 text-blue-500"
                                        : "border-b-2 border-transparent text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Date & Time Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">
                    <div>
                        <Label>Start Date</Label>
                        <Input
                            type="date"
                            name="startDate"
                            value={form.startDate}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <Label>Start Time</Label>
                        <Input
                            type="time"
                            name="startTime"
                            value={form.startTime}
                            onChange={handleChange}
                        />
                    </div>

                    {form.mode === "multi" && (
                        <>
                            <div>
                                <Label>End Date</Label>
                                <Input
                                    type="date"
                                    name="endDate"
                                    value={form.endDate}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <Label>End Time</Label>
                                <Input
                                    type="time"
                                    name="endTime"
                                    value={form.endTime}
                                    onChange={handleChange}
                                />
                            </div>
                        </>
                    )}
                </div>

                {/* Difficulty & People Limit */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label>Difficulty Level</Label>
                        <Select
                            name="difficulty"
                            onChange={handleChange}
                            options={[
                                { label: "Easy", value: "Easy" },
                                { label: "Intermediate", value: "Intermediate" },
                                { label: "Hard", value: "Hard" },
                            ]}
                        />
                    </div>

                    <div>
                        <Label>Number of people can join</Label>
                        <Input
                            type="number"
                            name="peopleLimit"
                            value={form.peopleLimit}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Location */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Select Group  */}
                    <div>
                        <Label>Select Group (optional)</Label>
                        <Select
                            name="group"
                            onChange={handleChange}
                            options={[
                                { label: "Jackson Hiking Group", value: "Jackson Hiking Group" },
                                { label: "Jackson Hole Ski Club", value: "Jackson Hole Ski Club" },
                                { label: "Private Beta Testers Group", value: "Private Beta Testers Group" },
                                { label: "Gnar Shredders (Los Angeles)", value: "Gnar Shredders (Los Angeles)" },
                                { label: "Jackson Yoga Teachers", value: "Jackson Yoga Teachers" },
                                { label: "Day Hike Ambassadors", value: "Day Hike Ambassadors" },
                            ]}
                        />
                    </div>


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
                        <Label>Activity Hours</Label>
                        <Input name="longitude" value={form.hours} onChange={handleChange} />
                    </div>
                </div>

                {/* About Activity */}
                <div>
                    <Label>About Activity</Label>
                    <textarea
                        name="description"
                        rows={4}
                        value={form.description}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 p-3"
                    />
                </div>

                {/* Image */}
                <div>
                    <Label>Image</Label>
                    <Input
                        type="file"
                        onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                    />
                </div>

                {/* Draft */}
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="draft"
                        checked={form.draft}
                        onChange={handleChange}
                    />
                    <Label>Draft</Label>
                </div>

                {/* Submit */}
                <div>
                    <Button variant="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </div>
            </div>
        </>
    );
}
