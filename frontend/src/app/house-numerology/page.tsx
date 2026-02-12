'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Home, Sparkles, ArrowRight, Info } from 'lucide-react';

type CompatibilityResult = {
    status: 'Lucky' | 'Unlucky' | 'Neutral';
    lucky_numbers: number[];
};

type AnalysisResult = {
    mulank: number;
    bhagyank: number;
    house_total: number;
    house_compound: number;
    compatibility: CompatibilityResult;
};

export default function HouseNumerology() {
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        dob: '',
        house_number: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-8rem)]">
                {/* Left Column: Input Panel */}
                <div className="lg:col-span-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col h-full">
                    <div className="mb-8">
                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-4">
                            <Home className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">House Analysis</h1>
                        <p className="text-gray-500 text-sm">Calculate the vibration of your home address for peace and prosperity.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 flex-1">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-gray-900"
                                value={formData.dob}
                                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                House Number
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. 108 or 12A"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                                value={formData.house_number}
                                onChange={(e) => setFormData({ ...formData, house_number: e.target.value })}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-3.5 px-6 rounded-xl hover:shadow-lg hover:shadow-indigo-500/20 transition-all disabled:opacity-50 font-medium flex items-center justify-center gap-2 group"
                        >
                            {loading ? 'Analyzing...' : (
                                <>
                                    Analyze Number
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Right Column: Results & Info */}
                <div className="lg:col-span-8 flex flex-col h-full">
                    {error && (
                        <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 mb-6">
                            {error}
                        </div>
                    )}

                    {result ? (
                        <div className="space-y-6">
                            {/* Primary Result Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 flex flex-col items-center text-center relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500" />

                                <span className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold mb-6 ${result.compatibility.status === 'Lucky' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                                        result.compatibility.status === 'Unlucky' ? 'bg-rose-50 text-rose-700 border border-rose-100' :
                                            'bg-amber-50 text-amber-700 border border-amber-100'
                                    }`}>
                                    <Sparkles className="w-4 h-4" />
                                    {result.compatibility.status} Number
                                </span>

                                <div className="relative mb-4">
                                    <div className="text-8xl font-bold text-gray-900 tracking-tighter">
                                        {result.house_total}
                                    </div>
                                    <div className="absolute -top-4 -right-16 bg-gray-50 px-3 py-1 rounded-lg text-gray-500 text-sm font-medium border border-gray-100">
                                        from {result.house_compound}
                                    </div>
                                </div>
                                <p className="text-gray-500 font-medium">House Number Total</p>
                            </div>

                            {/* Secondary Stats */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                                    <div>
                                        <div className="text-3xl font-bold text-gray-900">{result.mulank}</div>
                                        <div className="text-sm text-gray-500 font-semibold uppercase tracking-wide mt-1">Mulank</div>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                                        <span className="font-bold">M</span>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                                    <div>
                                        <div className="text-3xl font-bold text-gray-900">{result.bhagyank}</div>
                                        <div className="text-sm text-gray-500 font-semibold uppercase tracking-wide mt-1">Bhagyank</div>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                        <span className="font-bold">B</span>
                                    </div>
                                </div>
                            </div>

                            {/* Suggestions */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-amber-500" />
                                    Lucky Numbers for You
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {result.compatibility.lucky_numbers.map((num) => (
                                        <div key={num} className="w-12 h-12 flex items-center justify-center bg-indigo-50 text-indigo-700 rounded-xl font-bold text-lg border border-indigo-100 hover:bg-indigo-100 transition-colors">
                                            {num}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Empty State / Educational Content
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 h-full flex flex-col justify-center items-center text-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-6 text-gray-300">
                                <Info className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">House Numerology Secrets</h3>
                            <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
                                The number of your house influences the atmosphere within. Matches between House Number and Mulank bring harmony, while conflicts might cause unrest.
                            </p>
                            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg">
                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <div className="font-semibold text-gray-900 mb-1">Harmony</div>
                                    <div className="text-xs text-gray-500">Family Peace</div>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <div className="font-semibold text-gray-900 mb-1">Prosperity</div>
                                    <div className="text-xs text-gray-500">Wealth Magnet</div>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <div className="font-semibold text-gray-900 mb-1">Health</div>
                                    <div className="text-xs text-gray-500">Well-being</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
