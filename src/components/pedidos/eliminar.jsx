"use client";
import { eliminarPedido } from "@/lib/actions";
import { useActionState, useEffect, useId } from "react";
import { toast } from "sonner";

function PedidoEliminar({ pedido }) {
  const formId = useId();

  const [state, action, pending] = useActionState(eliminarPedido, {});

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      document.getElementById(formId)?.closest("dialog")?.close();
    }
  }, [state]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl text-red-600">
        ¿Desea eliminar los siguentes datos?
      </h1>
      <p>FECHA Y HORA: {new Date(pedido.fecha_hora).toLocaleString()}</p>
      <p>NOMBRE CLIENTE: {pedido.nombre_cliente}</p>
      <p>DOMICILIO CLIENTE: {pedido.user?.address || "sin domicilio"}</p>
      <p>DIRECCIÓN DE ENVÍO: {pedido.direccion_cliente}</p>

      <form className="flex flex-col gap-4" action={action} id={formId}>
        <input type="hidden" name="id" defaultValue={pedido.id} />
        <button
          disabled={pending}
          className="p-2 rounded-lg bg-red-600 text-white cursor-pointer disabled:bg-gray-400 disabled:cursor-default"
        >
          {pending ? "En proceso..." : "Eliminar pedido"}
        </button>
      </form>
    </div>
  );
}

export default PedidoEliminar;
