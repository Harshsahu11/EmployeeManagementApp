import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

function DepartmentTable({ departments, onDelete, canManage = false }) {
  if (!departments.length) {
    return <div className="empty-state">No departments found.</div>;
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Department</th>
            <th>Location</th>
            {canManage && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id}>
              <td>{department.departmentName}</td>
              <td>{department.location}</td>
              {canManage && (
                <td>
                  <div className="table-actions">
                    <Link className="icon-button" to={`/update-department/${department.id}`} aria-label="Edit department">
                      <Edit size={17} />
                    </Link>
                    <button
                      className="icon-button danger"
                      type="button"
                      onClick={() => onDelete(department.id)}
                      aria-label="Delete department"
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

export default DepartmentTable;
