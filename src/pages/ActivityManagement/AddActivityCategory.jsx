import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBreadCrumb from "../../components/common/PageBreadCrumb";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import { toast } from "react-toastify";

const AddActivityCategory = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleSave = () => {
    if (!name.trim()) return;

    console.log("New Category:", name);
    toast.success("Category added successfully");
    navigate("/activity/category");
  };

  return (
    <>
      <PageBreadCrumb pageTitle="Add Activity Category" />

      <div className="mx-auto max-w rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h3 className="mb-6 text-xl font-semibold">Add Category</h3>

        <div className="mb-6">
          <Label>Category Name</Label>
          <Input
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddActivityCategory;
