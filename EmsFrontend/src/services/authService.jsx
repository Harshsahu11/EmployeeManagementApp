import api from "./api";

export const login = (payload) => api.post("/auth/login", payload);

export const register = (payload) => api.post("/auth/register", payload);

const decodeJwtPayload = (token) => {
  try {
    const payload = token?.split(".")?.[1];

    if (!payload) {
      return null;
    }

    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decodedPayload = atob(normalizedPayload);

    return JSON.parse(decodedPayload);
  } catch {
    return null;
  }
};

const getRoleValue = (role) => {
  if (!role) {
    return "";
  }

  if (typeof role === "string") {
    return role;
  }

  return role.role || role.name || role.authority || "";
};

const collectRoles = (data) => {
  const jwtPayload = decodeJwtPayload(data?.token || data?.jwt || data?.accessToken);
  const roleSources = [
    data?.role,
    data?.user?.role,
    data?.authorities,
    data?.user?.authorities,
    data?.roles,
    data?.user?.roles,
    jwtPayload?.role,
    jwtPayload?.roles,
    jwtPayload?.authorities,
    jwtPayload?.scope,
    jwtPayload?.scp,
  ];

  return roleSources
    .flatMap((roleSource) => {
      if (!roleSource) {
        return [];
      }

      if (Array.isArray(roleSource)) {
        return roleSource.map(getRoleValue);
      }

      if (typeof roleSource === "string") {
        return roleSource.split(/[,\s]+/);
      }

      return [getRoleValue(roleSource)];
    })
    .filter(Boolean);
};

export const saveAuth = (data) => {
  const token = data?.token || data?.jwt || data?.accessToken;

  if (!token) {
    throw new Error("Login succeeded, but no JWT token was returned by the backend.");
  }

  localStorage.setItem("token", token);

  const roles = collectRoles(data);
  const user = {
    username: data?.username || data?.user?.username,
    email: data?.email || data?.user?.email,
    role: roles[0],
    roles,
  };

  localStorage.setItem("user", JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const isAuthenticated = () => Boolean(localStorage.getItem("token"));

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  try {
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export const getUserRoles = () => {
  const currentUser = getCurrentUser();
  const tokenRoles = collectRoles({
    token: localStorage.getItem("token"),
  });

  return [currentUser?.role, currentUser?.roles, tokenRoles]
    .flatMap((roleSource) => {
      if (!roleSource) {
        return [];
      }

      return Array.isArray(roleSource) ? roleSource : [roleSource];
    })
    .map(getRoleValue)
    .filter(Boolean);
};

export const getUserRole = () => getUserRoles()[0];

export const isAdmin = () => {
  return getUserRoles().some((role) => role.toString().toUpperCase().replace("ROLE_", "") === "ADMIN");
};
