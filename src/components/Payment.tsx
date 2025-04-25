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
        <div className='bg-v1 grid items-center grid-cols-2 rounded-[45px] p-15 justify-between gap-10'>
          <div>
            <h2 className='section-title'>{title1}</h2>
            <br />
            <h2 className='section-title'>{title2}</h2>
            <h3 className='py-10 text-3xl'>{t('paymentComp.subTitle')}</h3>
            <p>{t('paymentComp.description')}</p>
            <Button className='btn-v2 mt-10 w-[180px]'>
              {t('paymentComp.btnText')}
            </Button>
          </div>

          <div className='flex flex-wrap justify-end gap-8 text-lg'>
            {paymentData.map(({ description, value }, index) => (
              <div
                key={index}
                className='flex flex-col p-5 text-center justify-center items-center w-[198px] h-[198px] bg-white rounded-[25px]'
              >
                <h3 className='text-4xl'>{value}</h3>
                <p className='mt-3'>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
