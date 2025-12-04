import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const repartidores = [
  { id: 1, nombre: "Juan", telefono: "666111222" },
  { id: 2, nombre: "Pepe", telefono: "666111333" },
  { id: 3, nombre: "Luis", telefono: "666111444" },
];

const platos = [
  { id: 1, nombre: "Mediterránea", precio: 10.01 },
  { id: 2, nombre: "Carbonara", precio: 11.02 },
  { id: 3, nombre: "Peperoni", precio: 12.03 },
  { id: 4, nombre: "Romana", precio: 13.04 },
];

const pedidos = [
  {
    id: 1,
    fecha_hora: "2024-06-01T20:00:05.000Z",
    nombre_cliente: "Gloria",
    direccion_cliente: "C/ Nueva, 1",
    repartidorId: 2,
    platos: {
      connect: [{ id: 1 }, { id: 3 }, { id: 4 }],
    },
  },
  {
    id: 2,
    fecha_hora: "2024-06-01T20:12:05.000Z",
    nombre_cliente: "Isabel",
    direccion_cliente: "C/ Nueva, 2",
    repartidorId: 3,
    platos: {
      connect: [{ id: 2 }, { id: 4 }],
    },
  },
];

// Eliminar contenido de las tablas
const resetDatabase = async () => {
  await prisma.pedido.deleteMany();
  await prisma.repartidor.deleteMany();
  await prisma.plato.deleteMany();
};

const load = async () => {
  try {
    // reset database
    await resetDatabase();

    await prisma.repartidor.createMany({ data: repartidores });
    console.log(`Repartidores insertados`);

    await prisma.plato.createMany({ data: platos });
    console.log(`Platos insertadas`);

    pedidos.forEach(async (pedido) => {
      await prisma.pedido.create({ data: pedido });
    });
    console.log(`Pedidos insertados`);
  } catch (error) {
    console.error("Error al insertar datos:", error);
  } finally {
    await prisma.$disconnect();
  }
};

load();
