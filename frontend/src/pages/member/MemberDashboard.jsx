import LogoutButton from "../../components/LogoutButton";

export default function MemberDashboard() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">
        MEMBER DASHBOARD
      </h1>

      <p className="text-gray-600 mb-6">
        Selamat datang di dashboard member CBR Soloraya
      </p>

      <LogoutButton />
    </div>
  );
}

