import CardImg from './CardImg';

export default function LayoutImg({ data, title }) {
  return (
    <div className="justify-center p-4 items-center text-center text dark:text-gray-800">
      {title && (
        <h2 className="text-xl font-bold mb-1 flex justify-center items-center">
          {title}
        </h2>
      )}
      <section className='md:mb-12 mb-1 grid h-60 p-0 md:p-1 grid-cols-2 md:grid-cols-4 gap-1 md:gap-1 sm:h-80 xl:h-80 2xl:h-96'> 
        {data.slice(0, 4).map((item, index) => (
          <CardImg key={index} img={item.img} title={item.title} />
        ))}
      </section>
      <section className='mb-2 grid h-56 p-0 md:p-1 grid-cols-2 md:grid-cols-4 gap-1 md:gap-1 sm:h-64 xl:h-80 2xl:h-96 md:-mt-10'>
        {data.slice(4).map((item, index) => (
          <CardImg key={index} img={item.img} title={item.title} />
        ))}
      </section>
    </div>
  );
}
