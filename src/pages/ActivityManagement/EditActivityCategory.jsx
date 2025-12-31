import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageBreadCrumb from "../../components/common/PageBreadCrumb";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import { toast } from "react-toastify";

/* TEMP DATA */
const initialData = [
  { id: 1, name: "Hiking" },
  { id: 2, name: "Camping" },
];

const EditActivityCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const selected = initialData.find((c) => c.id === Number(id));
    if (selected) setCategory(selected);
    else navigate("/admin/activity-category");
  }, [id, navigate]);

  const handleSave = () => {
    console.log("Updated Category:", category);
    toast.success("Category updated successfully");
    navigate("/activity/category");
  };

  if (!category) return null;

  return (
    <>
      <PageBreadCrumb pageTitle="Edit Activity Category" />

      <div className="mx-auto max-w rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h3 className="mb-6 text-xl font-semibold">Edit Category</h3>

        <div className="mb-6">
          <Label>Category Name</Label>
          <Input
            value={category.name}
            onChange={(e) =>
              setCategory({ ...category, name: e.target.value })
            }
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditActivityCategory;
