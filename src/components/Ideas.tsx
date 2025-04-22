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
    <section className='py-20'>
      <div className='section-container'>
        <div
          className={cn(
            'bg-v2 relative flex gap-9 items-start px-15 flex-col justify-center min-h-[360px] rounded-[45px]',
            className
          )}
        >
          <h3 className='text-3xl max-w-[650px] font-semibold'>{title}</h3>
          <p className='max-w-[500px] text-lg'>{description}</p>
          <Button className='btn-v2'>{btnText}</Button>

          <img
            className='absolute right-[100px]'
            src='ideas.svg'
            alt='ideas banner'
          />
        </div>
      </div>
    </section>
  );
}
