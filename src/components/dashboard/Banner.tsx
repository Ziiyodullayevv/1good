type BannerProps = {
  title?: string;
  description?: string;
};

export default function Banner({ title, description }: BannerProps) {
  return (
    <div className=' h-20 sm:h-25 relative flex items-center overflow-hidden'>
      <img
        className='w-full left-0 right-0 border-0 top-0 absolute'
        src='/profile-banner.jpg'
        alt='profile banner'
      />

      <div className='relative z-10 px-8'>
        {title && <h1 className='text-2xl font-semibold'>{title}</h1>}
        {description && <p className='text-gray-700 text-sm'>{description}</p>}
      </div>
    </div>
  );
}
