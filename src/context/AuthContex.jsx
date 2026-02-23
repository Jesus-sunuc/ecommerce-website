import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("currentUserEmail")
      ? { email: localStorage.getItem("currentUserEmail") }
      : null,
  );

  const signup = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) ?? [];

    if (users.find((u) => u.email === email)) {
      return { success: false, message: "User already exists" };
    }

    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUserEmail", email);

    setUser({ email });

    return { success: true, message: "User registered successfully" };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) ?? [];

    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if(!user) {
      return { success: false, message: "Invalid email or password" };
    }

    localStorage.setItem("currentUserEmail", user.email);
    setUser(user);

    return { success: true, message: "Login successful" };
  };

  const logout = () => {
    localStorage.removeItem("currentUserEmail");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ signup, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
