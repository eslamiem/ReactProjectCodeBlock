import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { handleLogin } from "../api";

export default async function LoginPage({params}: {params: {error?: string }}) {
  const error = params.error;
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Login</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
                  <div className="space-y-2 mb-4">
                    <h1 className="text-center text-xl font-bold text-red-700">Something went wrong!</h1>
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
    </Card>
  );
}
