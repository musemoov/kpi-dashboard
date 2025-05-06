"use client";

import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { signUp, signIn, user, isLoading: authLoading } = useAuth();

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/dashboard");
    }
  }, [user, authLoading, router]);

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
      const { error: signupError } = await signUp(email, password);
      if (signupError) {
        setError(signupError.message);
        setIsLoading(false);
        return;
      }
      // 자동 로그인 시도
      const { error: loginError } = await signIn(email, password);
      if (loginError) {
        setSuccess(true); // 회원가입은 성공했으나 자동 로그인 실패
        setIsLoading(false);
        // 로그인 페이지로 안내
        setTimeout(() => {
          router.push(`/login?email=${encodeURIComponent(email)}`);
        }, 2000);
        return;
      }
      // localStorage에 이메일 저장
      if (typeof window !== "undefined") {
        localStorage.setItem("last_signup_email", email);
      }
      setSuccess(true);
      setIsLoading(false);
      // 안내 메시지 후 2초 뒤 대시보드로 이동
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (e: any) {
      setError(e.message || "An error occurred during sign up.");
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
          <h1 className="text-3xl font-bold">Create your account</h1>
          <p className="mt-2 text-gray-600">Sign up to access the dashboard</p>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-md">
          {success ? (
            <div className="text-center">
              <div className="mb-4 rounded-md bg-green-50 p-3 text-green-700 font-medium">
                Signup successful! Redirecting to dashboard...
              </div>
            </div>
          ) : (
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
                {isLoading ? "Signing up..." : "Sign Up"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
} 