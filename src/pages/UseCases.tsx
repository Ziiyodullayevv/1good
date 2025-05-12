import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async'; // Helmetni import qilish
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
      {/* SEO va Schema qo'shish */}
      <Helmet>
        <title>1good | {t('heroComp.title')}</title>
        <meta name='description' content={t('heroComp.description')} />
        <link rel='canonical' href='https://www.1good.uz/usecases' />

        {/* Facebook Open Graph Meta Tags */}
        <meta property='og:url' content='https://1good.uz/usecases' />
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
            '@type': 'UseCase',
            name: t('heroComp.title'),
            description: t('heroComp.description'),
            url: 'https://www.1good.uz/usecases',
            mainEntityOfPage: 'https://www.1good.uz/usecases',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://www.1good.uz/search?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          })}
        </script>
      </Helmet>

      {/* Sahifa kontenti */}
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
