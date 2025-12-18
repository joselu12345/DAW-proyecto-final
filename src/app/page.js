// import { auth } from "@/auth";
// import { redirect } from "next/dist/server/api-utils";
// import Link from "next/link";

// export default async function Home() {
//   const sesion = await auth();

//   //if (!sesion) redirect('/auth/login')

//   if (!sesion)
//     return (
//       <div className="h-screen grid place-content-center gap-4">
//         {/* <div className="text-5xl">🍕</div> */}
//         <img src="/images/logo.png" alt="logo" className="size-40"></img>
//         <Link href="/platos" className="block text-2xl font-bold">
//           PLATOS
//         </Link>
//       </div>
//     );

//   if (sesion && sesion.user.role === "USER")
//     return (
//       <div className="h-screen grid place-content-center gap-4">
//         {/* <div className="text-5xl">🍕</div> */}
//         <img src="/images/logo.png" alt="logo" className="size-40"></img>
//         <Link href="/pedidos" className="block text-2xl font-bold">
//           PEDIDOS
//         </Link>
//         <Link href="/platos" className="block text-2xl font-bold">
//           PLATOS
//         </Link>
//       </div>
//     );

//   if (sesion && sesion.user.role === "ADMIN")
//     return (
//       <div className="h-screen grid place-content-center gap-4">
//         {/* <div className="text-5xl">🍕</div> */}
//         <img src="/images/logo.png" alt="logo" className="size-40"></img>
//         <Link href="/repartidores" className="block text-2xl font-bold">
//           REPARTIDORES
//         </Link>
//         <Link href="/pedidos" className="block text-2xl font-bold">
//           PEDIDOS
//         </Link>
//         <Link href="/platos" className="block text-2xl font-bold">
//           PLATOS
//         </Link>
//       </div>
//     );
// }

import { auth } from "@/auth";
import Link from "next/link";

export default async function Home() {
  const sesion = await auth();

  // Usuario NO autenticado

  if (!sesion || !sesion.user) {
    return (
      <div className="h-screen grid place-content-center gap-4">
        <img src="/images/logo.png" alt="logo" className="size-40" />
        <Link href="/platos" className="block text-2xl font-bold">
          PLATOS
        </Link>
      </div>
    );
  }

  const role = sesion.user.role;

  // Usuario normal
  if (role === "USER") {
    return (
      <div className="h-screen grid place-content-center gap-4">
        <img src="/images/logo.png" alt="logo" className="size-40" />
        <Link href="/pedidos" className="block text-2xl font-bold">
          PEDIDOS
        </Link>
        <Link href="/platos" className="block text-2xl font-bold">
          PLATOS
        </Link>
      </div>
    );
  }

  // Administrador
  if (role === "ADMIN") {
    return (
      <div className="h-screen grid place-content-center gap-4">
        <img src="/images/logo.png" alt="logo" className="size-40" />
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

  // Fallback de seguridad
  return null;
}
