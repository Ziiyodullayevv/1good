import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async'; // Helmetni import qilish
import Ideas from '../components/Ideas';
import Payment from '../components/Payment';
import SectionHero from '../components/SectionHero';
import Testimonials from '../components/Testimonials';
import Solve from '../components/Solve';

export default function UseCases() {
  const { t, ready } = useTranslation('cases');

  if (!ready) return null;

  const cases = {
    title: t('heroComp.title'),
    description: t('heroComp.description'),
    image: 'usecases.svg',
  };

  const now = new Date().toISOString();

  const ldJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': 'https://www.1good.uz/services#service',
        name: t('heroComp.title'),
        description: t('heroComp.subTitle'),
        url: 'https://www.1good.uz/services',
        provider: {
          '@type': 'Organization',
          name: '1good',
          url: 'https://www.1good.uz',
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.1good.uz/assets/logo.png',
          },
        },
        serviceType: 'Freelance and IT Services',
        availableChannel: {
          '@type': 'ServiceChannel',
          serviceUrl: 'https://www.1good.uz/services',
        },
        areaServed: 'Worldwide',
        datePublished: '2025-02-01T00:00:00+00:00',
        dateModified: now,
      },
      {
        '@type': 'WebPage',
        '@id': 'https://www.1good.uz/services#webpage',
        url: 'https://www.1good.uz/services',
        name: t('heroComp.title'),
        isPartOf: {
          '@id': 'https://www.1good.uz/#website',
        },
        description: t('heroComp.subTitle'),
        datePublished: '2025-02-01T00:00:00+00:00',
        dateModified: now,
        breadcrumb: {
          '@id': 'https://www.1good.uz/services#breadcrumb',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://www.1good.uz/services#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.1good.uz/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: t('heroComp.title'),
            item: 'https://www.1good.uz/services',
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.1good.uz/#website',
        url: 'https://www.1good.uz/',
        name: '1good',
        description:
          'Freelance company focusing on innovation and collaboration to empower your business.',
        publisher: {
          '@id': 'https://www.1good.uz/#/schema/person/ceo',
        },
        potentialAction: [
          {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: 'https://www.1good.uz/search?q={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
          },
        ],
        inLanguage: 'en-US',
      },
      {
        '@type': ['Person', 'Organization'],
        '@id': 'https://www.1good.uz/#/schema/person/ceo',
        name: '1good Team',
        image: {
          '@type': 'ImageObject',
          inLanguage: 'en-US',
          '@id': 'https://www.1good.uz/#/schema/person/image/',
          url: 'https://www.1good.uz/assets/team-photo.png',
          contentUrl: 'https://www.1good.uz/assets/team-photo.png',
          width: 400,
          height: 400,
          caption: '1good Team',
        },
        logo: {
          '@id': 'https://www.1good.uz/#/schema/person/image/',
        },
        description:
          '1good is a freelance company that leverages innovation and collaboration to grow businesses.',
        sameAs: [
          'https://www.linkedin.com/company/1good/',
          'https://www.instagram.com/1good.uz/',
        ],
      },
    ],
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

        <script type='application/ld+json'>{JSON.stringify(ldJson)}</script>
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
