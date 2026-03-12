import Pedidos from "@/components/pedidos/lista";
import Link from "next/link";
import { Suspense } from "react";

function PaginaPedidos() {
  return (
    <div className="m-10">
      <Link href="/" className="text-5xl">
        🏡
      </Link>
      <h1 className="text-3xl font-bold mb-4">LISTA DE PEDIDOS</h1>

      <Suspense fallback={"Obteniendo pedido ..."}>
        <Pedidos />
      </Suspense>
    </div>
  );
}

export default PaginaPedidos;
