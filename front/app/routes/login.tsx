import type { Route } from "./+types/login";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Building, Chrome } from "lucide-react";
import z, { email } from "zod";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Login to Kostosian" },
  ];
}

const loginSchema = z.object({
  email: z.string().email({ message: "Alamat Email tidak valid" }),
  password: z.string().min(1, { message: "Password tidak boleh kosong." }),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-12">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Building className="h-8 w-8 text-slate-900 mr-2" />
          <h1 className="text-3xl font-bold text-slate-900">Kostosian</h1>
        </div>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome Back!</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Masukkan Email e.g mail@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
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
            onClick={() => console.log("clickagoogla")}
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
