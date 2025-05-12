import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async'; // Helmetni import qilish
import Building from '../components/Building';
import Core from '../components/Core';
import Founder from '../components/Founder';
import Join from '../components/Join';
import Journey from '../components/Journey';
import SectionHero from '../components/SectionHero';

export default function About() {
  const { t } = useTranslation('about');
  const about = {
    title: t('heroComp.title'),
    description: t('heroComp.subTitle'),
    image: 'about-us.svg',
  };

  return (
    <>
      {/* Helmet bilan SEO va Schema qo'shish */}
      <Helmet>
        <title>1good | {t('heroComp.title')}</title>
        <meta name='description' content={t('heroComp.subTitle')} />
        <link rel='canonical' href='https://www.1good.uz/about' />

        {/* Facebook Open Graph Meta Tags */}
        <meta property='og:url' content='https://1good.uz/about' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={t('heroComp.title')} />
        <meta property='og:description' content={t('heroComp.subTitle')} />
        <meta
          property='og:image'
          content='https://opengraph.b-cdn.net/production/images/89c83794-b8bd-433d-a89e-6d1a3f67262e.png?token=seNm2RT0mKOzt3eOSRoHS2IjmeVRGVfENC_AGcty7ys&height=522&width=1200&expires=33281354618'
        />

        {/* Twitter Meta Tags */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta property='twitter:title' content={t('heroComp.title')} />
        <meta name='twitter:description' content={t('heroComp.subTitle')} />
        <meta
          name='twitter:image'
          content='https://opengraph.b-cdn.net/production/images/89c83794-b8bd-433d-a89e-6d1a3f67262e.png?token=seNm2RT0mKOzt3eOSRoHS2IjmeVRGVfENC_AGcty7ys&height=522&width=1200&expires=33281354618'
        />

        {/* Schema.org JSON-LD */}
        <script type='application/ld+json'>
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            url: 'https://www.1good.uz/about',
            mainEntityOfPage: 'https://www.1good.uz/about',
            name: t('heroComp.title'),
            description: t('heroComp.subTitle'),
          })}
        </script>
      </Helmet>

      {/* Sahifa kontenti */}
      <SectionHero data={about} />
      <Building />
      <Journey />
      <Core />
      <Founder />
      <Join />
    </>
  );
}
