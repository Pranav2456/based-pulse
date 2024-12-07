import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowUpRight, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react'

export default function Home() {
  const reports = [
    { id: 1, title: 'Pothole on Main Street', category: 'Infrastructure', priority: 'High', upvotes: 24, downvotes: 2, comments: 5 },
    { id: 2, title: 'Graffiti in Central Park', category: 'Vandalism', priority: 'Medium', upvotes: 15, downvotes: 3, comments: 2 },
    { id: 3, title: 'Broken Streetlight', category: 'Infrastructure', priority: 'Low', upvotes: 8, downvotes: 1, comments: 1 },
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <section className="mb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 vibrant-gradient">
          Welcome to Aware
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
          Join our vibrant community in making a difference. Report local issues, track progress, and earn exciting rewards for your contributions!
        </p>
        <Button asChild size="lg" className="vibrant-button text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
          <Link href="/submit-report">Submit a Report</Link>
        </Button>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8 text-center vibrant-gradient">Recent Reports</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((report, index) => (
            <Card key={report.id} className="card-hover border-blue-100 overflow-hidden bg-white">
              <CardHeader className={`bg-gradient-to-r ${index % 3 === 0 ? 'from-blue-100 to-green-100' : index % 3 === 1 ? 'from-green-100 to-orange-100' : 'from-orange-100 to-purple-100'}`}>
                <CardTitle className="text-gray-800">{report.title}</CardTitle>
                <CardDescription className="text-gray-600">{report.category}</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex justify-between items-center mb-4">
                  <Badge variant={report.priority === 'High' ? 'destructive' : report.priority === 'Medium' ? 'default' : 'secondary'} className="font-semibold">
                    {report.priority} Priority
                  </Badge>
                  <Button variant="outline" size="sm" className="text-blue-600 hover:text-green-600 border-blue-200 hover:border-green-400 hover:bg-green-50">
                    View Details
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="flex space-x-4 text-sm text-gray-500">
                  <div className="flex items-center text-blue-500">
                    <ThumbsUp className="mr-1 h-4 w-4" />
                    {report.upvotes}
                  </div>
                  <div className="flex items-center text-orange-500">
                    <ThumbsDown className="mr-1 h-4 w-4" />
                    {report.downvotes}
                  </div>
                  <div className="flex items-center text-green-500">
                    <MessageSquare className="mr-1 h-4 w-4" />
                    {report.comments}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

