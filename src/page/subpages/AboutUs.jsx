import { useTranslation } from 'react-i18next';
import teamImage from '../../assets/team.webp';
import servicesImage from '../../assets/services.webp';
import destinationImage from '../../assets/destination.webp';
import background from '../../assets/san-blas-panama.jpg';
import { FaSuitcase, FaPlane, FaPassport } from "react-icons/fa";
export default function AboutUs() {
  const { t } = useTranslation('about');
const services = [
  {
    title: t('packages'),
    desc: t('packagesDesc'),
    icon: <FaSuitcase className="text-3xl mb-4" />
  },
  {
    title: t('tours'),
    desc: t('toursDesc'),
    icon: <FaPlane className="text-3xl mb-4" />
  },
  {
    title: t('visas'),
    desc: t('visasDesc'),
    icon: <FaPassport className="text-3xl mb-4" />
  }
];

  return (
    <section className="bg-white text-neutral-800">

      {/* Hero Principal */}
     <div className="relative w-full h-[500px] flex items-center justify-center text-center mb-20 overflow-hidden">

  {/* Imagen de fondo */}
  <img
    src={background}
    alt="Background"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Overlay oscuro (mejora contraste) */}
  <div className="absolute inset-0 bg-black/50"></div>
  {/* Contenido */}
  <div className="relative z-10 max-w-3xl px-6 text-white">
    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
      {t('About Us') || 'Sobre Nosotros'}
    </h1>
    <p className="text-base md:text-lg text-neutral-200 leading-relaxed">
      {t('We connect travelers with unique and memorable experiences. ') || 'Conectamos viajeros con experiencias únicas y memorables.'}
    </p>

    {/* Línea decorativa */}
    <div className="w-16 h-1 bg-[#b89c6e] mx-auto mt-6 rounded-full"></div>

  </div>
</div>

      <div className="container mx-auto px-6 space-y-32">

      
 <div className="py-24 bg-gradient-to-b from-white to-neutral-100">
  <div className="max-w-6xl mx-auto px-6">

    {/* Header */}
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900 mb-4">
        {t('aboutTitle')}
      </h2>

      <p className="text-lg text-neutral-500 italic">
        {t('aboutSlogan')}
      </p>

      <div className="w-20 h-1 bg-blue-900 mx-auto mt-6 rounded-full"></div>
    </div>

    {/* Contenido principal */}
    <div className="grid md:grid-cols-2 gap-12 items-center">

      {/* Imagen con efecto */}
      <div className="relative group">
        <img
          src={servicesImage}
          alt="Agencia"
          className="rounded-3xl shadow-xl w-full h-[420px] object-cover transform group-hover:scale-105 transition duration-500"
        />

        {/* Overlay decorativo */}
        <div className="absolute inset-0 rounded-3xl bg-blue-900/10 opacity-0 group-hover:opacity-100 transition"></div>
      </div>

      {/* Texto */}
      <div className="space-y-6 text-neutral-700 leading-relaxed">

        <h3 className="text-2xl font-bold text-neutral-900">
          {t('companyName')}
        </h3>

        <p className="text-base">
          {t('aboutText1')}
        </p>

        <p className="text-base">
          {t('aboutText2')}
        </p>

        <p className="text-base">
          {t('aboutText3')}
        </p>

        {/* Badge experiencia */}
        <div className="inline-block bg-blue-900 text-white px-4 py-2 rounded-full text-sm font-medium shadow">
          +15 {t('yearsExperience')}
        </div>

      </div>
    </div>

    {/* Misión / Visión */}
    <div className="grid md:grid-cols-2 gap-10 mt-20">

      <div className="group bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-blue-900">
        <h3 className="text-xl font-bold text-blue-900 mb-4">
          {t('mission')}
        </h3>
        <p className="text-neutral-600 leading-relaxed">
          {t('missionDesc')}
        </p>
      </div>

      <div className="group bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-[#b89c6e]">
        <h3 className="text-xl font-bold text-[#b89c6e] mb-4">
          {t('vision')}
        </h3>
        <p className="text-neutral-600 leading-relaxed">
          {t('visionDesc')}
        </p>
      </div>

    </div>

  </div>
</div>
  {/* Sección de Equipo */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <img
              src={teamImage}
              alt={t('meetTeam')}
              className="rounded-3xl shadow-lg w-full h-[400px] object-cover"
            />
          </div>
          <div className="md:w-1/2 flex flex-col justify-center space-y-6 text-center md:text-left">
            <h2 className="text-4xl font-bold text-neutral-900">{t('meetTeam')}</h2>
            <p className="text-lg text-neutral-700">{t('teamDescription')}</p>
            <a
              href="/contactus"
              className="inline-block px-6 py-3 bg-neutral-800 text-white rounded-full hover:bg-neutral-700 transition"
            >
              {t('contactUs')}
            </a>
          </div>
        </div>
        {/* Sección de Servicios */}
      <div className="bg-neutral-50 rounded-3xl shadow-lg p-12 text-center">
  
  <h2 className="text-4xl font-bold text-neutral-900 mb-4">
    {t('ourServices')}
  </h2>

  <p className="text-neutral-600 max-w-2xl mx-auto mb-10">
    {t('servicesDescription')}
  </p>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {services.map((service, index) => (
      <div
        key={index}
        className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
      >
        {/* Icono */}
        <div className="flex justify-center text-blue-900 group-hover:scale-110 transition">
          {service.icon}
        </div>

        {/* Título */}
        <h3 className="text-xl font-semibold mt-4 mb-2 text-neutral-900">
          {service.title}
        </h3>

        {/* Descripción */}
        <p className="text-neutral-600 text-sm leading-relaxed">
          {service.desc}
        </p>

        {/* Línea decorativa */}
        <div className="w-10 h-1 bg-blue-900 mx-auto mt-4 rounded-full group-hover:w-16 transition-all"></div>
      </div>
    ))}
  </div>

</div>

        {/* Sección de Destinos */}
      {/*   <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-lg">
          <img
            src={destinationImage}
            alt={t('exploreDestinations')}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-6">
            <h2 className="text-4xl font-bold text-white mb-3">{t('exploreDestinations')}</h2>
            <p className="text-white max-w-xl mb-6">{t('destinationsDescription')}</p>
            <a
              href="#destinations"
              className="px-6 py-3 bg-[#b89c6e] text-white rounded-full hover:bg-[#a88959] transition"
            >
              {t('startExploring')}
            </a>
          </div>
        </div> */}

        {/* Sección Final: Valores / Puntos Clave */}
       {/*  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div className="bg-neutral-50 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-bold text-lg mb-2">{t('value1')}</h3>
            <p className="text-neutral-600 text-sm">{t('value1Desc')}</p>
          </div>
          <div className="bg-neutral-50 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-bold text-lg mb-2">{t('value2')}</h3>
            <p className="text-neutral-600 text-sm">{t('value2Desc')}</p>
          </div>
          <div className="bg-neutral-50 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-bold text-lg mb-2">{t('value3')}</h3>
            <p className="text-neutral-600 text-sm">{t('value3Desc')}</p>
          </div>
          <div className="bg-neutral-50 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-bold text-lg mb-2">{t('value4')}</h3>
            <p className="text-neutral-600 text-sm">{t('value4Desc')}</p>
          </div>
        </div> */}

      </div>
    </section>
  );
}
