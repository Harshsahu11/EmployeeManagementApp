import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Alert from "../components/Alert";
import EmployeeTable from "../components/EmployeeTable";
import Loading from "../components/Loading";
import PageHeader from "../components/PageHeader";
import { isAdmin } from "../services/authService";
import { getDepartments } from "../services/departmentService";
import { deleteEmployee, getEmployees } from "../services/employeeService";
import { getEmployeeDepartmentId, getEmployeePhone } from "../utils/employeeFields";

function Employees() {
  const { globalSearch = "" } = useOutletContext();
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const canManageRecords = isAdmin();

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const [employeeResponse, departmentResponse] = await Promise.all([getEmployees(), getDepartments()]);
        setEmployees(employeeResponse.data || []);
        setDepartments(departmentResponse.data || []);
      } catch {
        setError("Unable to fetch employees.");
      } finally {
        setIsLoading(false);
      }
    };

    loadEmployees();
  }, []);

  const departmentsById = useMemo(
    () =>
      departments.reduce((departmentMap, department) => {
        departmentMap[department.id] = department;
        return departmentMap;
      }, {}),
    [departments],
  );

  const filteredEmployees = useMemo(() => {
    const query = globalSearch.trim().toLowerCase();

    if (!query) {
      return employees;
    }

    return employees.filter((employee) =>
      [
        employee.name,
        employee.email,
        employee.designation,
        departmentsById[getEmployeeDepartmentId(employee)]?.departmentName,
        getEmployeePhone(employee),
        employee.address,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [departmentsById, employees, globalSearch]);

  const handleDelete = async (id) => {
    if (!canManageRecords) {
      return;
    }

    const confirmed = window.confirm("Delete this employee?");

    if (!confirmed) {
      return;
    }

    try {
      await deleteEmployee(id);
      setEmployees((current) => current.filter((employee) => employee.id !== id));
    } catch {
      setError("Unable to delete employee.");
    }
  };

  return (
    <section className="content-section">
      <PageHeader
        title="Employees"
        description={
          canManageRecords
            ? "Create, review, search, update, and remove employee records."
            : "Review and search employee records."
        }
        actionLabel={canManageRecords ? "Add Employee" : undefined}
        actionTo={canManageRecords ? "/add-employee" : undefined}
      />
      <Alert message={error} />
      {isLoading ? (
        <Loading message="Loading employees..." />
      ) : (
        <EmployeeTable
          departmentsById={departmentsById}
          employees={filteredEmployees}
          onDelete={handleDelete}
          canManage={canManageRecords}
        />
      )}
    </section>
  );
}

export default Employees;
