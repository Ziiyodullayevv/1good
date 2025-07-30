import { ArrowLeft } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AuthStepProps } from '../types';

export default function ResetPassword({ step, setStep }: AuthStepProps) {
  return (
    <form className='flex flex-col gap-5'>
      <button
        onClick={() => setStep(step - 1)}
        className='flex items-center gap-1 cursor-pointer font-medium text-sm'
      >
        <ArrowLeft className='size-4' />
        Back
      </button>
      <h2 className='text-2xl font-medium'>Reset password</h2>
      <p className='text-sm text-gray-500'>
        Enter your email address and we'll send you a link to reset your
        password.
      </p>

      <div>
        <Label htmlFor='email'>Email</Label>
        <Input
          className='mt-3 shadow-none h-10 border-gray-300'
          id='email'
          type='text'
          placeholder='name@email.com'
          // {...register('email')}
        />
        {/* {errors.email && (
          <p className='text-sm text-red-500 mt-3'>{errors.email.message}</p>
        )} */}
      </div>

      <Button
        type='submit'
        // className={`h-10 transition-colors duration-200 ${
        //   !isValid || isPending
        //     ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
        //     : ''
        // }`}
        // disabled={!isValid || isPending}
      >
        {/* {isPending ? 'Submitting...' : 'Reset Password'} */}
        Reset Password
      </Button>
    </form>
  );
}
