"use client";
import { insertarPedido } from "@/lib/actions";
import { useActionState, useEffect, useId } from "react";

function PedidoInsertar({ repartidores, platos, user }) {
  const formId = useId();

  const [state, action, pending] = useActionState(insertarPedido, {});

  useEffect(() => {
    if (state.success) {
      // toast.success(state.success)
      document.getElementById(formId)?.closest("dialog")?.close();
    }
  }, [state]);

  return (
    <form className="flex flex-col gap-4" action={action} id={formId}>
      <input type="hidden" name="userId" defaultValue={user.id} />
      <h1 className="text-xl text-blue-500">Nuevo pedido</h1>

      <label>
        {" "}
        Fecha y hora:
        <input
          name="fecha_hora"
          type="datetime-local"
          defaultValue={new Date().toISOString().split("Z")[0]}
        />
      </label>

      <label>
        {" "}
        Nombre del cliente:
        <input name="nombre_cliente" defaultValue={user.name} />
      </label>

      <label>
        {" "}
        Dirección del cliente:
        <input name="direccion_cliente" placeholder="Dirección cliente" />
      </label>

      <p className="font-bold">Repartidor</p>
      <select name="repartidorId">
        {repartidores.map((repartidor) => (
          <option key={repartidor.id} value={repartidor.id}>
            {repartidor.nombre}
          </option>
        ))}
      </select>

      <p className="font-bold">Platos</p>
      {platos.map((plato) => (
        <label key={plato.id}>
          <input type="checkbox" name={`plato${plato.id}`} />

          {plato.nombre}
        </label>
      ))}

      <button className="p-2 rounded-lg bg-green-500 text-white cursor-pointer">
        Insertar pedido
      </button>
    </form>
  );
}

export default PedidoInsertar;
