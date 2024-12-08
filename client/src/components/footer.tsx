import Link from 'next/link'
import { Facebook, Twitter, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-blue-50 border-t border-blue-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 vibrant-gradient">About Based Pulse</h3>
            <p className="text-sm text-gray-600">
              Based Pulse is a vibrant, community-driven platform for reporting and tracking local issues. Together, we can make our communities better and more colorful!
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 vibrant-gradient">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link></li>
              <li><Link href="/submit-report" className="text-gray-600 hover:text-green-600 transition-colors">Submit Report</Link></li>
              <li><Link href="/rewards" className="text-gray-600 hover:text-orange-600 transition-colors">Rewards</Link></li>
              <li><Link href="/profile" className="text-gray-600 hover:text-purple-600 transition-colors">Profile</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 vibrant-gradient">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-green-500 hover:text-green-600 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-orange-500 hover:text-orange-600 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-blue-200 text-center text-sm">
          <p className="vibrant-gradient inline-block">&copy; {new Date().getFullYear()} Based Pulse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

