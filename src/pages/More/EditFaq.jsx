import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

export default function EditFaq() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState(initialFaqData);

  /* -------- FETCH FAQ -------- */
  useEffect(() => {
    // 🔹 Replace with API call
    const faqData = {
      question: "Pro Tip: Friend Requests",
      answer:
        "All of your friend requests go into your chat. View your unread messages in your chat box to view friend requests easily.",
    };

    setForm(faqData);
  }, [id]);

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
    console.log("Updated FAQ Payload:", form);

    toast.success("FAQ updated successfully");
    navigate("/faq");
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Edit FAQ" />

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
            Update FAQ
          </Button>
        </div>
      </div>
    </>
  );
}
