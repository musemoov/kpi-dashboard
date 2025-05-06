"use client";

import { FormEvent, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Suspense } from "react";

function LoginContent() {
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email") || "";
  // localStorage에서 이메일 불러오기
  const getLocalEmail = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("last_signup_email") || "";
    }
    return "";
  };
  const [email, setEmail] = useState(emailFromQuery || getLocalEmail());
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signIn, user, isLoading: authLoading } = useAuth();

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/dashboard");
    }
  }, [user, authLoading, router]);

  // 쿼리스트링 email이 바뀌면 input도 업데이트
  useEffect(() => {
    if (emailFromQuery) {
      setEmail(emailFromQuery);
    } else {
      setEmail(getLocalEmail());
    }
  }, [emailFromQuery]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Please enter both email and password.");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        setError(error.message);
        setIsLoading(false);
        return;
      }

      // On success, redirect to dashboard
      router.push("/dashboard");
    } catch (e: any) {
      setError(e.message || "An error occurred during login.");
      setIsLoading(false);
    }
  };

  // Prevent flicker: if auth is loading or user is present, don't show form
  if (authLoading || user) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Marketing KPI Dashboard</h1>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                placeholder="your@email.com"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                placeholder="********"
              />
            </div>

            {error && (
              <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">Don't have an account? </span>
            <a href="/signup" className="text-blue-600 hover:underline font-medium">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
} 