'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  Users, 
  Bell,
  ArrowUpRight,
  MoreHorizontal
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const stats = [
  { 
    name: 'Products Tracked', 
    value: '24', 
    change: '+3', 
    changeType: 'positive',
    icon: Package 
  },
  { 
    name: 'Competitors', 
    value: '8', 
    change: '+1', 
    changeType: 'positive',
    icon: Users 
  },
  { 
    name: 'Price Changes', 
    value: '156', 
    change: '+12%', 
    changeType: 'positive',
    icon: TrendingUp 
  },
  { 
    name: 'Active Alerts', 
    value: '5', 
    change: '-2', 
    changeType: 'negative',
    icon: Bell 
  },
];

const recentActivity = [
  { id: 1, product: 'iPhone 15 Pro', competitor: 'Amazon', oldPrice: '1199€', newPrice: '1149€', change: '-4.2%', time: '2h ago' },
  { id: 2, product: 'MacBook Air M3', competitor: 'Fnac', oldPrice: '1299€', newPrice: '1349€', change: '+3.8%', time: '4h ago' },
  { id: 3, product: 'AirPods Pro 2', competitor: 'Boulanger', oldPrice: '279€', newPrice: '249€', change: '-10.7%', time: '6h ago' },
  { id: 4, product: 'iPad Pro 12.9"', competitor: 'Darty', oldPrice: '1479€', newPrice: '1429€', change: '-3.4%', time: '8h ago' },
];

export default function DashboardPage() {
  const [userName, setUserName] = useState('');
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserName(user.user_metadata?.full_name?.split(' ')[0] || 'there');
      }
    };
    getUser();
  }, [supabase]);

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back, {userName} 👋
        </h1>
        <p className="text-gray-500 mt-1">
          Here&apos;s what&apos;s happening with your price monitoring today.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #fef3e7 0%, #fde8d7 100%)' }}
              >
                <stat.icon className="w-5 h-5 text-[#b8860b]" />
              </div>
              <span className={`
                text-xs font-medium px-2 py-1 rounded-full
                ${stat.changeType === 'positive' 
                  ? 'bg-green-50 text-green-600' 
                  : 'bg-red-50 text-red-600'
                }
              `}>
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">Recent Price Changes</h2>
              <p className="text-sm text-gray-500 mt-0.5">Latest updates from your tracked products</p>
            </div>
            <button className="text-sm font-medium text-[#b8860b] hover:underline flex items-center gap-1">
              View all
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          <div className="divide-y divide-gray-100">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                      <Package className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{activity.product}</p>
                      <p className="text-sm text-gray-500">{activity.competitor}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400 line-through">{activity.oldPrice}</span>
                      <span className="font-medium text-gray-900">{activity.newPrice}</span>
                    </div>
                    <div className="flex items-center justify-end gap-2 mt-1">
                      <span className={`
                        text-xs font-medium
                        ${activity.change.startsWith('-') ? 'text-green-600' : 'text-red-600'}
                      `}>
                        {activity.change}
                      </span>
                      <span className="text-xs text-gray-400">{activity.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="space-y-6">
          {/* Quick actions card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full py-3 px-4 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl transition-all text-sm">
                + Add Product
              </button>
              <button className="w-full py-3 px-4 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-xl border border-gray-200 transition-all text-sm">
                + Add Competitor
              </button>
              <button className="w-full py-3 px-4 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-xl border border-gray-200 transition-all text-sm">
                Create Alert
              </button>
            </div>
          </div>

          {/* Top movers */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Top Movers</h2>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                    <TrendingDown className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">AirPods Pro 2</p>
                    <p className="text-xs text-gray-500">Boulanger</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-green-600">-10.7%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">MacBook Air M3</p>
                    <p className="text-xs text-gray-500">Fnac</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-red-600">+3.8%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                    <TrendingDown className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">iPhone 15 Pro</p>
                    <p className="text-xs text-gray-500">Amazon</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-green-600">-4.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
