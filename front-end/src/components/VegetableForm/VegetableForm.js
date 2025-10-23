// src/components/VegetableForm/VegetableForm.jsx
import React, { useState, useEffect } from "react";
import {
  FaLeaf,
  FaClock,
  FaRegClock,
  FaTags,
  FaFlask,
  FaTint,
  FaPlus,
  FaTrash,
  FaSeedling,
  FaSave,
  FaUndo,
} from "react-icons/fa";

// Helper da API (usa NEXT_PUBLIC_API_BASE_URL e token do localStorage/env)
import { apiFetch } from "@/services/api";

import styles from "@/components/VegetableForm/VegetableForm.module.css"; // CSS Module

const VegetableForm = () => {
  const [form, setForm] = useState({
    nome_hortalica: "",
    tempo_estimado: "",
    tempo_real: "",
    tipo_hortalica: "",
    fertilizantes: [{ fertilizante: "" }],
  });

  const [errors, setErrors] = useState({});
  const [globalWaterLevel, setGlobalWaterLevel] = useState(null);
  const [loadingWaterLevel, setLoadingWaterLevel] = useState(false);
  const tipoOptions = ["Folhosa", "Fruto", "Raiz", "Bulbo", "Leguminosa", "Outros"];

  // Busca o nível global da água quando o componente carrega
  useEffect(() => {
    fetchGlobalWaterLevel();
  }, []);

  const fetchGlobalWaterLevel = async () => {
    setLoadingWaterLevel(true);
    try {
      // Busca o nível global da água via API
      const response = await apiFetch('/water-level');
      setGlobalWaterLevel(response.nivel_agua);
    } catch (error) {
      console.error('Erro ao carregar nível global da água:', error);
      // Se não conseguir buscar, usa um valor padrão
      setGlobalWaterLevel(75);
    } finally {
      setLoadingWaterLevel(false);
    }
  };

  function setField(path, value) {
    setForm((prev) => {
      const next = { ...prev };
      const keys = path.split(".");
      let ref = next;
      for (let i = 0; i < keys.length - 1; i++) {
        ref[keys[i]] = { ...ref[keys[i]] };
        ref = ref[keys[i]];
      }
      ref[keys[keys.length - 1]] = value;
      return next;
    });
  }

  function validate() {
    const e = {};
    if (!form.nome_hortalica.trim()) e.nome_hortalica = "Informe o nome.";
    if (!form.tipo_hortalica.trim()) e.tipo_hortalica = "Selecione o tipo.";

    const te = form.tempo_estimado === "" ? null : Number(form.tempo_estimado);
    const tr = form.tempo_real === "" ? null : Number(form.tempo_real);

    if (te !== null && (isNaN(te) || te < 0)) e.tempo_estimado = "Valor inválido.";
    if (tr !== null && (isNaN(tr) || tr < 0)) e.tempo_real = "Valor inválido.";


    form.fertilizantes.forEach((f, idx) => {
      if (f.fertilizante && !f.fertilizante.trim())
        e[`fertilizantes_${idx}`] = "Remova ou preencha.";
    });

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function addFertilizante() {
    setForm((prev) => ({
      ...prev,
      fertilizantes: [...prev.fertilizantes, { fertilizante: "" }],
    }));
  }

  function removeFertilizante(index) {
    setForm((prev) => ({
      ...prev,
      fertilizantes: prev.fertilizantes.filter((_, i) => i !== index),
    }));
  }

  function handleReset() {
    setForm({
      nome_hortalica: "",
      tempo_estimado: "",
      tempo_real: "",
      tipo_hortalica: "",
      fertilizantes: [{ fertilizante: "" }],
    });
    setErrors({});
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

   const payload = {
  nome_hortalica: form.nome_hortalica.trim(),
  tempo_estimado: form.tempo_estimado === "" ? null : Number(form.tempo_estimado),
  tempo_real: form.tempo_real === "" ? null : Number(form.tempo_real),
  tipo_hortalica: form.tipo_hortalica.trim(),
  fertilizantes: form.fertilizantes
    .map((f) => ({ fertilizante: (f.fertilizante || "").trim() }))
    .filter((f) => f.fertilizante !== ""),
  nivel: {
    nivel_agua: globalWaterLevel
  }
};


    try {
      // Se seu back for SEM prefixo /api:
      await apiFetch("/hortalicas", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      // Se seu back estiver montado com app.use('/api', ...), use isso em vez do acima:
      // await apiFetch("/api/hortalicas", {
      //   method: "POST",
      //   body: JSON.stringify(payload),
      // });

      alert("Hortaliça cadastrada com sucesso!");
      handleReset();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  return (
    <div className={styles.hortaPage}>
      <form onSubmit={handleSubmit} className={styles.hortaCard}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.iconWrap}><FaSeedling /></div>
          <div>
            <h1 className={styles.title}>Cadastro de Hortaliça</h1>
            <p className={styles.subtitle}>Preencha os campos conforme o esquema.</p>
          </div>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {/* Nome */}
          <div className={styles.field}>
            <label className={styles.label}>
              <FaLeaf /> Nome da hortaliça <span className={styles.req}>*</span>
            </label>
            <input
              type="text"
              className={`${styles.input} ${errors.nome_hortalica ? styles.isError : ""}`}
              placeholder="Ex.: Alface Crespa"
              value={form.nome_hortalica}
              onChange={(e) => setField("nome_hortalica", e.target.value)}
            />
            {errors.nome_hortalica && (
              <span className={`${styles.help} ${styles.error}`}>{errors.nome_hortalica}</span>
            )}
          </div>

          {/* Tipo */}
          <div className={styles.field}>
            <label className={styles.label}>
              <FaTags /> Tipo de hortaliça <span className={styles.req}>*</span>
            </label>
            <select
              className={`${styles.input} ${errors.tipo_hortalica ? styles.isError : ""}`}
              value={form.tipo_hortalica}
              onChange={(e) => setField("tipo_hortalica", e.target.value)}
            >
              <option value="" disabled>Selecione…</option>
              {tipoOptions.map((op) => (
                <option key={op} value={op}>{op}</option>
              ))}
            </select>
            {errors.tipo_hortalica && (
              <span className={`${styles.help} ${styles.error}`}>{errors.tipo_hortalica}</span>
            )}
          </div>

          {/* Tempo estimado */}
          <div className={styles.field}>
            <label className={styles.label}><FaClock /> Tempo estimado (dias)</label>
            <input
              type="number"
              min={0}
              className={`${styles.input} ${errors.tempo_estimado ? styles.isError : ""}`}
              placeholder="Ex.: 60"
              value={form.tempo_estimado}
              onChange={(e) => setField("tempo_estimado", e.target.value)}
            />
            {errors.tempo_estimado && (
              <span className={`${styles.help} ${styles.error}`}>{errors.tempo_estimado}</span>
            )}
          </div>

          {/* Tempo real */}
          <div className={styles.field}>
            <label className={styles.label}><FaRegClock /> Tempo real (dias)</label>
            <input
              type="number"
              min={0}
              className={`${styles.input} ${errors.tempo_real ? styles.isError : ""}`}
              placeholder="Ex.: 57"
              value={form.tempo_real}
              onChange={(e) => setField("tempo_real", e.target.value)}
            />
            {errors.tempo_real && (
              <span className={`${styles.help} ${styles.error}`}>{errors.tempo_real}</span>
            )}
          </div>

        </div>

        {/* Fertilizantes */}
        <div className={styles.fert}>
          <div className={styles.fertHead}>
            <label className={styles.label}><FaFlask /> Fertilizantes</label>
            <button type="button" onClick={addFertilizante} className={`${styles.btn} ${styles.ghost}`}>
              <FaPlus /> <span>Adicionar</span>
            </button>
          </div>

          <div className={styles.fertList}>
            {form.fertilizantes.map((item, idx) => (
              <div key={idx} className={styles.fertRow}>
                <input
                  type="text"
                  className={`${styles.input} ${styles.flex1} ${errors[`fertilizantes_${idx}`] ? styles.isError : ""}`}
                  placeholder="Ex.: NPK 10-10-10"
                  value={item.fertilizante}
                  onChange={(e) => {
                    const val = e.target.value;
                    setForm((prev) => {
                      const next = { ...prev };
                      const arr = [...next.fertilizantes];
                      arr[idx] = { fertilizante: val };
                      next.fertilizantes = arr;
                      return next;
                    });
                  }}
                />
                <button
                  type="button"
                  aria-label={`Remover fertilizante #${idx + 1}`}
                  className={`${styles.btn} ${styles.danger} ${styles.icon}`}
                  onClick={() => removeFertilizante(idx)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button type="submit" className={`${styles.btn} ${styles.primary}`}>
            <FaSave /> <span>Salvar</span>
          </button>
          <button type="button" onClick={handleReset} className={`${styles.btn} ${styles.secondary}`}>
            <FaUndo /> <span>Limpar</span>
          </button>
        </div>

        <p className={styles.foot}>
          Dica: Campos marcados com * são obrigatórios. Você pode deixar tempos em branco para enviar como <code>null</code>.
          {globalWaterLevel !== null && (
            <span className={styles.waterLevelInfo}>
              <br />💧 Nível global da água: <strong>{globalWaterLevel}L</strong> será aplicado a esta hortaliça.
            </span>
          )}
        </p>
      </form>
    </div>
  );
};

export default VegetableForm;
