import { Button } from './ui/button';

export default function Ideas() {
  return (
    <section className='py-20'>
      <div className='section-container'>
        <div className='bg-v2 relative flex gap-9 items-start px-10 flex-col justify-center h-[347px] rounded-[45px]'>
          <h3 className='text-3xl font-semibold'>
            Let’s turn your ideas into reality!
          </h3>
          <p className='max-w-[500px] text-lg'>
            Contact us to learn more about how our platform can help your
            business growth and achieve success online.
          </p>
          <Button className='btn-v2'>Get your free proposal</Button>

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
