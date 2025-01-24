'use client'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import Image from 'next/image'
import { useMutation } from '@tanstack/react-query'
import { Instagram, LoaderCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '@/components/ui/toast'
import Link from 'next/link'
import axios from 'axios'
import { Input } from '@/components/ui/input'
import doino from "@/public/doino.svg";

const formSchema = z.object({
  firstName: z
    .string({ required_error: '*ضروری' })
    .min(3, { message: 'حداقل ۳ حرف وارد کنید' })
    .max(50, { message: 'حداکثر ۵۰ حرف مجاز است' }),
  lastName: z
    .string({ required_error: '*ضروری' })
    .min(3, { message: 'حداقل ۳ حرف وارد کنید' })
    .max(50, { message: 'حداکثر ۵۰ حرف مجاز است' }),
  phone: z
    .string({ required_error: '*ضروری' })
    .length(11, { message: 'شماره صحیح 11 عدد انگلیسی دارد و با 09 شروع میشود' })
    .startsWith('09', {
      message: 'شماره صحیح 11 عدد انگلیسی دارد و با 09 شروع میشود',
    }),
})

function LandingPage() {
  const { toast } = useToast()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
    },
  })

  const mutation = useMutation({
    mutationKey: ['early-access'],
    mutationFn: async (payload: z.infer<typeof formSchema>) => {
      return await axios.post('/early-access', payload)
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      await mutation.mutateAsync(values)
      toast({
        variant: 'default',
        title: '✅ درخواست موفق',
        description: 'شما در لیست دسترسی زودهنگام ثبت شدید',
      })
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'درخواست ناموفق',
        description: error?.response?.data?.message || 'سرور درخواست شما را تایید نکرد :(',
        action: <ToastAction altText='Try again'>تلاش‌مجدد</ToastAction>,
      })
    }
  }
  return (
    <>
      <div className='w-screen h-screen flex items-center justify-center'>
        <div>
          <div className='flex justify-center'>
            <Image src={doino} height={38} width={38} alt='دویینو' className='mb-2' />
          </div>
          <div className='font-bold text-lg text-center mb-2 '> دسترسی زودهنگام دویینو</div>
          {!mutation.isSuccess && (
            <p className='max-w-[300px] text-sm text-center text-zinc-400'>
              برای ثبت نام زودهنگام در دویینو فرم زیر را تکمیل کنید و از مزایای ویژه عضویت زودهنگام
              بهره‌مند شوید  💚 
            </p>
          )}
          <div className='my-6'>
            {!mutation.isSuccess ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
                  <FormField
                    control={form.control}
                    name='firstName'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder='نام'
                            disabled={mutation.isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='lastName'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder='نام‌خانوادگی'
                            disabled={mutation.isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='phone'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder='شماره موبایل'
                            disabled={mutation.isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type='submit'
                    className='w-full'
                    size={'lg'}
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? (
                      <div className='flex gap-1 items-center'>
                        <LoaderCircle className='animate-spin' />
                        درحال درخواست...
                      </div>
                    ) : (
                      'ثبت درخواست'
                    )}
                  </Button>
                </form>
              </Form>
            ) : (
              <div className='max-w-[340px] bg-background p-4 rounded-lg shadow-sm text-zinc-700 text-justify'>
                <div className='font-bold text-lg mb-2'>
                  سلام {mutation.data.data?.firstName} 😍
                </div>
                <p className='text-sm'>
                  به خانواده ریوتو خوش‌آمدید ✌🏻🌹 به زودی برای اطلاعات بیشتر با شما تماس میگیریم. در
                  این حین میتوانید در اینستاگرام ما را دنبال کنید 🙏🏻
                </p>
                <Button
                  variant={'outline'}
                  type='button'
                  className='w-full mt-3'
                  size={'lg'}
                  disabled={mutation.isPending}
                  asChild
                >
                  <Link
                    href={'https://www.instagram.com/riveto_ir'}
                    className='px-4 font-bold py-2 flex items-center gap-1'
                  >
                    <Instagram className='h-5 w-auto' />
                    اینستاگرام ریوِتو
                  </Link>
                </Button>
              </div>
            )}
          </div>
          <div className='my-10'>
            <div className='flex items-center gap-6 justify-center font-light text-sm text-zinc-500'>
              <Link href={'/blog'}>بلاگ</Link>
              <span className='text-slate-100/10'>|</span>
              <Link href={'tel:09172929041'}>تماس‌باما</Link>
            </div>
            <p className='mt-3 text-xs text-center text-zinc-400'>
              ساخته شده با 💚 در دویینو ۱۴۰۳
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default LandingPage