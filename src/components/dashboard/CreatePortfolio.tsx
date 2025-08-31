import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { portfolioSchema, PortfolioFormData } from '@/lib/zodSchemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
// import FileUpload from '../ui/fileUpload';
import { cn } from '@/lib/utils';
import api from '@/lib/axios';
import { MultiSelect, skills } from '../ui/multi-select';
import { useAuth } from '../../context/AuthContext';

interface CreatePortfolioProps {
  buttonText: string;
  initialData?: PortfolioFormData & { id?: string };
  onSuccess?: () => void;
}

export default function CreatePortfolio({
  buttonText,
  initialData,
  onSuccess,
}: CreatePortfolioProps) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const isEditMode = Boolean(initialData?.id);
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<PortfolioFormData>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: initialData || {
      title: '',
      description: '',
      imageURL: '',
      link: '',
      skills: [],
    },
  });

  // 🔁 initialData o'zgarganda formani yangilash
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        title: '',
        description: '',
        imageURL: '',
        link: '',
        skills: [],
      });
    }
  }, [initialData, reset]);

  const success = isEditMode
    ? 'Portfolio successfully updated!'
    : 'Portfolio successfully created!';

  const createProject = async (data: PortfolioFormData) => {
    const res = await api.post('portfolio', data);
    if (res.status < 200 || res.status >= 300)
      throw new Error('Failed to create portfolio');
    return res.data;
  };

  const updateProject = async (data: PortfolioFormData & { id: string }) => {
    const res = await api.put(`/portfolio/${data.id}`, data);
    if (res.status < 200 || res.status >= 300)
      throw new Error('Failed to update portfolio');
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: async (data: PortfolioFormData) => {
      if (isEditMode && initialData?.id) {
        return updateProject({ ...data, id: initialData.id });
      }
      return createProject(data);
    },
    onSuccess: () => {
      toast.success(success);
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
      setIsOpen(false);
      reset(); // formani tozalash
      onSuccess?.();
    },
    onError: (error: unknown) => {
      const message =
        error && typeof error === 'object' && 'message' in error
          ? (error as { message?: string }).message
          : 'Something went wrong';
      toast.error(message);
    },
  });

  const formFields: {
    name: keyof PortfolioFormData;
    label: string;
    type: 'text' | 'textarea';
  }[] = [
    { name: 'title', label: 'Project Title', type: 'text' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'imageURL', label: 'Image URL', type: 'text' },
    { name: 'link', label: 'Project Link', type: 'text' },
  ];

  return (
    <div className='font-poppins'>
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          'cursor-pointer',
          isEditMode
            ? 'bg-v9 h-8 text-white px-3 min-w-[80px] rounded-md'
            : 'bg-v9 hover:bg-v9/80 h-9 text-sm sm:text-base text-white px-4 sm:h-10 rounded-lg'
        )}
      >
        {buttonText}
      </Button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='relative font-poppins z-[999]'
      >
        <DialogBackdrop className='fixed inset-0 bg-black/40' />
        <div className='fixed inset-0 z-[999] w-screen sm:px-4 sm:overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center'>
            <DialogPanel
              transition
              className='w-full absolute sm:static top-0 bottom-0 ring-0 left-0 overflow-hidden font-poppins sm:max-w-[900px] sm:h-[min(90vh,645px)] sm:max-h-[645px]
             transition duration-300 ease-out [--anchor-gap:--spacing(5)] 
             data-closed:-translate-y-4 data-closed:opacity-0 data-closed:scale-95
             sm:rounded-2xl bg-white shadow-2xl border border-gray-100
             mx-auto sm:my-4 sm:mx-4 flex flex-col'
            >
              {/* Header - Fixed */}
              <div className='flex items-center justify-between border-b border-gray-100 px-4 sm:px-6 py-4 shrink-0'>
                <DialogTitle
                  as='h3'
                  className='text-xl sm:text-2xl font-semibold text-gray-900 truncate pr-4'
                >
                  {isEditMode ? 'Edit Portfolio' : 'Create New Portfolio'}
                </DialogTitle>

                <Button
                  type='button'
                  className='flex justify-center -mr-1 sm:-mr-2 items-center cursor-pointer transition-all 
                 w-9 h-9 sm:w-10 sm:h-10 duration-200 shrink-0 
                 hover:bg-gray-100 active:bg-gray-200 rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2'
                  onClick={() => setIsOpen(false)}
                  aria-label='Close dialog'
                >
                  <X className='w-4 h-4 sm:w-5 sm:h-5 text-gray-500' />
                </Button>
              </div>

              {/* Form Content - Proper flex layout */}
              <div className='flex flex-col flex-1 min-h-0'>
                <form
                  className='flex flex-col h-full'
                  onSubmit={handleSubmit((data) =>
                    mutation.mutate({ ...data, user_id: user?.id })
                  )}
                >
                  {/* Scrollable content area */}
                  <div className='flex-1 overflow-y-auto px-4 sm:px-6 py-6'>
                    <div className='space-y-6'>
                      {/* Dynamic Form Fields */}
                      {formFields.map((field) => (
                        <div key={field.name}>
                          <Label
                            htmlFor={field.name}
                            className='text-sm font-medium text-gray-700 block mb-2'
                          >
                            {field.label}
                          </Label>

                          {field.type === 'textarea' ? (
                            <Textarea
                              className='w-full bg-v2 border-gray-200 focus:border-gray-900 
                             focus:ring-1 focus:ring-gray-900 rounded-lg 
                              min-h-24 sm:h-28 transition-all duration-200
                             text-sm sm:text-base placeholder:text-gray-400'
                              id={field.name}
                              {...register(field.name)}
                              name={field.name}
                            />
                          ) : (
                            <Input
                              className='w-full h-10 bg-v2 border-gray-200 
                             focus:border-gray-900 focus:ring-1 focus:ring-gray-900 
                             rounded-lg transition-all duration-200
                             text-sm sm:text-base placeholder:text-gray-400'
                              id={field.name}
                              {...register(field.name)}
                              name={field.name}
                            />
                          )}

                          {errors[field.name] && (
                            <p className='text-red-500 text-xs sm:text-sm mt-2 flex items-center gap-2'>
                              <span className='w-1 h-1 bg-red-500 rounded-full'></span>
                              {errors[field.name]?.message}
                            </p>
                          )}
                        </div>
                      ))}

                      {/* Skills Section */}
                      <div>
                        <Label
                          htmlFor='skills'
                          className='text-sm font-medium text-gray-700 block mb-2'
                        >
                          Skills
                          <span className='text-gray-500 text-xs ml-2'>
                            (Select multiple)
                          </span>
                        </Label>
                        <Controller
                          name='skills'
                          control={control}
                          render={({ field }) => (
                            <MultiSelect
                              options={skills}
                              selected={field.value}
                              onChange={field.onChange}
                              className='w-full h-10 bg-v2 border-gray-200 
                             focus:border-gray-900 focus:ring-1 focus:ring-gray-900 
                             rounded-lg transition-all duration-200'
                              placeholder='Select your skills...'
                            />
                          )}
                        />
                        {errors.skills && (
                          <p className='text-red-500 text-xs sm:text-sm mt-2 flex items-center gap-2'>
                            <span className='w-1 h-1 bg-red-500 rounded-full'></span>
                            {errors.skills.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Footer - Always visible at bottom */}
                  <div className='border-t border-gray-100 bg-white px-4 sm:px-6 py-4 shrink-0'>
                    <div className='flex gap-3 justify-end'>
                      <Button
                        className='px-4 sm:px-6 h-10 text-gray-600 hover:text-gray-900 hover:bg-v2 
                       rounded-lg transition-colors duration-200 font-medium
                       focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2'
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </Button>

                      <Button
                        type='submit'
                        className='px-4 sm:px-6 h-10 bg-gray-900 hover:bg-gray-800 text-white 
                       rounded-lg font-medium transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2
                       disabled:opacity-50 disabled:cursor-not-allowed
                       min-w-[100px] flex items-center justify-center'
                        disabled={mutation.isPending}
                      >
                        {mutation.isPending ? (
                          <>
                            <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2'></div>
                            {isEditMode ? 'Updating...' : 'Creating...'}
                          </>
                        ) : (
                          <span>{isEditMode ? 'Update' : 'Create'}</span>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
