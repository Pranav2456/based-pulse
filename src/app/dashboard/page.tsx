"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAccount } from 'wagmi'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ThumbsUp, ThumbsDown, MessageSquare, Plus } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const { isConnected } = useAccount()
  const router = useRouter()

  useEffect(() => {
    if (!isConnected) {
      router.replace('/')
    }
  }, [isConnected, router])

  const reports = [
    { id: 1, title: 'How will I solve this problem on Instagram?', category: 'Land Hazard', priority: 'High', upvotes: 2400, downvotes: 2400, comments: 0 },
    { id: 2, title: 'How will I solve this problem on Instagram?', category: 'Land Hazard', priority: 'High', upvotes: 2400, downvotes: 2400, comments: 0 },
  ]

  const categories = [
    { name: 'Javascript', count: 99 },
    { name: 'PHP', count: 99 },
    { name: 'Web Development', count: 99 },
    { name: 'CSS', count: 99 },
    { name: 'React', count: 99 },
  ]

  const userActions = [
    { title: 'My Reports', href: '/my-reports' },
    { title: 'Create new report', href: '/submit-report' },
    { title: 'Reward Points', href: '/reward-points' },
    { title: 'Follow Us', href: '#' },
    { title: 'Help & Feedback', href: '#' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Recent Reports</h2>
          {reports.map((report) => (
            <Card key={report.id} className="mb-4 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-100 to-green-100 py-2">
                <CardTitle className="text-lg">{report.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <Badge variant="secondary">{report.category}</Badge>
                  <Badge variant="destructive">{report.priority} Priority</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <img src="/placeholder.svg?height=100&width=200" alt="Report image 1" className="w-full h-auto" />
                  <img src="/placeholder.svg?height=100&width=200" alt="Report image 2" className="w-full h-auto" />
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex space-x-4">
                    <span className="flex items-center"><ThumbsUp className="mr-1 h-4 w-4" /> {report.upvotes}</span>
                    <span className="flex items-center"><ThumbsDown className="mr-1 h-4 w-4" /> {report.downvotes}</span>
                    <span className="flex items-center"><MessageSquare className="mr-1 h-4 w-4" /> {report.comments}</span>
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">Report</Button>
                    <Button variant="outline" size="sm">Mint</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Popular Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.name} className="flex justify-between items-center">
                    <span>{category.name}</span>
                    <Badge variant="secondary">+{category.count}</Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {userActions.map((action) => (
                  <li key={action.title}>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href={action.href}>
                        <Plus className="mr-2 h-4 w-4" />
                        {action.title}
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

