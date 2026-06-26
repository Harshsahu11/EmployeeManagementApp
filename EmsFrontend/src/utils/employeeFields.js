export const getEmployeeRecord = (data = {}) => data.employee || data.data || data;

export const getEmployeeDepartmentId = (employee = {}) =>
  employee.departmentId || employee.department?.id || employee.departmentDto?.id || employee.departmentResponse?.id || "";

export const getEmployeePhone = (employee = {}) =>
  employee.phoneNumber ||
  employee.phone ||
  employee.mobileNumber ||
  employee.mobile ||
  employee.contactNumber ||
  employee.phoneNo ||
  "";

export const getEmployeeFormData = (employee = {}) => ({
  name: employee.name || employee.employeeName || "",
  email: employee.email || "",
  designation: employee.designation || employee.position || "",
  departmentId: getEmployeeDepartmentId(employee),
  salary: employee.salary ?? "",
  phoneNumber: getEmployeePhone(employee),
  address: employee.address || "",
});

export const buildEmployeePayload = (formData, originalEmployee = {}) => {
  const departmentId = Number(formData.departmentId);
  const phone = formData.phoneNumber;
  const payload = {
    ...originalEmployee,
    name: formData.name,
    email: formData.email,
    designation: formData.designation,
    salary: Number(formData.salary),
    phoneNumber: phone,
    phoneNo: phone,
    phone,
    mobileNumber: phone,
    contactNumber: phone,
    address: formData.address,
  };

  if (Number.isFinite(departmentId)) {
    payload.departmentId = departmentId;
    payload.department = {
      ...(originalEmployee.department || {}),
      id: departmentId,
    };
  }

  return payload;
};
