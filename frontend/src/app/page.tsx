'use client';

import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/lib/api';
import { createClient } from '@/utils/supabase/client';
import DashboardLayout from '@/components/DashboardLayout';
import InputForm from '@/components/InputForm';
import ResultsDisplay from '@/components/ResultsDisplay';
import TimePeriodTracker from '@/components/TimePeriodTracker';
import CurrentPeriods from '@/components/CurrentPeriods';
import UserDetailsCard from '@/components/UserDetailsCard';
import { Calendar, Clock, Star } from 'lucide-react';
import LifeRoadmap from '@/components/LifeRoadmap';

type AnalysisResult = {
    mulank: number;
    bhagyank: number;
    kua: number;
    name_number: {
        total_sum: number;
        single_digit: number;
    };
    loshu: Record<string, number>;
    periods: {
        current: {
            personal_year: number;
            personal_month: number;
            personal_day: number;
            date: string;
        };
        yearly_forecast: Array<{ year: number; personal_year: number }>;
        monthly_forecast: Array<{ month: string; month_num: number; personal_month: number }>;
    };
    life_roadmap: {
        pinnacles_challenges: Array<any>;
        essence: Array<any>;
    };
};

export default function Home() {
    const [user, setUser] = useState<any>(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [userInput, setUserInput] = useState<{ name: string; dob: string; gender: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const checkUser = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setAuthLoading(false);
        };
        checkUser();
    }, []);

    // Delayed login popup for unauthenticated users
    useEffect(() => {
        let timeoutId: any;

        if (result && !user && !loading) {
            timeoutId = setTimeout(() => {
                const loginButton = document.getElementById('login-modal-trigger');
                if (loginButton) {
                    loginButton.click();
                }
            }, 5000);
        }

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [result, user, loading]);

    const handleAnalyze = async (data: { name: string; dob: string; gender: string }) => {
        setLoading(true);
        setError(null);
        setResult(null);
        setUserInput(data);

        try {
            const response = await fetch(`${API_BASE_URL}/analyze`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch analysis');
            }

            const resultData = await response.json();
            setResult(resultData);
        } catch (err) {
            setError('An error occurred while fetching data. Please ensure the backend is running.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
                {/* Left Column: Input Panel */}
                <div className="lg:col-span-4 space-y-8">
                    {result && userInput ? (
                        <UserDetailsCard
                            userData={userInput}
                            onReset={() => {
                                setResult(null);
                                setUserInput(null);
                            }}
                        />
                    ) : (
                        <InputForm onSubmit={handleAnalyze} isLoading={loading} />
                    )}

                    {/* Feature Highlight / Quick Stats (Mock) */}
                    {result ? (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Only show CurrentPeriods if user is logged in, otherwise generic or locked */}
                            {user ? (
                                <CurrentPeriods data={result} />
                            ) : (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden">
                                    <div className="absolute inset-0 backdrop-blur-sm bg-white/50 z-10 flex flex-col items-center justify-center p-4 text-center">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                        </div>
                                        <p className="text-sm font-semibold text-gray-900">Login to View Daily Insights</p>
                                    </div>
                                    <CurrentPeriods data={result} />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-gray-900 font-semibold mb-4">Daily Insights</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                        <Calendar className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Today's Vibration</p>
                                        <p className="text-xs text-gray-500">Universal Day 8</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                                        <Star className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Lucky Color</p>
                                        <p className="text-xs text-gray-500">Royal Blue</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column: Results & Info */}
                <div className="lg:col-span-8 flex flex-col h-full">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2 mb-6">
                            <span className="font-medium">Error:</span> {error}
                        </div>
                    )}

                    {!result && !loading && (
                        <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent pointer-events-none" />
                            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 shadow-inset">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-300">
                                    <Clock className="w-8 h-8" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 z-10">Waiting for Data</h3>
                            <p className="text-gray-500 max-w-sm mx-auto z-10">
                                Enter your details in the form to generate a comprehensive numerology report including Mulank, Bhagyank, and Lo Shu Grid.
                            </p>
                        </div>
                    )}

                    {loading && (
                        <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center h-[500px] flex flex-col items-center justify-center text-gray-400 animate-pulse">
                            <div className="w-16 h-16 bg-gray-100 rounded-full mb-6"></div>
                            <div className="h-4 w-48 bg-gray-100 rounded mb-3"></div>
                            <div className="h-4 w-32 bg-gray-100 rounded"></div>
                        </div>
                    )}

                    {result && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
                            <ResultsDisplay data={result} isLoggedIn={!!user} />

                            {user ? (
                                <div className="flex flex-col gap-8">
                                    {/* Life Roadmap (Pinnacles) - Full Width */}
                                    <div className="w-full">
                                        {result.life_roadmap && (
                                            <LifeRoadmap
                                                pinnacleData={result.life_roadmap.pinnacles_challenges}
                                            />
                                        )}
                                    </div>

                                    {/* Time Periods & Essence - Full Width */}
                                    <div className="w-full">
                                        {userInput && (
                                            <TimePeriodTracker
                                                dob={userInput.dob}
                                                essenceData={result.life_roadmap?.essence}
                                            />
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Life Path & Roadmap Analysis</h3>
                                    <p className="text-gray-500 mb-6 max-w-md mx-auto">Login to access your detailed 100-year life path analysis, including personal years, pinnacles, challenges, and essence numbers.</p>
                                    <button
                                        onClick={() => document.getElementById('login-modal-trigger')?.click()}
                                        className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Log In to Unlock
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
