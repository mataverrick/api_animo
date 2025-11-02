import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function formatoDDMMYYYY(fecha) {
  const d = new Date(fecha);
  const dia = String(d.getUTCDate()).padStart(2, "0");
  const mes = String(d.getUTCMonth() + 1).padStart(2, "0");
  const anio = d.getUTCFullYear();
  return `${dia}-${mes}-${anio}`;
}

function parseFecha(fechaStr) {
  const regex = /^(\d{2})-(\d{2})-(\d{4})$/;
  const match = fechaStr?.match(regex);
  if (!match) throw new Error("Formato de fecha no valido. Tienes que usar dd-mm-yyyy altiro");
  const [_, dia, mes, anio] = match;
  const fecha = new Date(`${anio}-${mes}-${dia}T00:00:00Z`);
  if (isNaN(fecha.getTime())) throw new Error("Fecha no valida.");
  return fecha;
}

export const crearEstado = async (req, res) => {
  const { fecha, emocion } = req.body;
  if (!emocion)
    return res.status(400).json({ error: "Debes enviar una emocion valida" });

  try {
    const fechaValida = parseFecha(fecha);
    await prisma.estado.create({
      data: {
        fecha: fechaValida,
        emocion,
      },
    });
    res.status(200).json({ message: "ready" });
  } catch (error) {
    res.status(400).json({ error: error.message || "Error en los datos" });
  }
};

export const obtenerEstadoDia = async (req, res) => {
  try {
    const hoy = new Date();
    const inicioDia = new Date(hoy.setUTCHours(0, 0, 0, 0));
    const finDia = new Date(hoy.setUTCHours(23, 59, 59, 999));

    const emociones = await prisma.estado.findMany({
      where: {
        fecha: {
          gte: inicioDia,
          lte: finDia,
        },
      },
      orderBy: { fecha: "desc" },
    });

    const emocionesFormateadas = emociones.map((e) => ({
      ...e,
      fecha: formatoDDMMYYYY(e.fecha),
    }));

    res.status(200).json(emocionesFormateadas);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const obtenerEstadoSemana = async (req, res) => {
  try {
    const hoy = new Date();
    const diaSemana = hoy.getUTCDay();
    const inicioSemana = new Date(hoy);
    inicioSemana.setUTCDate(hoy.getUTCDate() - diaSemana);
    inicioSemana.setUTCHours(0, 0, 0, 0);

    const finSemana = new Date(inicioSemana);
    finSemana.setUTCDate(inicioSemana.getUTCDate() + 6);
    finSemana.setUTCHours(23, 59, 59, 999);

    const emociones = await prisma.estado.findMany({
      where: {
        fecha: {
          gte: inicioSemana,
          lte: finSemana,
        },
      },
      orderBy: { fecha: "asc" },
    });

    const emocionesFormateadas = emociones.map((e) => ({
      ...e,
      fecha: formatoDDMMYYYY(e.fecha),
    }));

    res.status(200).json(emocionesFormateadas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los datos" });
  }
};

export const obtenerEstadoMes = async (req, res) => {
  try {
    const hoy = new Date();
    const inicioMes = new Date(
      Date.UTC(hoy.getUTCFullYear(), hoy.getUTCMonth(), 1, 0, 0, 0)
    );
    const finMes = new Date(
      Date.UTC(hoy.getUTCFullYear(), hoy.getUTCMonth() + 1, 0, 23, 59, 59)
    );

    const emociones = await prisma.estado.findMany({
      where: {
        fecha: {
          gte: inicioMes,
          lte: finMes,
        },
      },
      orderBy: { fecha: "asc" },
    });

    const emocionesFormateadas = emociones.map((e) => ({
      ...e,
      fecha: formatoDDMMYYYY(e.fecha),
    }));

    res.status(200).json(emocionesFormateadas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los datos" });
  }
};
