'use client';

import { useState, useMemo, useRef } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import { ChevronDown, ChevronRight, Clock } from 'lucide-react';


type EssenceData = {
    age: number;
    year: number;
    essence: number;
};

type Props = {
    dob: string; // YYYY-MM-DD
    essenceData?: EssenceData[];
};

type MonthData = {
    name: string;
    value: number;
};

type YearData = {
    age: number;
    year: number;
    startMonth: string;
    endMonth: string;
    personalYear: number;
    essence: number | null;
    months: MonthData[];
    isCurrentYear: boolean;
};

const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Helper to reduce number to single digit (1-9)
const reduceToSingleDigit = (n: number): number => {
    while (n > 9) {
        n = String(n).split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    return n;
};

export default function TimePeriodTracker({ dob, essenceData }: Props) {
    const virtuosoRef = useRef<VirtuosoHandle>(null);
    const [expandedYear, setExpandedYear] = useState<number | null>(null);

    // Calculate the 100-year timeline
    const timelineData = useMemo(() => {
        if (!dob) return [];

        const [birthYear, birthMonthStr, birthDayStr] = dob.split('-').map(Number);
        const birthMonth = birthMonthStr;
        const birthDay = birthDayStr;

        const data: YearData[] = [];
        const currentYear = new Date().getFullYear();

        // Create lookup map for Essence data
        const essenceMap = new Map<number, number>();
        if (essenceData) {
            essenceData.forEach(e => essenceMap.set(e.year, e.essence));
        }

        for (let i = 0; i < 100; i++) {
            const year = birthYear + i;
            const age = i;

            // Personal Year Calculation: 
            // Formula: Day + Month + Year -> Reduce
            // We use the sum of digits method to be safe and consistent with general numerology
            // Example: 27/02/2001 for 2024 -> 2+7 + 0+2 + 2+0+2+4 = 19 -> 1.

            // Sum of digits of Birth Day
            let sum = 0;
            String(birthDay).split('').forEach(d => sum += parseInt(d));
            String(birthMonth).split('').forEach(d => sum += parseInt(d));
            String(year).split('').forEach(d => sum += parseInt(d));

            const personalYear = reduceToSingleDigit(sum);

            // Personal Months
            const months: MonthData[] = MONTH_NAMES.map((name, idx) => {
                const monthNum = idx + 1;
                // PM = PY + Calendar Month
                const pm = reduceToSingleDigit(personalYear + reduceToSingleDigit(monthNum));
                return { name, value: pm };
            });

            data.push({
                age,
                year,
                startMonth: `Jan ${year}`,
                endMonth: `Jan ${year + 1}`,
                personalYear,
                essence: essenceMap.get(year) ?? null,
                months,
                isCurrentYear: year === currentYear
            });
        }
        return data;
    }, [dob, essenceData]);

    // Find initial index to scroll to
    const initialIndex = useMemo(() => {
        const idx = timelineData.findIndex(d => d.isCurrentYear);
        return idx !== -1 ? idx : 0;
    }, [timelineData]);

    const toggleYear = (year: number) => {
        setExpandedYear(expandedYear === year ? null : year);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <Clock className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Time Periods (100 Years)</h3>
                </div>
            </div>

            {/* List Header */}
            <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <div className="col-span-1">Age</div>
                <div className="col-span-4">Time Window</div>
                <div className="col-span-3 text-center">Personal Year</div>
                <div className="col-span-2 text-center">Essence</div>
                <div className="col-span-2 text-right">Action</div>
            </div>

            {/* Virtualized List - Showing approx 5 rows (64px each * 5 = 320px) */}
            <div className="h-[320px]">
                <Virtuoso
                    ref={virtuosoRef}
                    data={timelineData}
                    initialTopMostItemIndex={initialIndex}
                    itemContent={(index, item) => (
                        <div className={`transition-colors duration-200 ${item.isCurrentYear ? 'bg-blue-50/50' : 'bg-white'}`}>
                            {/* Main Row */}
                            <div
                                className={`grid grid-cols-12 gap-4 p-4 items-center cursor-pointer hover:bg-gray-50 border-b border-gray-100 ${item.isCurrentYear ? 'bg-blue-50 border-blue-100' : ''}`}
                                onClick={() => toggleYear(item.year)}
                            >
                                <div className="col-span-1 font-medium text-gray-900">{item.age}</div>
                                <div className="col-span-4 text-gray-600 text-sm">{item.startMonth} - {item.endMonth}</div>
                                <div className="col-span-3 flex justify-center">
                                    <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${item.isCurrentYear ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                                        }`}>
                                        {item.personalYear}
                                    </span>
                                </div>
                                <div className="col-span-2 flex justify-center">
                                    {item.essence !== null && (
                                        <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${item.isCurrentYear ? 'bg-purple-100 text-purple-700' : 'bg-purple-50 text-purple-700'
                                            }`}>
                                            {item.essence}
                                        </span>
                                    )}
                                </div>
                                <div className="col-span-2 flex justify-end text-gray-400">
                                    {expandedYear === item.year ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                                </div>
                            </div>

                            {/* Expanded Content (Accordion) */}
                            {expandedYear === item.year && (
                                <div className="bg-gray-50/50 p-4 border-b border-gray-200 shadow-inner">
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                        {item.months.map((month) => (
                                            <div key={month.name} className="flex items-center justify-between bg-white p-2 rounded border border-gray-200 text-sm">
                                                <span className="text-gray-600">{month.name}</span>
                                                <span className="font-semibold text-gray-900">{month.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                />
            </div>
        </div>
    );
}
