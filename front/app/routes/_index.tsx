import type { Route } from "./+types/_index";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Building, Chrome } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { loginSchema, type LoginForm } from "~/types/types";
import { redirect, useNavigate } from "react-router";
import { authService } from "~/services/authService";
import { pb } from "~/lib/pocketbase";
import { useAuth } from "~/contexts/authContext";
import { useEffect } from "react";
import { toast } from "sonner";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Login to Kostosian" },
  ];
}

export async function clientLoader({}: Route.ClientLoaderArgs) {
  if (pb.authStore.isValid) {
    return redirect("/dashboard");
  }
  return null;
}

export default function Login() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const onSubmit = async (val: LoginForm) => {
    await authService.loginWithPass(val);
  };
  const handleGoogleLogin = async () => {
    const result = await authService.loginWithGoogle();
    if (!result.success) {
      const errorMessage =
        typeof result.error === "string"
          ? result.error
          : "An unexpected error occurred.";
      toast.error("Error Error ERROR",{
        description: errorMessage,
        position: "top-center",
        richColors:true
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-12">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Building className="h-8 w-8 text-slate-900 mr-2 dark:text-[var(--color-primary)]" />
          <h1 className="text-3xl font-bold text-slate-900 dark:text-[var(--color-primary)]">
            Kostosian
          </h1>
        </div>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome Back!</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan Email e.g mail@example.com"
                          autoComplete="email"
                          {...field}
                        />
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
                      <div className="flex items-center">
                        <FormLabel>Password</FormLabel>
                        <a
                          href="#"
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </a>
                      </div>
                      <FormControl>
                        <Input
                          type="password"
                          autoComplete="current-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" form="login-form" className="w-full">
            Log In
          </Button>
          <div className="flex my-6 items-center w-full">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 flex-shrink-0 text-xs uppercase text-muted-foreground">
              atau
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full"
          >
            <Chrome className="w-4 h-4 mr-2" />
            Sign In dengan Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
