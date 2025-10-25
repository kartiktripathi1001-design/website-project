import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Users,
  Target,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  BarChart3,
  Download,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

const overviewStats = [
  {
    title: "Total Challenges Started",
    value: "12,847",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: Target,
  },
  {
    title: "Success Rate",
    value: "34.7%",
    change: "-2.1%",
    changeType: "negative" as const,
    icon: CheckCircle,
  },
  {
    title: "Platform Revenue",
    value: "$2,847,329",
    change: "+23.1%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "Active Users",
    value: "8,429",
    change: "+18.3%",
    changeType: "positive" as const,
    icon: Users,
  },
];

const challengeAnalytics = [
  {
    type: "$25K Challenge",
    started: 4250,
    completed: 1420,
    passed: 483,
    failed: 937,
    successRate: 34,
    revenue: "$1,062,500",
    avgDuration: 22
  },
  {
    type: "$50K Challenge", 
    started: 2850,
    completed: 950,
    passed: 304,
    failed: 646,
    successRate: 32,
    revenue: "$1,137,150",
    avgDuration: 24
  },
  {
    type: "$100K Challenge",
    started: 1340,
    completed: 445,
    passed: 169,
    failed: 276,
    successRate: 38,
    revenue: "$936,600",
    avgDuration: 26
  },
  {
    type: "$200K Challenge",
    started: 425,
    completed: 128,
    passed: 56,
    failed: 72,
    successRate: 44,
    revenue: "$530,750",
    avgDuration: 28
  }
];

const monthlyData = [
  { month: "Jan", challenges: 2840, revenue: 425600, passRate: 36 },
  { month: "Feb", challenges: 3120, revenue: 468200, passRate: 34 },
  { month: "Mar", challenges: 3450, revenue: 517800, passRate: 35 },
  { month: "Apr", challenges: 2980, revenue: 447000, passRate: 33 },
  { month: "May", challenges: 3240, revenue: 486400, passRate: 35 },
  { month: "Jun", challenges: 3680, revenue: 552200, passRate: 37 }
];

const riskMetrics = [
  {
    metric: "Total Platform Exposure",
    value: "$45,230,000",
    risk: "medium",
    change: "+8.2%"
  },
  {
    metric: "Daily Violations",
    value: "23",
    risk: "low", 
    change: "-15.3%"
  },
  {
    metric: "Pending Withdrawals",
    value: "$1,245,600",
    risk: "high",
    change: "+45.2%"
  },
  {
    metric: "Failed Payouts",
    value: "3",
    risk: "low",
    change: "-66.7%"
  }
];

export default function AdminAnalytics() {
  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "low":
        return <Badge variant="default" className="bg-primary">Low Risk</Badge>;
      case "medium":
        return <Badge variant="secondary">Medium Risk</Badge>;
      case "high":
        return <Badge variant="destructive">High Risk</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            Comprehensive platform performance metrics and insights
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overviewStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${
                  stat.changeType === 'positive' ? 'text-primary' : 'text-destructive'
                }`}>
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="challenges" className="space-y-4">
        <TabsList>
          <TabsTrigger value="challenges">Challenge Analytics</TabsTrigger>
          <TabsTrigger value="financial">Financial Metrics</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="challenges" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Challenge Performance Breakdown</CardTitle>
              <CardDescription>
                Detailed analytics by challenge type and performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {challengeAnalytics.map((challenge) => (
                  <div key={challenge.type} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{challenge.type}</h4>
                        <p className="text-sm text-muted-foreground">
                          {challenge.completed}/{challenge.started} completed • Avg: {challenge.avgDuration} days
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{challenge.revenue}</div>
                        <div className="text-xs text-muted-foreground">revenue</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-muted-foreground">Success Rate</span>
                          <span className="font-medium">{challenge.successRate}%</span>
                        </div>
                        <Progress value={challenge.successRate} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-muted-foreground">Completion Rate</span>
                          <span className="font-medium">{Math.round((challenge.completed / challenge.started) * 100)}%</span>
                        </div>
                        <Progress value={(challenge.completed / challenge.started) * 100} className="h-2" />
                      </div>
                      <div className="text-center">
                        <div className="text-primary font-medium">{challenge.passed}</div>
                        <div className="text-xs text-muted-foreground">Passed</div>
                        <div className="text-destructive font-medium">{challenge.failed}</div>
                        <div className="text-xs text-muted-foreground">Failed</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Trends</CardTitle>
              <CardDescription>
                Challenge volume, revenue, and success rates over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData.map((month) => (
                  <div key={month.month} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 text-sm font-medium">{month.month}</div>
                      <div>
                        <div className="text-sm font-medium">{month.challenges} challenges</div>
                        <div className="text-xs text-muted-foreground">${month.revenue.toLocaleString()} revenue</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{month.passRate}%</div>
                      <div className="text-xs text-muted-foreground">pass rate</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Streams</CardTitle>
                <CardDescription>
                  Breakdown of platform revenue sources
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Challenge Fees</span>
                    <span className="font-medium">$1,456,780</span>
                  </div>
                  <Progress value={65} className="h-2" />
                  <p className="text-xs text-muted-foreground">65% of total revenue</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Subscription Fees</span>
                    <span className="font-medium">$498,099</span>
                  </div>
                  <Progress value={22} className="h-2" />
                  <p className="text-xs text-muted-foreground">22% of total revenue</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Platform Commission</span>
                    <span className="font-medium">$285,450</span>
                  </div>
                  <Progress value={13} className="h-2" />
                  <p className="text-xs text-muted-foreground">13% of total revenue</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Operating Expenses</CardTitle>
                <CardDescription>
                  Monthly operational costs and margins
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Trader Payouts</span>
                  <span className="font-medium text-destructive">-$892,450</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Payment Processing</span>
                  <span className="font-medium text-destructive">-$82,573</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Platform Operations</span>
                  <span className="font-medium text-destructive">-$156,200</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Marketing & Acquisition</span>
                  <span className="font-medium text-destructive">-$234,800</span>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Net Profit Margin</span>
                    <span className="font-bold text-primary">42.3%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Pending Financial Actions</CardTitle>
              <CardDescription>
                Financial items requiring attention or approval
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-yellow-500">$245,600</div>
                  <div className="text-sm text-muted-foreground">Pending Withdrawals</div>
                  <div className="text-xs text-muted-foreground mt-1">12 requests</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary">$89,200</div>
                  <div className="text-sm text-muted-foreground">Approved Payouts</div>
                  <div className="text-xs text-muted-foreground mt-1">Processing</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-destructive">$12,450</div>
                  <div className="text-sm text-muted-foreground">Failed Transactions</div>
                  <div className="text-xs text-muted-foreground mt-1">Requires review</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment</CardTitle>
              <CardDescription>
                Platform risk metrics and exposure analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {riskMetrics.map((metric) => (
                  <div key={metric.metric} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{metric.metric}</div>
                      <div className="text-2xl font-bold mt-1">{metric.value}</div>
                      <div className={`text-xs mt-1 ${
                        metric.change.startsWith('+') ? 'text-destructive' : 'text-primary'
                      }`}>
                        {metric.change} from last month
                      </div>
                    </div>
                    <div className="text-right">
                      {getRiskBadge(metric.risk)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Risk Alerts</CardTitle>
                <CardDescription>
                  Current risk factors requiring attention
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-destructive/10 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  <div>
                    <div className="text-sm font-medium">High Withdrawal Volume</div>
                    <div className="text-xs text-muted-foreground">
                      Withdrawal requests increased 45% this month
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-yellow-500/10 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <div>
                    <div className="text-sm font-medium">Success Rate Decline</div>
                    <div className="text-xs text-muted-foreground">
                      Challenge success rate down 2.1% this month
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <div>
                    <div className="text-sm font-medium">Low Violation Rate</div>
                    <div className="text-xs text-muted-foreground">
                      Trading violations down 15% this month
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Exposure Limits</CardTitle>
                <CardDescription>
                  Current exposure vs. risk limits
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Total Platform Exposure</span>
                    <span>$45.2M / $60M limit</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">75% of maximum exposure</p>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Daily Payout Limit</span>
                    <span>$89K / $150K limit</span>
                  </div>
                  <Progress value={59} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">59% of daily limit used</p>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Monthly Withdrawal Limit</span>
                    <span>$2.1M / $3M limit</span>
                  </div>
                  <Progress value={70} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">70% of monthly limit used</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}