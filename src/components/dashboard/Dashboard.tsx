import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import Banner from './Banner';

export default function Dashboard() {
  return (
    <section className='text-base'>
      <div className='bg-white rounded-xl overflow-hidden'>
        {/* Banner  */}
        <Banner />

        {/* Main  */}
        <div className='p-4 sm:p-8 min-h-[calc(100vh-72px)]'>
          {/* Profile  */}
          <div className='sm:flex items-center justify-between gap-4'>
            <div className='flex items-center gap-4'>
              <span className='w-21 h-21 md:w-25 overflow-hidden shrink-0 bg-v9/40 inline-block rounded-full md:h-25'>
                <img
                  src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D'
                  alt='user'
                />
              </span>
              <div className='flex flex-col items-start gap-1'>
                <h2 className='text-base md:text-xl leading-5 font-medium'>
                  Alexa Rawles
                </h2>
                <span className='text-xs leading-2 md:text-sm text-gray-400'>
                  alexarawles@gmail.com
                </span>
                <button className='h-8 text-sm mt-2 md:text-base md:hidden sm:block bg-v9 text-white px-6 rounded-lg cursor-pointer'>
                  Edit
                </button>
              </div>
            </div>

            <button className='h-10 hidden sm:block bg-v9 text-white px-6 rounded-lg cursor-pointer'>
              Edit
            </button>
          </div>

          {/* Form  */}
          <div className='grid sm:grid-cols-2 gap-6 mt-8'>
            <div>
              <Label htmlFor='full-name'>Full Name</Label>
              <Input
                id='full-name'
                className='h-12 placeholder:text-sm sm:placeholder:text-base mt-3 bg-v2 border-none shadow-none'
                placeholder='Your First Name'
              />
            </div>

            <div>
              <Label htmlFor='nick-name'>Nick Name</Label>
              <Input
                id='nick-name'
                className='h-12 placeholder:text-sm sm:placeholder:text-base mt-3 bg-v2 border-none shadow-none'
                placeholder='Your First Name'
              />
            </div>

            <div>
              <Label>Gender</Label>
              <Select>
                <SelectTrigger className='!h-12 !rounded-lg w-full mt-3 bg-v2 border-none shadow-none'>
                  <SelectValue placeholder='Theme' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='light'>Light</SelectItem>
                  <SelectItem value='dark'>Dark</SelectItem>
                  <SelectItem value='system'>System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Country</Label>
              <Select>
                <SelectTrigger className='!h-12 !rounded-lg w-full mt-3 bg-v2 border-none shadow-none'>
                  <SelectValue placeholder='Theme' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='light'>Light</SelectItem>
                  <SelectItem value='dark'>Dark</SelectItem>
                  <SelectItem value='system'>System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Language</Label>
              <Select>
                <SelectTrigger className='!h-12 !rounded-lg w-full mt-3 bg-v2 border-none shadow-none'>
                  <SelectValue placeholder='Theme' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='light'>Light</SelectItem>
                  <SelectItem value='dark'>Dark</SelectItem>
                  <SelectItem value='system'>System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Time Zone</Label>
              <Select>
                <SelectTrigger className='!h-12 !rounded-lg w-full mt-3 bg-v2 border-none shadow-none'>
                  <SelectValue placeholder='Theme' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='light'>Light</SelectItem>
                  <SelectItem value='dark'>Dark</SelectItem>
                  <SelectItem value='system'>System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Footer  */}
          <div className='mt-8 text-sm md:text-lg font-medium'>
            <h2>My email Address</h2>
            <div className='mt-5 flex items-center gap-4'>
              <span className='flex justify-center items-center w-12 h-12 bg-v9/10 rounded-full'>
                <img src='/sms.svg' alt='' />
              </span>

              <div>
                <h3 className='font-normal'>alexarawles@gmail.com</h3>
                <span className='text-gray-400 font-normal text-xs md:text-sm'>
                  1 month ago
                </span>
              </div>
            </div>

            <button className='h-11 my-8 font-normal text-sm md:text-base cursor-pointer rounded-lg bg-v9/10 text-v9 px-4'>
              +Add Email Address
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
