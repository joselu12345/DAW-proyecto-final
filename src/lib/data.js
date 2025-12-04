"use server";

import prisma from "@/lib/prisma";

//import { prisma } from '@/lib/prisma'

// ---------------------   REPARTIDORES -----------------------

async function obtenerRepartidores() {
  const repartidores = await prisma.repartidor.findMany();
  return repartidores;
}

async function obtenerRepartidor(id) {
  const repartidor = await prisma.repartidor.findUnique({
    where: { id: +id },
  });
  return repartidor;
}

// ---------------------   PEDIDOS -----------------------

async function obtenerPedidos() {
  const pedidos = await prisma.pedido.findMany({
    include: {
      repartidor: true,
      platos: true,
    },
  });
  return pedidos;
}

async function obtenerPedido(id) {
  const pedido = await prisma.pedido.findUnique({
    where: { id: +id },
    include: {
      repartidor: true,
      platos: true,
    },
  });
  return pedido;
}

async function obtenerPedidosDeUsuario(userId) {
  const pedidos = await prisma.pedido.findMany({
    where: { userId: userId },
    include: {
      repartidor: true,
      platos: true,
    },
  });
  return pedidos;
}

// ---------------------   PLATOS -----------------------

async function obtenerPlatos() {
  const platos = await prisma.plato.findMany();
  return platos;
}

async function obtenerPlato(id) {
  const plato = await prisma.plato.findUnique({
    where: { id: +id },
  });
  return plato;
}

///////////////////////////////////////////////////////////////////////////////////////

export async function getUserById(id) {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
}

export async function getUserByEmail(email) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { accounts: true },
  });
  return user;
}

/////////////////////////////////////////////////////////////////////////////////////////

export {
  obtenerRepartidores,
  obtenerRepartidor,
  obtenerPedidosDeUsuario,
  obtenerPedidos,
  obtenerPedido,
  obtenerPlatos,
  obtenerPlato,
};
