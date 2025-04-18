import { Button } from './ui/button';

export default function Hero() {
  return (
    <section className='py-10'>
      <div className='section-container'>
        <div className='grid items-center grid-cols-2'>
          <div className='left'>
            <h1 className='text-6xl font-montserrat'>
              Freelance Boldly <span className='ml-10'>Hire Confidently</span>
            </h1>
            <p className='text-lg font-montserrat py-9 max-w-[490px]'>
              1good ensures secure payments, AI-powered contracts, and seamless
              collaboration for freelancers and clients in Uzbekistan and
              beyond—empowering you to succeed.
            </p>
            <Button className='font-montserrat h-[60px] px-8 rounded-xl cursor-pointer text-lg'>
              Sign Up
            </Button>
          </div>

          <div className='right'>
            <img src='hero.svg' alt='' />
          </div>
        </div>
      </div>
    </section>
  );
}
