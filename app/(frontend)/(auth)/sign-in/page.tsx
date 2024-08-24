import AuthLoginForm from '@/components/frontend/auth/AuthLoginForm'
import React from 'react'
import { Suspense } from 'react'

const SignIn = () => {
  return (
    <div className='bg-muted/10 w-full'>
        <Suspense fallback={<p>Loading form...</p>}>
        <AuthLoginForm />
        </Suspense>
    </div>
  )
}

export default SignIn