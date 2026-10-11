import {
  Building2, Users, Wallet, Activity, Shield, ScrollText,
  Link2, Megaphone, Palette, TrendingUp,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import CountUp from '../../components/CountUp';

const stats = [
  { label: 'Registered Universities', value: 24, icon: Building2, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/30' },
  { label: 'Total Campuses', value: 86, icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/30' },
  { label: 'Active Users', value: 12840, icon: Users, color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-900/30' },
  { label: 'System Revenue (TZS)', value: 420, suffix: 'M', icon: Wallet, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/30' },
];

const modules = [
  { to: '/admin/audit', icon: ScrollText, title: 'Security & Audit Logs', desc: 'Full system audit trail, login events, data changes.' },
  { to: '/admin/rbac', icon: Shield, title: 'RBAC & Access Rights', desc: 'Roles, permissions, and institutional access policies.' },
  { to: '/admin/users', icon: Users, title: 'User & Staff Directory', desc: 'Manage all users across campuses and roles.' },
  { to: '/admin/integrations', icon: Link2, title: 'LMS & API Integrations', desc: 'Canvas, Blackboard connectors and API keys.' },
  { to: '/admin/comms', icon: Megaphone, title: 'Public Communications', desc: 'System-wide announcements and messaging rails.' },
  { to: '/admin/branding', icon: Palette, title: 'Branding & Localization', desc: 'Custom logos, themes, ENG/SW defaults.' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">System Overview</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Enterprise control plane for all institutions</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${s.bg} ${s.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">{s.label}</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    <CountUp end={s.value} duration={1500} />
                    {s.suffix || ''}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Fee Collection · System-wide</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { l: 'Invoiced', v: 'TZS 680M' },
              { l: 'Collected', v: 'TZS 420M' },
              { l: 'Outstanding', v: 'TZS 260M' },
            ].map((x) => (
              <div key={x.l} className="rounded-lg bg-gray-50 dark:bg-slate-800/60 p-3">
                <p className="text-[10px] text-gray-500">{x.l}</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">{x.v}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">System Health</h3>
          </div>
          <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
            <li className="flex justify-between"><span>API uptime</span><span className="font-semibold text-emerald-600">99.99%</span></li>
            <li className="flex justify-between"><span>Active sessions</span><span className="font-semibold">1,204</span></li>
            <li className="flex justify-between"><span>Failed logins (24h)</span><span className="font-semibold text-amber-600">18</span></li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((m) => {
          const Icon = m.icon;
          return (
            <Link
              key={m.to}
              to={m.to}
              className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 hover:border-emerald-500/40 hover:shadow-md transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-[#064E3B]/10 dark:bg-emerald-900/30 text-[#064E3B] dark:text-emerald-400 flex items-center justify-center mb-3">
                <Icon className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{m.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{m.desc}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}