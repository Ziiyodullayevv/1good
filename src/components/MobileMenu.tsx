import { useState } from 'react';
import { Menu, X, Home, User, Settings, Mail } from 'lucide-react';
import Logo from './Logo';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import AuthModal from '../features/auth/components/AuthModal';

export default function MobileMenu() {
  const { t, i18n } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { icon: Home, label: t('home'), href: '/' },
    { icon: User, label: t('about'), href: '/about' },
    { icon: Settings, label: t('services'), href: '/services' },
    { icon: Mail, label: t('useCases'), href: '/usecases' },
  ];

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <>
      {/* Floating Menu Button */}
      <button
        onClick={toggleMenu}
        className='fixed right-4 z-50 w-10 bg-primary h-10 text-primary-foreground rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 active:scale-95'
        aria-label='Toggle menu'
      >
        <div className='relative w-5 h-5'>
          <Menu
            size={20}
            className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`}
          />
          <X
            size={20}
            className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`}
          />
        </div>
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={toggleMenu}
      />

      {/* Sliding Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-120 max-w-[85vw] bg-background border-l border-border z-50 transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className='flex flex-col h-full'>
          {/* Header with Logo */}
          <div className='px-6 py-6 h-18 border-b border-border flex items-center justify-between'>
            <Logo />
            <button onClick={toggleMenu} className='text-muted-foreground'>
              <X size={20} />
            </button>
          </div>

          {/* Menu Content */}
          <div className='flex flex-col gap-4 flex-1 px-6 py-6 overflow-y-auto'>
            {/* Language Select */}
            <Select onValueChange={changeLanguage} defaultValue={i18n.language}>
              <SelectTrigger className='w-full !h-12 rounded-lg mb-4'>
                <SelectValue placeholder='Language' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='en'>English</SelectItem>
                <SelectItem value='uz'>Oʻzbek</SelectItem>
                <SelectItem value='ru'>Русский</SelectItem>
              </SelectContent>
            </Select>

            {/* Navigation Links with Icons */}
            <nav className='flex flex-col gap-3'>
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    onClick={toggleMenu}
                    className={({ isActive }) =>
                      isActive
                        ? 'bg-v2 w-full flex items-center h-12 gap-3 px-4 py-3 rounded-lg text-foreground font-medium'
                        : 'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-foreground/80 hover:bg-v2 hover:text-foreground transition-all'
                    }
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            {/* Join & Login Buttons */}
            <div className='mt-6 flex flex-col gap-3'>
              {/* <Button
                className='w-full h-12 rounded-xl text-base'
                onClick={() => {
                  toggleMenu();
                  navigate('/join');
                }}
              >
                Join
              </Button>
              <Button
                variant='outline'
                className='w-full h-12 rounded-xl text-base'
                onClick={() => {
                  toggleMenu();
                  navigate('/login');
                }}
              >
                Login
              </Button> */}

              <AuthModal isLogin={true} />
              <AuthModal />
            </div>
          </div>

          {/* Footer */}
          <div className='px-6 py-6 border-t border-border text-center text-sm text-muted-foreground'>
            Simple & Modern
          </div>
        </div>
      </div>
    </>
  );
}
