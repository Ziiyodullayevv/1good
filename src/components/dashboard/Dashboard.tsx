import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export default function Dashboard() {
  return (
    <section className='text-base'>
      <div className='bg-white rounded-xl overflow-hidden'>
        {/* Banner  */}
        <div className='h-25 overflow-hidden'>
          <img
            className='w-full'
            src='/profile-banner.jpg'
            alt='profile banner'
          />
        </div>

        {/* Main  */}
        <div className='p-8'>
          {/* Profile  */}
          <div className='flex items-center justify-between gap-4'>
            <div className='flex items-center gap-4'>
              <span className='w-25 overflow-hidden shrink-0 bg-v9/40 inline-block rounded-full h-25'>
                <img
                  src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D'
                  alt='user'
                />
              </span>
              <div>
                <h2 className='text-xl font-medium'>Alexa Rawles</h2>
                <span className='text-sm text-gray-400'>
                  alexarawles@gmail.com
                </span>
              </div>
            </div>

            <button className='h-10 bg-v9 text-white px-6 rounded-lg cursor-pointer'>
              Edit
            </button>
          </div>

          {/* Form  */}
          <div className='grid grid-cols-2 gap-6 mt-8'>
            <div>
              <Label htmlFor='full-name'>Full Name</Label>
              <Input
                id='full-name'
                className='h-12 mt-3 bg-v2 border-none shadow-none'
                placeholder='Your First Name'
              />
            </div>

            <div>
              <Label htmlFor='nick-name'>Nick Name</Label>
              <Input
                id='nick-name'
                className='h-12 mt-3 bg-v2 border-none shadow-none'
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
          <div className='mt-8 text-lg font-medium'>
            <h2>My email Address</h2>
            <div className='mt-5 flex items-center gap-4'>
              <span className='flex justify-center items-center w-12 h-12 bg-v9/10 rounded-full'>
                <img src='/sms.svg' alt='' />
              </span>

              <div>
                <h3 className='font-normal'>alexarawles@gmail.com</h3>
                <span className='text-gray-400 font-normal text-sm'>
                  1 month ago
                </span>
              </div>
            </div>

            <button className='h-11 my-8 font-normal text-base cursor-pointer rounded-lg bg-v9/10 text-v9 px-4'>
              +Add Email Address
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
