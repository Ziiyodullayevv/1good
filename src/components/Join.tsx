import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { useNavigate } from 'react-router';

export default function Join() {
  const { t } = useTranslation('about');
  const navigate = useNavigate();
  return (
    <section className='py-10 sm:py-20'>
      <div className='section-container'>
        <div className='bg-v1 rounded-[45px] flex-wrap lg:flex-nowrap items-center p-8  sm:p-15 gap-10 flex justify-between'>
          <div className='flex items-start gap-9 flex-col'>
            <h3 className='text-xl sm:text-3xl font-semibold'>
              {t('joinComp.title')}
            </h3>
            <p className='max-w-[700px]'>{t('joinComp.subTitle')}</p>
            <Button
              onClick={() => navigate('/coming-soon')}
              className='btn-v2 w-full sm:w-auto'
            >
              {t('joinComp.btnText')}
            </Button>
          </div>

          <div className='flex justify-center sm:justify-end w-full'>
            <img src='join.svg' alt='join team image' />
          </div>
        </div>
      </div>
    </section>
  );
}
