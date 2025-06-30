import React from 'react';
import { Accordion } from "flowbite-react"; // Importa el componente Accordion de Flowbite React

export default function Fqs() {
  return (
    <section className='w-screen h-full space-y-0 p-2 -mx-0'> {/* Contenedor principal */}
      <h1 className='flex font-bold text-2xl justify-center mb-4 md:mb-6'>Frequently Asked Questions</h1> {/* Título de la sección */}
      
      {/* Sección de acordeones */}
      <section className="flex flex-wrap">
        {/* Primer acordeón */}
        <section className="w-full md:w-1/2 px-1 md:px-2 mb-4 md:mb-6">
          <section className="rounded-xl max-w-6xl h-auto shadow-lg space-y-4 bg-slate-100 border border-slate-200">
            <Accordion collapseAll className='text-sm w-full p-5 h-full p-0 rounded-xl bg-slate-100 border-none'>
              <Accordion.Panel className='bg-slate-100 text-black h-15'>
                <Accordion.Title className="font-semibold text-blue-900 text-sm md:text-base">
                  What destinations do you offer for travel?
                </Accordion.Title>
                <Accordion.Content className='pt-0 pb-2'>
                  <p className="mb-2 text-gray-500 dark:text-gray-400 text-xs md:text-sm">
                    We offer a wide variety of domestic and international destinations. 
                    You can explore everything from paradisiacal beaches to historic cities and wilderness adventures.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </section>
        </section>

        {/* Segundo acordeón */}
        <section className="w-full md:w-1/2 px-1 md:px-2 mb-4 md:mb-6">
          <section className="rounded-xl max-w-6xl mx-auto shadow-lg bg-slate-100 border border-slate-200">
            <Accordion collapseAll className='text-sm bg-slate-100 border-none rounded-xl'>
              <Accordion.Panel className='bg-slate-100 text-black'>
                <Accordion.Title className="font-semibold text-blue-900 text-sm md:text-base">
                  What are the most popular travel packages at the moment?
                </Accordion.Title>
                <Accordion.Content className='pt-0 pb-2'>
                  <p className="mb-2 text-gray-500 dark:text-gray-400 text-xs md:text-sm">
                    Our most popular packages include destinations such as the Greek Islands, Machu Picchu in Peru,
                    and tours of major European cities such as Paris and Rome.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </section>
        </section>
      </section>

      <section className="flex flex-wrap">
        {/* Tercer acordeón */}
        <section className="w-full md:w-1/2 px-1 md:px-2 mb-4 md:mb-6">
          <section className="rounded-xl max-w-6xl mx-auto shadow-lg space-y-4 bg-slate-100 border border-slate-200">
            <Accordion collapseAll className='text-sm bg-slate-100 border-none rounded-xl'>
              <Accordion.Panel className='bg-slate-100 text-black'>
                <Accordion.Title className="font-semibold text-blue-900 text-sm md:text-base">
                  How can I book a trip with you?
                </Accordion.Title>
                <Accordion.Content className='pt-0 pb-2'>
                  <p className="mb-2 text-gray-500 dark:text-gray-400 text-xs md:text-sm">
                    You can easily book your trip by contacting us by phone, email or by visiting our office. 
                    Our agents will be happy to help you plan and customize your travel experience.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </section>
        </section>

        {/* Cuarto acordeón */}
        <section className="w-full md:w-1/2 px-1 md:px-2 mb-4 md:mb-6">
          <section className="rounded-xl max-w-6xl mx-auto shadow-lg space-y-4 bg-slate-100 border border-slate-200">
            <Accordion collapseAll className='text-sm bg-slate-100 border-none rounded-xl'>
              <Accordion.Panel className='bg-slate-100 text-black'>
                <Accordion.Title className="font-semibold text-blue-900 text-sm md:text-base">
                  What documentation do I need to travel to certain destinations?
                </Accordion.Title>
                <Accordion.Content className='pt-0 pb-2'>
                  <p className="mb-2 text-gray-500 dark:text-gray-400 text-xs md:text-sm">
                    Documentation requirements vary by destination. 
                    We will provide you with all the necessary information, 
                    including visas, valid passports and any other required documentation 
                    prior to your trip.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </section>
        </section>
      </section>

      <section className="flex flex-wrap">
        {/* Quinto acordeón */}
        <section className="w-full md:w-1/2 px-1 md:px-2 mb-4 md:mb-6">
          <section className="rounded-xl max-w-6xl mx-auto shadow-lg space-y-4 bg-slate-100 border border-slate-200">
            <Accordion collapseAll className='text-sm bg-slate-100 border-none rounded-xl'>
              <Accordion.Panel className='bg-slate-100 text-black'>
                <Accordion.Title className="font-semibold text-blue-900 text-sm md:text-base">
                  What are the cancellation and refund policies?
                </Accordion.Title>
                <Accordion.Content className='pt-0 pb-2'>
                  <p className="mb-2 text-gray-500 dark:text-gray-400 text-xs md:text-sm">
                    Our cancellation and refund policies vary depending on the type 
                    of travel package and the specific conditions of the supplier. 
                    We will provide you with clear details at the time of 
                    booking so you can make informed decisions.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </section>
        </section>

        {/* Sexto acordeón */}
        <section className="w-full md:w-1/2 px-1 md:px-2 mb-4 md:mb-6">
          <section className="rounded-xl max-w-6xl mx-auto shadow-lg space-y-4 bg-slate-100 border border-slate-200">
            <Accordion collapseAll className='text-sm bg-slate-100 border-none rounded-xl'>
              <Accordion.Panel className='bg-slate-100 text-black'>
                <Accordion.Title className="font-semibold text-blue-900 text-sm md:text-base">
                  Can you customize a travel package to my preferences?
                </Accordion.Title>
                <Accordion.Content className='pt-0 pb-2'>
                  <p className="mb-2 text-gray-500 dark:text-gray-400 text-xs md:text-sm">
                    Yes, we offer customization services to tailor your trip to your individual preferences. 
                    Whether you wish to adjust dates, add specific activities or choose particular accommodations, 
                    we are here to make your trip a unique and memorable experience.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </section>
        </section>
      </section>
    </section>
  );
}
