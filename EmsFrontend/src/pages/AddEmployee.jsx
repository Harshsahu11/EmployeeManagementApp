import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";
import PageHeader from "../components/PageHeader";
import { getDepartments } from "../services/departmentService";
import { createEmployee } from "../services/employeeService";
import { buildEmployeePayload } from "../utils/employeeFields";

const initialEmployee = {
  name: "",
  email: "",
  designation: "",
  departmentId: "",
  salary: "",
  phoneNumber: "",
  address: "",
};

function AddEmployee() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialEmployee);
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const response = await getDepartments();
        setDepartments(response.data || []);
      } catch {
        setError("Unable to load departments.");
      }
    };

    loadDepartments();
  }, []);

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
      await createEmployee(buildEmployeePayload(formData));
      navigate("/employees");
    } catch {
      setError("Unable to add employee.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="content-section">
      <PageHeader title="Add Employee" description="Create a new employee record." />
      <EmployeeForm
        departments={departments}
        error={error}
        formData={formData}
        isSubmitting={isSubmitting}
        onCancel={() => navigate("/employees")}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Add Employee"
      />
    </section>
  );
}

export default AddEmployee;
