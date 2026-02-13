import LoShuGrid from './LoShuGrid';
import DynamicLoShuGrid from './DynamicLoShuGrid';
import { Award, Briefcase, Hash, Calendar, Layers, Type } from 'lucide-react';

type Props = {
    data: {
        mulank: number;
        bhagyank: number;
        kua: number;
        name_number: {
            total_sum: number;
            single_digit: number;
        };
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
    title: string, value: string | number, icon: React.ElementType, colorClass: string, bgClass: string, labelColor: string
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

export default function ResultsDisplay({ data, isLoggedIn }: Props & { isLoggedIn: boolean }) {
    // Helper for blurred/locked content
    const LockedValue = () => (
        <div className="flex items-center gap-2 text-gray-400 select-none blur-sm" aria-hidden="true">
            <span>Hidden</span>
        </div>
    );

    const LockedOverlay = ({ title }: { title: string }) => (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center rounded-xl border border-gray-100/50">
            <div className="bg-white p-3 rounded-full shadow-sm mb-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <span className="text-sm font-medium text-gray-600">Login to unlock {title}</span>
        </div>
    );

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

                {/* Kua Number - Locked if not logged in */}
                <div className="relative">
                    {!isLoggedIn && <LockedOverlay title="Kua Number" />}
                    <StatCard
                        title="Kua Number"
                        value={isLoggedIn ? data.kua : '***'}
                        icon={Hash}
                        colorClass={isLoggedIn ? "text-pink-600" : "text-gray-300 blur-sm"}
                        bgClass={isLoggedIn ? "bg-pink-50" : "bg-gray-50"}
                        labelColor={isLoggedIn ? "text-pink-600" : "text-gray-300"}
                    />
                </div>

                {/* Name Number - Locked if not logged in */}
                <div className="relative">
                    {!isLoggedIn && <LockedOverlay title="Name Number" />}
                    <StatCard
                        title="Name Number"
                        value={isLoggedIn ? `${data.name_number.total_sum} (${data.name_number.single_digit})` : '***'}
                        icon={Type}
                        colorClass={isLoggedIn ? "text-blue-600" : "text-gray-300 blur-sm"}
                        bgClass={isLoggedIn ? "bg-blue-50" : "bg-gray-50"}
                        labelColor={isLoggedIn ? "text-blue-600" : "text-gray-300"}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Lo Shu Grid */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 relative overflow-hidden">
                    {!isLoggedIn && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-[3px] z-10 flex flex-col items-center justify-center">
                            <div className="bg-white p-4 rounded-full shadow-md mb-3">
                                <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">Lo Shu Grid</h3>
                            <p className="text-sm text-gray-500">Login to view this chart</p>
                        </div>
                    )}
                    <div className="flex items-center gap-2 mb-6">
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                            <Layers className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Lo Shu Grid</h3>
                    </div>
                    <LoShuGrid gridData={data.loshu} />
                </div>

                {/* Dynamic Loshu Grid */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 relative overflow-hidden">
                    {!isLoggedIn && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-[3px] z-10 flex flex-col items-center justify-center">
                            <div className="bg-white p-4 rounded-full shadow-md mb-3">
                                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">Dynamic Lo Shu Grid</h3>
                            <p className="text-sm text-gray-500">Login to view this chart</p>
                        </div>
                    )}
                    <div className="flex items-center gap-2 mb-6">
                        <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                            <Layers className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Dynamic Loshu Grid</h3>
                    </div>
                    <DynamicLoShuGrid
                        gridData={data.loshu}
                        personalYear={data.periods.current.personal_year}
                        personalMonth={data.periods.current.personal_month}
                        personalDay={data.periods.current.personal_day}
                    />
                </div>


            </div>



        </div>
    );
}
