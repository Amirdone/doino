import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const login = () => {
  return (
   <div className= "flex flex-row min-h-screen justify-center items-center">
    <Card>
      <CardHeader>
        <CardTitle>ورود|عضویت</CardTitle>
        <CardDescription>شماره یا ایمیل خود را وارد کنید</CardDescription>
      </CardHeader>
      <CardContent>
        <p>ورود</p>
      </CardContent>
      <CardFooter>
        <p>ورود شما به معنای پذیرش قوانین است</p>
      </CardFooter>
    </Card>
   </div>
  );
};
export default login;
