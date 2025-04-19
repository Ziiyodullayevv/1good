import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import SectionTitle from './SectionTitle';

export default function Process() {
  const faqList = [
    {
      question: 'Consultation',
      answer:
        'During the initial consultation, we will discuss your business goals and objectives, target audience, and current marketing efforts. This will allow us to understand your needs and tailor our services to best fit your requirements.',
    },
    {
      question: 'Research and Strategy Development',
      answer:
        'During the initial consultation, we will discuss your business goals and objectives, target audience, and current marketing efforts. This will allow us to understand your needs and tailor our services to best fit your requirements.',
    },
    {
      question: 'Implementation',
      answer:
        'During the initial consultation, we will discuss your business goals and objectives, target audience, and current marketing efforts. This will allow us to understand your needs and tailor our services to best fit your requirements.',
    },
    {
      question: 'Monitoring and Optimization',
      answer:
        'During the initial consultation, we will discuss your business goals and objectives, target audience, and current marketing efforts. This will allow us to understand your needs and tailor our services to best fit your requirements.',
    },
    {
      question: 'Reporting and Communication',
      answer:
        'During the initial consultation, we will discuss your business goals and objectives, target audience, and current marketing efforts. This will allow us to understand your needs and tailor our services to best fit your requirements.',
    },
    {
      question: 'Continual Improvement',
      answer:
        'During the initial consultation, we will discuss your business goals and objectives, target audience, and current marketing efforts. This will allow us to understand your needs and tailor our services to best fit your requirements..',
    },
  ];
  return (
    <section className='py-20'>
      <div className='section-container'>
        <SectionTitle
          title='Our Working Process '
          description='Step-by-Step Guide to Achieving Your Business Goals'
          className='max-w-[292px]'
        />

        <div className=' w-full flex flex-col gap-8 mt-20'>
          {faqList.map((item, index) => (
            <Disclosure as='div' defaultOpen={index === 0} key={index}>
              {({ open }) => (
                <div
                  className={`p-12 rounded-[45px] box-shadow transition-colors duration-300 ${
                    open ? 'bg-v1' : 'bg-v2'
                  }`}
                >
                  <DisclosureButton className='group flex w-full items-center justify-between'>
                    <span className='text-3xl flex items-center gap-5 shrink-0 font-medium'>
                      <span className='text-6xl'>
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                      {item.question}
                    </span>

                    <div className='w-[58px] h-[58px] rounded-full bg-white flex justify-center items-center border border-black'>
                      <img
                        src={open ? '-.svg' : '+.svg'}
                        alt={open ? 'minus icon' : 'plus icon'}
                      />
                    </div>
                  </DisclosureButton>

                  <DisclosurePanel className='mt-10 text-lg border-t border-black pt-10'>
                    {item.answer}
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
