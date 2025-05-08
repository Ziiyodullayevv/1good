// import { useTranslation } from 'react-i18next';
// import SectionTitle from './SectionTitle';
// import { Button } from './ui/button';
// import { Link } from 'react-router';

// type AuthOptions = {
//   title: string;
//   image: string;
//   buttonText: string;
//   url: string;
// };

// export default function Auth() {
//   const { t } = useTranslation('auth');
//   const authOptions = t('authComp.authData', {
//     returnObjects: true,
//   }) as AuthOptions[];

//   return (
//     <section className='py-10 sm:py-20'>
//       <div className='section-container'>
//         <h1 className='text-center text-5xl'>{t('authComp.title')}</h1>

//         <div className='grid gap-10 sm:gap-15 mt-10 sm:mt-20 grid-cols-1 sm:grid-cols-2'>
//           {authOptions.map(({ title, url, buttonText, image }, index) => (
//             <div
//               key={index}
//               className='bg-v1 box-shadow flex justify-between items-center rounded-[45px] p-12'
//             >
//               <div className='flex flex-col items-start gap-25'>
//                 <h2 className='bg-black text-xl sm:text-4xl rounded-xl py-1 px-3 text-white inline-block'>
//                   {title}
//                 </h2>
//                 <Link to={url}>
//                   <Button className='rounded-[100px] cursor-pointer sm:text-lg'>
//                     {buttonText}
//                   </Button>
//                 </Link>
//               </div>
//               <img src={image} alt='auth image' />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Button } from './ui/button';
import { cn } from '../lib/utils';
import { Link, useNavigate } from 'react-router';

type AuthOptions = {
  title: string;
  image: string;
  buttonText: string;
  url: string;
};

const icons = [
  <svg
    xmlns='http://www.w3.org/2000/svg'
    aria-hidden='true'
    data-name='Layer 1'
    viewBox='0 0 24 24'
    role='img'
  >
    <path
      fill='none'
      vector-effect='non-scaling-stroke'
      stroke='var(--icon-color, #001e00)'
      stroke-linecap='round'
      stroke-linejoin='round'
      stroke-width='1.5'
      d='M19.28 21h-6.9a1.6 1.6 0 01-1.73-1.5v-4a1.6 1.6 0 011.73-1.5h6.9A1.59 1.59 0 0121 15.5v4a1.66 1.66 0 01-1.72 1.5z'
    ></path>
    <path
      fill='none'
      vector-effect='non-scaling-stroke'
      stroke='var(--icon-color, #001e00)'
      stroke-linecap='round'
      stroke-linejoin='round'
      stroke-width='1.5'
      d='M16.9 12h-2.15a.65.65 0 00-.72.66V14h3.59v-1.34a.65.65 0 00-.72-.66z'
    ></path>
    <line
      x1='10.65'
      x2='21'
      y1='17.29'
      y2='17.29'
      fill='none'
      vector-effect='non-scaling-stroke'
      stroke='var(--icon-color, #001e00)'
      stroke-linecap='round'
      stroke-linejoin='round'
      stroke-width='1.5'
    ></line>
    <circle
      cx='10.04'
      cy='5.73'
      r='2.73'
      fill='none'
      vector-effect='non-scaling-stroke'
      stroke='var(--icon-color, #001e00)'
      stroke-linecap='round'
      stroke-linejoin='round'
      stroke-width='1.5'
    ></circle>
    <path
      fill='none'
      vector-effect='non-scaling-stroke'
      stroke='var(--icon-color, #001e00)'
      stroke-linecap='round'
      stroke-linejoin='round'
      stroke-width='1.5'
      d='M3 18.45v-.9a7 7 0 017-7h.09a6.73 6.73 0 011.91.27'
    ></path>
  </svg>,
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    aria-hidden='true'
    viewBox='0 0 24 24'
    role='img'
  >
    <path
      vector-effect='non-scaling-stroke'
      stroke='var(--icon-color, #001e00)'
      stroke-linecap='round'
      stroke-linejoin='round'
      stroke-width='1.5'
      d='M9.43 21H5.99M3 18.45v-.9a7 7 0 017-7h.09a6.94 6.94 0 013.79 1.12m5.5 9.33h-11L10 14h11l-1.62 7zm-4.69-3a.5.5 0 100-1 .5.5 0 000 1zM12.77 5.73a2.73 2.73 0 11-5.46 0 2.73 2.73 0 015.46 0z'
    ></path>
  </svg>,
];

export default function Auth() {
  const navigate = useNavigate();
  const { t } = useTranslation('auth');
  const authOptions = t('authComp.authData', {
    returnObjects: true,
  }) as AuthOptions[];

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const buttonLabel =
    selectedIndex === 0
      ? 'Join as a Client'
      : selectedIndex === 1
      ? 'Apply as a Freelancer'
      : 'Create Account';

  return (
    <section className='py-10 sm:py-20'>
      <div className='auth-container'>
        <h1 className='text-center font-semibold text-4xl'>
          {t('authComp.title')}
        </h1>

        <div className='grid gap-7 sm:gap-10 mt-10 sm:mt-20 grid-cols-1 sm:grid-cols-2'>
          {authOptions.map(({ title }, index) => (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`flex border flex-col cursor-pointer hover:outline-black hover:outline-2 transition-transform duration-100 justify-between items-center rounded-2xl p-5 ${
                selectedIndex === index
                  ? 'border-black outline-2 outline-black'
                  : 'border-black ouline-2 outline-black active:scale-95'
              }`}
            >
              <div className='flex w-full items-center justify-between'>
                <div className='size-14 inline-block'>{icons[index]}</div>
                <div className='w-full flex justify-end'>
                  <RadioGroup className='block'>
                    <RadioGroupItem
                      value={`option-${index}`}
                      id={`option-${index}`}
                      checked={selectedIndex === index}
                    />
                  </RadioGroup>
                </div>
              </div>
              <div className='flex mt-7 flex-col items-start gap-25'>
                <h2 className='text-xl font-semibold sm:text-2xl rounded-xl py-1 px-3 inline-block'>
                  {title}
                </h2>
              </div>
            </div>
          ))}
        </div>

        <div className='flex gap-5 justify-center flex-col items-center mt-15'>
          <Button
            onClick={() => {
              if (selectedIndex !== null) {
                navigate('signup');
              }
            }}
            className={cn(
              'h-12 text-base cursor-pointer',
              selectedIndex === null ? 'opacity-50 cursor-not-allowed' : ''
            )}
          >
            {buttonLabel}
          </Button>
          <p>
            Already have an account?{' '}
            <Link className='underline' to={'/'}>
              Log In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
