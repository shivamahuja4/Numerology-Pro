'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { House, CheckCircle, XCircle, AlertCircle, ArrowRight } from 'lucide-react';

type AnalysisResult = {
    mulank: number;
    bhagyank: number;
    house_total: number;
    compatibility: string;
    lucky_numbers: number[];
};

export default function HouseNumerology() {
    const [houseNumber, setHouseNumber] = useState('');
    const [dob, setDob] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch('http://127.0.0.1:8000/analyze/house', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ house_number: houseNumber, dob }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch analysis');
            }

            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }
            setResult(data);
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const getCompatibilityColor = (status: string) => {
        switch (status) {
            case 'Lucky': return 'text-green-600 bg-green-50 border-green-200';
            case 'Unlucky': return 'text-red-600 bg-red-50 border-red-200';
            case 'Neutral': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getCompatibilityIcon = (status: string) => {
        switch (status) {
            case 'Lucky': return <CheckCircle className="w-5 h-5 text-green-600" />;
            case 'Unlucky': return <XCircle className="w-5 h-5 text-red-600" />;
            default: return <AlertCircle className="w-5 h-5 text-yellow-600" />;
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-3xl mx-auto space-y-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <House className="w-6 h-6 text-purple-600" />
                        House Numerology
                    </h1>
                    <p className="text-gray-500 mt-1">Check if your house or flat number is lucky for your birth date.</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <form onSubmit={handleAnalyze} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">House/Flat Number</label>
                                <input
                                    type="text"
                                    value={houseNumber}
                                    onChange={(e) => setHouseNumber(e.target.value)}
                                    placeholder="e.g. 101 or 12B"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                <input
                                    type="date"
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full md:w-auto px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? 'Analyzing...' : <>Check Compatibility <ArrowRight className="w-4 h-4" /></>}
                        </button>
                    </form>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

                {result && (
                    <div className="space-y-6">
                        <div className={`p-6 rounded-xl border-l-4 shadow-sm flex items-start gap-4 ${getCompatibilityColor(result.compatibility)}`}>
                            {getCompatibilityIcon(result.compatibility)}
                            <div>
                                <h3 className="text-lg font-semibold mb-1">
                                    Your House Number is {result.compatibility}
                                </h3>
                                <p className="text-sm opacity-90">
                                    House Total: <span className="font-bold">{result.house_total}</span> •
                                    Mulank: <span className="font-bold">{result.mulank}</span> •
                                    Bhagyank: <span className="font-bold">{result.bhagyank}</span>
                                </p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                            <h3 className="font-semibold text-gray-900 mb-4">Lucky Numbers for You</h3>
                            <div className="flex flex-wrap gap-2">
                                {result.lucky_numbers.map((num) => (
                                    <span key={num} className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-700 font-bold">
                                        {num}
                                    </span>
                                ))}
                            </div>
                            <p className="text-sm text-gray-500 mt-4">
                                Consider choosing a house number that sums up to one of these digits.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
