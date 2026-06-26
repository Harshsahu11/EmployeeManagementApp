import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { getEmployeeDepartmentId, getEmployeePhone } from "../utils/employeeFields";

function EmployeeTable({ departmentsById = {}, employees, onDelete, canManage = false }) {
  if (!employees.length) {
    return <div className="empty-state">No employees found.</div>;
  }

  const getDepartmentName = (employee) => {
    const departmentId = getEmployeeDepartmentId(employee);

    return (
      employee.departmentName ||
      employee.department?.departmentName ||
      employee.department?.name ||
      departmentsById[departmentId]?.departmentName ||
      departmentsById[departmentId]?.name ||
      "Not assigned"
    );
  };

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Designation</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Phone</th>
            <th>Address</th>
            {canManage && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.designation}</td>
              <td>{getDepartmentName(employee)}</td>
              <td>{Number(employee.salary).toLocaleString("en-IN")}</td>
              <td>{getEmployeePhone(employee)}</td>
              <td>{employee.address}</td>
              {canManage && (
                <td>
                  <div className="table-actions">
                    <Link className="icon-button" to={`/update-employee/${employee.id}`} aria-label="Edit employee">
                      <Edit size={17} />
                    </Link>
                    <button
                      className="icon-button danger"
                      type="button"
                      onClick={() => onDelete(employee.id)}
                      aria-label="Delete employee"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
