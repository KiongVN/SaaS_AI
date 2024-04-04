import { SignIn } from "@clerk/nextjs";
 
export default function SingInPage() {
  return (
  <div className="flex flex-col items-center">
    <SignIn />
    </div>
    )
}