
import { Calendar, ChevronRight } from 'lucide-react';

type YearlyForecast = {
    year: number;
    personal_year: number;
};

type MonthlyForecast = {
    month: string;
    month_num: number;
    personal_month: number;
};

type Props = {
    yearly: YearlyForecast[];
    monthly: MonthlyForecast[];
};

export default function ForecastSection({ yearly, monthly }: Props) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
            {/* Monthly Forecast */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-semibold text-gray-900">Monthly Forecast ({new Date().getFullYear()})</h3>
                </div>
                <div className="space-y-3">
                    {monthly.map((m) => (
                        <div key={m.month} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                            <span className="text-gray-700 font-medium">{m.month}</span>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400 uppercase tracking-wider">PM</span>
                                <span className="w-8 h-8 flex items-center justify-center bg-indigo-50 text-indigo-700 font-bold rounded-full">
                                    {m.personal_month}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Yearly Forecast */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold text-gray-900">Yearly Forecast</h3>
                </div>
                <div className="space-y-3">
                    {yearly.map((y) => (
                        <div key={y.year} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                            <span className="text-gray-700 font-medium">{y.year}</span>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400 uppercase tracking-wider">PY</span>
                                <span className="w-8 h-8 flex items-center justify-center bg-purple-50 text-purple-700 font-bold rounded-full">
                                    {y.personal_year}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
