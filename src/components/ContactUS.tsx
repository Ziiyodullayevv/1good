import SectionTitle from './SectionTitle';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

export default function ContactUS() {
  return (
    <section className='py-10 text-lg sm:py-20'>
      <div className='section-container'>
        <SectionTitle
          variant='bg-v2 text-black'
          title='Contact Us'
          description="Connect with Us: Let's Discuss Your Digital Marketing Needs"
          className='max-w-[350px]'
        />

        <div className='bg-v2 relative overflow-hidden rounded-[45px] p-15 mt-20'>
          <img
            className='absolute right-[-330px]'
            src='contactUs.svg'
            alt='contact icon'
          />
          <div className='max-w-[556px]'>
            <RadioGroup className='flex gap-5' defaultValue='option-one'>
              <div className='flex items-center font-medium space-x-2'>
                <RadioGroupItem value='option-one' id='option-one' />
                <Label className='text-lg' htmlFor='option-one'>
                  Say Hi
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='option-two' id='option-two' />
                <Label className='text-lg' htmlFor='option-two'>
                  Get a Quote
                </Label>
              </div>
            </RadioGroup>

            <div className='mt-10'>
              <Label htmlFor='text-one' className='text-base'>
                Name
              </Label>
              <Input
                id='text-one'
                className='border px-7 text-lg placeholder:text-lg bg-white rounded-[14px] h-[58px] mt-2 border-black'
                type='text'
                placeholder='Name'
              />
            </div>

            <div className='mt-10'>
              <Label htmlFor='text-one' className='text-base'>
                Email*
              </Label>
              <Input
                id='text-one'
                className='border px-7 text-lg placeholder:text-lg bg-white rounded-[14px] h-[58px] mt-2 border-black'
                type='text'
                placeholder='Email'
              />
            </div>

            <div className='mt-10'>
              <Label className='text-base'>Message*</Label>
              <Textarea
                className='bg-white text-lg h-[190px] rounded-[14px] placeholder:text-lg border mt-2 border-black'
                placeholder='Message'
              />
            </div>

            <Button className='btn-v2 w-full mt-10'>Send Message</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
