"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAccount } from 'wagmi'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, Gift, TrendingUp, Loader } from 'lucide-react'
import { CONTRACT_ADDRESS, contractABI } from '@/lib/contract'
import { useReadContract } from 'wagmi'

export default function RewardPoints() {
  const { isConnected, address } = useAccount()
  const router = useRouter()
  const [rewardPoints, setRewardPoints] = useState<number>(0)

  const { data: userData, isLoading, isError } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: contractABI,
    functionName: 'getUserProfile',
    args: [address],
  })

  useEffect(() => {
    if (!isConnected) {
      router.replace('/')
    }
  }, [isConnected, router])

  useEffect(() => {
    if (userData && Array.isArray(userData) && userData.length > 0) {
      setRewardPoints(Number(userData[0]))
    }
  }, [userData])

  const rewardHistory = [
    { id: 1, action: 'Report Submitted', points: 50, date: '2023-12-05' },
    { id: 2, action: 'Comment Upvoted', points: 5, date: '2023-12-04' },
    { id: 3, action: 'Report Verified', points: 100, date: '2023-12-03' },
  ]

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center">
        <Loader className="animate-spin h-8 w-8 text-blue-500" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <p className="text-red-600">Failed to load reward points. Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Reward Points</h1>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="mr-2 h-6 w-6 text-yellow-400" />
              Your Reward Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{rewardPoints}</p>
            <Button className="mt-4">Redeem Points</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Gift className="mr-2 h-6 w-6 text-purple-500" />
              Available Rewards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>$5 Gift Card</span>
                <Badge>500 points</Badge>
              </li>
              <li className="flex justify-between items-center">
                <span>$10 Gift Card</span>
                <Badge>1000 points</Badge>
              </li>
              <li className="flex justify-between items-center">
                <span>Custom T-Shirt</span>
                <Badge>1500 points</Badge>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-6 w-6 text-green-500" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {rewardHistory.map((item) => (
                <li key={item.id} className="flex justify-between items-center">
                  <span>{item.action}</span>
                  <div className="flex items-center">
                    <Badge variant="secondary" className="mr-2">+{item.points}</Badge>
                    <span className="text-sm text-gray-500">{item.date}</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

