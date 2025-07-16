import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

export default function OrderSingle() {
  return (
    <section className='my-10'>
      <div className='section-container'>
        <div>
          <h1 className='text-4xl font-semibold'>
            AI-Powered Content Creation for Marketing Campaign
          </h1>
          <p className='mt-4'>
            This project involves leveraging AI tools to generate high-quality
            content for a comprehensive marketing campaign. The goal is to
            create engaging and persuasive materials that resonate with our
            target audience and drive conversions. The content will span various
            formats, including website copy, social media posts, email
            newsletters, and ad creatives.
          </p>
        </div>

        <h4 className='my-5 text-2xl font-semibold'>Project Details</h4>

        <div className='grid grid-cols-2 border-t py-8 border-gray-300 gap-5'>
          <div className='max-w-[500px]'>
            <h5 className='text-gray-500'>Client Requirements</h5>
            <p>
              Develop AI-generated content for website, social media, email, and
              ads.
            </p>
          </div>

          <div>
            <h5 className='text-gray-500'>Budget</h5>
            <p className='font-semibold'>$500 - $1000</p>
          </div>
        </div>

        <div className='grid grid-cols-2 border-t py-8 border-gray-300 gap-5'>
          <div className='max-w-[500px]'>
            <h5 className='text-gray-500'>Timeline</h5>
            <p>2 weeks</p>
          </div>

          <div>
            <h5 className='text-gray-500'>Skills Required</h5>
            <p className='max-w-[450px]'>
              AI Content Generation, Marketing Copywriting, SEO Optimization
            </p>
          </div>
        </div>

        <div className='grid grid-cols-2 border-t py-8 border-gray-300 gap-5'>
          <div className='max-w-[500px]'>
            <h5 className='text-gray-500'>Project Type</h5>
            <p>Fixed-Price</p>
          </div>
        </div>

        <div className='my-10'>
          <h4 className='text-2xl font-semibold'>Submit a Proposal</h4>
          <Textarea className='my-5 shadow-none min-h-[200px] max-w-[500px]' />

          <Input
            id='full-name'
            className='h-12 placeholder:text-sm sm:placeholder:text-base mt-3 max-w-[500px] shadow-none'
            placeholder='Your bid amount'
          />

          <button className='h-12 bg-v9 cursor-pointer text-white px-4 rounded-lg mt-4'>
            Submit Proposal
          </button>
        </div>
      </div>
    </section>
  );
}
