import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Input,
} from '@headlessui/react';
import { useState } from 'react';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { X } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function CreatePortfolio({
  buttonText,
}: {
  buttonText: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [formErrors, setFormErrors] = useState<{
    title?: string;
    description?: string;
    imageUrl?: string;
  }>({});

  const clearError = (field: keyof typeof formErrors) => {
    setFormErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const queryClient = useQueryClient();

  const createProject = async (data: any) => {
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

  const mutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      setIsOpen(false);
      setTitle('');
      setDescription('');
      setImageUrl('');
      setFormErrors({});
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (error: any) => {
      alert(error.message || 'Something went wrong');
    },
  });

  const validate = () => {
    const errors: typeof formErrors = {};
    if (!title.trim()) errors.title = 'Title is required';
    if (!description.trim()) errors.description = 'Description is required';
    if (!imageUrl.trim()) errors.imageUrl = 'Image URL is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      title,
      description,
      image: imageUrl,
    };

    mutation.mutate(payload);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className='bg-v9 hover:bg-v9/80 cursor-pointer text-white px-4 h-10 rounded-lg'
      >
        {buttonText}
      </Button>

      <Dialog
        open={isOpen}
        as='div'
        className='relative text-base font-poppins z-[999] bg-black focus:outline-none'
        onClose={() => setIsOpen(false)}
      >
        <DialogBackdrop className='fixed inset-0 backdrop-blur-xs bg-black/30' />
        <div className='fixed inset-0 z-[999] w-screen overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4'>
            <DialogPanel className='w-full relative max-w-[800px] rounded-2xl bg-white p-8'>
              <div
                onClick={() => setIsOpen(false)}
                className='absolute cursor-pointer right-6 top-6 rounded-full flex justify-center items-center w-10 h-10 bg-v2 z-[9999]'
              >
                <X />
              </div>

              <DialogTitle as='h3' className='text-2xl font-medium'>
                Create New Portfolio
              </DialogTitle>

              <form onSubmit={handleSubmit} className='mt-4'>
                <div className='grid gap-6 mt-8'>
                  {/* Title */}
                  <div>
                    <Label htmlFor='title'>Project Title</Label>
                    <Input
                      id='title'
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                        clearError('title');
                      }}
                      className={`h-12 w-full px-4 rounded-lg mt-3 bg-v2 ${
                        formErrors.title
                          ? 'border-red-500 border'
                          : 'border-none'
                      }`}
                      placeholder='e.g. Portfolio Website'
                    />
                    {formErrors.title && (
                      <p className='text-sm text-red-500 mt-1'>
                        {formErrors.title}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor='description'>Project Description</Label>
                    <Textarea
                      id='description'
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                        clearError('description');
                      }}
                      placeholder='Describe your project'
                      className={`h-[150px] mt-3 bg-v2 rounded-lg ${
                        formErrors.description
                          ? 'border-red-500 border'
                          : 'border-none'
                      }`}
                    />
                    {formErrors.description && (
                      <p className='text-sm text-red-500 mt-1'>
                        {formErrors.description}
                      </p>
                    )}
                  </div>

                  {/* Image URL */}
                  <div>
                    <Label htmlFor='imageUrl'>Image URL</Label>
                    <Input
                      id='imageUrl'
                      value={imageUrl}
                      onChange={(e) => {
                        setImageUrl(e.target.value);
                        clearError('imageUrl');
                      }}
                      className={`h-12 bg-v2 px-4 mt-3 rounded-lg w-full ${
                        formErrors.imageUrl
                          ? 'border-red-500 border'
                          : 'border-none'
                      }`}
                      placeholder='https://example.com/image.jpg'
                    />
                    {formErrors.imageUrl && (
                      <p className='text-sm text-red-500 mt-1'>
                        {formErrors.imageUrl}
                      </p>
                    )}
                  </div>
                </div>

                <div className='border-t mt-5 border-gray-200'>
                  <Button
                    type='submit'
                    className='bg-v9 mt-5 hover:bg-v9/80 text-base cursor-pointer text-white px-4 h-12 w-full rounded-lg'
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? 'Submitting...' : 'Submit Project'}
                  </Button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
