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
                    placeholder='Years of experience'
                  />
                </SelectTrigger>
                <SelectContent
                  className='font-poppins'
                  align='end'
                  side='bottom'
                >
                  <SelectItem value='light'>1 year</SelectItem>
                  <SelectItem value='light'>2 year</SelectItem>
                  <SelectItem value='light'>3 year</SelectItem>
                  <SelectItem value='light'>4 year</SelectItem>
                  <SelectItem value='light'>5 year</SelectItem>
                  <SelectItem value='light'>6-10 years</SelectItem>
                  <SelectItem value='light'>More than 10 years</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className='shadow-none border !rounded-lg text-black'>
                  <SelectValue
                    className='placehoder:text-gray-500 text-base'
                    placeholder='Rating'
                  />
                </SelectTrigger>
                <SelectContent
                  className='font-poppins'
                  align='end'
                  side='bottom'
                >
                  <SelectItem value='1'>★☆☆☆☆ (1 Star)</SelectItem>
                  <SelectItem value='2'>★★☆☆☆ (2 Stars)</SelectItem>
                  <SelectItem value='3'>★★★☆☆ (3 Stars)</SelectItem>
                  <SelectItem value='4'>★★★★☆ (4 Stars)</SelectItem>
                  <SelectItem value='5'>★★★★★ (5 Stars)</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className='shadow-none border !rounded-lg text-black'>
                  <SelectValue
                    className='placehoder:text-gray-500 text-base'
                    placeholder='Freelancer level'
                  />
                </SelectTrigger>
                <SelectContent
                  className='font-poppins'
                  align='end'
                  side='bottom'
                >
                  <SelectItem value='entry'>Entry Level</SelectItem>
                  <SelectItem value='intermediate'>Intermediate</SelectItem>
                  <SelectItem value='expert'>Expert</SelectItem>
                  <SelectItem value='top-rated'>Top Rated</SelectItem>
                  <SelectItem value='top-rated-plus'>Top Rated Plus</SelectItem>
                  <SelectItem value='rising-talent'>Rising Talent</SelectItem>
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
