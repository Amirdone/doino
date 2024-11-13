"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "لطفا این قسمت را خالی نگذارید.",
  }),
});

export default function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="flex  min-h-screen justify-center items-center ">
      <Card className="p-5 m-5">
        <CardHeader>
          <CardTitle> ورود | عضویت</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    لطفا شماره موبایل یا ایمیل خود را وارد کنید
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full m-0 bg-green-500 " variant="outline" type="submit">
            ورود
            </Button>
            <p>
              ورود شما به معنای پذیرش
              <Button className="p-1 " variant="link">
                قوانین
              </Button>
              است
            </p>
          </form>
        </Form>
      </Card>
    </div>
  );
}
//const login = () => {
//return (
//<div className="flex flex-row min-h-screen justify-center items-center">
//<Card>
//<CardHeader>
//<CardTitle> ورود | عضویت</CardTitle>
//</CardHeader>
//<CardContent>
//<CardDescription className="m-4 w-full">
//  شماره یا ایمیل خود را وارد کنید
//</CardDescription>
//<Input className="w-full " type="text" placeholder="" />
//<Button className="w-full m-0 " variant="outline">
//  ورود
//</Button>
//</CardContent>
//<CardFooter className="text-caption text-neutral-700 mt-4">
//<p>
//   ورود شما به معنای پذیرش
// <Button className="p-1" variant="link">
// قوانین
//</Button>
// است
//</p>
//</CardFooter>
//</Card>
//</div>
//);
//};
//export default onsubmit;
