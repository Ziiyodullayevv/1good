import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormValues, registerSchema } from '../schema/registerSchema';
import { useRegister } from '../hooks/useRegister';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { AuthStepProps } from '../types';

export default function RegisterForm({ step, setStep }: AuthStepProps) {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const { mutate, isPending } = useRegister();

  const onSubmit = (data: RegisterFormValues) => {
    if (!data.role) return;
    mutate(data, {
      onSuccess: (data) => {
        login(data.user, data.token);

        toast.success(`Welcome, ${data.user.firstName}!`);
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
    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
      <h2 className='text-2xl font-medium'>Create a new account</h2>
      <p className='text-base -mt-2'>
        <span>Already have an account? </span>
        <span
          onClick={() => setStep(step + 1)}
          className='underline bg-transparent cursor-pointer'
        >
          Sign in
        </span>
      </p>
      <div className='mt-3'>
        <Label htmlFor='email'>Email</Label>
        <Input
          className='mt-3 shadow-none h-10 border-gray-300'
          id='email'
          type='text'
          {...register('email')}
        />
        {errors.email && (
          <p className='text-sm text-red-500 mt-3'>{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor='firstName'>First Name</Label>
        <Input
          className='mt-3 shadow-none h-10 border-gray-300'
          id='firstName'
          type='text'
          {...register('firstName')}
        />
        {errors.firstName && (
          <p className='text-sm text-red-500 mt-3'>
            {errors.firstName.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor='lastName'>Last Name</Label>
        <Input
          className='mt-3 shadow-none h-10 border-gray-300'
          id='lastName'
          type='text'
          {...register('lastName')}
        />
        {errors.lastName && (
          <p className='text-sm text-red-500 mt-3'>{errors.lastName.message}</p>
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

      <div>
        <Label htmlFor='role'>Role</Label>
        <Select
          onValueChange={(value) =>
            setValue('role', value as 'freelancer' | 'client', {
              shouldValidate: true,
            })
          }
        >
          <SelectTrigger className='w-full !font-poppins shadow-none mt-3 !rounded-lg !h-10'>
            <SelectValue placeholder='Select a role' />
          </SelectTrigger>
          <SelectContent className='z-[99999]'>
            <SelectItem className='h-10' value='freelancer'>
              Freelancer
            </SelectItem>
            <SelectItem className='h-10' value='client'>
              Client
            </SelectItem>
          </SelectContent>
        </Select>
        {errors.role && (
          <p className='text-sm text-red-500 mt-3'>{errors.role.message}</p>
        )}
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
