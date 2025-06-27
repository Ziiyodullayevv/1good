import { Link } from 'react-router';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

export default function ApplyForClient() {
  return (
    <section className='my-10'>
      <div className='section-container'>
        <div className='my-10'>
          <h1 className='text-4xl font-bold'>Apply for Client Credits</h1>
          <h4 className='font-semibold mt-4 text-lg'>Project Details</h4>
        </div>
        {/* Project Details s */}
        <div className='my-5'>
          <Label className='text-base' htmlFor='project-title'>
            Project Title
          </Label>
          <Input
            id='project-title'
            className='h-12 max-w-[500px] border-1 border-gray-300 placeholder:text-sm sm:placeholder:text-base mt-3 shadow-none'
            placeholder='Enter project title'
          />
        </div>
        <div className='my-5'>
          <Label className='text-base' htmlFor='project-scope'>
            Project Scope
          </Label>
          <Textarea
            id='project-scope'
            className='max-w-[500px] h-[200px] border-1 border-gray-300 placeholder:text-sm sm:placeholder:text-base mt-3 shadow-none'
            placeholder=''
          />
        </div>
        <div className='my-5'>
          <Label className='text-base' htmlFor='project-budget'>
            Project Budget
          </Label>
          <Input
            id='project-budget'
            className='h-12 max-w-[500px] border-1 border-gray-300 placeholder:text-sm sm:placeholder:text-base mt-3 shadow-none'
            placeholder='Enter project budget'
          />
        </div>
        {/* Personal or Business Background */}
        <h4 className='font-semibold my-8 text-lg'>
          Personal or Business Background
        </h4>
        <div className='my-5'>
          <Label className='text-base' htmlFor='full-name'>
            Full Name
          </Label>
          <Input
            id='full-name'
            className='h-12 max-w-[500px] border-1 border-gray-300 placeholder:text-sm sm:placeholder:text-base mt-3 shadow-none'
            placeholder='Enter your fullname'
          />
        </div>
        <div className='my-5'>
          <Label className='text-base' htmlFor='email-address'>
            Email Address
          </Label>
          <Input
            id='email-address'
            className='h-12 max-w-[500px] border-1 border-gray-300 placeholder:text-sm sm:placeholder:text-base mt-3 shadow-none'
            placeholder='Enter  your email address'
          />
        </div>
        <div className='my-5'>
          <Label className='text-base' htmlFor='phone-number'>
            Phone Number
          </Label>
          <Input
            id='phone-number'
            className='h-12 max-w-[500px] border-1 border-gray-300 placeholder:text-sm sm:placeholder:text-base mt-3 shadow-none'
            placeholder='Enter your phone number'
          />
        </div>
        <div className='my-5'>
          <Label className='text-base' htmlFor='company-name'>
            Company Name (if applicable)
          </Label>
          <Input
            id='company-name'
            className='h-12 max-w-[500px] border-1 border-gray-300 placeholder:text-sm sm:placeholder:text-base mt-3 shadow-none'
            placeholder='Enter company name'
          />
        </div>
        <div className='my-5'>
          <Label className='text-base' htmlFor='company-website'>
            Company Website (if applicable)
          </Label>
          <Input
            id='company-website'
            className='h-12 max-w-[500px] border-1 border-gray-300 placeholder:text-sm sm:placeholder:text-base mt-3 shadow-none'
            placeholder='Enter company website'
          />
        </div>

        {/* Financial Information */}
        <h4 className='font-semibold my-8 text-lg'>
          Personal or Business Background
        </h4>

        <div className='my-5'>
          <Label className='text-base' htmlFor='annual-revenue'>
            Annual Revenue (if applicable)
          </Label>
          <Input
            id='annual-revenue'
            className='h-12 max-w-[500px] border-1 border-gray-300 placeholder:text-sm sm:placeholder:text-base mt-3 shadow-none'
            placeholder='Enter  annual revenue'
          />
        </div>

        <div className='my-5'>
          <Label className='text-base' htmlFor='credit-limit-requested'>
            Credit Limit Requested
          </Label>
          <Input
            id='credit-limit-requested'
            className='h-12 max-w-[500px] border-1 border-gray-300 placeholder:text-sm sm:placeholder:text-base mt-3 shadow-none'
            placeholder='Enter  credit limit requested'
          />
        </div>

        <div className='my-5'>
          <Label className='text-base' htmlFor='additional-financial-info'>
            Additional Financial Information (optional)
          </Label>
          <Textarea
            id='additional-financial-info'
            className='h-[200px] max-w-[500px] border-1 border-gray-300 placeholder:text-sm sm:placeholder:text-base mt-3 shadow-none'
            placeholder='Enter  credit limit requested'
          />
        </div>

        <Link
          to={'apply-for-credits'}
          className='bg-v10 mt-5 inline-block font-bold px-8 py-3 rounded-full cursor-pointer'
        >
          Apply for credits
        </Link>
      </div>
    </section>
  );
}
