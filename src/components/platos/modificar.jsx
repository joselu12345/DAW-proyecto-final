"use client";
import { modificarPlato } from "@/lib/actions";
import { useActionState, useEffect, useId } from "react";
import { toast } from "sonner";

function PlatoModificar({ plato }) {
  const formId = useId();

  const [state, action, pending] = useActionState(modificarPlato, {});

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      document.getElementById(formId)?.closest("dialog")?.close();
    }
  }, [state]);

  return (
    <form className="flex flex-col gap-4" action={action} id={formId}>
      <h1 className="text-xl text-blue-500">Modificar plato</h1>

      <input type="hidden" name="id" defaultValue={plato.id} />

      <label>
        Nombre:
        <input name="nombre" defaultValue={plato.nombre} />
      </label>

      <label>
        Precio:
        <input
          name="precio"
          type="number"
          step={0.01}
          min={0}
          defaultValue={plato.precio}
        />
      </label>

      <label>
        Foto:
        <input name="foto" defaultValue={plato.foto} />
      </label>

      <button
        disabled={pending}
        className="p-2 rounded-lg bg-orange-400 text-white cursor-pointer disabled:bg-gray-400 disabled:cursor-default"
      >
        {pending ? "En proceso..." : "Modificar plato"}
      </button>
    </form>
  );
}

export default PlatoModificar;
