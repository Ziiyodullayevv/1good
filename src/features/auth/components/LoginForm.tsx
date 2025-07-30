import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthStepProps } from '../types';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { LoginFormValues, loginSchema } from '../schema/loginSchema';
import { useLogin } from '../hooks/useLogin';

export default function LoginForm({ step, setStep }: AuthStepProps) {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const { mutate, isPending } = useLogin();

  const onSubmit = (data: LoginFormValues) => {
    mutate(data, {
      onSuccess: (data) => {
        login(data.user, data.token);
        toast.success(`Welcome Back!`);
      },
      onError: (error) => {
        const message =
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message ||
          error?.message ||
          'An error occurred';
        toast.error(message);
      },
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
      <h2 className='text-2xl font-medium'>Sign in to your account</h2>
      <p className='text-base -mt-2'>
        Don’t have an account?{' '}
        <span
          onClick={() => setStep(step - 1)}
          className='underline cursor-pointer'
        >
          Join here
        </span>
      </p>
      <div className='mt-3'>
        <Label htmlFor='email'>Email</Label>
        <Input
          className='mt-3 shadow-none h-10 border-gray-300'
          id='email'
          type='text'
          placeholder='name@email.com'
          {...register('email')}
        />
        {errors.email && (
          <p className='text-sm text-red-500 mt-3'>{errors.email.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor='password'>Password</Label>
        <Input
          className='mt-3 shadow-none h-10 border-gray-300'
          id='password'
          type='password'
          {...register('password')}
        />
        {errors.password && (
          <p className='text-sm text-red-500 mt-3'>{errors.password.message}</p>
        )}
      </div>
      <div className='flex justify-end text-sm underline'>
        <span onClick={() => setStep(3)}>Forgot password?</span>
      </div>

      <Button
        type='submit'
        className={`h-10 transition-colors duration-200 ${
          !isValid || isPending
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : ''
        }`}
        disabled={!isValid || isPending}
      >
        {isPending ? 'Submitting...' : 'Continue'}
      </Button>
    </form>
  );
}
