import { Menu, Search, X } from "lucide-react";
import { isAdmin } from "../services/authService";

function Navbar({ isSidebarOpen, onMenuClick, onSearchChange, searchValue }) {
  const workspaceTitle = isAdmin() ? "Admin Workspace" : "Employee Workspace";

  return (
    <header className="top-nav">
      <button className="icon-button mobile-only" type="button" onClick={onMenuClick} aria-label="Toggle menu">
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div>
        <p className="eyebrow">Employee Management System</p>
        <h1>{workspaceTitle}</h1>
      </div>

      <label className="search-box">
        <Search size={18} />
        <input
          type="search"
          placeholder="Search employees"
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>
    </header>
  );
}

export default Navbar;
