import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import ResetPassword from './ResetPassword';
import { X } from 'lucide-react';

const STEP = {
  REGISTER: 1,
  LOGIN: 2,
  RESET_PASSWORD: 3,
};

export default function AuthModal({ isLogin }: { isLogin?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(STEP.REGISTER);

  function open() {
    setStep(isLogin ? STEP.LOGIN : STEP.REGISTER);
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
    setStep(isLogin ? STEP.LOGIN : STEP.REGISTER);
  }

  if (typeof window !== 'undefined') {
    document.body.style.overflow = isOpen ? 'visible' : '';
  }

  return (
    <>
      <Button
        onClick={open}
        className={cn(
          isLogin
            ? 'h-12 text-base bg-v2 text-black hover:bg-v2 rounded-lg cursor-pointer shadow-none'
            : 'h-12 rounded-lg text-base cursor-pointer'
        )}
      >
        {isLogin ? 'Sign In' : 'Join'}
      </Button>

      <Dialog
        open={isOpen}
        as='div'
        className='relative font-poppins z-[9999]'
        onClose={close}
      >
        <DialogBackdrop className='fixed inset-0 bg-black/40' />
        <div className='fixed inset-0 z-[9999] w-screen sm:px-4 sm:overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center'>
            <DialogPanel
              transition
              className='w-full absolute sm:static top-0 bottom-0 ring-0 left-0 overflow-hidden font-poppins sm:max-w-[900px] sm:h-[min(90vh,645px)] sm:max-h-[645px]
              transition duration-300 ease-out [--anchor-gap:--spacing(5)] 
              data-closed:-translate-y-4 data-closed:opacity-0 data-closed:scale-95
              sm:rounded-2xl bg-white shadow-2xl border border-gray-100
              mx-auto sm:my-4 sm:mx-4 flex flex-col'
            >
              <div className='grid grid-cols-1 md:grid-cols-2 h-full'>
                {/* Left image – faqat md dan boshlab ko‘rinadi */}
                <div className='hidden md:block h-full bg-v2 overflow-y-auto'>
                  <img
                    className='w-full h-full object-cover'
                    src='https://ramp.com/assets/images/versus/versus-glossier.webp'
                    alt='Signup visual'
                  />
                </div>

                {/* Right content */}
                <div className='flex flex-col justify-between gap-5 overflow-y-auto py-6 sm:py-8 px-6 sm:px-10'>
                  <button
                    onClick={close}
                    className='md:hidden absolute right-6 top-6'
                  >
                    <X />
                  </button>
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
