import { cn } from '../lib/utils';

type Props = {
  title: string;
  description?: string;
  className?: string;
  variant?: string;
};

export default function SectionTitle({
  title,
  description,
  className,
  variant,
}: Props) {
  return (
    <div className='flex flex-col text-start w-full lg:flex-row items-start gap-10'>
      <h2 className={cn(variant)}>
        <span className='text-2xl sm:text-4xl py-1  inline bg-black text-white px-3 rounded-lg'>
          {title}
        </span>
      </h2>
      <p className={cn('max-w-[798px]', className)}>{description}</p>
    </div>
  );
}
