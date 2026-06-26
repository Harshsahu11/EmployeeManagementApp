import Alert from "./Alert";

function EmployeeForm({ departments = [], error, formData, isSubmitting, onCancel, onChange, onSubmit, submitLabel }) {
  return (
    <form className="form-panel" onSubmit={onSubmit}>
      <Alert message={error} />

      <div className="form-grid">
        <label>
          Name
          <input name="name" value={formData.name} onChange={onChange} minLength="2" required />
        </label>
        <label>
          Email
          <input name="email" type="email" value={formData.email} onChange={onChange} required />
        </label>
        <label>
          Designation
          <input name="designation" value={formData.designation} onChange={onChange} minLength="2" required />
        </label>
        <label>
          Department
          <select name="departmentId" value={formData.departmentId} onChange={onChange} required>
            <option value="">Select department</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.departmentName}
              </option>
            ))}
          </select>
        </label>
        <label>
          Salary
          <input name="salary" type="number" min="0" step="0.01" value={formData.salary} onChange={onChange} required />
        </label>
        <label>
          Phone Number
          <input name="phoneNumber" value={formData.phoneNumber} onChange={onChange} minLength="7" required />
        </label>
        <label className="full-span">
          Address
          <textarea name="address" value={formData.address} onChange={onChange} rows="4" required />
        </label>
      </div>

      <div className="form-actions">
        <button className="secondary-button" type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className="primary-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default EmployeeForm;
