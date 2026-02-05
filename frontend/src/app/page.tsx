'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import InputForm from '@/components/InputForm';
import ResultsDisplay from '@/components/ResultsDisplay';
import TimePeriodTracker from '@/components/TimePeriodTracker';

type AnalysisResult = {
    mulank: number;
    bhagyank: number;
    kua: number;
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
            const response = await fetch('http://127.0.0.1:8000/analyze', {
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
            <div className="max-w-7xl mx-auto space-y-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-500">Welcome to your professional numerology workplace.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Input Section - Takes up full width on mobile, 4 cols on large screens */}
                    <div className="lg:col-span-4 space-y-6">
                        <InputForm onSubmit={handleAnalyze} isLoading={loading} />

                        {/* Helpful Tip Card (Mock) */}
                        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
                            <h4 className="font-semibold text-indigo-900 mb-2">Did you know?</h4>
                            <p className="text-sm text-indigo-700">
                                The Lo Shu Grid is a square of numbers 1-9. Each number represents a specific element and direction in Feng Shui.
                            </p>
                        </div>
                    </div>

                    {/* Results Section - Takes up full width on mobile, 8 cols on large screens */}
                    <div className="lg:col-span-8 space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                                <span className="font-medium">Error:</span> {error}
                            </div>
                        )}

                        {!result && !loading && (
                            <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-12 text-center h-[400px] flex flex-col items-center justify-center text-gray-400">
                                <p className="text-lg font-medium">No analysis generated yet</p>
                                <p className="text-sm">Fill out the quick analysis form to see results.</p>
                            </div>
                        )}

                        {loading && (
                            <div className="bg-white border border-gray-100 rounded-xl p-12 text-center h-[400px] flex flex-col items-center justify-center text-gray-400 animate-pulse">
                                <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
                                <div className="h-4 w-48 bg-gray-200 rounded mb-2"></div>
                                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                            </div>
                        )}

                        {result && (
                            <div className="space-y-8">
                                <ResultsDisplay data={result} />
                                {userInput && <TimePeriodTracker dob={userInput.dob} />}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
