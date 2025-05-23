import SectionTitle from './SectionTitle';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

export default function ContactUS() {
  const navigate = useNavigate();

  const { t } = useTranslation();
  return (
    <section className='py-10 sm:py-20'>
      <div className='section-container'>
        <SectionTitle
          variant='bg-v3 text-white'
          title={t('contactComp.title')}
          description={t('contactComp.subTitle')}
          className='max-w-[370px]'
        />

        <div className='bg-v2 relative z-10 overflow-hidden rounded-[45px] p-7 sm:p-15 mt-6 sm:mt-20'>
          <img
            className='absolute hidden md:block right-[-330px]'
            src='contactUs.svg'
            alt='contact icon'
          />
          <div className='max-w-[556px] relative z-0'>
            <RadioGroup className='flex gap-5' defaultValue='option-one'>
              <div className='flex items-center font-medium space-x-2'>
                <RadioGroupItem value='option-one' id='option-one' />
                <Label className='text-sm sm:text-lg' htmlFor='option-one'>
                  {t('contactComp.radio1')}
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='option-two' id='option-two' />
                <Label className='text-sm sm:text-lg' htmlFor='option-two'>
                  {t('contactComp.radio2')}
                </Label>
              </div>
            </RadioGroup>

            <div className='mt-6 sm:mt-10'>
              <Label htmlFor='text-one' className='text-base'>
                {t('contactComp.fullName')}
              </Label>
              <Input
                id='text-one'
                className='border px-7 sm:placeholder:text-lg bg-white rounded-[14px] h-[58px] mt-2 border-black'
                type='text'
                placeholder={t('contactComp.fullName')}
              />
            </div>

            <div className='mt-6 sm:mt-10'>
              <Label htmlFor='text-one' className='text-base'>
                {t('contactComp.email')}*
              </Label>
              <Input
                id='text-one'
                className='border px-7 sm:text-lg sm:placeholder:text-lg bg-white rounded-[14px] h-[58px] mt-2 border-black'
                type='text'
                placeholder={t('contactComp.email')}
              />
            </div>

            <div className='mt-6 sm:mt-10'>
              <Label className='text-base'>{t('contactComp.message')}*</Label>
              <Textarea
                className='bg-white sm:text-lg h-[130px] sm:h-[190px] rounded-[14px] sm:placeholder:text-lg border mt-2 border-black'
                placeholder={t('contactComp.message')}
              />
            </div>

            <Button
              onClick={() => navigate('coming-soon')}
              className='btn-v2 w-full mt-6 sm:mt-10'
            >
              {t('contactComp.btnText')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
