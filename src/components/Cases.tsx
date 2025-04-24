import { Link } from 'react-router';
import SectionTitle from './SectionTitle';
import { useTranslation } from 'react-i18next';

export default function Cases() {
  const { t } = useTranslation('home');
  const caseData = t('caseComp.caseData', { returnObjects: true }) as {
    description: string;
    url: string;
  }[];
  return (
    <section className='py-20'>
      <div className='section-container'>
        <SectionTitle
          className='max-w-[580px]'
          title={t('caseComp.title')}
          description={t('caseComp.subTitle')}
        />

        <div className='bg-black mt-20 py-18 grid grid-cols-3 text-white text-lg rounded-[45px]'>
          {caseData.map(({ description, url }, index) => (
            <div
              key={index}
              className={`flex flex-col items-start justify-start gap-10 px-15 ${
                index !== 0 ? 'border-l border-white/20' : ''
              }`}
            >
              <p className='max-w-[286px]'>{description}</p>
              <Link className='flex items-start gap-4 text-xl' to={url}>
                <span>{t('caseComp.btnText')}</span>
                <img src='whiteArrow.svg' alt='arrow icon' />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
