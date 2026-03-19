"use client";
import { modificarRepartidor } from "@/lib/actions";
import { useActionState, useEffect, useId } from "react";
import { toast } from "sonner";

function RepartidorModificar({ repartidor }) {
  const formId = useId();

  const [state, action, pending] = useActionState(modificarRepartidor, {});

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      document.getElementById(formId)?.closest("dialog")?.close();
    }
  }, [state]);

  return (
    <form className="flex flex-col gap-4" action={action} id={formId}>
      <h1 className="text-xl text-blue-500">Modificar repartidor</h1>

      <input type="hidden" name="id" defaultValue={repartidor.id} />

      <label>
        Nombre:
        <input name="nombre" defaultValue={repartidor.nombre} />
      </label>

      <label>
        Teléfono:
        <input name="telefono" defaultValue={repartidor.telefono} />
      </label>

      <button
        disabled={pending}
        className="p-2 rounded-lg bg-orange-400 text-white cursor-pointer disabled:bg-gray-400 disabled:cursor-default"
      >
        {pending ? "En proceso..." : "Modificar repartidor"}
      </button>
    </form>
  );
}

export default RepartidorModificar;
