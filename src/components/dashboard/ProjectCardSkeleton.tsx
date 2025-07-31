export function ProjectCardSkeleton() {
  return (
    <article className='flex flex-col-reverse lg:flex-row gap-5 md:gap-8 py-4 justify-between items-stretch animate-pulse'>
      {/* Text qismi */}
      <div className='h-[100px] lg:h-[190px] justify-between flex flex-col items-start gap-4 w-full'>
        <header className='w-full'>
          <div className='h-6 w-2/3 bg-v2 rounded-md mb-2' />
          <div className='h-4 w-full bg-v2 rounded-md mb-1' />
          <div className='h-4 w-5/6 bg-v2 rounded-md' />
        </header>

        <div className='flex gap-2'>
          <div className='h-8 px-4 bg-v2 rounded-md w-[80px]' />
          <div className='h-8 px-4 bg-v2 rounded-md w-[80px]' />
        </div>
      </div>

      {/* Image qismi */}
      <figure className='shrink-0 border rounded-lg overflow-hidden w-full h-[200px] sm:h-[280px] lg:h-[190px] bg-v2 lg:w-[300px]'>
        <div className='w-full h-full bg-v2' />
      </figure>
    </article>
  );
}
