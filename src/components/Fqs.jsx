import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Fqs() {
  const { t } = useTranslation('faqs');
  const items = t('items', { returnObjects: true });
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-xl md:text-3xl font-bold text-center mb-6 text-gray-800">
        {t('title')}
      </h1>

      <div className="flex flex-wrap -mx-2">
        {items.map((item, index) => (
          <div key={index} className="w-full md:w-1/2 px-2 mb-4">
            <div className="rounded-lg shadow bg-slate-50 border border-slate-200 p-4">
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center text-left text-base font-semibold text-blue-900"
              >
                {item.q}
                <svg
                  className={`w-4 h-4 transform transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : 'rotate-0'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="pt-1">
                  <p className="text-sm text-gray-600">{item.a}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
