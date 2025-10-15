"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ identifier: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      ...formData,
      redirect: false,
    });

    if (res?.ok) {
      toast.success("Signed in successfully!");
      router.push("/");
    } else {
      toast.error(res?.error || "Invalid credentials");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-black px-4">
      <Card className="w-full max-w-md border border-slate-800 shadow-2xl animate-fade-in bg-background">
        <CardHeader>
          <CardTitle className="text-center text-3xl text-foreground font-bold">
            Sign In
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="identifier">Email or Username</Label>
              <Input
                id="identifier"
                name="identifier"
                placeholder="you@example.com"
                value={formData.identifier}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Sign In"
              )}
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              Don’t have an account?{" "}
              <a href="/sign-up" className="text-indigo-500 hover:underline">
                Sign Up
              </a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
