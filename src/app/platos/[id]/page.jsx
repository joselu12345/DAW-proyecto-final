import Plato from "@/components/platos/item";
import { Suspense } from "react";

async function PaginaPlato({ params, searchParams }) {
  const { id } = await params;

  return (
    <div>
      <h1 className="font-bold text-2xl">DATOS DE PLATO</h1>
      <Suspense
        fallback={
          <p className="text-blue-500 text-2xl font-bold animate-pulse">
            Obteniendo datos...
          </p>
        }
      >
        <Plato id={id} />
      </Suspense>
    </div>
  );
}

export default PaginaPlato;
