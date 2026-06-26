import { Link } from "react-router-dom";

function PageHeader({ title, description, actionLabel, actionTo }) {
  return (
    <div className="page-header">
      <div>
        <p className="eyebrow">Management</p>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {actionLabel && actionTo && (
        <Link className="primary-link" to={actionTo}>
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

export default PageHeader;
