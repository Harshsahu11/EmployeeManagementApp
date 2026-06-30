import { Building2, LayoutDashboard, LogOut, UserPlus, Users } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { isAdmin, logout } from "../services/authService";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/employees", label: "Employees", icon: Users },
  { to: "/add-employee", label: "Add Employee", icon: UserPlus, adminOnly: true },
  { to: "/departments", label: "Departments", icon: Building2 },
];

function Sidebar({ isOpen, onNavigate }) {
  const navigate = useNavigate();
  const canAccessAdmin = isAdmin();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="brand">
        <span>EMS</span>
        <div>
          <strong>Spring EMS</strong>
          <small>React Client</small>
        </div>
      </div>

      <nav className="side-nav">
        {navItems.filter((item) => !item.adminOnly || canAccessAdmin).map((item) => {
          const Icon = item.icon;

          return (
            <NavLink key={item.to} to={item.to} onClick={onNavigate}>
              <Icon size={19} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <button className="logout-button" type="button" onClick={handleLogout}>
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
