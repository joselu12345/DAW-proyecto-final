import { auth } from "@/auth";
import { logout } from "@/lib/actions";
import { obtenerUsuarioPorId, obtenerUsuarios } from "@/lib/data/users";
import { redirect } from "next/navigation";
import { Suspense, use } from "react";
import ListaUsuarios from "@/components/users/lista";
import Modal from "@/components/modal";
import { IconoModificar } from "@/components/ui/icons";
import Form from "@/components/users/form";
import { editUser } from "@/lib/actions/users";
import { labelModificar } from "@/components/ui/labels";
import Link from "next/link";
import { obtenerPedidos, obtenerPedidosDeUsuario } from "@/lib/data";

export default async function Dashboard() {
  const sesion = await auth();
  if (!sesion) redirect("/auth/login");

  const isAdminSession = sesion.user?.role == "ADMIN";

  return (
    <div className="p-4 md:p-10">
      <h1 className="text-3xl font-bold">Panel de usuario</h1>

      <Suspense fallback={"Cargando ..."}>
        <UserInfo session={sesion} />
      </Suspense>

      {sesion && (
        <form className="mt-4 bg-black text-white inline-block py-2 px-4 rounded-md">
          <button formAction={logout}>Logout</button>
        </form>
      )}

      {isAdminSession && (
        <div className="mt-6">
          <h1 className="text-xl font-bold mt-15">Lista de usuarios</h1>
          <Suspense fallback={"Cargando usuarios..."}>
            <ListaUsuarios
              session={sesion}
              promesaUsuarios={obtenerUsuarios()}
            />
          </Suspense>
        </div>
      )}

      <Link href="/pedidos">
        <h1 className="mt-16 text-xl font-bold mb-8">Lista de pedidos</h1>
      </Link>
      <Suspense fallback={"Cargando pedidos ..."}>
        {isAdminSession ? (
          <UserPedidos
            isAdminSession={isAdminSession}
            promesaPedidos={obtenerPedidos()}
          /> // Todos los pedidos
        ) : (
          <UserPedidos
            isAdminSession={isAdminSession}
            promesaPedidos={obtenerPedidosDeUsuario(sesion.user.id)}
          />
        )}
      </Suspense>
    </div>
  );
}

async function UserInfo({ session }) {
  const usuario = await obtenerUsuarioPorId(session.user.id);
  const isAdminSession = session.user.role === "ADMIN";

  return (
    <div className="grid md:grid-cols-[160px_auto] gap-2">
      <img
        src={usuario?.image || "/images/avatar-80.png"}
        className="size-36"
        alt="Imagen de usuario"
      />

      <div className="flex flex-col gap-1">
        <div className="flex gap-2 items-center">
          <p className="font-bold">{usuario.name}</p>
          <Modal openElement={<IconoModificar />}>
            <Form
              action={editUser}
              isAdminSession={isAdminSession}
              user={usuario}
              labelSubmit={labelModificar}
            />
          </Modal>
        </div>
        <p>{usuario.email}</p>
        <p>{usuario.address}</p>
        <p>{usuario.phone}</p>
        <p>{usuario.role}</p>
      </div>
    </div>
  );
}

function UserPedidos({ isAdminSession, promesaPedidos }) {
  const pedidos = use(promesaPedidos);

  if (pedidos.length == 0) return <p>No se han realizados pedidos aún</p>;

  return pedidos
    .sort((a, b) => b.fecha_hora - a.fecha_hora) // ordenado desde reciente a antiguo
    .map((pedido) => (
      <div
        key={pedido.id}
        className="p-2 flex  justify-between items-center gap-4 rounded-full even:bg-blue-100 odd:bg-slate-100 hover:outline hover:outline-slate-400"
      >
        <div className="relative group font-mono grid grid-cols-[40px_60px_auto] items-center">
          <img
            src={pedido.user?.image || "/images/avatar-80.png"}
            alt="avatar"
            className="size-8"
          />

          <span>{pedido.id.toString().padStart(4, "_")}</span>
          <span>
            {pedido.fecha_hora.toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "Europe/Madrid",
            })}
          </span>

          <Popover pedido={pedido} />
        </div>
      </div>
    ));
}

const Popover = ({ pedido }) => (
  <div className="absolute left-10 bottom-1 z-50 mt-2 hidden group-hover:block bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-2xl p-4 min-w-[320px] font-sans">
    <div className="border border-slate-300 rounded-md p-2">
      <PedidoCard pedido={pedido} />
    </div>

    <div className="grid grid-cols-[60px_auto] gap-4 mt-4 border border-slate-300 rounded-md p-2">
      <img src={pedido.user?.image} alt="" className="size-14" />
      <div>
        <p>Cliente: {pedido.user?.name}</p>
        <p>Dirección: {pedido.user?.address}</p>
        <p>Teléfono: {pedido.user?.phone}</p>
      </div>
    </div>

    <div className="mt-4 border border-slate-300 rounded-md p-2">
      <p>Repartidor: {pedido.repartidor?.nombre}</p>
      <p>Tfno repartidor: {pedido.repartidor?.telefono}</p>
    </div>
  </div>
);

export const PedidoCard = ({ pedido }) => (
  <div className="cursor-pointer hover:bg-indigo-100 my-2 p-2">
    <div className="flex gap-4 font-bold">
      <span>Nº {pedido.id}</span>
      <span>
        {new Intl.DateTimeFormat("es-ES", {
          dateStyle: "full",
          timeStyle: "long",
          timeZone: "Europe/Madrid",
        }).format(pedido.fecha_hora)}
      </span>
    </div>
  </div>
);
