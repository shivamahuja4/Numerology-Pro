import { usePathname } from 'next/navigation';
import { LayoutDashboard, Smartphone, Car, Home, Settings, Menu, User } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path ? "bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-100" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900";
    };

    return (
        <div className="flex min-h-screen bg-gray-50/50">
            {/* Sidebar */}
            <aside className="hidden md:flex flex-col w-72 bg-white/80 backdrop-blur-xl border-r border-gray-100 z-20 fixed h-full transition-all duration-300">
                <div className="h-20 flex items-center px-8 border-b border-gray-100/50">
                    <span className="text-xl font-bold bg-gradient-to-br from-indigo-600 to-violet-600 bg-clip-text text-transparent tracking-tight">
                        Numerology Pro
                    </span>
                </div>
                <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
                    <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Menu</p>
                    <a href="/" className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${isActive('/')}`}>
                        <LayoutDashboard className={`w-5 h-5 ${pathname === '/' ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                        Dashboard
                    </a>

                    <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6 mb-2">Calculators</p>
                    <a href="/mobile-numerology" className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${isActive('/mobile-numerology')}`}>
                        <Smartphone className={`w-5 h-5 ${pathname === '/mobile-numerology' ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                        Mobile Numerology
                    </a>
                    <a href="/vehicle-numerology" className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${isActive('/vehicle-numerology')}`}>
                        <Car className={`w-5 h-5 ${pathname === '/vehicle-numerology' ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                        Vehicle Numerology
                    </a>
                    <a href="/house-numerology" className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${isActive('/house-numerology')}`}>
                        <Home className={`w-5 h-5 ${pathname === '/house-numerology' ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                        House Numerology
                    </a>

                    <div className="mt-auto pt-8">
                        <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all duration-200">
                            <Settings className="w-5 h-5 text-gray-400" />
                            Settings
                        </a>
                    </div>
                </nav>
                <div className="p-6 border-t border-gray-100/50">
                    <div className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 border border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-50">
                            <User className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">User Account</p>
                            <p className="text-xs text-indigo-600 font-medium">Professional</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col md:pl-72 transition-all duration-300">
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10 transition-all duration-300">
                    <button className="md:hidden text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100">
                        <Menu className="w-6 h-6" />
                    </button>
                    <div className="flex items-center justify-between w-full md:w-auto">
                        <div className="flex flex-col">
                            <h2 className="text-lg font-semibold text-gray-800 leading-tight">
                                {pathname === '/' ? 'Overview' :
                                    pathname.replace('/', '').split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </h2>
                            <span className="text-xs text-gray-400 hidden md:inline-block">From Numerology Pro</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs font-bold border border-indigo-100">
                            U
                        </div>
                    </div>
                </header>
                <main className="flex-1 p-8 overflow-auto">
                    <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
