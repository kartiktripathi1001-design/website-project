import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import {
  TrendingUp, TrendingDown, Users, Target, DollarSign, Activity,
  Calendar, Globe, AlertTriangle, CheckCircle, Clock, Filter
} from "lucide-react";

// Mock data for different time periods
const performanceMetrics = [
  { metric: 'Platform Uptime', value: '99.9%', trend: 'up', change: '+0.1%' },
  { metric: 'Avg Response Time', value: '145ms', trend: 'down', change: '-12ms' },
  { metric: 'Error Rate', value: '0.02%', trend: 'down', change: '-0.01%' },
  { metric: 'User Satisfaction', value: '4.8/5', trend: 'up', change: '+0.2' }
];

const geographicData = [
  { country: 'United States', users: 2345, percentage: 32 },
  { country: 'United Kingdom', users: 1890, percentage: 26 },
  { country: 'Canada', users: 945, percentage: 13 },
  { country: 'Australia', users: 567, percentage: 8 },
  { country: 'Germany', users: 434, percentage: 6 },
  { country: 'Others', users: 1089, percentage: 15 }
];

export default function AdminTracking() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Analytics & Tracking</h2>
          <p className="text-muted-foreground">
            Comprehensive platform performance and user behavior analytics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to="/admin">
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {performanceMetrics.map((metric) => (
          <Card key={metric.metric}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
              {metric.trend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-primary" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs ${
                metric.trend === 'up' ? 'text-primary' : 'text-destructive'
              }`}>
                {metric.change} from last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Analytics</TabsTrigger>
          <TabsTrigger value="challenges">Challenge Analytics</TabsTrigger>
          <TabsTrigger value="financial">Financial Tracking</TabsTrigger>
          <TabsTrigger value="geographic">Geographic Data</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Platform Growth</CardTitle>
                <CardDescription>Monthly user and challenge growth trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">New Users This Month</span>
                    <span className="text-2xl font-bold text-primary">+2,847</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Challenges</span>
                    <span className="text-2xl font-bold text-primary">1,293</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Monthly Revenue</span>
                    <span className="text-2xl font-bold text-primary">$487,329</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Challenge Distribution</CardTitle>
                <CardDescription>Active challenges by type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">$25K Challenges</span>
                    <Badge variant="secondary">1,250 active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">$50K Challenges</span>
                    <Badge variant="secondary">850 active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">$100K Challenges</span>
                    <Badge variant="secondary">340 active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">$200K Challenges</span>
                    <Badge variant="secondary">125 active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Status Distribution</CardTitle>
              <CardDescription>Current user account statuses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm">Active Users</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">8,247</div>
                  <div className="text-xs text-muted-foreground">67.3%</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Pending KYC</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">2,156</div>
                  <div className="text-xs text-muted-foreground">17.6%</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  <span className="text-sm">Suspended</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">543</div>
                  <div className="text-xs text-muted-foreground">4.4%</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Funded Accounts</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">1,301</div>
                  <div className="text-xs text-muted-foreground">10.6%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Challenge Performance</CardTitle>
              <CardDescription>Success rates and completion statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Overall Pass Rate</span>
                  <span className="text-lg font-semibold text-primary">34.7%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Challenges Completed This Month</span>
                  <span className="text-lg font-semibold">1,847</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Average Completion Time</span>
                  <span className="text-lg font-semibold">28 days</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
              <CardDescription>Revenue and financial metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Monthly Revenue</span>
                  <span className="text-2xl font-bold text-primary">$487,329</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pending Withdrawals</span>
                  <span className="text-lg font-semibold">$124,500</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Platform Profit</span>
                  <span className="text-lg font-semibold text-primary">$298,750</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geographic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>User distribution by country</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {geographicData.map((country) => (
                  <div key={country.country} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{country.country}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-muted-foreground">
                        {country.users.toLocaleString()} users
                      </div>
                      <Badge variant="secondary" className="min-w-[3rem]">
                        {country.percentage}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}