"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Bell, Search, User } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import React, { useCallback, useEffect } from 'react';
import { useConnect, useAccount } from 'wagmi';
import { CoinbaseWalletLogo } from './ui/coinbaseWalletLogo';

export default function Header() {
  const router = useRouter();
  const { connectors, connect, isSuccess } = useConnect();
  const { isConnected } = useAccount();
 
  const createWallet = useCallback(() => {
    const coinbaseWalletConnector = connectors.find(
      (connector) => connector.id === 'coinbaseWalletSDK'
    );
    if (coinbaseWalletConnector) {
      connect({ 
        connector: coinbaseWalletConnector
      })
    }
  }, [connectors, connect, router]);

  useEffect(() => {
    if (isSuccess) {
      router.push('/verify');
    }
  }, [isSuccess, router]);

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-blue-100 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold vibrant-gradient">
          Aware
        </Link>
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <Input
              type="search"
              placeholder="Search reports..."
              className="w-64 border-blue-200 focus:border-green-400 bg-white"
            />
          </div>
          <Button variant="ghost" size="icon" className="text-blue-500 hover:text-green-500 hover:bg-green-50">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-blue-500 hover:text-orange-500 hover:bg-orange-50">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-blue-500 hover:text-purple-500 hover:bg-purple-50">
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Button>
          {!isConnected && (
            <Button className="vibrant-button font-semibold flex items-center" onClick={createWallet}>
              <CoinbaseWalletLogo />
              <span className="ml-2">Create Wallet</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

