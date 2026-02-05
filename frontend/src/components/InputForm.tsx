'use client';
import { useState } from 'react';
import { Sparkles, Calendar, User } from 'lucide-react';

type FormData = {
  name: string;
  dob: string;
  gender: string;
};

type Props = {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
};

export default function InputForm({ onSubmit, isLoading }: Props) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    dob: '',
    gender: 'male',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          <Sparkles className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Quick Analysis</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              required
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter full name"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Date of Birth</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="date"
              required
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Gender</label>
          <div className="flex gap-4">
            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="male"
                className="peer sr-only"
                checked={formData.gender === 'male'}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              />
              <div className="text-center py-2 px-3 rounded-lg border border-gray-200 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-checked:border-blue-200 transition-all text-sm font-medium text-gray-600 hover:bg-gray-50">
                Male
              </div>
            </label>
            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="female"
                className="peer sr-only"
                checked={formData.gender === 'female'}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              />
              <div className="text-center py-2 px-3 rounded-lg border border-gray-200 peer-checked:bg-pink-50 peer-checked:text-pink-700 peer-checked:border-pink-200 transition-all text-sm font-medium text-gray-600 hover:bg-gray-50">
                Female
              </div>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            'Calculating...'
          ) : (
            <>
              Generate Report
              <Sparkles className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
