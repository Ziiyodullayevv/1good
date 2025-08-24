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
import ShimmerText from '../ui/shimmerText';
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
        <DialogBackdrop className='fixed inset-0 bg-black/30 backdrop-blur-sm' />
        <div className='fixed inset-0 z-[999] w-screen p-4 sm:overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center'>
            <DialogPanel className='w-full relative max-h-[600px] sm:max-h-[100%] overflow-y-auto max-w-2xl bg-white rounded-2xl sm:p-8'>
              <div className='flex sm:mb-4 sticky sm:static border-b sm:border-none p-4 sm:p-0 items-center z-[9999] left-0 right-0 top-0 bg-white justify-between'>
                <DialogTitle as='h3' className='text-2xl font-semibold'>
                  {isEditMode ? 'Edit Portfolio' : 'Create New Portfolio'}
                </DialogTitle>

                <div
                  className='flex justify-center relative -right-1.5 items-center cursor-pointer transition-all w-10 h-10 duration-150 shrink-0 hover:bg-v2 rounded-full'
                  onClick={() => setIsOpen(false)}
                >
                  <X />
                </div>
              </div>

              <form
                onSubmit={handleSubmit((data) =>
                  mutation.mutate({ ...data, user_id: user?.id })
                )}
              >
                <div className='p-4 sm:p-0 space-y-5'>
                  {/* Dynamic Form Fields */}
                  {formFields.map((field) => (
                    <div key={field.name}>
                      <Label htmlFor={field.name}>{field.label}</Label>

                      {field.type === 'textarea' ? (
                        <Textarea
                          className='mt-3 bg-v2 h-[100px] shadow-none'
                          id={field.name}
                          {...register(field.name)}
                          name={field.name}
                        />
                      ) : (
                        <Input
                          className='h-10 mt-3 shadow-none bg-v2'
                          id={field.name}
                          type='text'
                          {...register(field.name)}
                          name={field.name}
                        />
                      )}

                      {errors[field.name] && (
                        <p className='text-red-500 text-sm mt-1'>
                          {errors[field.name]?.message}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div className='mt-5'>
                  <Label htmlFor='skills'>Skills</Label>
                  <Controller
                    name='skills'
                    control={control}
                    render={({ field }) => (
                      <MultiSelect
                        options={skills}
                        selected={field.value}
                        onChange={field.onChange}
                        className='mt-2 h-10 w-full'
                      />
                    )}
                  />
                  {errors.skills && (
                    <p className='text-red-500 text-sm mt-1'>
                      {errors.skills.message}
                    </p>
                  )}
                </div>

                <div className='sticky sm:static sm:mt-4 border-t sm:border-none bottom-0 bg-white p-4 sm:p-0'>
                  <Button
                    type='submit'
                    className='bg-v9 w-full text-white h-10 rounded-lg mt-2'
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? (
                      isEditMode ? (
                        <ShimmerText text='Updating...' />
                      ) : (
                        <ShimmerText text='Submitting...' />
                      )
                    ) : isEditMode ? (
                      'Update'
                    ) : (
                      'Submit'
                    )}
                  </Button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
