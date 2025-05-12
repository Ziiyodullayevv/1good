import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async'; // Helmetni import qilish
import Cases from '../components/Cases';
import ContactUS from '../components/ContactUS';
import Hero from '../components/Hero';
import Ideas from '../components/Ideas';
import Process from '../components/Process';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      {/* SEO va Schema qo'shish */}
      <Helmet>
        <title>1good | {t('heroComp.title')}</title>
        <meta name='description' content={t('heroComp.description')} />
        <link rel='canonical' href='https://www.1good.uz' />

        {/* Facebook Open Graph Meta Tags */}
        <meta property='og:url' content='https://1good.uz' />
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
            '@type': 'WebSite',
            name: '1good',
            url: 'https://www.1good.uz',
            description: t('heroComp.description'),
            mainEntityOfPage: 'https://www.1good.uz',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://www.1good.uz/search?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          })}
        </script>
      </Helmet>

      {/* Sahifa kontenti */}
      <Hero />
      <Services />
      <Ideas
        title={t('freelanceComp.title')}
        description={t('freelanceComp.subTitle')}
        btnText={t('freelanceComp.btnText')}
      />
      <Cases />
      <Process />
      <Testimonials />
      <ContactUS />
    </>
  );
}
