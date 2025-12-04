import { modificarPlato } from "@/lib/actions";

function PlatoModificar({ plato }) {
  return (
    <form className="flex flex-col gap-4" action={modificarPlato}>
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

      <button className="p-2 rounded-lg bg-yellow-400 text-white cursor-pointer">
        Modificar
      </button>
    </form>
  );
}

export default PlatoModificar;
