import { cn } from '../lib/utils';
import { Button } from './ui/button';

type Props = {
  title: string;
  description: string;
  btnText: string;
  className?: string;
};

export default function Ideas({
  title,
  description,
  btnText,
  className,
}: Props) {
  return (
    <section className='py-10 sm:py-20'>
      <div className='section-container'>
        <div
          className={cn(
            'bg-v2 relative flex gap-9 items-start px-10 sm:py-0 sm:px-15 flex-col justify-center rounded-[45px]',
            className
          )}
        >
          <h3 className='text-xl mt-10 sm:text-3xl max-w-[650px] font-semibold'>
            {title}
          </h3>
          <p className='max-w-[600px] sm:text-lg'>{description}</p>
          <Button className='btn-v2 w-full sm:w-auto mb-10'>{btnText}</Button>

          <img
            className='absolute hidden lg:block right-[100px]'
            src='ideas.svg'
            alt='ideas banner'
          />
        </div>
      </div>
    </section>
  );
}
