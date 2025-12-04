import { obtenerPlato } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function Plato({ id }) {
  const plato = await obtenerPlato(id);
  // console.log(plato);

  if (!plato) notFound();

  return (
    <div>
      <div>Nombre: {plato.nombre}</div>
      <div>Precio: {plato.precio}</div>
      <img width={500} src={plato.foto} />
    </div>
  );
}
