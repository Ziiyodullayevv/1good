import { ChevronRight, Plus } from 'lucide-react';
import Banner from './Banner';
import { Button } from '../ui/button';

export default function Settings() {
  return (
    <div className='bg-white text-base min-h-[calc(100vh-80px)] rounded-xl overflow-hidden'>
      <Banner title='Settings' />

      <div className='p-8'>
        {/* Payment metods  */}
        <div>
          <h3 className='text-lg items-center font-semibold'>Payment Method</h3>
          <div className='flex gap-3 my-4'>
            <div className='w-12 rounded-lg flex justify-center items-center h-12 bg-v2'>
              <Plus />
            </div>

            <div>
              <h4 className='font-medium'>Add payout method</h4>
              <span className='text-gray-500'>Bank account</span>
            </div>
          </div>
        </div>

        {/* Buttons group */}
        <div className='my-5'>
          <h3 className='text-lg items-center font-semibold'>Language</h3>
          <div className='flex gap-3 my-4'>
            <Button
              className='h-11 rounded-lg shadow-none cursor-pointer'
              variant={'outline'}
            >
              Uzbek
            </Button>

            <Button
              className='h-11 rounded-lg shadow-none cursor-pointer'
              variant={'outline'}
            >
              Russian
            </Button>

            <Button
              className='h-11 rounded-lg shadow-none cursor-pointer'
              variant={'outline'}
            >
              English
            </Button>
          </div>
        </div>

        {/* Support  */}
        <div className='my-5'>
          <h3 className='text-lg items-center font-semibold'>Support</h3>
          <div className='flex cursor-pointer text-gray-500 hover:text-black justify-between mt-3 w-full'>
            <span>Contact Support</span>
            <ChevronRight className='size-4' />
          </div>
        </div>
      </div>
    </div>
  );
}
