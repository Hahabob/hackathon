import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import z from "zod";
import { useSidebar } from "@/contexts/SideBarContext";
const LoginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormData = z.infer<typeof LoginFormSchema>;

export function LoginForm() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { login } = useAuth();
  const { closeSidebar } = useSidebar();

  const onSubmit = async (data: LoginFormData) => {
    const success = await login(data.email, data.password);

    if (success) {
      closeSidebar();
    } else {
      alert(" Login failed");
    }
  };

  return (
    <Card
      className="max-w-md mx-auto rounded-xl shadow-lg border 
      bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700"
    >
      <CardHeader className="border-b px-6 py-4 border-gray-200 dark:border-zinc-700">
        <CardTitle
          className="text-2xl font-bold text-center
          text-gray-800 dark:text-zinc-100"
        >
          Login
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className="block text-sm font-medium mb-1
                    text-gray-700 dark:text-zinc-300"
                  >
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      {...field}
                      className="w-full rounded-md border px-4 py-2 placeholder-gray-400 
                        border-gray-300 dark:border-zinc-700
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                        focus:border-transparent transition
                        bg-white dark:bg-zinc-800
                        text-gray-900 dark:text-zinc-100"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 text-sm mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className="block text-sm font-medium mb-1
                    text-gray-700 dark:text-zinc-300"
                  >
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      {...field}
                      className="w-full rounded-md border px-4 py-2 placeholder-gray-400 
                        border-gray-300 dark:border-zinc-700
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                        focus:border-transparent transition
                        bg-white dark:bg-zinc-800
                        text-gray-900 dark:text-zinc-100"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 text-sm mt-1" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-green-500
                hover:from-blue-700 hover:to-green-600 text-white font-semibold
                py-3 rounded-md shadow-md transition"
            >
              Log In
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
