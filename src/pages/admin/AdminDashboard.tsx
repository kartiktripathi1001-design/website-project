import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Target,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  MessageSquare
} from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "12,847",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Active Challenges",
    value: "2,143",
    change: "+8.2%",
    changeType: "positive" as const,
    icon: Target,
  },
  {
    title: "Platform Revenue",
    value: "$847,329",
    change: "+23.1%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "Success Rate",
    value: "34.7%",
    change: "-2.1%",
    changeType: "negative" as const,
    icon: TrendingUp,
  },
];

const recentActivity = [
  { id: 1, user: "John Smith", action: "Completed $50K Challenge", status: "success", time: "2 min ago" },
  { id: 2, user: "Sarah Wilson", action: "Failed Daily Loss Limit", status: "failed", time: "5 min ago" },
  { id: 3, user: "Mike Johnson", action: "KYC Verification Pending", status: "pending", time: "12 min ago" },
  { id: 4, user: "Emma Davis", action: "Withdrawal Request $15,000", status: "pending", time: "18 min ago" },
  { id: 5, user: "David Brown", action: "Started $100K Challenge", status: "active", time: "25 min ago" },
];

const challengeStats = [
  { type: "$25K Challenge", total: 1250, completed: 420, success: 34, revenue: "$156,250" },
  { type: "$50K Challenge", total: 850, completed: 285, success: 32, revenue: "$297,500" },
  { type: "$100K Challenge", total: 340, completed: 95, success: 38, revenue: "$238,000" },
  { type: "$200K Challenge", total: 125, completed: 28, success: 43, revenue: "$155,000" },
];

import bettorFundedLogo from "@/assets/bettorfunded-logo.png";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <img src={bettorFundedLogo} alt="BettorFunded" className="h-8 animate-float" />
          <h2 className="text-2xl font-bold tracking-tight neon-text-cyan">Neural Dashboard</h2>
        </div>
        <p className="neon-text-blue">
          Real-time quantum processing interface
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colors = ['neon-text-cyan', 'neon-text-green', 'neon-text-purple', 'neon-text-orange'];
          const glows = ['glow-cyan', 'glow-green', 'glow-purple', 'glow-orange'];
          return (
            <div key={stat.title} className={`admin-card scan-line hover:scale-105 transition-all duration-300 animate-fade-in`} style={{animationDelay: `${index * 0.1}s`}}>
              <div className="flex flex-row items-center justify-between space-y-0 pb-2 p-6">
                <h3 className="text-sm font-medium tracking-wide">{stat.title}</h3>
                <Icon className={`h-6 w-6 ${colors[index]} animate-pulse`} style={{filter: `drop-shadow(var(--${glows[index]}))`}} />
              </div>
              <div className="px-6 pb-6">
                <div className={`text-3xl font-bold ${colors[index]} mb-2`} style={{textShadow: `var(--${glows[index]})`}}>
                  {stat.value}
                </div>
                <p className={`text-xs ${
                  stat.changeType === 'positive' ? 'neon-text-green' : 'neon-text-orange'
                } flex items-center gap-1`}>
                  <span className="animate-pulse">◈</span> {stat.change} from last cycle
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Challenge Performance */}
        <div className="col-span-4 admin-card hologram">
          <div className="p-6 border-b border-cyan-400/30">
            <h3 className="text-xl font-bold neon-text-cyan">Quantum Challenge Matrix</h3>
            <p className="neon-text-blue text-sm">
              Neural network performance analytics
            </p>
          </div>
          <div className="p-6 space-y-6">
            {challengeStats.map((challenge, index) => (
              <div key={challenge.type} className="space-y-3 p-4 rounded-lg bg-gradient-to-r from-cyan-500/5 to-blue-500/5 neon-border-cyan">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none neon-text-cyan">{challenge.type}</p>
                    <p className="text-xs neon-text-blue">
                      <span className="animate-pulse">▶</span> {challenge.completed}/{challenge.total} processed • {challenge.success}% efficiency
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium neon-text-green">{challenge.revenue}</div>
                    <div className="text-xs neon-text-purple">quantum yield</div>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-1000 glow-cyan"
                      style={{width: `${(challenge.completed / challenge.total) * 100}%`}}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse opacity-50" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-span-3 admin-card data-stream">
          <div className="p-6 border-b border-cyan-400/30">
            <h3 className="text-xl font-bold neon-text-cyan">Neural Activity Feed</h3>
            <p className="neon-text-blue text-sm">
              Live system events
            </p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg bg-gradient-to-r from-gray-900/50 to-gray-800/50 hover:from-cyan-500/5 hover:to-blue-500/5 transition-all duration-300" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="flex-shrink-0">
                    {activity.status === 'success' && (
                      <CheckCircle className="h-5 w-5 neon-text-green animate-pulse" />
                    )}
                    {activity.status === 'failed' && (
                      <AlertTriangle className="h-5 w-5 neon-text-orange animate-pulse" />
                    )}
                    {activity.status === 'pending' && (
                      <Clock className="h-5 w-5 neon-text-purple animate-pulse" />
                    )}
                    {activity.status === 'active' && (
                      <Activity className="h-5 w-5 neon-text-blue animate-pulse" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium neon-text-cyan">
                      {activity.user}
                    </p>
                    <p className="text-xs text-gray-400">
                      {activity.action}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className={`px-2 py-1 rounded text-xs font-medium border ${
                      activity.status === 'success' ? 'neon-text-green neon-border-cyan bg-green-500/10' :
                      activity.status === 'failed' ? 'neon-text-orange border-orange-500/50 bg-orange-500/10' :
                      activity.status === 'pending' ? 'neon-text-purple border-purple-500/50 bg-purple-500/10' : 
                      'neon-text-blue border-blue-500/50 bg-blue-500/10'
                    }`}>
                      {activity.status}
                    </div>
                  </div>
                  <div className="text-xs neon-text-blue">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="admin-card pulse-glow">
        <div className="p-6 border-b border-cyan-400/30">
          <h3 className="text-xl font-bold neon-text-cyan">Quantum Operations Hub</h3>
          <p className="neon-text-blue text-sm">Critical system functions</p>
        </div>
        <div className="p-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="admin-card scan-line cursor-pointer hover:scale-105 transition-all duration-300 group">
              <div className="pt-6 px-6 pb-6">
                <div className="flex items-center space-x-4">
                  <AlertTriangle className="h-10 w-10 neon-text-orange animate-bounce group-hover:animate-pulse" />
                  <div>
                    <p className="text-sm font-medium neon-text-cyan">Pending Neural Verification</p>
                    <p className="text-3xl font-bold neon-text-orange">24</p>
                    <p className="text-xs neon-text-purple">Biometric scans required</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="admin-card scan-line cursor-pointer hover:scale-105 transition-all duration-300 group">
              <div className="pt-6 px-6 pb-6">
                <div className="flex items-center space-x-4">
                  <Clock className="h-10 w-10 neon-text-purple animate-spin group-hover:animate-bounce" style={{animationDuration: '3s'}} />
                  <div>
                    <p className="text-sm font-medium neon-text-cyan">Quantum Transfer Queue</p>
                    <p className="text-3xl font-bold neon-text-purple">12</p>
                    <p className="text-xs neon-text-blue">Processing authorization</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="admin-card scan-line cursor-pointer hover:scale-105 transition-all duration-300 group">
              <div className="pt-6 px-6 pb-6">
                <div className="flex items-center space-x-4">
                  <MessageSquare className="h-10 w-10 neon-text-green animate-pulse group-hover:animate-bounce" />
                  <div>
                    <p className="text-sm font-medium neon-text-cyan">Neural Support Channels</p>
                    <p className="text-3xl font-bold neon-text-green">8</p>
                    <p className="text-xs neon-text-blue">Active connections</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Admin Tracking Section */}
      <div className="admin-card hologram">
        <div className="p-6 border-b border-cyan-400/30">
          <h3 className="text-xl font-bold neon-text-cyan flex items-center gap-3">
            <TrendingUp className="h-6 w-6 animate-pulse" />
            Quantum Analytics Matrix
          </h3>
          <p className="neon-text-blue text-sm">
            <a href="/admin/tracking" className="neon-text-green hover:neon-text-cyan transition-colors scan-line">
              Access comprehensive neural analytics interface →
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}