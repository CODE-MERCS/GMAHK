import withRole from "../middleware/WithRole";

const DashboardPendetaPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-green-700">Selamat Datang, Pendeta! 🙏</h1>
        <p className="text-lg text-gray-600 mt-4">
          Semoga hari Anda penuh berkat dan kebijaksanaan dalam melayani jemaat.
        </p>
      </div>
    </div>
  );
};

export default withRole(DashboardPendetaPage, "PENDETA");
