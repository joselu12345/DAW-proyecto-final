import { auth } from "@/auth";
import { redirect } from "next/navigation";

async function Dashboard() {
  const sesion = await auth();
  if (!sesion) redirect("/auth/login");

  return (
    <div className="p-10 m-10">
      <h1 className="text-3xl font-bold">DASHBOARD</h1>
      <img
        src={sesion.user.image || "/images/default-user.png"}
        className="size-80"
      />
      <p>Nombre de usuario: {sesion.user.name}</p>
      <p>Correo: {sesion.user.email}</p>
    </div>
  );
}

export default Dashboard;
