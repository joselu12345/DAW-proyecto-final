import { obtenerRepartidores } from "@/lib/data";
import Link from "next/link";
import Modal from "@/components/modal";
import RepartidorInsertar from "./insertar";
import RepartidorModificar from "./modificar";
import RepartidorEliminar from "./eliminar";

export default async function Repartidores() {
  const repartidores = await obtenerRepartidores();

  return (
    <div className="flex flex-col gap-4">
      <Modal
        openElement={
          <p className="inline p-2 rounded-lg bg-green-500 text-white cursor-pointer">
            Insertar
          </p>
        }
      >
        <RepartidorInsertar />
      </Modal>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {repartidores.map((repartidor) => (
          <div
            key={repartidor.id}
            className="p-4 bg-slate-200 rounded-lg shadow-md"
          >
            <div className="flex flex-col gap-4">
              <Link
                href={`/repartidores/${repartidor.id}`}
                className="font-bold cursor-pointer"
              >
                {repartidor.nombre}
              </Link>
              <p>Teléfono: {repartidor.telefono}</p>

              <Modal
                openElement={
                  <span className="p-2 rounded-lg bg-yellow-400 text-white cursor-pointer">
                    Modificar
                  </span>
                }
              >
                <RepartidorModificar repartidor={repartidor} />
              </Modal>

              <Modal
                openElement={
                  <p className="inline p-2 rounded-lg bg-red-600 text-white cursor-pointer">
                    Eliminar
                  </p>
                }
              >
                <RepartidorEliminar repartidor={repartidor} />
              </Modal>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}
