import { Link } from 'react-router';

export default function Payment() {
  return (
    <section className='py-10 sm:py-20'>
      <div className='section-container'>
        <div className='bg-v1 grid grid-cols-2 rounded-[45px] p-15 justify-between gap-10'>
          <div>
            <h2 className='section-title'>Overcoming Payment</h2>
            <br />
            <h2 className='section-title'>Uncertainty</h2>
            <h3 className='py-10 text-3xl'>No More Payment Risks</h3>
            <p>
              Freelancers often face delayed or unpaid work, while clients worry
              about paying for incomplete projects. 1good’s Escrow system
              ensures funds are secure until the job is done, protecting both
              sides and building trust.
            </p>
            <Link to={'/'} className='text-lg mt-10 flex gap-3 items-center'>
              <img src='/public/arrow.svg' alt='arrow icon' />{' '}
              <span>Learn How</span>
            </Link>
          </div>

          <div className='flex flex-wrap justify-end gap-8 text-lg'>
            <div className='flex flex-col p-5 text-center justify-center items-center w-[198px] h-[198px] bg-white rounded-[25px]'>
              <h3 className='text-4xl'>96%</h3>
              <p className='mt-3'>Growth IT freelancers in 2024</p>
            </div>

            <div className='flex flex-col p-5 text-center justify-center items-center w-[198px] h-[198px] bg-white rounded-[25px]'>
              <h3 className='text-4xl'>86.8%</h3>
              <p className='mt-3'>Growth IT freelancers in 2024</p>
            </div>

            <div className='flex flex-col p-5 text-center justify-center items-center w-[198px] h-[198px] bg-white rounded-[25px]'>
              <h3 className='text-4xl'>527,000</h3>
              <p className='mt-3'>Growth IT freelancers in 2024</p>
            </div>

            <div className='flex flex-col p-5 text-center justify-center items-center w-[198px] h-[198px] bg-white rounded-[25px]'>
              <h3 className='text-4xl'>200,000+</h3>
              <p className='mt-3'>Growth IT freelancers in 2024</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
