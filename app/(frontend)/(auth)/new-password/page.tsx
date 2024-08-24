import NewPasswordForm from "@/components/frontend/auth/NewPassword";
import { Suspense } from "react";
const NewPassword = () => {
  return (
    <div className="w-full bg-muted/10">
      <Suspense fallback={<p>Loading Form...</p>}>
        <NewPasswordForm />
      </Suspense>
    </div>
  );
};

export default NewPassword;
