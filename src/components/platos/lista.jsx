import { obtenerPlatos } from "@/lib/data";
import Link from "next/link";
import Modal from "@/components/modal";
import PlatoInsertar from "./insertar";
import PlatoModificar from "./modificar";
import PlatoEliminar from "./eliminar";
import { auth } from "@/auth";

export default async function Platos() {
  const platos = await obtenerPlatos();
  const sesion = await auth();

  return (
    <div className="flex flex-col gap-4">
      {sesion && sesion?.user?.role === "ADMIN" && (
        <Modal
          openElement={
            <p className="inline p-2 rounded-lg bg-green-500 text-white cursor-pointer">
              Insertar
            </p>
          }
        >
          <PlatoInsertar />
        </Modal>
      )}

      {platos.map((plato) => (
        <div key={plato.id} className="p-4 mb-4 bg-cyan-100 rounded-lg">
          <div className="flex flex-col gap-4">
            <Link
              href={`/platos/${plato.id}`}
              className="font-bold cursor-pointer"
            >
              {plato.nombre}
            </Link>
            <p>{plato.precio} €</p>
            <p>
              <img width={300} src={plato.foto} />
            </p>

            {sesion && sesion?.user?.role === "ADMIN" && (
              <Modal
                openElement={
                  <p className="inline p-2 rounded-lg bg-yellow-400 text-white cursor-pointer">
                    Modificar
                  </p>
                }
              >
                <PlatoModificar plato={plato} />
              </Modal>
            )}

            {sesion && sesion?.user?.role === "ADMIN" && (
              <Modal
                openElement={
                  <p className="inline p-2 rounded-lg bg-red-600 text-white cursor-pointer">
                    Eliminar
                  </p>
                }
              >
                <PlatoEliminar plato={plato} />
              </Modal>
            )}
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}
