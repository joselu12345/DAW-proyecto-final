import { eliminarPlato } from "@/lib/actions";

function PlatoEliminar({ plato }) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl text-red-600">
        ¿Desea eliminar los siguentes datos?
      </h1>
      <p>PLATO: {plato.nombre}</p>
      <p>PRECIO: {plato.precio}</p>

      <form className="flex flex-col gap-4" action={eliminarPlato}>
        <input type="hidden" name="id" defaultValue={plato.id} />
        <button className="p-2 rounded-lg bg-red-600 text-white cursor-pointer">
          Eliminar
        </button>
      </form>
    </div>
  );
}

export default PlatoEliminar;
