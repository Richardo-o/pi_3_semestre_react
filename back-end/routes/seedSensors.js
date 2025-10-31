// routes/seedSensors.js
import express from "express";
import mongoose from "mongoose";
import Sensor from "../models/Sensor.js"; // ajuste o path conforme seu projeto

const router = express.Router();

/**
 * POST /seed-sensores
 * body (json): {
 *   hortalicaId: string,
 *   userId: string,
 *   days: number,         // quantos dias para gerar (default 7)
 *   startDate: string,    // ISO date string para o primeiro dia (default hoje)
 *   baseValues: { temperatura, umidade, luminosidade, nutrientes } // opcional
 * }
 */
router.post("/seed-sensores", async (req, res) => {
  try {
    const {
      hortalicaId,
      userId,
      days = 7,
      startDate = new Date().toISOString(),
      baseValues = {}
    } = req.body;

    if (!hortalicaId || !userId) {
      return res.status(400).json({ error: "hortalicaId e userId são obrigatórios" });
    }

    const start = new Date(startDate);
    if (isNaN(start)) return res.status(400).json({ error: "startDate inválido" });

    // Gera documentos com createdAt mocado (um por dia, decrementando)
    const docs = [];
    for (let i = 0; i < Number(days); i++) {
      const d = new Date(start);
      d.setDate(start.getDate() - i); // dia a dia no passado
      const createdAt = d.toISOString();

      // valores base (ou aleatórios simples)
      const temperatura = baseValues.temperatura ?? (20 + Math.round(Math.random() * 8) + 0.5);
      const umidade = baseValues.umidade ?? (50 + Math.round(Math.random() * 30));
      const luminosidade = baseValues.luminosidade ?? (2000 + Math.round(Math.random() * 12000));
      const nutrientes = baseValues.nutrientes ?? (30 + Math.round(Math.random() * 30));

      docs.push({
        hortalica: new mongoose.Types.ObjectId(hortalicaId),
        temperatura,
        umidade,
        luminosidade,
        nutrientes,
        user: new mongoose.Types.ObjectId(userId),
        createdAt,   // mocado
        updatedAt: createdAt
      });
    }

    // usa collection.insertMany para inserir os docs "crus" com createdAt obedecido
    const result = await Sensor.collection.insertMany(docs);

    return res.json({
      insertedCount: result.insertedCount,
      insertedIds: result.insertedIds
    });
  } catch (err) {
    console.error("seed error:", err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;
