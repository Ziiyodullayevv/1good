import { Link } from 'react-router';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function SignUp() {
  return (
    <section className='py-10 sm:py-20'>
      <div className='auth-container'>
        <h1 className='text-center text-5xl'>Sign up to hire talent</h1>
        <form className='flex mt-10 flex-col gap-8'>
          <div className='flex gap-5'>
            <div className='w-full'>
              <Label className='md:text-lg' htmlFor='firstName'>
                First name
              </Label>
              <Input className='border-black/50 mt-3 h-12' id='firstName' />
            </div>

            <div className='w-full'>
              <Label className='md:text-lg' htmlFor='firstName'>
                Last name
              </Label>
              <Input className='border-black/50 mt-3 h-12' id='firstName' />
            </div>
          </div>

          <div>
            <Label className='md:text-lg' htmlFor='firstName'>
              Phone number
            </Label>
            <Input
              type='tel'
              className='border-black/50 mt-3 h-12'
              id='firstName'
            />
          </div>

          <div>
            <Label className='md:text-lg' htmlFor='firstName'>
              Work email address
            </Label>
            <Input
              type='email'
              className='border-black/50 mt-3 h-12'
              id='firstName'
            />
          </div>

          <div>
            <Label className='md:text-lg' htmlFor='firstName'>
              Password
            </Label>
            <Input
              type='password'
              placeholder='Password (8 or more characters)'
              className='border-black/50 mt-3 h-12 placeholder:text-base'
              id='firstName'
            />
          </div>

          <div>
            <Label className='text-base font-normal'>
              By creating an account, you agree to the{' '}
              <Link className='underline font-semibold' to={'/'}>
                Terms of use
              </Link>{' '}
              and{' '}
              <Link className='underline font-semibold' to={'/'}>
                Privacy Policy.
              </Link>
            </Label>
          </div>

          <div className='flex justify-center'>
            <Button className='h-12 text-base cursor-pointer'>
              Create my account
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
