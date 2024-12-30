import { Routes, Route } from "react-router-dom";
import CreateUser from "../Pages/CreateUser";
import CreateClass from "../Pages/CreateClass";
import ListUsers from "../Pages/ListUsers";
import ListUserClasses from "../Pages/ListUserClasses";
import ListClasses from "../Pages/ListClasses";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/users" element={<ListUsers />} />
      <Route path="/user_classes" element={<ListUserClasses />} />
      <Route path="/user" element={<CreateUser />} />
      <Route path="/classes" element={<ListClasses />} />
      <Route path="/class" element={<CreateClass />} />
    </Routes>
  );
};

export default AppRoutes;
