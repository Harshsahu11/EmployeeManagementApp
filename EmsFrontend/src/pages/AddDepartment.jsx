import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DepartmentForm from "../components/DepartmentForm";
import PageHeader from "../components/PageHeader";
import { createDepartment } from "../services/departmentService";

const initialDepartment = {
  departmentName: "",
  location: "",
};

function AddDepartment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialDepartment);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await createDepartment(formData);
      navigate("/departments");
    } catch {
      setError("Unable to add department.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="content-section">
      <PageHeader title="Add Department" description="Create a new department." />
      <DepartmentForm
        error={error}
        formData={formData}
        isSubmitting={isSubmitting}
        onCancel={() => navigate("/departments")}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Add Department"
      />
    </section>
  );
}

export default AddDepartment;
