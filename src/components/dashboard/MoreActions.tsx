import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { Ellipsis, FilePenLine, Trash2 } from 'lucide-react';

export default function MoreActions() {
  return (
    <Popover className='relative'>
      <PopoverButton
        className={
          'h-8 w-8 bg-v2 rounded-full flex items-center justify-center'
        }
      >
        <Ellipsis className='size-5 cursor-pointer' />
      </PopoverButton>
      <PopoverPanel
        anchor='bottom end'
        transition
        className='flex font-poppins flex-col rounded-md bg-white shadow-xl border-v2 border text-sm/6 transition duration-200 ease-in-out [--anchor-gap:--spacing(2)] p-2 min-w-[130px] data-closed:-translate-y-1 data-closed:opacity-0'
      >
        <h4 className='px-4 py-2 text-gray-700 text-sm'>Actions</h4>
        <div className='hover:bg-v9/5 rounded-sm flex gap-2 text-v9 items-center py-1 px-3'>
          <FilePenLine className='size-4' />
          <span>Edit</span>
        </div>

        <div className='hover:bg-red-600/5 rounded-sm flex gap-2 text-red-600 items-center py-1 px-3'>
          <Trash2 className='size-4' />
          <span>Delete</span>
        </div>
      </PopoverPanel>
    </Popover>
  );
}
