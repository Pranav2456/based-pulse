"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAccount } from 'wagmi'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ThumbsUp, ThumbsDown, MessageSquare, Plus, ArrowUpRight, X } from 'lucide-react'
import Link from 'next/link'

interface Report {
  id: number
  title: string
  category: string
  priority: string
  description: string
  image: string
  upvotes: number
  downvotes: number
  comments: number
}

export default function Dashboard() {
  const { isConnected } = useAccount()
  const router = useRouter()
  const [isVerifyOpen, setIsVerifyOpen] = useState(false)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [verificationText, setVerificationText] = useState("")
  const [verificationImage, setVerificationImage] = useState<string>("")

  const reports: Report[] = [
    {
      id: 1,
      title: 'Broken Street Light on Main Street',
      category: 'Infrastructure',
      priority: 'High',
      description: 'Street light has been out for 3 days causing safety concerns',
      image: '/broken-light.jpg',
      upvotes: 245,
      downvotes: 12,
      comments: 18
    },
    {
      id: 2,
      title: 'Pothole Damage on Bridge Road',
      category: 'Road Hazard',
      priority: 'Medium',
      description: 'Large pothole causing vehicle damage',
      image: '/pothole.jpg', 
      upvotes: 189,
      downvotes: 5,
      comments: 24
    }
  ]

  const handleVerification = async (report: Report) => {
    setSelectedReport(report)
    setIsVerifyOpen(true)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Recent Reports</h2>
          {reports.map((report) => (
            <Card key={report.id} className="mb-4">
              <CardHeader className="bg-gradient-to-r from-blue-100 to-green-100 py-2">
                <CardTitle className="text-lg">{report.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <Badge>{report.category}</Badge>
                  <Badge variant={report.priority === 'High' ? 'destructive' : 'secondary'}>
                    {report.priority} Priority
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleVerification(report)}
                      className="flex items-center"
                    >
                      <ThumbsUp className="mr-1 h-4 w-4" /> 
                      <span>{report.upvotes}</span>
                    </Button>
                    <span className="flex items-center">
                      <ThumbsDown className="mr-1 h-4 w-4" /> {report.downvotes}
                    </span>
                    <span className="flex items-center">
                      <MessageSquare className="mr-1 h-4 w-4" /> {report.comments}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Verification Dialog */}
        <Dialog open={isVerifyOpen} onOpenChange={setIsVerifyOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Verify Report</DialogTitle>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsVerifyOpen(false)}
                className="absolute right-4 top-4"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="verification-text">Verification Text</Label>
                <Input
                  id="verification-text"
                  value={verificationText}
                  onChange={(e) => setVerificationText(e.target.value)}
                  placeholder="Describe what you're verifying..."
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="verification-image">Upload Image Proof</Label>
                <Input
                  id="verification-image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onloadend = () => {
                        setVerificationImage(reader.result as string)
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                />
                {verificationImage && (
                  <img 
                    src={verificationImage} 
                    alt="Verification" 
                    className="mt-2 max-h-[200px] rounded-lg"
                  />
                )}
              </div>

              <Button className="w-full">
                Submit Verification
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Rest of your dashboard components */}
      </div>
    </div>
  )
}