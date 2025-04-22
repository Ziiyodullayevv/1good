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
        <div className='bg-v2 p-15 rounded-[45px] grid grid-cols-2'>
          <img src={image} alt='about-us banner' />
          <div>
            <h1 className={cn('text-6xl', className)}>{title}</h1>
            <p className='mt-20 max-w-[453px]'>{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
