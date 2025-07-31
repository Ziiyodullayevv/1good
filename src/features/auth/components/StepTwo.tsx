import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormValues, registerSchema } from '../schema/registerSchema';
import { useRegister } from '../hooks/useRegister';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router';

export default function StepOne({ onContinue }: { onContinue: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const { mutate, isPending } = useRegister();

  const onSubmit = (data: RegisterFormValues) => {
    mutate(data, {
      onSuccess: () => {
        onContinue();
      },
    });
  };

  return (
    <div className='grid grid-cols-2 h-full'>
      <div className='h-full bg-v2 overflow-y-auto'>
        <img
          className='w-full h-full object-cover'
          src='https://ramp.com/assets/images/versus/versus-glossier.webp'
          alt='Signup visual'
        />
      </div>
      <div className='flex flex-col justify-between gap-5 overflow-y-auto p-8'>
        <div>
          <h2 className='text-[25px] font-bold'>Create a new account</h2>
          <p className='text-base mt-3'>
            Already have an account?{' '}
            <Link className='underline' to=''>
              Sign in
            </Link>
          </p>

          <form
            className='mt-5 flex flex-col gap-4'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <Label htmlFor='email'>Email</Label>
              <Input id='email' type='text' {...register('email')} />
              {errors.email && (
                <p className='text-sm text-red-500'>{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor='firstName'>First Name</Label>
              <Input id='firstName' type='text' {...register('firstName')} />
              {errors.firstName && (
                <p className='text-sm text-red-500'>
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor='lastName'>Last Name</Label>
              <Input id='lastName' type='text' {...register('lastName')} />
              {errors.lastName && (
                <p className='text-sm text-red-500'>
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor='password'>Password</Label>
              <Input id='password' type='password' {...register('password')} />
              {errors.password && (
                <p className='text-sm text-red-500'>
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button type='submit' className='h-10'>
              {isPending ? 'Submitting...' : 'Continue'}
            </Button>
          </form>
        </div>

        <p className='text-xs font-medium text-gray-600'>
          By joining, you agree to the 1good{' '}
          <Link className='underline text-green-700' to=''>
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link className='underline text-green-700' to=''>
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
