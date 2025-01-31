// pages/Dashboard.tsx
import withRole from "../middleware/WithRole";


const DashboardPendetaPage = () => {
  return (
    <div>
      <h1>Welcome Pendeta!</h1>
      <p>This is your dashboard.</p>
    </div>
  );
};

export default withRole(DashboardPendetaPage, "PENDETA");
