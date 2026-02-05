type Props = {
    gridData: Record<string, number>;
};

export default function LoShuGrid({ gridData }: Props) {
    // Lo Shu Grid standard positions
    // 4 9 2
    // 3 5 7
    // 8 1 6

    const gridPositions = [
        ['4', '9', '2'],
        ['3', '5', '7'],
        ['8', '1', '6']
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Lo Shu Grid</h3>
            <div className="grid grid-cols-3 gap-2 max-w-[250px] mx-auto aspect-square">
                {gridPositions.flat().map((num) => {
                    const count = gridData[num] || 0;
                    return (
                        <div
                            key={num}
                            className={`
                flex flex-col items-center justify-center rounded-md border
                ${count > 0 ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50 border-gray-100'}
                aspect-square
              `}
                        >
                            <span className={`text-xl font-bold ${count > 0 ? 'text-indigo-600' : 'text-gray-300'}`}>
                                {num}
                            </span>
                            {count > 1 && (
                                <span className="text-xs text-gray-500 mt-1">x{count}</span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
