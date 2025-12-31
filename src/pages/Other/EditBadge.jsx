import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import Button from "../../components/ui/button/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ---------------- INITIAL DATA ---------------- */
const initialBadgesData = [
    {
        id: 1,
        title: "5 Activities Created",
        badgeType: "Activity_Create",
        count: 5,
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500",
    },
];

export default function EditBadge() {
    const { id } = useParams();
    const navigate = useNavigate();

    const badge = initialBadgesData.find((b) => b.id === Number(id));

    const [title, setTitle] = useState(badge?.title || "");
    const [badgeType, setBadgeType] = useState(badge?.badgeType || "");
    const [count, setCount] = useState(badge?.count || "");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(badge?.image || null);

    useEffect(() => {
        if (!badge) navigate("/badges");
    }, [badge, navigate]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ id, title, badgeType, count, imageFile });

        toast.success("Badge updated successfully!");
        navigate("/badges");
    };

    const handleCancel = () => {
        navigate("/badges");
    };


    return (
        <>
            <PageBreadcrumb pageTitle="Edit Badge" />

            <div className="rounded-2xl border border-gray-100 bg-white p-6 max-w">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-1">
                            Title
                        </label>
                        <Input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter badge title"
                            required
                        />
                    </div>

                    {/* Badge Type */}
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-1">
                            Badge Type
                        </label>
                        <Select
                            value={badgeType}
                            onChange={(e) => setBadgeType(e.target.value)}
                            options={[
                                { label: "Activity Create", value: "Activity_Create" },
                                { label: "Event Join", value: "Event_Join" },
                                { label: "Referral", value: "Referral" },
                            ]}
                            placeholder="Select badge type"
                        />
                    </div>

                    {/* Count */}
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-1">
                            Count
                        </label>
                        <Input
                            type="number"
                            value={count}
                            onChange={(e) => setCount(e.target.value)}
                            placeholder="Enter count"
                            required
                        />
                    </div>

                    {/* Badge Image */}
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-1">
                            Badge Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="rounded-lg border border-gray-200 px-3 py-2 w-full"
                        />
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="mt-2 w-32 h-32 object-cover rounded"
                            />
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-4">
                        <Button type="submit" variant="primary">
                            Save Changes
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>

                    </div>
                </form>
            </div>
        </>
    );
}
