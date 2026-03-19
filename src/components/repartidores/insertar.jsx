"use client";
import { insertarRepartidor } from "@/lib/actions";
import { useActionState, useEffect, useId } from "react";
import { toast } from "sonner";

function RepartidorInsertar() {
  const formId = useId();

  const [state, action, pending] = useActionState(insertarRepartidor, {});

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      document.getElementById(formId)?.closest("dialog")?.close();
    }
  }, [state]);

  return (
    <form className="flex flex-col gap-4" action={action} id={formId}>
      <h1 className="text-xl text-blue-500">Nuevo repartidor</h1>

      <label>
        Nombre:
        <input name="nombre" placeholder="Nombre" />
      </label>

      <label>
        Teléfono:
        <input name="telefono" placeholder="Teléfono" />
      </label>

      <button
        disabled={pending}
        className="p-2 rounded-lg bg-green-500 text-white cursor-pointer disabled:bg-gray-400 disabled:cursor-default"
      >
        {pending ? "En proceso..." : "Insertar repartidor"}
      </button>
    </form>
  );
}

export default RepartidorInsertar;
