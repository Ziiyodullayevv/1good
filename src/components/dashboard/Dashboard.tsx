import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
import { useUser } from '../../hooks/useUser';
import api from '../../lib/axios';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

// Form data interface
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
  title: string;
  bio: string;
  hourlyRate: string;
  role: string;
  skills: string[];
  location: string;
}

// O'zbekiston mintaqalari
const uzbekistanRegions = [
  { value: 'tashkent-city', label: 'Toshkent shahri' },
  { value: 'tashkent', label: 'Toshkent viloyati' },
  { value: 'andijan', label: 'Andijon viloyati' },
  { value: 'bukhara', label: 'Buxoro viloyati' },
  { value: 'fergana', label: "Farg'ona viloyati" },
  { value: 'jizzakh', label: 'Jizzax viloyati' },
  { value: 'kashkadarya', label: 'Qashqadaryo viloyati' },
  { value: 'khorezm', label: 'Xorazm viloyati' },
  { value: 'namangan', label: 'Namangan viloyati' },
  { value: 'navoi', label: 'Navoiy viloyati' },
  { value: 'samarkand', label: 'Samarqand viloyati' },
  { value: 'sirdarya', label: 'Sirdaryo viloyati' },
  { value: 'surkhandarya', label: 'Surxondaryo viloyati' },
  { value: 'karakalpakstan', label: "Qoraqalpog'iston Respublikasi" },
];

export default function Dashboard() {
  const { data, isError, isLoading, refetch } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(false);

  const { register, handleSubmit, reset, watch, control } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      avatarUrl: '',
      title: '',
      bio: '',
      hourlyRate: '',
      role: '',
      skills: [],
      location: '',
    },
  });

  // Minimum loading time uchun
  useEffect(() => {
    if (!isLoading && data) {
      // Ma'lumot kelgandan keyin kamida 800ms kutish
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 800);

      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isLoading, data]);

  // Formga data yuklash
  useEffect(() => {
    if (data) {
      reset({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        avatarUrl: data.avatarUrl || '',
        title: data.title || '',
        bio: data.bio || '',
        hourlyRate: data.hourlyRate || '',
        role: data.role || '',
        skills: data.skills || [],
        location: data.location || '',
      });
    }
  }, [data, reset]);

  const onSubmit = async (formValues: FormData) => {
    setIsSaving(true);
    setSaveError(null);

    try {
      await api.put('user/me', formValues);
      setIsEditing(false);
      refetch();
    } catch (error) {
      console.error('Update error', error);
      
      // Type-safe error handling
      let errorMessage = "Ma'lumotlarni saqlashda xatolik yuz berdi";
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        if (axiosError.response?.data?.message) {
          errorMessage = axiosError.response.data.message;
        }
      }
      
      setSaveError(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditClick = () => {
    if (isEditing) {
      // Agar editing holatida bo'lsa, formni submit qil
      handleSubmit(onSubmit)();
    } else {
      // Agar editing holatida emas bo'lsa, edit rejimini yoq
      setSaveError(null); // Errorni tozalash
      setIsEditing(true);
    }
  };

  const handleCancelClick = () => {
    // Formni asl holatiga qaytarish
    if (data) {
      reset({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        avatarUrl: data.avatarUrl || '',
        title: data.title || '',
        bio: data.bio || '',
        hourlyRate: data.hourlyRate || '',
        role: data.role || '',
        skills: data.skills || [],
      });
    }
    setSaveError(null); // Errorni tozalash
    setIsEditing(false);
  };

  if (isLoading || !data || !showContent) {
    return (
      <section className='text-base'>
        <div className='bg-white rounded-xl overflow-hidden'>
          <Banner />
          <div className='p-4 sm:p-8 min-h-[calc(100vh-72px)]'>
            {/* Header Skeleton */}
            <div className='col-span-2 mb-8 flex items-center justify-between gap-4'>
              <div className='flex items-center gap-4'>
                <Skeleton className='w-21 h-21 md:w-25 md:h-25 rounded-full' />
                <div className='flex flex-col gap-2'>
                  <Skeleton className='h-6 w-48' />
                  <Skeleton className='h-4 w-64' />
                  <Skeleton className='h-8 w-20' />
                </div>
              </div>
              <Skeleton className='h-10 w-20 hidden sm:block' />
            </div>

            {/* Form Fields Skeleton */}
            <div className='grid sm:grid-cols-2 gap-6'>
              {/* First Name */}
              <div>
                <Skeleton className='h-4 w-24 mb-3' />
                <Skeleton className='h-10 w-full' />
              </div>

              {/* Last Name */}
              <div>
                <Skeleton className='h-4 w-24 mb-3' />
                <Skeleton className='h-10 w-full' />
              </div>

              {/* Email */}
              <div>
                <Skeleton className='h-4 w-16 mb-3' />
                <Skeleton className='h-10 w-full' />
              </div>

              {/* Avatar URL */}
              <div>
                <Skeleton className='h-4 w-24 mb-3' />
                <Skeleton className='h-10 w-full' />
              </div>

              {/* About Me */}
              <div>
                <Skeleton className='h-4 w-20 mb-3' />
                <Skeleton className='h-25 w-full' />
              </div>

              {/* Short Bio */}
              <div>
                <Skeleton className='h-4 w-20 mb-3' />
                <Skeleton className='h-25 w-full' />
              </div>

              {/* Role */}
              <div>
                <Skeleton className='h-4 w-12 mb-3' />
                <Skeleton className='h-10 w-full' />
              </div>

              {/* Skills */}
              <div>
                <Skeleton className='h-4 w-16 mb-3' />
                <Skeleton className='h-10 w-full' />
              </div>

              {/* Location */}
              <div>
                <Skeleton className='h-4 w-20 mb-3' />
                <Skeleton className='h-10 w-full' />
              </div>

              {/* Hourly Rate */}
              <div>
                <Skeleton className='h-4 w-24 mb-3' />
                <Skeleton className='h-10 w-full' />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  if (isError) return <div>Error loading user data</div>;

  return (
    <section className='text-base'>
      <div className='bg-white rounded-xl overflow-hidden'>
        <Banner />

        <div className='p-4 sm:p-8 min-h-[calc(100vh-72px)]'>
          <form
            className='grid sm:grid-cols-2 gap-6'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='sm:flex col-span-2 items-center mb-8 justify-between gap-4'>
              {/* Error message */}
              {saveError && (
                <div className='col-span-2 mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm'>
                  {saveError}
                </div>
              )}

              <div className='flex items-center gap-4'>
                <Avatar className='w-21 h-21 md:w-25 overflow-hidden shrink-0 bg-v9/40 inline-block rounded-full md:h-25'>
                  <AvatarImage src={watch('avatarUrl')} />
                  <AvatarFallback className='text-2xl'>
                    {(data?.firstName?.[0] || '') + (data?.lastName?.[0] || '')}
                  </AvatarFallback>
                </Avatar>
                <div className='flex flex-col items-start gap-1 md:gap-2'>
                  <h2 className='text-base md:text-xl leading-5 font-medium'>
                    {(data?.firstName || '') + ' ' + (data?.lastName || '')}
                  </h2>
                  <span className='text-xs leading-2 md:text-sm text-gray-400'>
                    {data?.email || ''}
                  </span>
                  <div className='flex gap-2 mt-2'>
                    <Button
                      type='button'
                      onClick={handleEditClick}
                      disabled={isSaving}
                      className='h-8 text-sm md:text-base md:hidden sm:block bg-v9 text-white px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      {isSaving ? (
                        <div className='flex items-center gap-2'>
                          <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                          Saving...
                        </div>
                      ) : isEditing ? (
                        'Save'
                      ) : (
                        'Edit'
                      )}
                    </Button>
                    {isEditing && (
                      <Button
                        type='button'
                        onClick={handleCancelClick}
                        disabled={isSaving}
                        variant='outline'
                        className='h-8 text-sm md:text-base md:hidden sm:block px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div className='flex gap-2'>
                <Button
                  type='button'
                  onClick={handleEditClick}
                  disabled={isSaving}
                  className='h-10 hidden sm:block bg-v9 text-white px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {isSaving ? (
                    <div className='flex items-center gap-2'>
                      <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                      Saving...
                    </div>
                  ) : isEditing ? (
                    'Save'
                  ) : (
                    'Edit'
                  )}
                </Button>
                {isEditing && (
                  <Button
                    type='button'
                    onClick={handleCancelClick}
                    disabled={isSaving}
                    variant='outline'
                    className='h-10 hidden sm:block px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor='first-name'>First Name</Label>
              <Input
                id='first-name'
                disabled={!isEditing}
                {...register('firstName')}
                className='h-10 placeholder:text-sm  mt-3 bg-v2 border-none shadow-none'
                placeholder='Your First Name'
              />
            </div>

            <div>
              <Label htmlFor='last-name'>Last Name</Label>
              <Input
                id='last-name'
                disabled={!isEditing}
                {...register('lastName')}
                className='h-10 placeholder:text-sm  mt-3 bg-v2 border-none shadow-none'
                placeholder='Your Last Name'
              />
            </div>

            <div>
              <Label htmlFor='email'>Gmail</Label>
              <Input
                id='email'
                disabled={!isEditing}
                {...register('email')}
                className='h-10 placeholder:text-sm mt-3 bg-v2 border-none shadow-none'
                placeholder='you@example.com'
              />
            </div>

            <div>
              <Label htmlFor='avatar'>Avatar URL</Label>
              <Input
                id='avatar'
                disabled={!isEditing}
                {...register('avatarUrl')}
                className='h-10 placeholder:text-sm mt-3 bg-v2 border-none shadow-none'
                placeholder='https://...'
              />
            </div>

            <div>
              <Label htmlFor='about-me'>About Me</Label>
              <Textarea
                id='about-me'
                disabled={!isEditing}
                {...register('title')}
                className='h-25 placeholder:text-sm mt-3 bg-v2 border-none shadow-none'
              />
            </div>

            <div>
              <Label htmlFor='short-bio'>Short Bio</Label>
              <Textarea
                id='short-bio'
                disabled={!isEditing}
                {...register('bio')}
                className='h-25 placeholder:text-sm mt-3 bg-v2 border-none shadow-none'
              />
            </div>

            <div>
              <Label>Role</Label>
              <Controller
                name='role'
                control={control}
                render={({ field }) => (
                  <Select
                    disabled={!isEditing || isSaving}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className='!h-10 !rounded-lg w-full mt-3 bg-v2 border-none shadow-none'>
                      <SelectValue placeholder='Select Role' />
                    </SelectTrigger>
                    <SelectContent className='font-poppins rounded-lg'>
                      <SelectItem className='h-10' value='client'>
                        Client
                      </SelectItem>
                      <SelectItem className='h-10' value='freelancer'>
                        Freelancer
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div>
              <Label>Location</Label>
              <Controller
                name='location'
                control={control}
                render={({ field }) => (
                  <Select
                    disabled={!isEditing || isSaving}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className='!h-10 !rounded-lg w-full mt-3 bg-v2 border-none shadow-none'>
                      <SelectValue placeholder='Mintaqani tanlang' />
                    </SelectTrigger>
                    <SelectContent className='font-poppins rounded-lg max-h-60 overflow-y-auto'>
                      {uzbekistanRegions.map((region) => (
                        <SelectItem
                          key={region.value}
                          className='h-10'
                          value={region.value}
                        >
                          {region.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div>
              <Label htmlFor='hourly-rate'>Hourly Rate</Label>
              <Input
                id='hourly-rate'
                type='number'
                disabled={!isEditing}
                {...register('hourlyRate')}
                className='h-10 placeholder:text-sm mt-3 bg-v2 border-none shadow-none'
                placeholder='100'
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
