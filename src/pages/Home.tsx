import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Cases from '../components/Cases';
import ContactUS from '../components/ContactUS';
import Hero from '../components/Hero';
import Ideas from '../components/Ideas';
import Process from '../components/Process';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';

export default function Home() {
  const { t, ready } = useTranslation();

  if (!ready) return null;

  const now = new Date().toISOString();

  const ldJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://www.1good.uz/',
        url: 'https://www.1good.uz/',
        name: '1good - First AI-powered freelancing platform in Uzbekistan',
        isPartOf: {
          '@id': 'https://www.1good.uz/#website',
        },
        datePublished: '2025-02-01T00:00:00+00:00',
        dateModified: now,
        description:
          '1good is a freelance company that develops based on innovation and collaboration. Join us to impact business.',
        breadcrumb: {
          '@id': 'https://www.1good.uz/#breadcrumb',
        },
        inLanguage: 'en-US',
        potentialAction: [
          {
            '@type': 'ReadAction',
            target: ['https://www.1good.uz/'],
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://www.1good.uz/#breadcrumb',
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
            name: 'About',
            item: 'https://www.1good.uz/about',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Services',
            item: 'https://www.1good.uz/services',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Use Cases',
            item: 'https://www.1good.uz/usecases',
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
      <Helmet>
        <title>
          1good | {t('heroComp.title').replace(/1good -\s*\|*\s*/gi, '')}
        </title>
        <meta name='description' content={t('heroComp.description')} />
        <link rel='canonical' href='https://www.1good.uz' />

        {/* Facebook Open Graph */}
        <meta property='og:url' content='https://www.1good.uz' />
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

        {/* JSON-LD schema */}
        <script type='application/ld+json'>{JSON.stringify(ldJson)}</script>
      </Helmet>

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
