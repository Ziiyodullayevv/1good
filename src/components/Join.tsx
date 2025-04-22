import { Button } from './ui/button';

export default function Join() {
  return (
    <section className='py-10 sm:py-20'>
      <div className='section-container'>
        <div className='bg-v1 rounded-[45px] items-center p-15 gap-10 flex justify-between'>
          <div className='flex items-start gap-9 flex-col'>
            <h3 className='text-3xl'>Join Our Team</h3>
            <p className='max-w-[700px]'>
              At Positivus, we thrive on innovation and collaboration. We're
              always looking for passionate individuals to join our team and
              help businesses grow. Ready to make an impact?
            </p>
            <Button className='btn-v2'>Explore Careers</Button>
          </div>

          <img src='/public/join.svg' alt='join team image' />
        </div>
      </div>
    </section>
  );
}
