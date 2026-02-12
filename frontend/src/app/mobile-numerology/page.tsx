'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

type CompatibilityResult = {
    status: 'Lucky' | 'Unlucky' | 'Neutral';
    lucky_numbers: number[];
};

type AnalysisResult = {
    mulank: number;
    bhagyank: number;
    mobile_total: number;
    mobile_compound: number;
    compatibility: CompatibilityResult;
};

export default function MobileNumerology() {
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        dob: '',
        mobile_number: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch('http://127.0.0.1:8000/analyze/mobile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch analysis');
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto space-y-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Mobile Numerology</h1>
                    <p className="text-gray-500">Check if your mobile number is lucky for you.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Input Form */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-fit">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    required
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-gray-900"
                                    value={formData.dob}
                                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mobile Number
                                </label>
                                <input
                                    type="text"
                                    required
                                    maxLength={10}
                                    placeholder="e.g. 9876543210"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-gray-900"
                                    value={formData.mobile_number}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, '');
                                        setFormData({ ...formData, mobile_number: val });
                                    }}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 font-medium"
                            >
                                {loading ? 'Analyzing...' : 'Analyze Number'}
                            </button>
                        </form>
                    </div>

                    {/* Results Display */}
                    <div className="space-y-6">
                        {error && (
                            <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200">
                                {error}
                            </div>
                        )}

                        {result && (
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
                                <div className="text-center pb-6 border-b border-gray-100">
                                    <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-2 ${result.compatibility.status === 'Lucky' ? 'bg-green-100 text-green-700' :
                                        result.compatibility.status === 'Unlucky' ? 'bg-red-100 text-red-700' :
                                            'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {result.compatibility.status} Number
                                    </span>
                                    <div className="text-5xl font-bold text-gray-900">
                                        {result.mobile_total} <span className="text-3xl text-gray-400 font-normal">({result.mobile_compound})</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">Mobile Number Total</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                                        <div className="text-xl font-bold text-gray-900">{result.mulank}</div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wide">Mulank</div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                                        <div className="text-xl font-bold text-gray-900">{result.bhagyank}</div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wide">Bhagyank</div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 mb-3">Lucky Numbers for You</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {result.compatibility.lucky_numbers.map((num) => (
                                            <span key={num} className="w-8 h-8 flex items-center justify-center bg-indigo-50 text-indigo-700 rounded-full font-medium text-sm">
                                                {num}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {!result && !loading && !error && (
                            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-8 text-center text-gray-400 h-full flex flex-col items-center justify-center">
                                <p>Enter details to check compatibility</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
