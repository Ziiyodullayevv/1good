'use client';

import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Input,
} from '@headlessui/react';
import React, { useState, useCallback } from 'react';
import { Label } from '../ui/label';
import { MultiSelect, type Option } from '@/components/ui/multi-select';
import { Textarea } from '../ui/textarea';
import { DatePickerDemo } from '../ui/date-picker';
import { X } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const frameworks: Option[] = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt.js', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
  { value: 'wordpress', label: 'WordPress' },
  { value: 'express.js', label: 'Express.js' },
  { value: 'nest.js', label: 'Nest.js' },
];

export default function CreateProject({ buttonText }: { buttonText: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [budget, setBudget] = useState<number | ''>('');
  const [description, setDescription] = useState('');
  const [summary, setSummary] = useState('');
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);

  const [formErrors, setFormErrors] = useState<{
    title?: string;
    budget?: string;
    description?: string;
    summary?: string;
    deadline?: string;
  }>({});

  const clearError = (field: keyof typeof formErrors) => {
    setFormErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const queryClient = useQueryClient();

  const createProject = async (data: any) => {
    const res = await fetch(
      'https://673841334eb22e24fca75190.mockapi.io/api/v1/futbol',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) throw new Error('Failed to create project');
    return res.json();
  };

  const mutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      setIsOpen(false);
      setTitle('');
      setBudget('');
      setDescription('');
      setSummary('');
      setDeadline(null);
      setSelectedFrameworks([]);
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
    if (budget === '' || Number(budget) <= 0)
      errors.budget = 'Budget is required';
    if (!description.trim()) errors.description = 'Description is required';
    if (!summary.trim()) errors.summary = 'Summary is required';
    if (!deadline) errors.deadline = 'Deadline is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      title,
      budget: Number(budget),
      description,
      summary,
      deadline: deadline?.toISOString(),
      skills: selectedFrameworks,
    };

    mutation.mutate(payload);
  };

  const handleFrameworksChange = useCallback((values: string[]) => {
    setSelectedFrameworks(values);
  }, []);

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
        __demoMode
      >
        <DialogBackdrop className='fixed inset-0 backdrop-blur-xs bg-black/30' />
        <div className='fixed inset-0 z-[999] w-screen overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4'>
            <DialogPanel
              transition
              className='w-full relative max-w-[800px] rounded-2xl bg-white p-8'
            >
              <div
                onClick={() => setIsOpen(false)}
                className='absolute cursor-pointer right-6 top-6 rounded-full flex justify-center items-center w-10 h-10 bg-v2 z-[9999]'
              >
                <X />
              </div>

              <DialogTitle as='h3' className='text-2xl font-medium'>
                Create New Project
              </DialogTitle>

              <form onSubmit={handleSubmit} className='mt-4'>
                <div className='grid sm:grid-cols-2 gap-6 mt-8'>
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
                      placeholder='e.g. Blog Post on Sustainable Living'
                    />
                    {formErrors.title && (
                      <p className='text-sm text-red-500 mt-1'>
                        {formErrors.title}
                      </p>
                    )}
                  </div>

                  {/* Budget */}
                  <div>
                    <Label htmlFor='budget'>Budget</Label>
                    <Input
                      id='budget'
                      type='number'
                      min={0}
                      max={100000}
                      value={budget}
                      onChange={(e) => {
                        setBudget(e.target.value ? Number(e.target.value) : '');
                        clearError('budget');
                      }}
                      className={`h-12 w-full px-4 rounded-lg mt-3 bg-v2 ${
                        formErrors.budget
                          ? 'border-red-500 border'
                          : 'border-none'
                      }`}
                      placeholder='e.g. $500 - $1000'
                    />
                    {formErrors.budget && (
                      <p className='text-sm text-red-500 mt-1'>
                        {formErrors.budget}
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
                      placeholder='Describe the project goals and expectations'
                      className={`h-[150px] mt-3 bg-v2 shadow-none rounded-lg ${
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

                  {/* Summary */}
                  <div>
                    <Label htmlFor='summary'>Summary</Label>
                    <Textarea
                      id='summary'
                      value={summary}
                      onChange={(e) => {
                        setSummary(e.target.value);
                        clearError('summary');
                      }}
                      placeholder='Write a short summary (optional)'
                      className={`h-[150px] mt-3 bg-v2 shadow-none rounded-lg ${
                        formErrors.summary
                          ? 'border-red-500 border'
                          : 'border-none'
                      }`}
                    />
                    {formErrors.summary && (
                      <p className='text-sm text-red-500 mt-1'>
                        {formErrors.summary}
                      </p>
                    )}
                  </div>

                  {/* Deadline */}
                  <div>
                    <Label htmlFor='deadline'>Deadline</Label>
                    <DatePickerDemo
                      value={deadline}
                      onChange={(value) => {
                        setDeadline(value);
                        clearError('deadline');
                      }}
                    />
                    {formErrors.deadline && (
                      <p className='text-sm text-red-500 mt-1'>
                        {formErrors.deadline}
                      </p>
                    )}
                  </div>

                  {/* Skills */}
                  <div>
                    <Label>Skills Required</Label>
                    <MultiSelect
                      options={frameworks}
                      selected={selectedFrameworks}
                      onChange={handleFrameworksChange}
                      placeholder='e.g. SEO, AI Writing, Copywriting'
                      className='w-full mt-3'
                    />
                  </div>
                </div>

                <div>
                  <Button
                    type='submit'
                    className='bg-v9  w-full mt-5 hover:bg-v9/80 text-base cursor-pointer text-white px-6 h-12 rounded-lg'
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
