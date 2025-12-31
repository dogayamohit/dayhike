import React, { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import CKTextEditor from "../../components/editor/CKTextEditor";
import Button from "../../components/ui/button/Button";
import { toast } from "react-toastify";

const aboutData = {
    description: `
    <p>This is <strong>dummy about content</strong> written using CKEditor.</p>
    <p>It supports <em>rich text</em>, lists, links, etc.</p>
  `,

    news: {
        title: "Test dummy news",
        description:
            "test dummy news test dummy news test dummy news test dummy news",
    },

    activity: {
        title: "Test dummy news",
        activityHour: 24,
        startTime: "03:30:00",
        endTime: "03:30:00",
        createdAt: "2023-09-30",
    },

    place: {
        title: "Test dummy news",
        createdAt: "2023-09-30",
        address: "Kanha National Park, Khajara, Madhya Pradesh, India",
    },
};


export default function AboutGroup() {
    const [ckContent, setCKContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!ckContent.trim()) {
            toast.error("Please write some content");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch("/api/about-us", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    description: ckContent,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to save content");
            }

            toast.success("About Us content saved successfully!");
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <PageBreadcrumb pageTitle="About Us" />

            <ComponentCard title="About Us">
                {/* CK Editor */}
                <CKTextEditor
                    value={ckContent}
                    onChange={setCKContent}
                    placeholder="Write your article..."
                />

                {/* Submit Button */}
                <div className="mt-4 flex justify-end">
                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Submit"}
                    </Button>
                </div>

                {/* Preview (optional) */}
                <div
                    className="prose mt-6 max-w-none rounded-lg border border-gray-300 bg-gray-50 p-4"
                    dangerouslySetInnerHTML={{ __html: ckContent }}
                />
            </ComponentCard>

                {/* NEWS DETAIL */}
                <ComponentCard title={"News Detail"} className="my-2">
                    <Grid>
                        <Item label="Title" value={aboutData.news.title} />
                        <Item
                            label="Description"
                            value={aboutData.news.description}
                            full
                        />
                    </Grid>
                </ComponentCard>
                {/* ACTIVITY DETAIL */}
                <ComponentCard title={"Activity Detail"} className="my-2">
                    <Grid>
                        <Item label="Title" value={aboutData.activity.title} />
                        <Item
                            label="Activity Hour"
                            value={aboutData.activity.activityHour}
                        />
                        <Item label="Start Time" value={aboutData.activity.startTime} />
                        <Item label="End Time" value={aboutData.activity.endTime} />
                        <Item label="Created At" value={aboutData.activity.createdAt} />
                    </Grid>
                </ComponentCard>

                {/* PLACE DETAIL */}
                <ComponentCard title={"Place Detail"} className="my-2">
                    <Grid>
                        <Item label="Title" value={aboutData.place.title} />
                        <Item label="Created At" value={aboutData.place.createdAt} />
                        <Item
                            label="Address"
                            value={aboutData.place.address}
                            full
                        />
                    </Grid>
                </ComponentCard>
        </>
    );
}


const Grid = ({ children }) => (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-7">
        {children}
    </div>
);

const Item = ({ label, value, full }) => (
    <div className={full ? "lg:col-span-4" : ""}>
        <p className="mb-1 text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-800">{value || "-"}</p>
    </div>
);
