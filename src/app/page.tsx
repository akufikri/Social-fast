import { Button } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
export default function Home() {
  return (
    <>
      <div className="flex items-center h-screen justify-center">
        <div className="max-w-sm  w-full">
          <div className="grid">
            <Button size={'lg'} className="mb-4" asChild>
              <RegisterLink>Register</RegisterLink>
            </Button>
            <Button size={'lg'} variant={'outline'} asChild>
              <LoginLink>Login</LoginLink>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
