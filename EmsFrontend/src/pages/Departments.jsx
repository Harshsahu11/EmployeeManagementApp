import { useEffect, useState } from "react";
import Alert from "../components/Alert";
import DepartmentTable from "../components/DepartmentTable";
import Loading from "../components/Loading";
import PageHeader from "../components/PageHeader";
import { isAdmin } from "../services/authService";
import { deleteDepartment, getDepartments } from "../services/departmentService";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const canManageRecords = isAdmin();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await getDepartments();
        setDepartments(response.data || []);
      } catch {
        setError("Unable to fetch departments.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const handleDelete = async (id) => {
    if (!canManageRecords) {
      return;
    }

    const confirmed = window.confirm("Delete this department?");

    if (!confirmed) {
      return;
    }

    try {
      await deleteDepartment(id);
      setDepartments((current) => current.filter((department) => department.id !== id));
    } catch {
      setError("Unable to delete department.");
    }
  };

  return (
    <section className="content-section">
      <PageHeader
        title="Departments"
        description={canManageRecords ? "Maintain department names and locations." : "Review department names and locations."}
        actionLabel={canManageRecords ? "Add Department" : undefined}
        actionTo={canManageRecords ? "/add-department" : undefined}
      />
      <Alert message={error} />
      {isLoading ? (
        <Loading message="Loading departments..." />
      ) : (
        <DepartmentTable departments={departments} onDelete={handleDelete} canManage={canManageRecords} />
      )}
    </section>
  );
}

export default Departments;
