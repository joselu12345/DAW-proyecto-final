import { auth } from "@/auth";
import { logout } from "@/lib/actions";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import ListaUsuarios from "@/components/users/lista";
import { obtenerUsuarios } from "@/lib/data/users";

async function Dashboard() {
  const sesion = await auth();
  if (!sesion) redirect("/auth/login");
  const isAdminSession = sesion.user?.role == "ADMIN";

  return (
    <div className="p-10 m-10 flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold">DASHBOARD</h1>
      <img
        src={sesion.user.image || "/images/default-user3.webp"}
        className="size-60"
      />
      <p className="text-xl">Nombre de usuario: {sesion.user.name}</p>
      <p className="text-xl">Correo: {sesion.user.email}</p>
      <form className="px-4 py-2 bg-black text-white rounded-md cursor-pointer">
        <button formAction={logout}>Logout</button>
      </form>

      {isAdminSession && (
        <div className="w-full">
          <h1 className="text-xl text-left mt-20 font-bold mt-15">
            Lista de usuarios
          </h1>
          <Suspense fallback={"cargando ...."}>
            <ListaUsuarios
              session={sesion}
              promesaUsuarios={obtenerUsuarios()}
            />
          </Suspense>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
