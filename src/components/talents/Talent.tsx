import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '../ui/input';
import TalentList from './TalentList';

export default function Talent() {
  return (
    <section className='py-10 bg-v2'>
      <div className='section-container'>
        <div className='flex flex-col'>
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-5 justify-between'>
            <h2 className='text-2xl font-semibold'>Talants</h2>
            <div className='flex overflow-auto gap-2 sm:gap-5'>
              <Select>
                <SelectTrigger className='shadow-none border !rounded-lg text-black'>
                  <SelectValue
                    className='placehoder:text-gray-500 text-base'
                    placeholder='Role'
                  />
                </SelectTrigger>
                <SelectContent
                  className='font-poppins'
                  align='end'
                  side='bottom'
                >
                  <SelectItem value='light'>All</SelectItem>
                  <SelectItem value='light'>Client</SelectItem>
                  <SelectItem value='light'>Freelancer</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className='shadow-none border !rounded-lg text-black'>
                  <SelectValue
                    className='placehoder:text-gray-500 text-base'
                    placeholder='Sort Order'
                  />
                </SelectTrigger>
                <SelectContent
                  className='font-poppins'
                  align='end'
                  side='bottom'
                >
                  <SelectItem value='asc'>Asc</SelectItem>
                  <SelectItem value='desc'>Desc</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Input
            className='mt-5 h-12 shadow-none px-4 rounded-lg sm:rounded-xl bg-white border sm:placeholder:placehoder:text-gray-500 text-base'
            placeholder='Search...'
          />
        </div>
        <TalentList />
      </div>
    </section>
  );
}
