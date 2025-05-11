import { Button } from './ui/button';
import { Input } from './ui/input';

export default function ComingSoon() {
  return (
    <section className='py-10 sm:py-20'>
      <div className='auth-container text-center'>
        <div className='flex flex-col gap-5'>
          <h1 className='text-3xl sm:text-5xl font-semibold'>Coming Soon</h1>
          <p>We,re working on somethin awesome</p>
        </div>

        <div className='flex flex-col sm:flex-row mt-15 gap-3'>
          <Input
            type='email'
            className='h-12 text-base placeholder:text-base'
            placeholder='Enter your Email'
          />
          <Button className='bg-v1 text-black cursor-pointer h-12 text-base'>
            Subscribe
          </Button>
        </div>

        <p className='mt-5 text-black/70'>
          Be the first to know when we launch!
        </p>
      </div>
    </section>
  );
}
