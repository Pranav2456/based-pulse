"use client"
import { useState, useEffect, useCallback } from 'react'
import { LogInWithAnonAadhaar, useAnonAadhaar } from '@anon-aadhaar/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { useAccount } from 'wagmi'

export default function VerifyPage() {
  const [anonAadhaar] = useAnonAadhaar()
  const { isConnected } = useAccount()
  const router = useRouter()
  const [showAnonAadhaar, setShowAnonAadhaar] = useState(true)

  useEffect(() => {
    if (!isConnected) {
      router.replace('/')
    }
  }, [isConnected, router])

  const redirectToDashboard = useCallback(() => {
    router.push('/dashboard')
  }, [router])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnonAadhaar(false)
      redirectToDashboard()
    }, 40000)

    return () => {
      clearTimeout(timer)
    }
  }, [redirectToDashboard])

  useEffect(() => {
    if (anonAadhaar.status === 'logged-in') {
      setShowAnonAadhaar(false)
      redirectToDashboard()
    }
  }, [anonAadhaar.status, redirectToDashboard])

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-2xl mx-auto border-blue-100 overflow-hidden bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-100 to-green-100">
          <CardTitle className="text-3xl font-bold text-center text-gray-800">User Verification</CardTitle>
          <CardDescription className="text-center text-gray-600">Verify your identity using Anon Aadhaar</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center space-y-6">
            {showAnonAadhaar && (
              <>
                <p className="text-center text-gray-600">
                  To ensure the integrity of our community, we require user verification. Please complete the Anon Aadhaar verification process below.
                </p>
                <LogInWithAnonAadhaar nullifierSeed={1234} fieldsToReveal={["revealPinCode", "revealState"]}/>
              </>
            )}
            {!showAnonAadhaar && (
              <p className="text-center text-green-600 font-semibold">
                Verification process completed. Redirecting to dashboard...
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}