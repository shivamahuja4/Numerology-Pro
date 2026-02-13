import React from 'react';

type PinnacleChallenge = {
    cycle: string;
    range: string;
    pinnacle: number;
    challenge: number;
};

type Props = {
    data: PinnacleChallenge[];
};

export default function PinnacleChallengeTable({ data }: Props) {
    if (!data || data.length === 0) return null;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Pinnacles & Challenges
                </h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                        <tr>
                            <th className="px-4 py-3">Cycle</th>
                            <th className="px-4 py-3">Age Range</th>
                            <th className="px-4 py-3 text-center text-blue-600">Pinnacle</th>
                            <th className="px-4 py-3 text-center text-red-600">Challenge</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.map((row, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 font-medium text-gray-900">{row.cycle}</td>
                                <td className="px-4 py-3 text-gray-600">{row.range}</td>
                                <td className="px-4 py-3 text-center font-bold text-blue-700 bg-blue-50/50">
                                    {row.pinnacle}
                                </td>
                                <td className="px-4 py-3 text-center font-bold text-red-700 bg-red-50/50">
                                    {row.challenge}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
