import { Button } from './ui/button';

export default function Rank() {
  return (
    <section className='py-10 sm:py-20'>
      <div className='section-container'>
        <div className='flex justify-between gap-5 items-center box-shadow p-15 rounded-[45px]'>
          <div className=''>
            <h2 className='text-3xl pb-7 border-b border-black'>
              Ready to Elevate Your Search Rankings?
            </h2>
            <p className='mt-7'>
              At 1good, we’re here to help freelancers and clients succeed with
              Escrow payments, AI-driven tools, and flexible financing options
              like Credits. Whether you’re hiring talent or offering your
              skills, let’s make your next project a success.
            </p>
            <h3 className='font-bold py-8 '>
              Join a platform that makes collaboration secure and simple.
            </h3>
            <Button className='btn-v1'>Begin Your Journey</Button>
          </div>

          <img src='/rank.svg' alt='rank banner' />
        </div>
      </div>
    </section>
  );
}
