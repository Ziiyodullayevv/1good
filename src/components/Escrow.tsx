import { Button } from './ui/button';

export default function Escrow() {
  return (
    <section className='py-10 sm:py-20'>
      <div className='section-container'>
        <div className='flex gap-20 bg-v1 p-15 rounded-[45px] box-shadow'>
          <div className='flex items-start gap-8'>
            <img src='/star.svg' alt='start icon' />
            <div>
              <h2 className='section-title text-3xl'>Escrow for</h2>
              <br />
              <h2 className='section-title text-3xl'>Safe Transactions</h2>
            </div>
          </div>

          <div className='flex flex-col gap-20'>
            <p className='max-w-'>
              With 1good’s Escrow system, payments are held securely until the
              project is approved. Freelancers get paid reliably, and clients
              only release funds when satisfied—building trust effortlessly.
            </p>
            <Button className='btn-v2 w-full'>Sign up</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
