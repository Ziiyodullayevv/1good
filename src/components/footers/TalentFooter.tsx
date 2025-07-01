import logo from '@/assets/images/common/logo-dark.svg';

import { FaLinkedin } from 'react-icons/fa6';
import { FaTelegram } from 'react-icons/fa6';
import { FaInstagram } from 'react-icons/fa6';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { FaThreads } from 'react-icons/fa6';
import { Link } from 'react-router';

export default function TalentFooter() {
  return (
    <footer className='py-20 border-t'>
      <div className='section-container'>
        <div className='flex flex-wrap gap-10 justify-between'>
          <div>
            <img className='w-[70px]' src={logo} alt='logo' />

            <div className='my-8'>
              <h2 className='text-lg font-medium'>Made and hosted in the EU</h2>
              <p>© 2025 1good</p>
            </div>

            <div className='flex gap-4 text-xl'>
              <FaLinkedin />
              <FaTelegram />
              <FaInstagram />
              <FaSquareXTwitter />
              <FaThreads />
            </div>
          </div>

          <div className='flex gap-10'>
            <ul className='flex flex-col gap-2 text-base text-normal text-black/70'>
              <h4 className='font-semibold mb-2 text-black/80'>Freelancer</h4>
              <li>
                <Link className='hover:underline' to={''}>
                  Platform
                </Link>
              </li>
              <li>
                <Link className='hover:underline' to={''}>
                  Find Work
                </Link>
              </li>
              <li>
                <Link className='hover:underline' to={''}>
                  Find Freelancers
                </Link>
              </li>
            </ul>

            <ul className='flex flex-col gap-2 text-base text-normal text-black/70'>
              <h4 className='font-semibold mb-2 text-black/80'>Company</h4>
              <li>
                <Link className='hover:underline' to={''}>
                  About Us
                </Link>
              </li>
              <li>
                <Link className='hover:underline' to={''}>
                  Services
                </Link>
              </li>
              <li>
                <Link className='hover:underline' to={''}>
                  Use Cases
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
