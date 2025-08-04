
import Fqs from '../components/Fqs';
import LayoutImg from '../components/LayoutImg';
import Layoutinfo from '../components/Layoutinfo';
import Search from '../components/Search';
import { HiHeart, HiOutlineGlobeAlt, HiStar } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
import img1 from '../assets/paris.webp';
import img2 from '../assets/china.webp';
import img3 from '../assets/belgica.webp';
import img4 from '../assets/brasil.webp';
import img5 from '../assets/colombia.webp'; 
import img6 from '../assets/vietnam.webp';
import img7 from '../assets/qatar.webp';
import img8 from '../assets/surcorea.webp';
import img9 from '../assets/cangilonesGualaca.webp'; 
import img10 from '../assets/cascadabermejo.webp';
import img11 from '../assets/cascadaschorrillito.webp';
import img12 from '../assets/islabastimentos.webp';


export default function Home() {
 const { t } = useTranslation('home');

  const imgLayout = [
    { img: img1, title: 'Paris, France' },
    { img: img3, title: 'Brujas, Bélgica' },
    { img: img2, title: 'Beijing, China' },
    { img: img4, title: 'Río de Janeiro, Brasil' },
    { img: img5, title: 'Cartagena, Colombia' },
    { img: img6, title: 'Hanoi, Vietnam' },
    { img: img7, title: 'Doha, Qatar' },
    { img: img8, title: 'Seul, Corea del Sur' }
  ];

  const infoLayout = [
    { img: img9, title: t('home.tip1.title'), description: t('home.tip1.desc') },
    { img: img10, title: t('home.tip2.title'), description: t('home.tip2.desc') },
    { img: img11, title: t('home.tip3.title'), description: t('home.tip3.desc') },
    { img: img12, title: t('home.tip4.title'), description: t('home.tip4.desc') }
  ];
  return (
  <section> 
      <section
        className=" relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${img1})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center text  px-4 max-w-2xl ">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t('home.heroTitle')}
          </h1>
          <p className="text-lg md:text-xl  mb-6 ">
            {t('home.heroSubtitle')}
          </p>
          <a
            href="/packages"
            className="inline-block bg-orange-500  hover:bg-orange-600 font-semibold px-4 py-2 rounded-md transition duration-300"
          >
            {t('home.searchPackages')}
          </a>
        </div>
      </section>

      {/* Search Bar */}
      <section className="relative  px-4 md:px-8 lg:px-16 py-8 bg-white">
        <Search />
      </section>

      {/* Cities */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-12 bg-gray-50">
        <LayoutImg 
          data={imgLayout}
          title={t('home.citiesTitle')}
          className="text-center text-lg"
        />
      </section>

      {/* Why travel with us */}
      <section className="px-4 md:px-8 lg:px-16 py-16 bg-gradient-to-b from-orange-50 to-white rounded-xl shadow-xl text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-orange-600 mb-6">
          {t('home.whyTravelTitle')}
        </h2>
        <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12">
          {t('home.whyTravelDescription')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
            <HiHeart className="text-orange-500 w-12 h-12 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{t('home.card1.title')}</h3>
            <p className="text-gray-600 text-sm text-center">{t('home.card1.desc')}</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
            <HiOutlineGlobeAlt className="text-orange-500 w-12 h-12 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{t('home.card2.title')}</h3>
            <p className="text-gray-600 text-sm text-center">{t('home.card2.desc')}</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
            <HiStar className="text-orange-500 w-12 h-12 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{t('home.card3.title')}</h3>
            <p className="text-gray-600 text-sm text-center">{t('home.card3.desc')}</p>
          </div>
        </div>
      </section>

      {/* Travel Tips */}
      <section className="px-4 md:px-8 lg:px-16 py-12 bg-gray-100">
        <Layoutinfo 
          title={t('home.travelTipsTitle')}
          data={infoLayout}
          className="text-center"
        />
      </section>

      {/* FAQ */}
      <section className="px-4 md:px-8 lg:px-16 py-12 bg-white">
        <Fqs />
      </section>
   </section>
  );
}
