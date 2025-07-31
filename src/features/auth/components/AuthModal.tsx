import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import ResetPassword from './ResetPassword';

const STEP = {
  REGISTER: 1,
  LOGIN: 2,
  RESET_PASSWORD: 3,
};

export default function AuthModal({ isLogin }: { isLogin?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(STEP.REGISTER);

  function open() {
    // isLogin bo'yicha boshlang'ich step
    setStep(isLogin ? STEP.LOGIN : STEP.REGISTER);
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
    // modal yopilganda stepni qayta boshlash
    setStep(isLogin ? STEP.LOGIN : STEP.REGISTER);
  }

  // body scroll block
  if (typeof window !== 'undefined') {
    document.body.style.overflow = isOpen ? 'visible' : '';
  }

  return (
    <>
      <Button
        onClick={open}
        className={cn(
          isLogin
            ? 'h-10 text-base bg-transparent text-black hover:bg-v2 cursor-pointer shadow-none'
            : 'h-10 text-base cursor-pointer'
        )}
      >
        {isLogin ? 'Sign In' : 'Join'}
      </Button>

      <Dialog
        open={isOpen}
        as='div'
        className='relative z-[9999]'
        onClose={close}
      >
        <DialogBackdrop className='fixed inset-0 bg-black/40' />
        <div className='fixed inset-0 z-[9999] w-screen'>
          <div className='flex min-h-full items-center justify-center p-4'>
            <DialogPanel
              transition
              className='w-full font-poppins h-[min(90vh,645px)] max-h-[645px] overflow-hidden max-w-[900px] transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-3 data-closed:opacity-0 rounded-xl bg-white'
            >
              <div className='grid grid-cols-2 h-full'>
                <div className='h-full bg-v2 overflow-y-auto'>
                  <img
                    className='w-full h-full object-cover'
                    src='https://ramp.com/assets/images/versus/versus-glossier.webp'
                    alt='Signup visual'
                  />
                </div>
                <div className='flex flex-col justify-between gap-5 overflow-y-auto py-8 px-10'>
                  <div>
                    {step === STEP.REGISTER && (
                      <RegisterForm step={step} setStep={setStep} />
                    )}
                    {step === STEP.LOGIN && (
                      <LoginForm step={step} setStep={setStep} />
                    )}
                    {step === STEP.RESET_PASSWORD && (
                      <ResetPassword step={step} setStep={setStep} />
                    )}
                  </div>

                  <p className='text-xs font-medium text-gray-600'>
                    By joining, you agree to the 1good{' '}
                    <Link className='underline text-green-700' to=''>
                      Terms of Service
                    </Link>{' '}
                    and to occasionally receive emails from us. Please read our{' '}
                    <Link className='underline text-green-700' to=''>
                      Privacy Policy
                    </Link>{' '}
                    to learn how we use your personal data.
                  </p>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
