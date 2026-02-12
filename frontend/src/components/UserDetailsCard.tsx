import { User, Calendar, RotateCcw } from 'lucide-react';

type Props = {
    userData: {
        name: string;
        dob: string;
        gender: string;
    };
    onReset: () => void;
};

export default function UserDetailsCard({ userData, onReset }: Props) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-in fade-in zoom-in duration-300">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Analysis For</h3>
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <User className="w-5 h-5" />
                </div>
            </div>

            <div className="space-y-4 mb-8">
                <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Full Name</label>
                    <p className="text-gray-900 font-medium text-lg">{userData.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Date of Birth</label>
                        <div className="flex items-center gap-2 text-gray-900 font-medium">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {userData.dob}
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Gender</label>
                        <p className="text-gray-900 font-medium capitalize">{userData.gender}</p>
                    </div>
                </div>
            </div>

            <button
                onClick={onReset}
                className="w-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
                <RotateCcw className="w-4 h-4" />
                Create New Report
            </button>
        </div>
    );
}
