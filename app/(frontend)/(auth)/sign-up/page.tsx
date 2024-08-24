import AuthRegisterForm from '@/components/frontend/auth/AuthRegisterForm'
import React, { Suspense } from 'react'

const Signup = () => {
  return (
    <div className='bg-muted/10 w-full'>
        <Suspense fallback={<p>Loading form...</p>}>
        <AuthRegisterForm />
        </Suspense>
    </div>
  )
}

export default Signup