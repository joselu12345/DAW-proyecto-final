import Image from "next/image";

function Acerca() {
  return (
    <div>
      <h1 className="text-3xl font-bold p-12 ml-20">Acerca de nosotros</h1>

      <div className="flex flex-col gap-4 lg:flex-row pl-20 pr-20 m-10">
        <div>
          <p>
            Restaurante Joselu llega a Montilla como absoluta novedad, un rincón
            culinario donde la tradición y el sabor auténtico se encuentran en
            cada plato. Desde el primer momento, el ambiente cálido y acogedor
            invita a quedarse, con una decoración que combina elementos rústicos
            y modernos para crear una experiencia cómoda y familiar. El aroma
            que surge de la cocina anticipa una comida preparada con dedicación
            y productos frescos.
          </p>
          <p>
            La oferta gastronómica del Restaurante Joselu destaca por su cuidado
            equilibrio entre recetas clásicas y toques contemporáneos. Cada
            especialidad está diseñada para resaltar los ingredientes locales,
            permitiendo que los sabores se expresen de forma natural y plena. Ya
            sea un guiso casero, una carne a la parrilla o una propuesta más
            innovadora, el menú refleja el cariño y la creatividad del equipo de
            cocina.
          </p>
          <p>
            Además de su excelente comida, Restaurante Joselu es conocido por su
            servicio cercano y atento. El personal se esfuerza por brindar una
            experiencia personalizada, recomendando platos, vinos y cuidando
            cada detalle para que los comensales se sientan como en casa. Es un
            lugar ideal para compartir con familia, amigos o para disfrutar de
            una velada especial marcada por el buen gusto y la hospitalidad.
          </p>
        </div>
      </div>
      <Image
        className="px-5 mx-auto p-10"
        src="/images/vista_restaurante.jpg"
        width={400}
        height={700}
        alt=""
      />
    </div>
  );
}

export default Acerca;
