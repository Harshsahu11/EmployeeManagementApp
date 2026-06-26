import { Building2, UserCheck, Users, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import Alert from "../components/Alert";
import Loading from "../components/Loading";
import PageHeader from "../components/PageHeader";
import { getDepartments } from "../services/departmentService";
import { getEmployees } from "../services/employeeService";
import { isAdmin } from "../services/authService";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const canManageRecords = isAdmin();

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [employeeResponse, departmentResponse] = await Promise.all([getEmployees(), getDepartments()]);
        setEmployees(employeeResponse.data || []);
        setDepartments(departmentResponse.data || []);
      } catch {
        setError("Unable to load dashboard data.");
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const totalSalary = employees.reduce((total, employee) => total + Number(employee.salary || 0), 0);
  const averageSalary = employees.length ? totalSalary / employees.length : 0;

  const stats = [
    { label: "Employees", value: employees.length, icon: Users },
    { label: "Departments", value: departments.length, icon: Building2 },
    { label: "Active Records", value: employees.length + departments.length, icon: UserCheck },
    { label: "Avg Salary", value: averageSalary.toLocaleString("en-IN", { maximumFractionDigits: 0 }), icon: Wallet },
  ];

  return (
    <section className="content-section">
      <PageHeader
        title="Dashboard"
        description="Live summary from your Spring Boot Employee Management APIs."
        actionLabel={canManageRecords ? "Add Employee" : undefined}
        actionTo={canManageRecords ? "/add-employee" : undefined}
      />

      <Alert message={error} />
      {isLoading ? (
        <Loading message="Loading dashboard..." />
      ) : (
        <div className="stats-grid">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article className="stat-card" key={stat.label}>
                <Icon size={24} />
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default Dashboard;
