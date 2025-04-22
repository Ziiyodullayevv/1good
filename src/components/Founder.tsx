export default function Founder() {
  return (
    <section className='py-10 sm:py-20'>
      <div className='section-container'>
        <div className='bg-black relative flex justify-end text-white rounded-[45px] p-15'>
          <img
            className='absolute left-0 top-[-100px]'
            src='/about-us-focus.svg'
            alt='about-us focus image'
          />
          <div>
            <h2 className='font-semibold max-w-[529px] text-[41px]'>
              “At 1good, we make freelancing secure, simple, and empowering for
              all.”
            </h2>
            <h5 className='text-2xl mt-24'>
              — Shohjahon Sokhibov, Co-Founder of 1good
            </h5>
          </div>
        </div>
      </div>
    </section>
  );
}
