import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { handleSignup } from "../api"; 
import Link from "next/link";

export default async function SignupPage({ searchParams }: { searchParams: { error?: string } }) {
  const params = await searchParams;
  const error = params.error; 
  
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
      </CardHeader>
      
      <CardContent>
        {/* Error Display */}
        {error && (
          <div className="mb-4 text-center">
            <h1 className="font-bold text-red-700">Registration Failed!</h1>
            <p className="text-red-600">{error}</p>
          </div>
        )}
        
        <form className="space-y-4" action={handleSignup}>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Choose a username"
              name="username"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Choose a password"
              name="password"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Create Account
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex justify-center border-t pt-4">
        <p className="text-sm text-gray-500">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline font-medium">
            Login here
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}