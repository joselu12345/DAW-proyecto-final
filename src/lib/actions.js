"use server";
import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";

import bcrypt from "bcryptjs";
//import { prisma } from '@/lib/prisma'
import { signIn, signOut } from "@/auth";
import { getUserByEmail } from "@/lib/data";

//  ------------------------ REPARTIDORES ------------------------

export async function insertarRepartidor(formData) {
  const nombre = formData.get("nombre");
  const telefono = formData.get("telefono");

  await prisma.repartidor.create({
    data: {
      nombre: nombre,
      telefono: telefono,
    },
  });

  revalidatePath("/repartidores");
}

export async function modificarRepartidor(formData) {
  const id = Number(formData.get("id"));
  const nombre = formData.get("nombre");
  const telefono = formData.get("telefono");

  await prisma.repartidor.update({
    where: {
      id: id,
    },
    data: {
      nombre: nombre,
      telefono: telefono,
    },
  });

  revalidatePath("/repartidores");
}

export async function eliminarRepartidor(formData) {
  const id = Number(formData.get("id"));

  await prisma.repartidor.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/repartidores");
}

//  ------------------------ PEDIDOS ------------------------

export async function insertarPedido(prevState, formData) {
  const userId = formData.get("userId");
  const fecha_hora = new Date(formData.get("fecha_hora"));
  const nombre_cliente = formData.get("nombre_cliente");
  const direccion_cliente = formData.get("direccion_cliente");

  const repartidorId = Number(formData.get("repartidorId")) || null;

  const platosIDs = await prisma.plato.findMany({
    select: { id: true },
  });
  // console.log(platosIDs);
  const connect = platosIDs.filter(
    (p) => formData.get(`plato${p.id}`) !== null
  );
  // console.log(connect);

  await prisma.pedido.create({
    data: {
      fecha_hora: fecha_hora,
      nombre_cliente: nombre_cliente,
      direccion_cliente: direccion_cliente,
      repartidorId: repartidorId,
      platos: { connect },
      userId: userId,
    },
  });

  revalidatePath("/pedidos");
  return { success: "Operación realizada correctamente" };
}

export async function modificarPedido(prevState, formData) {
  const id = Number(formData.get("id"));
  const fecha_hora = new Date(formData.get("fecha_hora"));
  const nombre_cliente = formData.get("nombre_cliente");
  const direccion_cliente = formData.get("direccion_cliente");

  const repartidorId = Number(formData.get("repartidorId")) || null;

  const platosIDs = await prisma.plato.findMany({
    select: { id: true },
  });
  // console.log(platosIDs);
  const connect = platosIDs.filter(
    (p) => formData.get(`plato${p.id}`) !== null
  );
  const disconnect = platosIDs.filter(
    (p) => formData.get(`plato${p.id}`) === null
  );
  // console.log(connect);

  await prisma.pedido.update({
    where: {
      id: id,
    },
    data: {
      fecha_hora: fecha_hora,
      nombre_cliente: nombre_cliente,
      direccion_cliente: direccion_cliente,
      repartidorId: repartidorId,
      platos: { connect, disconnect },
    },
  });

  revalidatePath("/pedidos");
  return { success: "Operación realizada correctamente" };
}

export async function eliminarPedido(prevState, formData) {
  const id = Number(formData.get("id"));

  await prisma.pedido.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/pedidos");
  return { success: "Operación realizada correctamente" };
}

// ------------------------------- PLATOS -----------------------

export async function insertarPlato(formData) {
  const nombre = formData.get("nombre");
  const precio = Number(formData.get("precio"));
  const foto = formData.get("foto");

  await prisma.plato.create({
    data: {
      nombre: nombre,
      precio: precio,
      foto: foto,
    },
  });

  revalidatePath("/platos");
  return { success: "Éxito al realizar la operación" };
}

export async function modificarPlato(formData) {
  const id = Number(formData.get("id"));
  const nombre = formData.get("nombre");
  const precio = Number(formData.get("precio"));
  const foto = formData.get("foto");

  await prisma.plato.update({
    where: {
      id: id,
    },
    data: {
      nombre: nombre,
      precio: precio,
      foto: foto,
    },
  });

  revalidatePath("/platos");
}

export async function eliminarPlato(formData) {
  const id = Number(formData.get("id"));

  await prisma.plato.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/platos");
}

//////////////////////////////////////////////////////////////////////////////////////

// REGISTER
export async function register(prevState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  // Comprobamos si el usuario ya está registrado
  const user = await getUserByEmail(email);

  if (user) {
    return {
      error: "El email ya está registrado",
      fields: Object.fromEntries(formData.entries()),
    };
  }

  // Encriptamos password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Guardamos credenciales en base datos
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: "Registro correcto" };
}

// LOGIN credentials
export async function login(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  // Comprobamos si el usuario está registrado
  const user = await getUserByEmail(email);

  if (!user) {
    return {
      error: "Usuario no registrado.",
      fields: Object.fromEntries(formData.entries()),
    };
  }

  if (user.password == null) {
    return {
      error: "Este usuario esta registrado con " + user.accounts[0].provider,
    };
  }
  // Comparamos password
  const matchPassword = await bcrypt.compare(password, user.password);

  if (user && matchPassword) {
    // && user.emailVerified
    await signIn("credentials", {
      email,
      password,
      redirectTo: globalThis.callbackUrl,
    });
    return { success: "Inicio de sesión correcto" };
  } else {
    return {
      error: "Credenciales incorrectas.",
      fields: Object.fromEntries(formData.entries()),
    };
  }
}

// LOGIN google
export async function loginGoogle() {
  try {
    await signIn("google", { redirectTo: globalThis.callbackUrl });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// LOGIN github
export async function loginGithub() {
  try {
    await signIn("github", { redirectTo: globalThis.callbackUrl });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// LOGIN discord
export async function loginDiscord() {
  try {
    await signIn("discord", { redirectTo: globalThis.callbackUrl });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// LOGIN resend (Magic Link to email)
export async function loginResend(formData) {
  try {
    await signIn("resend", formData);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// LOGOUT
export async function logout() {
  try {
    await signOut({ redirectTo: "/" });
  } catch (error) {
    throw error;
  }
}
