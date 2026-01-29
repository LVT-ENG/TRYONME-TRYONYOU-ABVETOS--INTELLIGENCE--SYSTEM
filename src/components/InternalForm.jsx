import React, { useState } from 'react';

const InternalForm = ({ onSubmit, language = 'fr' }) => {
  const [formData, setFormData] = useState({ height: '', weight: '', event_type: 'gala' });

  const labels = {
    fr: { h: "Taille (cm)", w: "Poids (kg)", e: "Événement", b: "Trouver ma silhouette" },
    en: { h: "Height (cm)", w: "Weight (kg)", e: "Event", b: "Find my silhouette" },
    es: { h: "Altura (cm)", w: "Peso (kg)", e: "Evento", b: "Encontrar mi silueta" }
  };

  const t = labels[language];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
      if (formData.height && formData.weight) {
          onSubmit(formData);
      }
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
      <h3 className="text-white text-lg font-light tracking-wide italic">{t.b}</h3>
      <div className="grid grid-cols-2 gap-4">
        <input
            name="height"
            type="number"
            placeholder={t.h}
            onChange={handleChange}
            className="bg-transparent border-b border-white/40 text-white p-2 outline-none focus:border-white"
        />
        <input
            name="weight"
            type="number"
            placeholder={t.w}
            onChange={handleChange}
            className="bg-transparent border-b border-white/40 text-white p-2 outline-none focus:border-white"
        />
      </div>
      <select
        name="event_type"
        onChange={handleChange}
        className="bg-transparent border-b border-white/40 text-white p-2 outline-none"
      >
        <option value="gala" className="text-black">Gala / Soirée</option>
        <option value="business" className="text-black">Business</option>
        <option value="casual" className="text-black">Casual Chic</option>
      </select>
      <button onClick={handleClick} className="mt-4 bg-white text-black py-2 rounded-full font-medium hover:bg-opacity-90 transition-all">
        {t.b}
      </button>
    </div>
  );
};

export default InternalForm;
