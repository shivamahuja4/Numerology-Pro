'use client';

import React, { useMemo } from 'react';
import { Virtuoso } from 'react-virtuoso';

type EssenceData = {
    age: number;
    year: number;
    essence: number;
};

type Props = {
    data: EssenceData[];
};

export default function EssenceGrid({ data }: Props) {
    // Find initial index to scroll to (current age)
    const initialIndex = useMemo(() => {
        if (!data) return 0;
        const currentYear = new Date().getFullYear();
        const idx = data.findIndex(d => d.year === currentYear);
        return idx !== -1 ? idx : 0;
    }, [data]);

    if (!data || data.length === 0) return null;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col">
            <div className="p-4 border-b border-gray-200 bg-gray-50 shrink-0">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Essence (Event) Numbers
                </h3>
            </div>

            {/* Header Row */}
            <div className="grid grid-cols-3 gap-2 px-4 py-2 bg-gray-100/50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase shrink-0">
                <div>Age</div>
                <div>Year</div>
                <div className="text-center">Essence</div>
            </div>

            {/* Scrollable List */}
            <div className="flex-grow min-h-[300px]">
                <Virtuoso
                    data={data}
                    initialTopMostItemIndex={initialIndex}
                    itemContent={(index, item) => {
                        const isCurrent = item.year === new Date().getFullYear();
                        return (
                            <div className={`grid grid-cols-3 gap-2 px-4 py-3 border-b border-gray-100 text-sm hover:bg-gray-50 transition-colors ${isCurrent ? 'bg-purple-50 border-purple-100' : ''}`}>
                                <div className={`font-medium ${isCurrent ? 'text-purple-700' : 'text-gray-900'}`}>{item.age}</div>
                                <div className={`text-gray-600 ${isCurrent ? 'text-purple-700 font-medium' : ''}`}>{item.year}</div>
                                <div className="flex justify-center">
                                    <span className={`w-6 h-6 flex items-center justify-center rounded-full font-bold text-xs ${isCurrent ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                                        }`}>
                                        {item.essence}
                                    </span>
                                </div>
                            </div>
                        );
                    }}
                />
            </div>
        </div>
    );
}
