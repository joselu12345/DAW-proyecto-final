import Link from "next/link";
import { auth } from "@/auth";
import { logout } from "@/lib/actions";
import { Pizza } from "lucide-react";

async function Header() {
  const session = await auth();
  // console.log(session);

  return (
    <header className="bg-amber-600 text-white flex px-10 py-2 justify-between items-center">
      <nav className="flex gap-4 items-center">
        <Link className="flex gap-3 items-center" href="/">
          <Pizza />{" "}
          <h1 className="text-2xl font-bold hidden md:block">
            Restaurante Joselu App
          </h1>
        </Link>
        {/* {session?.user?.role === 'ADMIN'
                    && <Link href="/admin">Admin panel</Link>
                } */}
        {session && <Link href="/dashboard">Dashboard</Link>}
        <Link href="/acerca">Acerca</Link>
      </nav>
      <div className="flex gap-4">
        {session ? (
          <form>
            <button formAction={logout}>Logout</button>
          </form>
        ) : (
          <Link href="/auth/login">Login</Link>
        )}
      </div>
    </header>
  );
}

export default Header;
