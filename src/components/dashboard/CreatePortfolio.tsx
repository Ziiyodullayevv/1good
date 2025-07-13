import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { useState } from 'react';
import { X } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { portfolioSchema, PortfolioFormData } from '@/lib/zodSchemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { message } from 'antd';
import FileUpload from '../ui/fileUpload';
import { cn } from '../../lib/utils';
import ShimmerText from '../ui/shimmerText';

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
  const [messageApi, contextHolder] = message.useMessage();

  const isEditMode = Boolean(initialData?.id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PortfolioFormData>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: initialData || {
      title: '',
      description: '',
      imageUrl: '',
    },
  });

  const success = () => {
    messageApi.open({
      type: 'success',
      content: isEditMode
        ? 'Portfolio successfully updated!'
        : 'Portfolio successfully created!',
    });
  };

  const createProject = async (data: PortfolioFormData) => {
    const res = await fetch(
      'https://673870e84eb22e24fca7ef0c.mockapi.io/api/v1/portfolio',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }
    );
    if (!res.ok) throw new Error('Failed to create portfolio');
    return res.json();
  };

  const updateProject = async (data: PortfolioFormData & { id: string }) => {
    const res = await fetch(
      `https://673870e84eb22e24fca7ef0c.mockapi.io/api/v1/portfolio/${data.id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }
    );
    if (!res.ok) throw new Error('Failed to update portfolio');
    return res.json();
  };

  const mutation = useMutation({
    mutationFn: async (data: PortfolioFormData) => {
      if (isEditMode && initialData?.id) {
        return updateProject({ ...data, id: initialData.id });
      }
      return createProject(data);
    },
    onSuccess: () => {
      success();
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setIsOpen(false);
      reset();
      onSuccess?.(); // parentga bildirish
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
    { name: 'imageUrl', label: 'Image URL', type: 'text' },
  ];

  return (
    <div className='font-poppins'>
      {contextHolder}
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          'cursor-pointer',
          isEditMode
            ? 'bg-v9 h-8 text-white px-3 min-w-[80px] rounded-md'
            : 'bg-v9 hover:bg-v9/80 h-8 text-sm sm:text-base text-white px-4 sm:h-10 rounded-lg'
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
        <div className='fixed inset-0 z-[999] w-screen overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4'>
            <DialogPanel className='w-full max-w-2xl bg-white rounded-2xl p-8 relative'>
              <div
                className='absolute right-4 top-4 cursor-pointer transition-all duration-150 p-2 hover:bg-v2 rounded-full'
                onClick={() => setIsOpen(false)}
              >
                <X />
              </div>

              <DialogTitle as='h3' className='text-2xl font-semibold mb-4'>
                {isEditMode ? 'Edit Portfolio' : 'Create New Portfolio'}
              </DialogTitle>

              <form
                onSubmit={handleSubmit((data) => mutation.mutate(data))}
                className='space-y-6'
              >
                {/* Optional: File Upload */}
                <div className='w-full'>
                  <FileUpload className='w-full' />
                </div>

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
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
