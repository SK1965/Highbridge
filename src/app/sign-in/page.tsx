'use client';

import { useForm } from "react-hook-form"; // ✅ correct import for latest react-hook-form
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// ✅ Create schema
const loginSchema = z.object({
  identifier: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional()
});

export default function Login() {
  const router = useRouter()
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
      remember: false
    }
  });

  const onSubmit = () => {
    toast.success("Logged in Successfully");
    router.replace("/home")
  };

  return (
    <div className="flex h-screen items-center justify-center p-4 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1533134486753-c833f0ed4866?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
      <div className="flex w-full max-w-5xl items-center gap-12">
        {/* Left Side */}
        <div className="hidden md:flex flex-1 flex-col justify-center items-start text-white p-8">
          <div className="flex items-center space-x-2 border border-green-500 px-4 py-2 rounded-md">
            <span className="text-xl font-bold text-green-400">HighBridge</span>
          </div>
          <h2 className="text-3xl font-bold mt-4">Building the Future...</h2>
          <p className="text-sm mt-2 text-gray-300 max-w-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Right Side */}
        <Card className="w-full max-w-sm p-6 shadow-xl border border-gray-200 rounded-lg bg-white">
          <CardContent>
            <h2 className="text-xl font-bold text-center">Log In to your Account</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <FormField
                  control={form.control}
                  name="identifier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Type here..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Type here..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="remember"
                    render={({ field }) => (
                      <div className="flex items-center space-x-2">
                        <Checkbox id="remember" checked={field.value} onCheckedChange={field.onChange} />
                        <Label htmlFor="remember">Remember me</Label>
                      </div>
                    )}
                  />
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Forgot Password?</a>
                </div>
                <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white">Log In</Button>
              </form>
            </Form>
            <div className="my-4 text-center text-gray-500">Or</div>
            <div className="space-y-2">
              <Button variant="outline" onClick={onSubmit} className="w-full flex items-center justify-center space-x-2 border-gray-300">
                <FaGoogle className="text-red-500" /> <span>Log In with Google</span>
              </Button>
              <Button variant="outline" className="w-full flex items-center justify-center space-x-2 border-gray-300" onClick={onSubmit}>
                <FaFacebook className="text-blue-600" /> <span>Log In with Facebook</span>
              </Button>
              <Button variant="outline" className="w-full flex items-center justify-center space-x-2 border-gray-300" onClick={onSubmit}>
                <FaApple className="text-black" /> <span>Log In with Apple</span>
              </Button>
            </div>
            <p className="mt-4 text-center text-sm">
              New User? <a href="#" className="text-blue-500 font-semibold">SIGN UP HERE</a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
