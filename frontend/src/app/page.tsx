'use client';

import { useState } from 'react';
import { API_BASE_URL } from '@/lib/api';
import DashboardLayout from '@/components/DashboardLayout';
import InputForm from '@/components/InputForm';
import ResultsDisplay from '@/components/ResultsDisplay';
import TimePeriodTracker from '@/components/TimePeriodTracker';
import CurrentPeriods from '@/components/CurrentPeriods';
import UserDetailsCard from '@/components/UserDetailsCard';
import { Calendar, Clock, Star } from 'lucide-react';

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
};

export default function Home() {
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [userInput, setUserInput] = useState<{ name: string; dob: string; gender: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
                            <CurrentPeriods data={result} />
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
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <ResultsDisplay data={result} />
                            {userInput && <TimePeriodTracker dob={userInput.dob} />}
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
