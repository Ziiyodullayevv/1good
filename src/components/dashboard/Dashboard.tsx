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
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Textarea } from '../ui/textarea';
import { frameworks, MultiSelect } from '../ui/multi-select';

export default function Dashboard() {
  return (
    <section className='text-base'>
      <div className='bg-white rounded-xl overflow-hidden'>
        {/* Banner  */}
        <Banner />

        {/* Main  */}
        <div className='p-4 sm:p-8 min-h-[calc(100vh-72px)]'>
          {/* Profile  */}

          {/* Form  */}
          <form className='grid sm:grid-cols-2 gap-6'>
            <div className='sm:flex col-span-2 items-center mb-8 justify-between gap-4'>
              <div className='flex items-center gap-4'>
                <Avatar className='w-21 h-21 md:w-25 overflow-hidden shrink-0 bg-v9/40 inline-block rounded-full md:h-25'>
                  <AvatarImage src='https://github.com/shadcn' />
                  <AvatarFallback className='text-2xl'>CN</AvatarFallback>
                </Avatar>
                <div className='flex flex-col items-start gap-1 md:gap-2'>
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

            <div>
              <Label htmlFor='full-name'>First Name</Label>
              <Input
                id='full-name'
                className='h-10 placeholder:text-sm  mt-3 bg-v2 border-none shadow-none'
                placeholder='Your First Name'
              />
            </div>

            <div>
              <Label htmlFor='nick-name'>Last Name</Label>
              <Input
                id='nick-name'
                className='h-10 placeholder:text-sm  mt-3 bg-v2 border-none shadow-none'
                placeholder='Your Last Name'
              />
            </div>

            <div>
              <Label htmlFor='gmail'>Gmail</Label>
              <Input
                id='gmail'
                className='h-10 placeholder:text-sm  mt-3 bg-v2 border-none shadow-none'
                placeholder='Your First Name'
              />
            </div>

            <div>
              <Label htmlFor='avatar'>Avatar URL</Label>
              <Input
                id='avatar'
                className='h-10 placeholder:text-sm  mt-3 bg-v2 border-none shadow-none'
                placeholder='Your First Name'
              />
            </div>

            <div>
              <Label htmlFor='about-me'>About Me</Label>
              <Textarea
                id='about-me'
                className='h-25 placeholder:text-sm  mt-3 bg-v2 border-none shadow-none'
              />
            </div>

            <div>
              <Label htmlFor='short-bio'>Short Bio</Label>
              <Textarea
                id='short-bio'
                className='h-25 placeholder:text-sm  mt-3 bg-v2 border-none shadow-none'
              />
            </div>

            <div>
              <Label>Role</Label>
              <Select>
                <SelectTrigger className='!h-10 !rounded-lg w-full mt-3 bg-v2 border-none shadow-none'>
                  <SelectValue placeholder='Theme' />
                </SelectTrigger>
                <SelectContent className='font-poppins rounded-lg'>
                  <SelectItem className='h-10' value='light'>
                    Client
                  </SelectItem>
                  <SelectItem className='h-10' value='dark'>
                    Freelianer
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor='skills'>Skills</Label>
              <MultiSelect
                options={frameworks || []}
                className='mt-3 h-10 w-full'
                selected={[]}
                onChange={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
