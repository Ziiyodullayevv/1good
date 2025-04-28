import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';

type PaymentData = {
  description: string;
  value: string;
};

export default function Payment() {
  const { t } = useTranslation('cases');
  const paymentData = t('paymentComp.paymentData', {
    returnObjects: true,
  }) as PaymentData[];

  const title1 = t('paymentComp.title').split(' ').slice(0, 2).join(' ');
  const title2 = t('paymentComp.title').split(' ').slice(2).join(' ');

  return (
    <section className='py-10 sm:py-20'>
      <div className='section-container'>
        <div className='bg-v1 flex flex-col lg:grid lg:grid-cols-2 items-center rounded-[30px] p-8 sm:p-15 gap-10'>
          {/* Left Content */}
          <div className='text-center lg:text-left'>
            <h2 className='section-title text-2xl sm:text-3xl'>{title1}</h2>
            <br />
            <h2 className='section-title text-2xl sm:text-3xl'>{title2}</h2>
            <h3 className='py-6 sm:py-10 text-xl sm:text-3xl'>
              {t('paymentComp.subTitle')}
            </h3>
            <p className='text-base sm:text-lg'>
              {t('paymentComp.description')}
            </p>
            <Button className='btn-v2 mt-8 sm:mt-10 w-full sm:w-[250px]'>
              {t('paymentComp.btnText')}
            </Button>
          </div>

          {/* Right Content */}
          <div className='flex flex-wrap justify-center lg:justify-end gap-5 sm:gap-8'>
            {paymentData.map(({ description, value }, index) => (
              <div
                key={index}
                className='flex flex-col p-5 sm:p-6 text-center justify-center items-center w-full sm:w-[180px] h-[150px] sm:h-[180px] bg-white rounded-[20px]'
              >
                <h3 className='text-3xl sm:text-4xl'>{value}</h3>
                <p className='mt-2 sm:mt-3 text-sm sm:text-base'>
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
