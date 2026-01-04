import { useState } from "react";

const steps = [
  "Profil",
  "Pekerjaan",
  "Bukti Amanah",
  "Resume Amanah",
  "Kajian",
  "M3",
  "Solunar",
  "Base Camp"
];

export default function StepperLayout({ children }) {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between mb-6">
        {steps.map((step, i) => (
          <div key={i} className="text-xs text-center">
            <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center">
              {i + 1}
            </div>
            <p>{step}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded shadow">
        {children}
      </div>
    </div>
  );
}
