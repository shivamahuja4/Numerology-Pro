import LoShuGrid from './LoShuGrid';
import TimePeriodTracker from './TimePeriodTracker';
import { Award, Briefcase, Hash, Calendar, Layers } from 'lucide-react';

type Props = {
    data: {
        mulank: number;
        bhagyank: number;
        kua: number;
        loshu: Record<string, number>;
        periods: {
            current: {
                personal_year: number;
                personal_month: number;
                personal_day: number;
                date: string;
            };
            yearly_forecast: Array<{ year: number; personal_year: number }>;
            monthly_forecast: Array<{ month: string; month_num: number; personal_month: number }>;
        };
    };
};

function StatCard({ title, value, icon: Icon, colorClass, bgClass, labelColor }: {
    title: string, value: number, icon: any, colorClass: string, bgClass: string, labelColor: string
}) {
    return (
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
            <div>
                <span className="text-sm font-medium text-gray-500 mb-1 block">{title}</span>
                <span className={`text-4xl font-bold ${colorClass}`}>{value}</span>
            </div>
            <div className={`p-3 rounded-xl ${bgClass}`}>
                <Icon className={`w-6 h-6 ${labelColor}`} />
            </div>
        </div>
    );
}

export default function ResultsDisplay({ data }: Props) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Mulank (Psychic)"
                    value={data.mulank}
                    icon={Award}
                    colorClass="text-purple-600"
                    bgClass="bg-purple-50"
                    labelColor="text-purple-600"
                />
                <StatCard
                    title="Bhagyank (Destiny)"
                    value={data.bhagyank}
                    icon={Briefcase}
                    colorClass="text-indigo-600"
                    bgClass="bg-indigo-50"
                    labelColor="text-indigo-600"
                />
                <StatCard
                    title="Kua Number"
                    value={data.kua}
                    icon={Hash}
                    colorClass="text-pink-600"
                    bgClass="bg-pink-50"
                    labelColor="text-pink-600"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Lo Shu Grid */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                            <Layers className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Lo Shu Grid</h3>
                    </div>
                    <LoShuGrid gridData={data.loshu} />
                </div>

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
            </div>



        </div>
    );
}
