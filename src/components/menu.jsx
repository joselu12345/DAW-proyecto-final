import Link from "next/link";
import { auth } from "@/auth";

const menuLinks = {
  guest: [{ href: "/platos", label: "PLATOS" }],
  USER: [
    { href: "/pedidos", label: "PEDIDOS" },
    { href: "/platos", label: "PLATOS" },
  ],
  ADMIN: [
    { href: "/repartidores", label: "REPARTIDORES" },
    { href: "/pedidos", label: "PEDIDOS" },
    { href: "/platos", label: "PLATOS" },
  ],
};

export default async function Menu() {
  const sesion = await auth();

  const role = sesion?.user?.role;
  const links = menuLinks[role] ?? menuLinks.guest;

  return (
    <nav className="fixed top-16 right-5 flex flex-col gap-2 items-end">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="block text-md font-bold bg-blue-300/80 px-2 py-1 rounded-lg"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
