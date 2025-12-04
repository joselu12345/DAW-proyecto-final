import { insertarPlato } from "@/lib/actions";

function PlatoInsertar() {
  return (
    <form className="flex flex-col gap-4" action={insertarPlato}>
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

      <button className="p-2 rounded-lg bg-green-500 text-white cursor-pointer">
        Insertar plato
      </button>
    </form>
  );
}

export default PlatoInsertar;
