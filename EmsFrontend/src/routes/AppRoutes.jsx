import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import AddDepartment from "../pages/AddDepartment";
import AddEmployee from "../pages/AddEmployee";
import Dashboard from "../pages/Dashboard";
import Departments from "../pages/Departments";
import Employees from "../pages/Employees";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UpdateDepartment from "../pages/UpdateDepartment";
import UpdateEmployee from "../pages/UpdateEmployee";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/departments" element={<Departments />} />

            <Route element={<ProtectedRoute requireAdmin />}>
              <Route path="/add-employee" element={<AddEmployee />} />
              <Route path="/update-employee/:id" element={<UpdateEmployee />} />
              <Route path="/add-department" element={<AddDepartment />} />
              <Route path="/update-department/:id" element={<UpdateDepartment />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
