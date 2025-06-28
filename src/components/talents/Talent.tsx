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
                    placeholder='Jobs'
                  />
                </SelectTrigger>
                <SelectContent align='end' side='bottom'>
                  <SelectItem value='light'>Senior</SelectItem>
                  <SelectItem value='dark'>Meddle</SelectItem>
                  <SelectItem value='system'>Junior</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className='shadow-none border !rounded-lg text-black'>
                  <SelectValue
                    className='placehoder:text-gray-500 text-base'
                    placeholder='Level'
                  />
                </SelectTrigger>
                <SelectContent align='end' side='bottom'>
                  <SelectItem value='light'>Senior</SelectItem>
                  <SelectItem value='dark'>Meddle</SelectItem>
                  <SelectItem value='system'>Junior</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className='shadow-none border !rounded-lg text-black'>
                  <SelectValue
                    className='placehoder:text-gray-500 text-base'
                    placeholder='Location'
                  />
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
            className='mt-5 h-12 shadow-none px-4 rounded-lg sm:rounded-xl bg-white border sm:placeholder:placehoder:text-gray-500 text-base'
            placeholder='Search...'
          />
        </div>
        <TalentList />
      </div>
    </section>
  );
}
