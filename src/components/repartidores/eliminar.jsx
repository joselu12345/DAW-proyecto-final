"use client";
import { eliminarRepartidor } from "@/lib/actions";
import { useActionState, useEffect, useId } from "react";
import { toast } from "sonner";

function RepartidorEliminar({ repartidor }) {
  const formId = useId();

  const [state, action, pending] = useActionState(eliminarRepartidor, {});

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
      <p>REPARTIDOR: {repartidor.nombre}</p>
      <p>TELÉFONO: {repartidor.telefono}</p>
      <form className="flex flex-col gap-4" action={action}>
        <input type="hidden" name="id" defaultValue={repartidor.id} />
        <button
          disabled={pending}
          className="p-2 rounded-lg bg-red-600 text-white cursor-pointer disabled:bg-gray-400 disabled:cursor-default"
        >
          {pending ? "En proceso..." : "Eliminar repartidor"}
        </button>
      </form>
    </div>
  );
}

export default RepartidorEliminar;
