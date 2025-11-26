import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter} from "@/components/ui/card";
import { handleLogin } from "../api";
import Link from "next/link";

export default async function LoginPage({searchParams}: {searchParams: {error?: string, signupSuccess?: string }}) {
  const error = searchParams.error;
  const signupSuccess = searchParams.signupSuccess === 'true'; // Check for success flag
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          
          {/* UCCESS MESSAGE */}
          {signupSuccess && (
            <div className="space-y-2 mb-4 p-3 bg-green-100 border border-green-300 rounded">
              <h1 className="text-center text-xl font-bold text-green-700">Registration Successful!</h1>
              <p className="text-green-600 text-center">Please log in with your new account.</p>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="space-y-2 mb-4">
              <h1 className="text-center text-xl font-bold text-red-700">Login Failed!</h1>
              <p className="text-red-600 text-center">{error}</p>
            </div>
          )}        
          <form className="space-y-4" action={handleLogin}>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                name="username"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                name="password"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Login
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="flex justify-center border-t pt-4">
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <Link href="/signup" className="text-blue-600 hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}