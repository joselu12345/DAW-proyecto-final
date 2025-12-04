import { auth } from "@/auth";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";

export default async function Home() {
  const sesion = await auth();

  //if (!sesion) redirect('/auth/login')

  if (!sesion)
    return (
      <div className="h-screen grid place-content-center gap-4">
        <div className="text-5xl">🍕</div>
        <Link href="/platos" className="block text-2xl font-bold">
          PLATOS
        </Link>
      </div>
    );

  if (sesion && sesion.user.role === "USER")
    return (
      <div className="h-screen grid place-content-center gap-4">
        <div className="text-5xl">🍕</div>
        <Link href="/pedidos" className="block text-2xl font-bold">
          PEDIDOS
        </Link>
        <Link href="/platos" className="block text-2xl font-bold">
          PLATOS
        </Link>
      </div>
    );

  if (sesion && sesion.user.role === "ADMIN")
    return (
      <div className="h-screen grid place-content-center gap-4">
        <div className="text-5xl">🍕</div>
        <Link href="/repartidores" className="block text-2xl font-bold">
          REPARTIDORES
        </Link>
        <Link href="/pedidos" className="block text-2xl font-bold">
          PEDIDOS
        </Link>
        <Link href="/platos" className="block text-2xl font-bold">
          PLATOS
        </Link>
      </div>
    );
}
