
import React from 'react';

type Props = {
    gridData: Record<string, number>;
    personalYear: number;
    personalMonth: number;
    personalDay: number;
};

export default function DynamicLoShuGrid({ gridData, personalYear, personalMonth, personalDay }: Props) {
    // Lo Shu Grid standard positions
    // 4 9 2
    // 3 5 7
    // 8 1 6

    const gridPositions = [
        ['4', '9', '2'],
        ['3', '5', '7'],
        ['8', '1', '6']
    ];

    // Combine static grid data with personal periods

    const dynamicCounts: Record<string, number> = { ...gridData };
    const dynamicNumbers = new Set<string>();

    const addDynamicNumber = (num: number) => {
        const strNum = num.toString();
        // Personal Year/Month/Day are already reduced to single digits (1-9) in the backend 

        dynamicCounts[strNum] = (dynamicCounts[strNum] || 0) + 1;
        dynamicNumbers.add(strNum);
    };

    addDynamicNumber(personalYear);
    addDynamicNumber(personalMonth);
    addDynamicNumber(personalDay);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Dynamic Loshu Grid</h3>
            <div className="grid grid-cols-3 gap-2 max-w-[250px] mx-auto aspect-square">
                {gridPositions.flat().map((num) => {
                    const count = dynamicCounts[num] || 0;
                    const isDynamic = dynamicNumbers.has(num);

                    return (
                        <div
                            key={num}
                            className={`
                flex flex-col items-center justify-center rounded-md border
                ${count > 0 ? (isDynamic ? 'bg-orange-50 border-orange-200' : 'bg-indigo-50 border-indigo-200') : 'bg-gray-50 border-gray-100'}
                aspect-square
              `}
                        >
                            <span className={`text-xl font-bold ${count > 0
                                    ? (isDynamic ? 'text-orange-600' : 'text-indigo-600')
                                    : 'text-gray-300'
                                }`}>
                                {num}
                            </span>
                            {count > 0 && (
                                <div className="flex gap-1 text-[10px] items-center mt-1">
                                    {count > 1 && <span className="text-gray-500">x{count}</span>}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="mt-4 text-center text-xs text-gray-500">
                <p>PY: <span className="font-semibold text-orange-600">{personalYear}</span> • PM: <span className="font-semibold text-orange-600">{personalMonth}</span> • PD: <span className="font-semibold text-orange-600">{personalDay}</span></p>
            </div>
        </div>
    );
}
