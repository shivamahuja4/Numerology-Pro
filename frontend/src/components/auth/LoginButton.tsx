'use client'

import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'
import { LogOut, X } from 'lucide-react'

export default function LoginButton() {
    const [user, setUser] = useState<User | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [mounted, setMounted] = useState(false)
    const supabase = createClient()
    const router = useRouter()

    useEffect(() => {
        setMounted(true)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (session) {
                    setUser(session.user)
                    setIsModalOpen(false)
                } else {
                    setUser(null)
                }
            }
        )

        return () => {
            subscription.unsubscribe()
        }
    }, [supabase, router])

    const handleGoogleLogin = async () => {
        setIsLoading(true)
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        })
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        setUser(null)
        router.refresh()
    }

    // Modal rendered via portal so it escapes all parent stacking contexts
    const modal = isModalOpen && mounted
        ? createPortal(
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 99999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem',
                }}
            >
                {/* Backdrop — no blur */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                    onClick={() => setIsModalOpen(false)}
                />

                {/* Modal */}
                <div
                    style={{
                        position: 'relative',
                        backgroundColor: '#fff',
                        borderRadius: '1.5rem',
                        padding: '2rem',
                        width: '100%',
                        maxWidth: '24rem',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    }}
                >
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h3>
                        <p className="text-gray-500 text-sm">Sign in to access your dashboard</p>
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                        className="w-full bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-200 shadow-sm hover:shadow cursor-pointer"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-gray-300 border-t-indigo-600 rounded-full animate-spin" />
                        ) : (
                            <>
                                <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                <span>Continue with Google</span>
                            </>
                        )}
                    </button>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-400">
                            By continuing, you agree to our Terms of Service and Privacy Policy.
                        </p>
                    </div>
                </div>
            </div>,
            document.body
        )
        : null

    if (user) {
        return (
            <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700 hidden sm:inline-block">
                    {user.user_metadata.full_name?.split(' ')[0] || 'User'}
                </span>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-xl transition-all duration-200 shadow-sm hover:shadow text-sm"
                >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                </button>
            </div>
        )
    }

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transform hover:-translate-y-0.5 text-sm"
            >
                Login
            </button>
            {modal}
        </>
    )
}
