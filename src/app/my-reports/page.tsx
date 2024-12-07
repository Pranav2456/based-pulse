"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAccount } from 'wagmi'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react'

export default function MyReports() {
  const { isConnected } = useAccount()
  const router = useRouter()

  useEffect(() => {
    if (!isConnected) {
      router.replace('/')
    }
  }, [isConnected, router])

  const reports = [
    { id: 1, title: 'Pothole on Main Street', category: 'Infrastructure', priority: 'Medium', upvotes: 150, downvotes: 10, comments: 23 },
    { id: 2, title: 'Graffiti in Central Park', category: 'Vandalism', priority: 'Low', upvotes: 75, downvotes: 5, comments: 12 },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Reports</h1>
      <div className="grid gap-6">
        {reports.map((report) => (
          <Card key={report.id} className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-100 to-green-100 py-2">
              <CardTitle className="text-lg">{report.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <Badge variant="secondary">{report.category}</Badge>
                <Badge variant="destructive">{report.priority} Priority</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <img src="/placeholder.svg?height=100&width=200" alt="Report image 1" className="w-full h-auto" />
                <img src="/placeholder.svg?height=100&width=200" alt="Report image 2" className="w-full h-auto" />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                  <span className="flex items-center"><ThumbsUp className="mr-1 h-4 w-4" /> {report.upvotes}</span>
                  <span className="flex items-center"><ThumbsDown className="mr-1 h-4 w-4" /> {report.downvotes}</span>
                  <span className="flex items-center"><MessageSquare className="mr-1 h-4 w-4" /> {report.comments}</span>
                </div>
                <Button variant="outline" size="sm">Edit Report</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

