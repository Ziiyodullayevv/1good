import SectionTitle from './SectionTitle';

export default function ContactUS() {
  return (
    <section className='py-10 sm:py-20'>
      <div className='section-container'>
        <SectionTitle
          variant='bg-v2 text-black'
          title='Contact Us'
          description="Connect with Us: Let's Discuss Your Digital Marketing Needs"
          className='max-w-[323px]'
        />

        <div className='bg-v2'></div>
      </div>
    </section>
  );
}
