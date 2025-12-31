import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import TextArea from "../../components/form/input/TextArea";

/* -------- INITIAL FORM -------- */
const initialFaqData = {
    question: "",
    answer: "",
};

export default function AddFaq() {
    const navigate = useNavigate();
    const [form, setForm] = useState(initialFaqData);

    /* -------- HANDLE CHANGE -------- */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    /* -------- SUBMIT -------- */
    const handleSubmit = () => {
        console.log("Create FAQ Payload:", form);

        toast.success("FAQ added successfully");
        navigate("/faq");
    };

    return (
        <>
            <PageBreadcrumb pageTitle="Add FAQ" />

            <div className="rounded-2xl border border-gray-200 bg-white p-6">
                {/* Section */}
                <div className="mb-6">

                    <div className="grid lg:grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Question */}
                        <div>
                            <Label>Question</Label>
                            <Input
                                name="question"
                                value={form.question}
                                onChange={handleChange}
                                placeholder="Enter FAQ question"
                            />
                        </div>
                        {/* Answer */}
                        <div className="mb-6">
                            <Label>Answer</Label>
                            <TextArea
                                value={form.answer}
                                onChange={(value) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        answer: value,
                                    }))
                                }
                                rows={5}
                                placeholder="Enter FAQ answer"
                            />
                        </div>
                    </div>
                </div>



                {/* Actions */}
                <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => navigate("/faq")}>
                        Cancel
                    </Button>

                    <Button variant="primary" onClick={handleSubmit}>
                        Add FAQ
                    </Button>
                </div>
            </div>
        </>
    );
}
