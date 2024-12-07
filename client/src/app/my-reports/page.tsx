"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAccount } from 'wagmi'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ThumbsUp, ThumbsDown, MessageSquare, Loader } from 'lucide-react'
import { useReadContract } from 'wagmi'
import { CONTRACT_ADDRESS, contractABI } from '@/lib/contract'
import dayjs from 'dayjs'
import Image from 'next/image'

interface Report {
  id: string;
  details: {
    title: string;
    description: string;
  };
  publicLocation: {
    lat: number;
    long: number;
  };
  category: string;
  priority: number;
  upvotes: number;
  downvotes: number;
  timestamp: string;
  cid: string;
}

export default function MyReports() {
  const { isConnected, address } = useAccount()
  const router = useRouter()
  const [reports, setReports] = useState<Report[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { data: userReports, isSuccess, isError } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: contractABI,
    functionName: 'getUserReports',
    args: [address, 0, 15]
  })

  useEffect(() => {
    if (!isConnected) {
      router.replace('/')
    }
  }, [isConnected, router])

  useEffect(() => {
    if (isSuccess && userReports) {
      console.log("User reports: ", userReports)
      const data = userReports[0]; // First element contains the array of posts
const temp_posts = data.map((post: any) => ({
  id: post.reportId.toString(), // Use reportId instead of id
  details: JSON.parse(post.details),
  publicLocation: JSON.parse(post.publicLocation),
  category: post.category,
  priority: Number(post.priority), // Convert BigInt to number
  upvotes: Number(post.upvotes), // Convert BigInt to number
  downvotes: Number(post.downvotes), // Convert BigInt to number
  timestamp: dayjs.unix(Number(post.timestamp)).format('MMMM DD, YYYY'),
  cid: post.mediaCID, // Use mediaCID instead of cid
  status: post.status,
  isSolved: post.isSolved,
  reportHash: post.reportHash
}));

temp_posts.sort((a: Report, b: Report) => b.priority - a.priority);
      setReports(temp_posts);
      setIsLoading(false);
    }
    if (isError) {
      setError("Failed to fetch reports. Please try again later.");
      setIsLoading(false);
    }
  }, [isSuccess, isError, userReports])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <Loader className="animate-spin h-8 w-8 text-blue-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (reports.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">No Reports Yet</h2>
            <p className="text-gray-600 mb-4">You haven't submitted any reports. Start contributing to your community by creating a new report.</p>
            <Button onClick={() => router.push('/submit-report')}>Create New Report</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Reports</h1>
      <div className="grid gap-6">
        {reports.map((report) => (
          <Card key={report.id} className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-100 to-green-100 py-2">
              <CardTitle className="text-lg">{report.details.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <Badge variant="secondary">{report.category}</Badge>
                <Badge variant={report.priority > 2 ? "destructive" : "secondary"}>
                  {report.priority > 2 ? "High" : "Low"} Priority
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-4">{report.details.description}</p>
              <div className="mb-4">
                <Image
                  src={`https://gateway.lighthouse.storage/ipfs/${report.cid}`}
                  alt="Report image"
                  width={400}
                  height={200}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                  <span className="flex items-center"><ThumbsUp className="mr-1 h-4 w-4" /> {report.upvotes}</span>
                  <span className="flex items-center"><ThumbsDown className="mr-1 h-4 w-4" /> {report.downvotes}</span>
                  <span className="flex items-center"><MessageSquare className="mr-1 h-4 w-4" /> 0</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{report.timestamp}</span>
                  <Button variant="outline" size="sm">Edit Report</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

