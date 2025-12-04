import {
  obtenerPedidos,
  obtenerPedidosDeUsuario,
  obtenerPlatos,
  obtenerRepartidores,
} from "@/lib/data";
import Link from "next/link";
import Modal from "@/components/modal";
import PedidoInsertar from "./insertar";
import PedidoModificar from "./modificar";
import PedidoEliminar from "./eliminar";
import { auth } from "@/auth";

export default async function Pedidos() {
  const sesion = await auth();
  let pedidos;

  if (sesion && sesion.user.role === "ADMIN") pedidos = await obtenerPedidos();
  else if (sesion && sesion.user.role === "USER")
    pedidos = await obtenerPedidosDeUsuario(sesion.user.id);

  const repartidores = await obtenerRepartidores();
  const platos = await obtenerPlatos();

  return (
    <div className="flex flex-col gap-4">
      <Modal
        openElement={
          <p className="inline p-2 rounded-lg bg-green-500 text-white cursor-pointer">
            Insertar
          </p>
        }
      >
        <PedidoInsertar
          repartidores={repartidores}
          platos={platos}
          user={sesion.user}
        />
      </Modal>
      {pedidos.map((pedido) => (
        <div key={pedido.id} className="p-4 mb-4 bg-cyan-100 rounded-lg">
          <div className="flex flex-col gap-4">
            <Link
              href={`/pedidos/${pedido.id}`}
              className="font-bold cursor-pointer"
            >
              {new Date(pedido.fecha_hora).toLocaleString()}
            </Link>
            <p>Nombre del cliente: {pedido.nombre_cliente}</p>
            <p>Dirección del cliente: {pedido.direccion_cliente}</p>
            <div>
              Pedido:
              {pedido.platos.map((plato) => (
                <p key={plato.id} className="indent-8">
                  {" "}
                  {plato.nombre}{" "}
                </p>
              ))}
            </div>

            <Modal
              openElement={
                <p className="inline p-2 rounded-lg bg-yellow-400 text-white cursor-pointer">
                  Modificar
                </p>
              }
            >
              <PedidoModificar
                pedido={pedido}
                repartidores={repartidores}
                platos={platos}
              />
            </Modal>

            <Modal
              openElement={
                <p className="inline p-2 rounded-lg bg-red-600 text-white cursor-pointer">
                  Eliminar
                </p>
              }
            >
              <PedidoEliminar pedido={pedido} />
            </Modal>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}
