import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';

export default function ComingSoon() {
  const now = new Date();

  const formattedNow = now.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const { t } = useTranslation('coming-soon');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendEmailToTelegram = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast(<h3 className='text-base'></h3>, {
        description: <p className='text-black'>{formattedNow}</p>,
        action: {
          label: 'Undo',
          onClick: () => console.log('Undo'),
        },
      });
      return;
    }

    setIsLoading(true);

    const telegramBotToken = '7831395863:AAEOoA1pAoyGoAdkAs4Buasj87JDT08YnuE'; // <-- Tokeningizni kiriting
    const chatIds = ['961047307', '961047308']; // <-- Chat ID lar

    const message = `📧 Yangi email: ${email} \n ${formattedNow}`;

    try {
      await Promise.all(
        chatIds.map((chatId) =>
          fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chat_id: chatId,
              text: message,
            }),
          })
        )
      );

      toast(<h3 className='text-base'>{t('thankYouMessage')}</h3>, {
        description: <p className='text-black'>{formattedNow}</p>,
        action: {
          label: 'Undo',
          onClick: () => console.log('Undo'),
        },
      });
      setEmail('');
    } catch (error) {
      console.error('Xatolik:', error);
      toast(<h3 className='text-base'>{t('errorMessage')}</h3>, {
        description: <p className='text-black'>{formattedNow}</p>,
        action: {
          label: 'Undo',
          onClick: () => console.log('Undo'),
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='py-10 sm:py-20'>
      <div className='auth-container text-center'>
        <div className='flex flex-col gap-5'>
          <h1 className='text-3xl sm:text-5xl font-semibold'>{t('title')}</h1>
          <p>{t('description')}</p>
        </div>

        <form
          onSubmit={sendEmailToTelegram}
          className='flex flex-col sm:flex-row mt-15 gap-3'
        >
          <Input
            type='email'
            name='email'
            value={email}
            required
            autoComplete='email'
            onChange={(e) => setEmail(e.target.value)}
            className='h-12 text-base placeholder:text-base'
            placeholder={t('placeholder')}
          />
          <Button
            type='submit'
            className='bg-v1 hover:bg-v1 text-black cursor-pointer h-12 text-base'
            disabled={isLoading}
          >
            {isLoading ? t('loading') : t('buttonText')}
          </Button>
        </form>

        <p className='mt-5 text-black/70'>{t('footer')}</p>
      </div>
    </section>
  );
}
