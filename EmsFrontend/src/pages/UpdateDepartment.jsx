import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DepartmentForm from "../components/DepartmentForm";
import Loading from "../components/Loading";
import PageHeader from "../components/PageHeader";
import { getDepartmentById, updateDepartment } from "../services/departmentService";

const initialDepartment = {
  departmentName: "",
  location: "",
};

function UpdateDepartment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialDepartment);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadDepartment = async () => {
      try {
        const response = await getDepartmentById(id);
        setFormData({
          departmentName: response.data?.departmentName || "",
          location: response.data?.location || "",
        });
      } catch {
        setError("Unable to load department.");
      } finally {
        setIsLoading(false);
      }
    };

    loadDepartment();
  }, [id]);

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
      await updateDepartment(id, formData);
      navigate("/departments");
    } catch {
      setError("Unable to update department.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="content-section">
      <PageHeader title="Update Department" description="Edit the selected department." />
      {isLoading ? (
        <Loading message="Loading department..." />
      ) : (
        <DepartmentForm
          error={error}
          formData={formData}
          isSubmitting={isSubmitting}
          onCancel={() => navigate("/departments")}
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitLabel="Update Department"
        />
      )}
    </section>
  );
}

export default UpdateDepartment;
