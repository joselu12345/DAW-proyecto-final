"use client";
import { eliminarPlato } from "@/lib/actions";
import { useActionState, useEffect, useId } from "react";
import { toast } from "sonner";

function PlatoEliminar({ plato }) {
  const formId = useId();

  const [state, action, pending] = useActionState(eliminarPlato, {});

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
      <p>PLATO: {plato.nombre}</p>
      <p>PRECIO: {plato.precio}</p>

      <form className="flex flex-col gap-4" action={action}>
        <input type="hidden" name="id" defaultValue={plato.id} />
        <button
          disabled={pending}
          className="p-2 rounded-lg bg-red-600 text-white cursor-pointer disabled:bg-gray-400 disabled:cursor-default"
        >
          {pending ? "En proceso..." : "Eliminar plato"}
        </button>
      </form>
    </div>
  );
}

export default PlatoEliminar;
