import { cn } from '../lib/utils';

type Props = {
  title: string;
  description: string;
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
    <div className='flex items-start gap-10'>
      <h2 className={cn('section-title', variant)}>{title}</h2>
      <p className={cn('max-w-[798px] text-xl', className)}>{description}</p>
    </div>
  );
}
