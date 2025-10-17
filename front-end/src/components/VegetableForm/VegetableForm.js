import React, { useState } from "react";
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

import styles from "@/components/VegetableForm/VegetableForm.module.css"; // <- CSS Module

const VegetableForm = () => {
  const [form, setForm] = useState({
    nome_hortalica: "",
    tempo_estimado: "",
    tempo_real: "",
    tipo_hortalica: "",
    fertilizantes: [{ fertilizante: "" }],
    nivel: { nivel_agua: 50 },
  });

  const [errors, setErrors] = useState({});
  const tipoOptions = ["Folhosa", "Fruto", "Raiz", "Bulbo", "Leguminosa", "Outros"];

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

    const na = Number(form.nivel.nivel_agua);
    if (isNaN(na) || na < 0 || na > 100) e.nivel_agua = "0 a 100.";

    form.fertilizantes.forEach((f, idx) => {
      if (f.fertilizante && !f.fertilizante.trim()) e[`fertilizantes_${idx}`] = "Remova ou preencha.";
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

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      nome_hortalica: form.nome_hortalica.trim(),
      tempo_estimado: form.tempo_estimado === "" ? null : Number(form.tempo_estimado),
      tempo_real: form.tempo_real === "" ? null : Number(form.tempo_real),
      tipo_hortalica: form.tipo_hortalica.trim(),
      fertilizantes: form.fertilizantes
        .map((f) => ({ fertilizante: f.fertilizante.trim() }))
        .filter((f) => f.fertilizante !== ""),
      nivel: { nivel_agua: Number(form.nivel.nivel_agua) },
    };

    console.log("Submitting payload:", payload);
    alert("Dados prontos! Veja o console para o JSON enviado.");
  }

  function handleReset() {
    setForm({
      nome_hortalica: "",
      tempo_estimado: "",
      tempo_real: "",
      tipo_hortalica: "",
      fertilizantes: [{ fertilizante: "" }],
      nivel: { nivel_agua: 50 },
    });
    setErrors({});
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
            {errors.nome_hortalica && <span className={`${styles.help} ${styles.error}`}>{errors.nome_hortalica}</span>}
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
            {errors.tipo_hortalica && <span className={`${styles.help} ${styles.error}`}>{errors.tipo_hortalica}</span>}
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
            {errors.tempo_estimado && <span className={`${styles.help} ${styles.error}`}>{errors.tempo_estimado}</span>}
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
            {errors.tempo_real && <span className={`${styles.help} ${styles.error}`}>{errors.tempo_real}</span>}
          </div>

          {/* Nível de água */}
          <div className={`${styles.field} ${styles.full}`}>
            <label className={`${styles.label} ${styles.rangeLabel}`}>
              <FaTint /> Nível de água (%): <span className={styles.badge}>{form.nivel.nivel_agua}%</span>
            </label>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={form.nivel.nivel_agua}
              onChange={(e) => setField("nivel.nivel_agua", Number(e.target.value))}
              className={styles.range}
            />
            {errors.nivel_agua && <span className={`${styles.help} ${styles.error}`}>{errors.nivel_agua}</span>}
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
        </p>
      </form>
    </div>
  );
}

export default VegetableForm