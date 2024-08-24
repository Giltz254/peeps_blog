import { EmailActivation } from "@/components/frontend/auth/NewVerification"
import { Suspense } from "react"

const NewVerification = () => {
  return (
    <div className="w-full bg-white">
      <Suspense fallback={<p>Loading form...</p>}>
      <EmailActivation />
      </Suspense>
    </div>
  )
}

export default NewVerification