"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

import { H2 } from "@/components/common/typography/H2";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    setIsLoading(false);

    if (res?.error) {
      setError(res.error as string);
    }
    if (res?.ok) {
      return router.push("/");
    }
  };

  return (
    <section className="flex flex-col items-center p-6 bg-green-50 min-h-screen">
      <img
        src="/logo.png"
        alt="Logo"
        className="w-24 h-24 mb-4"
      />
      <H2 content="Login to Your Account" className="text-green-700 mb-6" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-md bg-white p-6 rounded-lg shadow-md border border-green-300">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-green-700">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} className="border-green-300 focus:border-green-500" />
                </FormControl>
                <FormDescription className="text-green-600">
                  We’ll never share your email with anyone else.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-green-700">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                    className="border-green-300 focus:border-green-500"
                  />
                </FormControl>
                <FormDescription className="text-green-600">Password to login.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2">
            <Button type="submit" disabled={isLoading} className="bg-green-600 text-white hover:bg-green-700">
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
      <Link href="/" className="text-green-700 mt-4">
        Back to Home
      </Link>
    </section>
  );
};

export { Login };
