import { useTranslation } from 'react-i18next';
import Ideas from '../components/Ideas';
import Payment from '../components/Payment';
import SectionHero from '../components/SectionHero';
import Testimonials from '../components/Testimonials';
import Solve from '../components/Solve';

export default function UseCases() {
  const { t } = useTranslation('cases');
  const cases = {
    title: t('heroComp.title'),
    description: t('heroComp.description'),
    image: 'usecases.svg',
  };
  return (
    <>
      <SectionHero data={cases} />
      <Payment />
      <Solve />
      <Testimonials />
      <Ideas
        className='bg-v1'
        title={t('successComp.title')}
        description={t('successComp.subTitle')}
        btnText={t('successComp.btnText')}
      />
    </>
  );
}
