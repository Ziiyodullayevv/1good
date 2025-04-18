import { Link, NavLink } from 'react-router';
import { Input } from './ui/input';
import { Button } from './ui/button';

export default function Footer() {
  return (
    <footer className='pt-10 text-lg text-white'>
      <div className='section-container'>
        <div className='bg-black p-10 rounded-t-4xl'>
          <div className='flex items-center gap-20'>
            <Link to={'/'}>
              <span className='text-3xl font-montserrat font-bold text-white'>
                1good
              </span>
            </Link>
            <nav className='text-white flex gap-5 text-lg'>
              <NavLink className={'underline'} to={'/about'}>
                About Us
              </NavLink>
              <NavLink className={'underline'} to={'/services'}>
                Services
              </NavLink>
              <NavLink className={'underline'} to={'/usecases'}>
                Use Cases
              </NavLink>
            </nav>

            <div className='flex gap-3 items-center'>
              <img src='linkedin.svg' alt='linkiden icon' />
              <img src='facebook.svg' alt='facebook icon' />
              <img src='twitter.svg' alt='twitter icon' />
            </div>
          </div>

          <div className='grid grid-cols-12 gap-10 mt-20 my-9'>
            <div className='flex col-span-5 flex-col gap-3 justify-center items-start'>
              <h2 className='text-2xl bg-v1 inline-block text-black rounded-lg px-3 py-1'>
                Contact us:
              </h2>
              <p>Email: info@positivus.com</p>
              <p>Phone: 555-567-8901</p>
              <p>
                Address: 1234 Main St <br /> Moonstone City, Stardust State
                12345
              </p>
            </div>

            <div className='grid grid-cols-2 items-center col-span-7 gap-3 bg-v3 px-8 rounded-2xl py-10'>
              <Input
                className='!text-lg px-5 placeholder:text-lg h-[60px] rounded-lg'
                placeholder='Email'
              />
              <Button className='btn-v1'>Subscribe to news</Button>
            </div>
          </div>

          <div className='flex border-t pt-10 border-white border-solid gap-10'>
            <p>© 2025 1good . All Rights Reserved.</p>
            <Link className='underline' to={'/'}>
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
