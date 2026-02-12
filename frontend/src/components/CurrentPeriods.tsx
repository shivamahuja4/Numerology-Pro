import { Calendar } from 'lucide-react';

type Props = {
    data: {
        periods: {
            current: {
                personal_year: number;
                personal_month: number;
                personal_day: number;
                date: string;
            };
        };
    };
};

export default function CurrentPeriods({ data }: Props) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                    <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Current Periods</h3>
            </div>
            <div className="grid gap-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-gray-600 font-medium">Personal Year</span>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">{data.periods.current.personal_year}</span>
                    </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-gray-600 font-medium">Personal Month</span>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">{data.periods.current.personal_month}</span>
                    </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-gray-600 font-medium">Personal Day</span>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">{data.periods.current.personal_day}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
