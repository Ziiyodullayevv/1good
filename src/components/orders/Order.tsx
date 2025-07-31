import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '../ui/input';
import OrderList from './OrderList';

export default function Order() {
  return (
    <section className='py-10 bg-v2'>
      <div className='section-container'>
        <div className='flex flex-col'>
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-5 justify-between'>
            <h2 className='text-2xl font-semibold'>Order List</h2>
            <div className='flex overflow-auto gap-2 sm:gap-5'>
              <Select>
                <SelectTrigger className='shadow-none !border !rounded-lg text-black'>
                  <SelectValue className='text-base' placeholder='Level' />
                </SelectTrigger>
                <SelectContent align='end' side='bottom'>
                  <SelectItem value='light'>Senior</SelectItem>
                  <SelectItem value='dark'>Meddle</SelectItem>
                  <SelectItem value='system'>Junior</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className='shadow-none !border !rounded-lg text-black'>
                  <SelectValue className='text-base' placeholder='Price' />
                </SelectTrigger>
                <SelectContent align='end' side='bottom'>
                  <SelectItem value='light'>$100 - $500</SelectItem>
                  <SelectItem value='dark'>$500 - $1000</SelectItem>
                  <SelectItem value='system'>$1000 - $2000</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className='shadow-none !border !rounded-lg text-black'>
                  <SelectValue className='text-base' placeholder='Location' />
                </SelectTrigger>
                <SelectContent align='end' side='bottom'>
                  <SelectItem value='light'>Tashkent, Uzbekistan</SelectItem>
                  <SelectItem value='dark'>Dubai</SelectItem>
                  <SelectItem value='system'>New York, USA</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Input
            className='mt-5 h-12 shadow-none border px-4 rounded-lg sm:rounded-xl bg-white sm:placeholder:text-base'
            placeholder='Search...'
          />
        </div>
        <OrderList />
      </div>
    </section>
  );
}
