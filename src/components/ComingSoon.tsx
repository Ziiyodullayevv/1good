import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function ComingSoon() {
  const { t } = useTranslation('coming-soon');
  return (
    <section className='py-10 sm:py-20'>
      <div className='auth-container text-center'>
        <div className='flex flex-col gap-5'>
          <h1 className='text-3xl sm:text-5xl font-semibold'>{t('title')}</h1>
          <p>{t('description')}</p>
        </div>

        <div className='flex flex-col sm:flex-row mt-15 gap-3'>
          <Input
            type='email'
            className='h-12 text-base placeholder:text-base'
            placeholder={t('placeholder')}
          />
          <Button className='bg-v1 hover:bg-v1 text-black cursor-pointer h-12 text-base'>
            {t('buttonText')}
          </Button>
        </div>

        <p className='mt-5 text-black/70'>{t('footer')}</p>
      </div>
    </section>
  );
}
