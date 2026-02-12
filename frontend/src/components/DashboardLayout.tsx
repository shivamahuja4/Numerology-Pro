import { usePathname } from 'next/navigation';
import { LayoutDashboard, Smartphone, Car, Home, Settings, Menu, User } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900";
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
                <div className="h-16 flex items-center px-6 border-b border-gray-200">
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Numerology Pro
                    </span>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-1">
                    <a href="/" className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive('/')}`}>
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                    </a>
                    <a href="/mobile-numerology" className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive('/mobile-numerology')}`}>
                        <Smartphone className="w-4 h-4" />
                        Mobile Numerology
                    </a>
                    <a href="/vehicle-numerology" className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive('/vehicle-numerology')}`}>
                        <Car className="w-4 h-4" />
                        Vehicle Numerology
                    </a>
                    <a href="/house-numerology" className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive('/house-numerology')}`}>
                        <Home className="w-4 h-4" />
                        House Numerology
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors">
                        <Settings className="w-4 h-4" />
                        Settings
                    </a>
                </nav>
                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                            <User className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">User</p>
                            <p className="text-xs text-gray-500">Professional Plan</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 md:px-8">
                    <button className="md:hidden text-gray-500 hover:text-gray-700">
                        <Menu className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">Welcome back</span>
                    </div>
                </header>
                <main className="flex-1 p-6 md:p-8 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
