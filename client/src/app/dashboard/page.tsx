"use client"
import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useAccount } from 'wagmi'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ThumbsUp, ThumbsDown, MessageSquare, Plus, ArrowUpRight, X, Loader } from 'lucide-react'
import Link from 'next/link'
import { useReadContract } from 'wagmi'
import { CONTRACT_ADDRESS, contractABI } from '@/lib/contract'
import { useCapabilities, useWriteContracts } from 'wagmi/experimental'
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
  status: string;
  isSolved: boolean;
  reportHash: string;
}

export default function Dashboard() {
  const { isConnected } = useAccount()
  const account = useAccount()
  const router = useRouter()
  const [isVerifyOpen, setIsVerifyOpen] = useState(false)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [verificationText, setVerificationText] = useState("")
  const [verificationImage, setVerificationImage] = useState<string>("")
  const [reports, setReports] = useState<Report[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [id, setId] = useState<string | undefined>(undefined);

  const { writeContracts } = useWriteContracts({
    mutation: { onSuccess: (id) => setId(id) },
  });
  const { data: availableCapabilities } = useCapabilities({
    account: account.address,
  });


  const capabilities = useMemo(() => {
    if (!availableCapabilities || !account.chainId) return {};
    const capabilitiesForChain = availableCapabilities[account.chainId];
    if (
      capabilitiesForChain["paymasterService"] &&
      capabilitiesForChain["paymasterService"].supported
    ) {
      return {
        paymasterService: {
          url: `https://api.developer.coinbase.com/rpc/v1/base/LyT_0lKAx57z6hEjpTxTeq9ToxFOtlNv`,
        },
      };
    }
    return {};
  }, [availableCapabilities, account.chainId]);

  const { data: allReports, isSuccess, isError } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: contractABI,
    functionName: 'getAllReports',
    args: [0, 15]
  })

  useEffect(() => {
    if (!isConnected) {
      router.replace('/')
    }
  }, [isConnected, router])

  useEffect(() => {
    if (isSuccess && allReports) {
      const data = allReports[0];
      const temp_posts = data.map((post: any) => ({
        id: post.reportId.toString(),
        details: JSON.parse(post.details),
        publicLocation: JSON.parse(post.publicLocation),
        category: post.category,
        priority: Number(post.priority),
        upvotes: Number(post.upvotes),
        downvotes: Number(post.downvotes),
        timestamp: dayjs.unix(Number(post.timestamp)).format('MMMM DD, YYYY'),
        cid: post.mediaCID,
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
  }, [isSuccess, isError, allReports])

  const handleVerification = async (report: Report) => {
    setSelectedReport(report)
    setIsVerifyOpen(true)
  }

  const handleVoteReport = async () => {
    if (selectedReport) {
      writeContracts({
        contracts: [
          {
            address: CONTRACT_ADDRESS,
            abi: contractABI as any,
            functionName: 'voteReport',
            args: [selectedReport.id]
          }
        ],
        capabilities,
      })
    }
    setIsVerifyOpen(false)
  }

  const categories = [
    { name: 'Infrastructure', count: 99 },
    { name: 'Health', count: 99 },
    { name: 'Roadways', count: 99 },
    { name: 'Railways', count: 99 },
    { name: 'Public Properties', count: 99 },
  ]

  const userActions = [
    { title: 'My Reports', href: '/my-reports' },
    { title: 'Create new report', href: '/submit-report' },
    { title: 'Reward Points', href: '/reward-points' },
    { title: 'Follow Us', href: '#' },
    { title: 'Help & Feedback', href: '#' },
  ]

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Recent Reports</h2>
          {reports.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold mb-2">No Reports Yet</h3>
                <p className="text-gray-600 mb-4">Be the first to submit a report and start making a difference in your community!</p>
                <Button onClick={() => router.push('/submit-report')}>Create New Report</Button>
              </CardContent>
            </Card>
          ) : (
            reports.map((report) => (
              <Card key={report.id} className="mb-4">
                <CardHeader className="bg-gradient-to-r from-blue-100 to-green-100 py-2">
                  <CardTitle className="text-lg">{report.details.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <Badge>{report.category}</Badge>
                    <Badge variant={report.priority > 2 ? 'destructive' : 'secondary'}>
                      {report.priority > 2 ? 'High' : 'Low'} Priority
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
                        <MessageSquare className="mr-1 h-4 w-4" /> 0
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">{report.timestamp}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
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

              <Button className="w-full" onClick={handleVoteReport}>
                Submit Verification
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

