import { Navigate, useLocation } from "react-router-dom";
import { getSession } from "../utils/session";

const withRole = (Component: React.ComponentType<any>, allowedRole: string) => {
  return (props: any) => {
    const { token, role } = getSession();
    const location = useLocation();

    // Check if token is available and the role matches the allowed role
    if (!token || role !== allowedRole) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Component {...props} />;
  };
};

export default withRole;