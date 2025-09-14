import { X, ChevronRight, ExternalLinkIcon, Check, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router';
import AuthModal from '@/features/auth/components/AuthModal';
import { useAuth } from '@/context/AuthContext';
import { useUser } from '@/hooks/useUser';
import { useState } from 'react';
import i18n from '@/i18n';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const languages = [
  { code: 'uz', name: "O'zbekcha" },
  { code: 'ru', name: 'Русский' },
  { code: 'en', name: 'English' },
];

const publicLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Use Cases', path: '/usecases' },
];

const clientLinks = [
  { label: 'Freelancers', path: '/talent' },
  { label: 'Orders', path: '/order' },
];

const freelancerLinks = [
  { label: 'Clients', path: '/talent' },
  { label: 'Orders', path: '/order' },
];

const dashboardLinks = [
  { label: 'Profile', path: '/dashboard' },
  { label: 'Portfolio', path: '/dashboard/portfolio', role: 'freelancer' },
  { label: 'My Orders', path: '/dashboard/my-projects', role: 'client' },
  { label: 'Contracts', path: '/dashboard/contract' },
  { label: 'Submissions', path: '/dashboard/submission' },
  { label: 'Analytics', path: '/dashboard/analytics' },
  { label: 'Credits', path: '/dashboard/credits' },
  { label: 'Settings', path: '/dashboard/settings' },
];

export default function MobileNavigation({
  isOpen,
  onClose,
}: MobileNavigationProps) {
  const navigate = useNavigate();
  const [currentLang, setCurrentLang] = useState(i18n.language || 'en');
  const { user, logout } = useAuth();
  const { data, isLoading } = useUser();

  const handleClick = (link: string) => {
    navigate(link);
    onClose();
  };

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setCurrentLang(langCode);
    onClose();
  };

  const getInitials = (firstName = '', lastName = '') =>
    `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase();

  const initials = data ? getInitials(data.firstName, data.lastName) : '';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 z-50 bg-background'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className='flex h-full flex-col'
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className='border-b border-border p-6 flex items-center justify-between relative'>
              {!user && (
                <div className='flex gap-2'>
                  <AuthModal isLogin={true} />
                  <AuthModal />
                </div>
              )}

              {!!user && (
                <>
                  {isLoading ? (
                    <div className='flex items-center gap-3'>
                      <Skeleton className='size-12 rounded-full bg-v2' />
                      <div className='flex flex-col gap-2'>
                        <Skeleton className='h-4 w-32 rounded-md bg-v2' />
                        <Skeleton className='h-3 w-24 rounded-md bg-v2' />
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => handleClick('/dashboard')}
                      className='flex items-center gap-3 cursor-pointer'
                    >
                      <Avatar className='size-12 rounded-full'>
                        <AvatarImage src={data?.avatarUrl} alt='User Avatar' />
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className='font-medium capitalize'>
                          {data?.firstName} {data?.lastName}
                        </div>
                        <div className='text-sm text-muted-foreground'>
                          {data?.email}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              <button
                onClick={onClose}
                className='p-2 absolute right-4 top-4 rounded-sm hover:bg-muted transition-colors'
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation */}
            <div className='flex-1 overflow-y-auto p-6 space-y-6'>
              {/* Public links */}
              {!user && (
                <div className='space-y-4'>
                  {publicLinks.map((link) => (
                    <motion.div
                      key={link.path}
                      onClick={() => handleClick(link.path)}
                      className='flex items-center justify-between py-2 cursor-pointer hover:text-muted-foreground'
                      whileHover={{ x: 4 }}
                    >
                      <span>{link.label}</span>
                      <ChevronRight size={16} />
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Authenticated links */}
              {!!user && (
                <div className='space-y-4'>
                  <motion.div
                    onClick={() => handleClick('/talent/messages')}
                    className='flex items-center justify-between py-2 cursor-pointer hover:text-muted-foreground'
                    whileHover={{ x: 4 }}
                  >
                    <span>Inbox</span>
                    <ChevronRight size={16} />
                  </motion.div>

                  {user?.role === 'client' &&
                    clientLinks.map((link) => (
                      <motion.div
                        key={link.path}
                        onClick={() => handleClick(link.path)}
                        className='flex items-center justify-between py-2 cursor-pointer hover:text-muted-foreground'
                        whileHover={{ x: 4 }}
                      >
                        <span>{link.label}</span>
                        <ChevronRight size={16} />
                      </motion.div>
                    ))}

                  {user?.role === 'freelancer' &&
                    freelancerLinks.map((link) => (
                      <motion.div
                        key={link.path}
                        onClick={() => handleClick(link.path)}
                        className='flex items-center justify-between py-2 cursor-pointer hover:text-muted-foreground'
                        whileHover={{ x: 4 }}
                      >
                        <span>{link.label}</span>
                        <ChevronRight size={16} />
                      </motion.div>
                    ))}

                  <Accordion type='single' collapsible>
                    <AccordionItem value='dashboard'>
                      <AccordionTrigger>Dashboard</AccordionTrigger>
                      <AccordionContent>
                        <div className='space-y-2 pl-4'>
                          {dashboardLinks
                            .filter(
                              (link) => !link.role || link.role === user?.role
                            )
                            .map((link) => (
                              <motion.div
                                key={link.path}
                                onClick={() => handleClick(link.path)}
                                className='flex items-center justify-between py-2 text-sm cursor-pointer hover:text-muted-foreground'
                                whileHover={{ x: 4 }}
                              >
                                <span>{link.label}</span>
                                <ExternalLinkIcon size={14} />
                              </motion.div>
                            ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}

              {/* Languages */}
              <Accordion type='single' collapsible>
                <AccordionItem value='languages'>
                  <AccordionTrigger>
                    <div className='flex items-center gap-2 text-sm font-medium'>
                      Languages
                      <Globe size={16} />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className='space-y-2 pl-6'>
                      {languages.map((language) => (
                        <motion.div
                          key={language.code}
                          onClick={() => handleLanguageChange(language.code)}
                          className='flex items-center justify-between py-2 text-sm cursor-pointer hover:text-muted-foreground group'
                          whileHover={{ x: 4 }}
                        >
                          <div className='flex items-center gap-2'>
                            <span className='text-xs uppercase text-muted-foreground'>
                              {language.code}
                            </span>
                            <span
                              className={
                                currentLang === language.code
                                  ? 'font-medium text-primary'
                                  : ''
                              }
                            >
                              {language.name}
                            </span>
                          </div>
                          {currentLang === language.code ? (
                            <Check size={14} className='text-primary' />
                          ) : (
                            <ChevronRight
                              size={14}
                              className='opacity-0 group-hover:opacity-100 transition-opacity'
                            />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Logout */}
              {!!user && (
                <motion.div
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                  className='flex items-center justify-between py-2 text-red-600 cursor-pointer hover:text-red-700 border-t pt-4 mt-4'
                  whileHover={{ x: 4 }}
                >
                  <span>Logout</span>
                  <ChevronRight size={16} />
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
