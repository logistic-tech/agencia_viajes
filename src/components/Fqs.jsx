import React from 'react';
import { Accordion } from "flowbite-react";
import { useTranslation } from 'react-i18next';

export default function Fqs() {
  const { t } = useTranslation('faqs');
  const items = t('items', { returnObjects: true });

  return (
    <section className='w-full max-w-6xl mx-auto px-4 py-8'>
      <h1 className='text-xl md:text-2xl font-bold text-center mb-6 text-gray-800'>
        {t('title')}
      </h1>

      <div className="flex flex-wrap -mx-2">
        {items.map((item, index) => (
          <div key={index} className="w-full md:w-1/2 px-2 mb-4">
            <div className="rounded-lg shadow bg-slate-50 border border-slate-200 p-4">
              <Accordion collapseAll>
                <Accordion.Panel>
                  <Accordion.Title className="text-sm font-semibold text-blue-900">
                    {item.q}
                  </Accordion.Title>
                  <Accordion.Content className="pt-1">
                    <p className="text-xs text-gray-600">
                      {item.a}
                    </p>
                  </Accordion.Content>
                </Accordion.Panel>
              </Accordion>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
