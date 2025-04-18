import { Link, NavLink } from 'react-router';

export default function Footer() {
  return (
    <footer className='pt-10 text-lg text-white'>
      <div className='section-container'>
        <div className='bg-black p-10 rounded-t-4xl'>
          <div className='flex items-center gap-20'>
            <span className='text-2xl font-bold text-white'>1good</span>
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

          <div className='gird my-9'>
            <div className='flex flex-col gap-5 justify-center items-start'>
              <h2 className='text-2xl bg-v1 inline-block text-black rounded-lg px-3 py-1'>
                Contact us:
              </h2>
              <p>Email: info@positivus.com</p>
              <p>Phone: 555-567-8901</p>
              <p>Address: 1234 Main St Moonstone City, Stardust State 12345</p>
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
