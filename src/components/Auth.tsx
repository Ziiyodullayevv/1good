import { useTranslation } from 'react-i18next';
import SectionTitle from './SectionTitle';
import { Button } from './ui/button';
import { Link } from 'react-router';

type AuthOptions = {
  title: string;
  image: string;
  buttonText: string;
  url: string;
};

export default function Auth() {
  const { t } = useTranslation('auth');
  const authOptions = t('authComp.authData', {
    returnObjects: true,
  }) as AuthOptions[];

  return (
    <section className='py-10 sm:py-20'>
      <div className='section-container'>
        <div className='flex justify-center'>
          <SectionTitle title={t('authComp.title')} />
        </div>

        <div className='grid gap-10 sm:gap-15 mt-10 sm:mt-20 grid-cols-1 sm:grid-cols-2'>
          {authOptions.map(({ title, url, buttonText, image }, index) => (
            <div
              key={index}
              className='bg-v1 box-shadow flex justify-between items-center rounded-[45px] p-12'
            >
              <div className='flex flex-col items-start gap-25'>
                <h2 className='bg-black text-xl sm:text-4xl rounded-xl py-1 px-3 text-white inline-block'>
                  {title}
                </h2>
                <Link to={url}>
                  <Button className='rounded-[100px] cursor-pointer sm:text-lg'>
                    {buttonText}
                  </Button>
                </Link>
              </div>
              <img src={image} alt='auth image' />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
