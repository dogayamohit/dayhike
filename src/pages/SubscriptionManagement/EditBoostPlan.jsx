import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import TextArea from "../../components/form/input/TextArea";

/* -------- INITIAL FORM -------- */
const initialBoostPlanData = {
  name: "",
  amount: "",
  duration: "",
  description: "",
};

export default function EditBoostPlan() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState(initialBoostPlanData);

  /* -------- FETCH BOOST PLAN -------- */
  useEffect(() => {
    // 🔹 Replace with API call
    const boostPlanData = {
      name: "5 year",
      amount: 1000,
      duration: 1825,
      description:
        "Loram 5 Tablet is a combination medicine used to treat hypertension",
    };

    setForm(boostPlanData);
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
    console.log("Updated Boost Plan Payload:", form);

    toast.success("Boost plan updated successfully");
    navigate("/subscriptions/boost-plans");
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Edit Boost Plan" />

      <div className="rounded-2xl border border-gray-200 bg-white p-6 max-w">
        {/* Section: Basic Info */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Boost Plan Details
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {/* Name */}
            <div>
              <Label>Name</Label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Boost plan name"
              />
            </div>

            {/* Amount */}
            <div>
              <Label>Amount</Label>
              <Input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="Amount"
              />
            </div>

            {/* Duration */}
            <div>
              <Label>Duration (Days)</Label>
              <Input
                type="number"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="Duration in days"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <Label>Description</Label>
          <TextArea
            value={form.description}
            onChange={(value) =>
              setForm((prev) => ({
                ...prev,
                description: value,
              }))
            }
            rows={4}
            placeholder="Boost plan description"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="outline"
            onClick={() => navigate("/subscriptions/boost-plans")}
          >
            Cancel
          </Button>

          <Button variant="primary" onClick={handleSubmit}>
            Update Boost Plan
          </Button>
        </div>
      </div>
    </>
  );
}
