import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";
import Loading from "../components/Loading";
import PageHeader from "../components/PageHeader";
import { getDepartments } from "../services/departmentService";
import { getEmployeeById, updateEmployee } from "../services/employeeService";
import { buildEmployeePayload, getEmployeeFormData, getEmployeeRecord } from "../utils/employeeFields";

const initialEmployee = {
  name: "",
  email: "",
  designation: "",
  departmentId: "",
  salary: "",
  phoneNumber: "",
  address: "",
};

function UpdateEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialEmployee);
  const [originalEmployee, setOriginalEmployee] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadEmployee = async () => {
      try {
        const [employeeResponse, departmentsResponse] = await Promise.all([getEmployeeById(id), getDepartments()]);
        const employee = getEmployeeRecord(employeeResponse.data || {});

        setOriginalEmployee(employee);
        setDepartments(departmentsResponse.data || []);
        setFormData(getEmployeeFormData(employee));
      } catch {
        setError("Unable to load employee.");
      } finally {
        setIsLoading(false);
      }
    };

    loadEmployee();
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
      await updateEmployee(id, buildEmployeePayload(formData, originalEmployee || {}));
      navigate("/employees");
    } catch {
      setError("Unable to update employee.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="content-section">
      <PageHeader title="Update Employee" description="Edit the selected employee record." />
      {isLoading ? (
        <Loading message="Loading employee..." />
      ) : (
        <EmployeeForm
          departments={departments}
          error={error}
          formData={formData}
          isSubmitting={isSubmitting}
          onCancel={() => navigate("/employees")}
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitLabel="Update Employee"
        />
      )}
    </section>
  );
}

export default UpdateEmployee;
