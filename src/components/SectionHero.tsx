import { cn } from '../lib/utils';

type Props = {
  className?: string;
  data: {
    title: string;
    description: string;
    image: string;
  };
};

export default function SectionHero({
  data: { title, description, image },
  className,
}: Props) {
  return (
    <section className='py-10 sm:py-20'>
      <div className='section-container'>
        <div className='bg-v2 p-8 sm:p-15 rounded-[45px] grid grid-cols-1 md:grid-cols-2 gap-10'>
          <div className='order-2 md:order-1 flex items-center justify-center'>
            <img src={image} alt='about-us banner' />
          </div>
          <div className='order-1 md:order-2 flex flex-col justify-center'>
            <h1 className={cn('text-3xl sm:text-5xl xl:text-6xl', className)}>
              {title}
            </h1>
            <p className='mt-8 sm:mt-12 max-w-[453px]'>{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
