import Alert from "./Alert";

function DepartmentForm({ error, formData, isSubmitting, onCancel, onChange, onSubmit, submitLabel }) {
  return (
    <form className="form-panel" onSubmit={onSubmit}>
      <Alert message={error} />

      <div className="form-grid">
        <label>
          Department Name
          <input name="departmentName" value={formData.departmentName} onChange={onChange} minLength="2" required />
        </label>
        <label>
          Location
          <input name="location" value={formData.location} onChange={onChange} minLength="2" required />
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

export default DepartmentForm;
