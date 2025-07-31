import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import HamburgerIcon from '../../assets/svgs/HamburgerIcon';
import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';

export default function MobileNavigation() {
  return (
    <Sheet>
      <SheetTrigger>
        <HamburgerIcon className='size-5' />
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader>
          <SheetTitle>
            <img src='/logo-dark.svg' className='w-[70px]' alt='' />
          </SheetTitle>
          <SheetDescription>
            <ul className='flex font-poppins gap-4 border-transparent border-t-black/30 mt-1.5 pt-3 border-t-1 text-black flex-col'>
              <li className='flex text-base text-black/70 hover:text-black justify-between items-center'>
                <Link to={''}>Find Work</Link>
                <ChevronRight className='size-5' />
              </li>

              <li className='flex text-base text-black/70 hover:text-black justify-between items-center'>
                <Link to={'/dashboard/my-projects'}>My Projects</Link>
                <ChevronRight className='size-5' />
              </li>

              <li className='flex text-base text-black/70 hover:text-black justify-between items-center'>
                <Link to={'/dashboard/analytics'}>Analytics</Link>
                <ChevronRight className='size-5' />
              </li>

              <li className='flex text-base text-black/70 hover:text-black justify-between items-center'>
                <Link to={'/dashboard/messages'}>Messages</Link>
                <ChevronRight className='size-5' />
              </li>
            </ul>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
