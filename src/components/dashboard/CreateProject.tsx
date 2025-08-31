import { forwardRef, useState, useEffect } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Button,
} from '@headlessui/react';
import { FilePenLine, X } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { MultiSelect, frameworks } from '@/components/ui/multi-select';
import { DatePickerDemo } from '../ui/date-picker';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema, ProjectFormData } from '@/lib/zodSchemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { GeneralTooltip } from '../ui/generalTooltip';
import api from '../../lib/axios';

interface Props {
  buttonText: string;
  initialData?: ProjectFormData & { id: string };
}

const CreateProject = forwardRef<HTMLButtonElement, Props>(
  ({ buttonText, initialData }, ref) => {
    const isEdit = Boolean(initialData);
    const [isOpen, setIsOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const queryClient = useQueryClient();

    const {
      register,
      control,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm<ProjectFormData>({
      resolver: zodResolver(projectSchema),
      defaultValues: {
        title: initialData?.title || '',
        budget: initialData?.budget || 0,
        description: initialData?.description || '',
        summary: initialData?.summary || '',
        deadline: initialData?.deadline
          ? new Date(initialData.deadline)
          : undefined,
        skillsRequired: initialData?.skillsRequired
          ? Array.isArray(initialData.skillsRequired)
            ? initialData.skillsRequired
                .map((skill) => {
                  if (typeof skill === 'string') {
                    return skill;
                  } else if (
                    typeof skill === 'object' &&
                    skill !== null &&
                    'value' in skill
                  ) {
                    return (skill as { value: string }).value;
                  }
                  return '';
                })
                .filter((skill) => skill !== '')
            : []
          : [],
      },
    });

    // Edit rejimida MultiSelect uchun default qiymatlarni yuklash
    useEffect(() => {
      if (isEdit && isOpen && initialData) {
        // Ensure skillsRequired is properly formatted as string array
        const processedSkills = Array.isArray(initialData.skillsRequired)
          ? initialData.skillsRequired
              .map((skill) => {
                if (typeof skill === 'string') {
                  return skill;
                } else if (
                  typeof skill === 'object' &&
                  skill !== null &&
                  'value' in skill
                ) {
                  return (skill as { value: string }).value;
                }
                return '';
              })
              .filter((skill) => skill !== '')
          : [];

        // Debug log to check processed skills
        console.log('Processed skills for edit:', processedSkills);

        reset({
          title: initialData.title || '',
          budget: initialData.budget || 0,
          description: initialData.description || '',
          summary: initialData.summary || '',
          skillsRequired: processedSkills,
          deadline: initialData.deadline
            ? new Date(initialData.deadline)
            : undefined,
        });
      }
    }, [isEdit, isOpen, initialData, reset]);

    const notify = (type: 'success' | 'error') =>
      messageApi.open({
        type,
        content: isEdit ? 'Project updated!' : 'Project created!',
      });

    const mutation = useMutation({
      mutationFn: async (data: ProjectFormData) => {
        const url = isEdit ? `/order/${initialData!.id}` : '/order';
        const payload = {
          ...data,
          skillsRequired: data.skillsRequired.map((skill) =>
            typeof skill === 'object' && skill !== null && 'value' in skill
              ? (skill as { value: string }).value
              : skill
          ),
          deadline: data.deadline ? data.deadline.toISOString() : null,
        };

        if (isEdit) {
          return api.put(url, payload).then((res) => res.data);
        }
        return api.post(url, payload).then((res) => res.data);
      },
      onSuccess: () => {
        notify('success');
        queryClient.invalidateQueries({ queryKey: ['orders'] });
        reset();
        setIsOpen(false);
      },
      onError: () => {
        notify('error');
      },
    });

    const onSubmit: SubmitHandler<ProjectFormData> = (data) => {
      mutation.mutate(data);
    };

    return (
      <>
        {contextHolder}
        {isEdit ? (
          <GeneralTooltip content='Edit'>
            <button
              ref={ref}
              onClick={() => setIsOpen(true)}
              className='bg-v9 flex justify-center items-center text-white h-8 w-8 p-0.5 rounded-full'
            >
              <FilePenLine className='w-4 h-4' />
            </button>
          </GeneralTooltip>
        ) : (
          <button
            ref={ref}
            onClick={() => setIsOpen(true)}
            className='bg-v9 px-4 h-10 rounded-lg text-white'
          >
            {buttonText}
          </button>
        )}

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
                {/* Header */}
                <div className='flex items-center justify-between border-b border-gray-100 px-4 sm:px-6 py-4 shrink-0'>
                  <DialogTitle
                    as='h3'
                    className='text-xl sm:text-2xl font-semibold text-gray-900 truncate pr-4'
                  >
                    {isEdit ? 'Edit Project' : 'Create New Project'}
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

                {/* Form Content */}
                <div className='flex flex-col flex-1 min-h-0'>
                  <form
                    className='flex flex-col h-full'
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    {/* Scrollable content */}
                    <div className='flex-1 overflow-y-auto px-4 sm:px-6 py-6'>
                      <div className='space-y-6'>
                        {[
                          {
                            name: 'title',
                            label: 'Project Title',
                            type: 'text',
                          },
                          { name: 'budget', label: 'Budget', type: 'number' },
                          {
                            name: 'description',
                            label: 'Description',
                            type: 'textarea',
                          },
                          {
                            name: 'summary',
                            label: 'Summary',
                            type: 'textarea',
                          },
                        ].map((f) => (
                          <div key={f.name}>
                            <Label
                              htmlFor={f.name}
                              className='text-sm font-medium text-gray-700 block mb-2'
                            >
                              {f.label}
                            </Label>
                            {f.type === 'textarea' ? (
                              <Textarea
                                id={f.name}
                                {...register(f.name as keyof ProjectFormData)}
                                className='w-full bg-v2 border-gray-200 focus:border-gray-900 
                        focus:ring-1 focus:ring-gray-900 rounded-lg 
                        min-h-24 sm:h-28 transition-all duration-200
                        text-sm sm:text-base placeholder:text-gray-400'
                              />
                            ) : (
                              <Input
                                id={f.name}
                                type={f.type}
                                {...register(
                                  f.name as keyof ProjectFormData,
                                  f.type === 'number'
                                    ? { valueAsNumber: true }
                                    : undefined
                                )}
                                className='w-full h-10 bg-v2 border-gray-200 
                        focus:border-gray-900 focus:ring-1 focus:ring-gray-900 
                        rounded-lg transition-all duration-200
                        text-sm sm:text-base placeholder:text-gray-400'
                              />
                            )}
                            {errors[f.name as keyof ProjectFormData] && (
                              <p className='text-red-500 text-xs sm:text-sm mt-2 flex items-center gap-2'>
                                <span className='w-1 h-1 bg-red-500 rounded-full'></span>
                                {
                                  errors[f.name as keyof ProjectFormData]
                                    ?.message
                                }
                              </p>
                            )}
                          </div>
                        ))}

                        {/* Deadline */}
                        <div>
                          <Label
                            htmlFor='deadline'
                            className='text-sm font-medium text-gray-700 block mb-2'
                          >
                            Deadline
                          </Label>
                          <Controller
                            name='deadline'
                            control={control}
                            render={({ field }) => (
                              <DatePickerDemo
                                value={field.value}
                                onChange={field.onChange}
                              />
                            )}
                          />
                          {errors.deadline && (
                            <p className='text-red-500 text-xs sm:text-sm mt-2 flex items-center gap-2'>
                              <span className='w-1 h-1 bg-red-500 rounded-full'></span>
                              {errors.deadline.message}
                            </p>
                          )}
                        </div>

                        {/* Skills */}
                        <div>
                          <Label
                            htmlFor='skillsRequired'
                            className='text-sm font-medium text-gray-700 block mb-2'
                          >
                            Skills
                          </Label>
                          <Controller
                            name='skillsRequired'
                            control={control}
                            render={({ field }) => (
                              <MultiSelect
                                options={frameworks}
                                selected={field.value || []}
                                onChange={field.onChange}
                                className='w-full h-10 bg-v2 border-gray-200 
                        focus:border-gray-900 focus:ring-1 focus:ring-gray-900 
                        rounded-lg transition-all duration-200'
                                placeholder='Select your skills...'
                              />
                            )}
                          />
                          {errors.skillsRequired && (
                            <p className='text-red-500 text-xs sm:text-sm mt-2 flex items-center gap-2'>
                              <span className='w-1 h-1 bg-red-500 rounded-full'></span>
                              {errors.skillsRequired.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
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
                              {isEdit ? 'Updating...' : 'Submitting...'}
                            </>
                          ) : (
                            <span>
                              {isEdit ? 'Update Project' : 'Submit Project'}
                            </span>
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
      </>
    );
  }
);

CreateProject.displayName = 'CreateProject';
export default CreateProject;
