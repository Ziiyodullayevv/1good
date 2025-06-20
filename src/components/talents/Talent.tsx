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
    <section className='py-10 bg-v2 sm:py-20'>
      <div className='section-container'>
        <div className='flex flex-col'>
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-5 justify-between'>
            <h2 className='text-3xl font-bold'>Talantlar</h2>
            <div className='flex overflow-auto gap-2 sm:gap-5'>
              <Select>
                <SelectTrigger className='sm:!h-12 shadow-none border-none sm:text-lg text-black'>
                  <SelectValue placeholder='Kasblar' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='light'>Light</SelectItem>
                  <SelectItem value='dark'>Dark</SelectItem>
                  <SelectItem value='system'>System</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className='sm:!h-12 shadow-none border-none sm:text-lg text-black'>
                  <SelectValue placeholder='Daraja' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='light'>Light</SelectItem>
                  <SelectItem value='dark'>Dark</SelectItem>
                  <SelectItem value='system'>System</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className='sm:!h-12 shadow-none border-none sm:text-lg text-black'>
                  <SelectValue placeholder='Joylashuv' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='light'>Light</SelectItem>
                  <SelectItem value='dark'>Dark</SelectItem>
                  <SelectItem value='system'>System</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className='sm:!h-12 shadow-none border-none sm:text-lg text-black'>
                  <SelectValue placeholder='Format' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='light'>Light</SelectItem>
                  <SelectItem value='dark'>Dark</SelectItem>
                  <SelectItem value='system'>System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Input
            className='mt-5 sm:h-14 shadow-none border-none px-4 h-10 rounded-lg sm:rounded-xl bg-white sm:placeholder:text-lg sm:text-lg'
            placeholder='Qidirish'
          />
        </div>
        <TalentList />
      </div>
    </section>
  );
}
