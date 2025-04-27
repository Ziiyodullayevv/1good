import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import SectionTitle from './SectionTitle';
import { useTranslation } from 'react-i18next';

type Works = {
  id: string;
  title: string;
  description: string;
}[];

export default function Process() {
  const { t } = useTranslation();
  const works = t('worksComp.worksData', { returnObjects: true }) as Works;
  return (
    <section className='py-10 sm:py-20'>
      <div className='section-container'>
        <SectionTitle
          title={t('worksComp.title')}
          description={t('worksComp.subTitle')}
          className='max-w-[400px]'
        />

        <div className=' w-full flex flex-col gap-8 mt-10 sm:mt-20'>
          {works.map(({ id, title, description }, index) => (
            <Disclosure as='div' defaultOpen={index === 0} key={id}>
              {({ open }) => (
                <div
                  className={`p-8 sm:p-12 rounded-[45px] box-shadow transition-colors duration-300 ${
                    open ? 'bg-v1' : 'bg-v2'
                  }`}
                >
                  <DisclosureButton className='group flex w-full gap-3 sm:gap-5 items-center justify-between'>
                    <div>
                      <span className='text-3xl flex items-center gap-3 sm:gap-5 shrink-0 text-start font-medium'>
                        <span className='text-3xl md:text-6xl'>
                          {(index + 1).toString().padStart(2, '0')}
                        </span>
                        <span className='text-base sm:text-lg md:text-3xl'>
                          {title}
                        </span>
                      </span>
                    </div>

                    <div className='w-[30px] shrink-0 p-2 h-[30px] md:w-[58px] md:h-[58px] rounded-full bg-white flex justify-center items-center border border-black'>
                      <img
                        src={open ? '-.svg' : '+.svg'}
                        alt={open ? 'minus icon' : 'plus icon'}
                      />
                    </div>
                  </DisclosureButton>

                  <DisclosurePanel className='mt-10 border-t border-black pt-10'>
                    {description}
                  </DisclosurePanel>
                </div>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </section>
  );
}
