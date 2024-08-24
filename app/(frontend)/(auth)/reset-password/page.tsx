import ResetForm from '@/components/frontend/auth/ResetForm'
import React, { Suspense } from 'react'

const PasswordReset = () => {
  return (
    <div className='w-full bg-muted/10'>
        <Suspense fallback={<p>Loading form...</p>}>
        <ResetForm />
        </Suspense>
    </div>
  )
}

export default PasswordReset