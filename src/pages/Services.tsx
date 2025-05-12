import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async'; // Helmetni import qilish
import Cases from '../components/Cases';
import Escrow from '../components/Escrow';
import Rank from '../components/Rank';
import SectionHero from '../components/SectionHero';
import WeWork from '../components/WeWork';

export default function Services() {
  const { t } = useTranslation('services');
  const services = {
    title: t('heroComp.title'),
    description: t('heroComp.subTitle'),
    image: 'services.svg',
  };

  return (
    <>
      {/* SEO va Schema qo'shish */}
      <Helmet>
        <title>1good | {t('heroComp.title')}</title>
        <meta name='description' content={t('heroComp.subTitle')} />
        <link rel='canonical' href='https://www.1good.uz/services' />

        {/* Facebook Open Graph Meta Tags */}
        <meta property='og:url' content='https://1good.uz/services' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={t('homePage.title')} />
        <meta property='og:description' content={t('homePage.description')} />
        <meta
          property='og:image'
          content='https://opengraph.b-cdn.net/production/images/89c83794-b8bd-433d-a89e-6d1a3f67262e.png?token=seNm2RT0mKOzt3eOSRoHS2IjmeVRGVfENC_AGcty7ys&height=522&width=1200&expires=33281354618'
        />

        {/* Twitter Meta Tags */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta property='twitter:title' content={t('homePage.title')} />
        <meta name='twitter:description' content={t('homePage.description')} />
        <meta
          name='twitter:image'
          content='https://opengraph.b-cdn.net/production/images/89c83794-b8bd-433d-a89e-6d1a3f67262e.png?token=seNm2RT0mKOzt3eOSRoHS2IjmeVRGVfENC_AGcty7ys&height=522&width=1200&expires=33281354618'
        />

        {/* Schema.org JSON-LD */}
        <script type='application/ld+json'>
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: t('heroComp.title'),
            description: t('heroComp.subTitle'),
            url: 'https://www.1good.uz/services',
            provider: {
              '@type': 'Organization',
              name: '1good',
              url: 'https://www.1good.uz',
            },
          })}
        </script>
      </Helmet>

      {/* Sahifa kontenti */}
      <SectionHero data={services} className='max-w-[550px]' />
      <Escrow />
      <WeWork />
      <Cases />
      <Rank />
    </>
  );
}
