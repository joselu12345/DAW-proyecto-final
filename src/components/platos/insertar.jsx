"use client";
import { insertarPlato } from "@/lib/actions";
import { useActionState, useEffect, useId } from "react";
import { toast } from "sonner";

function PlatoInsertar() {
  const formId = useId();

  const [state, action, pending] = useActionState(insertarPlato, {});

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      document.getElementById(formId)?.closest("dialog")?.close();
    }
  }, [state]);

  return (
    <form className="flex flex-col gap-4" action={action} id={formId}>
      <h1 className="text-xl text-blue-500">Nuevo plato</h1>

      <label>
        Nombre:
        <input name="nombre" placeholder="Nombre" />
      </label>

      <label>
        Precio:
        <input name="precio" type="number" step={0.01} min={0} />
      </label>

      <label>
        Foto:
        <input name="foto" placeholder="URL" />
      </label>

      <button
        disabled={pending}
        className="p-2 rounded-lg bg-green-500 text-white cursor-pointer disabled:bg-gray-400 disabled:cursor-default"
      >
        {pending ? "En proceso..." : "Insertar plato"}
      </button>
    </form>
  );
}

export default PlatoInsertar;
