import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  Activity,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Target,
  Users,
  Eye
} from "lucide-react";

const livePerformance = [
  {
    id: "1",
    user: "John Smith",
    challenge: "$50K Challenge",
    currentPnL: "+$2,450",
    dailyPnL: "+$380",
    dayProgress: 18,
    totalProgress: 65,
    riskLevel: "low",
    openPicks: 3,
    winRate: 68,
    status: "active"
  },
  {
    id: "2", 
    user: "Sarah Wilson",
    challenge: "$25K Challenge",
    currentPnL: "+$1,890",
    dailyPnL: "-$120",
    dayProgress: 12,
    totalProgress: 85,
    riskLevel: "medium",
    openPicks: 1,
    winRate: 72,
    status: "active"
  },
  {
    id: "3",
    user: "Mike Johnson",
    challenge: "$100K Challenge",
    currentPnL: "+$3,250",
    dailyPnL: "+$650",
    dayProgress: 8,
    totalProgress: 45,
    riskLevel: "high",
    openPicks: 5,
    winRate: 58,
    status: "warning"
  }
];

const violations = [
  {
    id: "1",
    user: "Emma Davis",
    challenge: "$25K Challenge",
    violation: "Daily Loss Limit Exceeded",
    amount: "-$1,250",
    limit: "$1,000",
    time: "2 hours ago",
    severity: "high",
    status: "active"
  },
  {
    id: "2",
    user: "David Brown", 
    challenge: "$50K Challenge",
    violation: "Max Odds Violation",
    amount: "4.5 odds",
    limit: "3.0 odds",
    time: "4 hours ago",
    severity: "medium",
    status: "reviewed"
  },
  {
    id: "3",
    user: "Lisa Johnson",
    challenge: "$100K Challenge",
    violation: "Total Drawdown Warning",
    amount: "-$8,500",
    limit: "$10,000",
    time: "6 hours ago",
    severity: "low",
    status: "resolved"
  }
];

const pendingReviews = [
  {
    id: "1",
    user: "Alex Thompson",
    challenge: "$50K Challenge",
    result: "Passed",
    profitTarget: "8.2%",
    finalPnL: "+$4,100",
    completionDate: "2024-01-20",
    status: "pending"
  },
  {
    id: "2",
    user: "Maria Garcia",
    challenge: "$25K Challenge", 
    result: "Failed",
    reason: "Daily Loss Violation",
    finalPnL: "-$1,250",
    failureDate: "2024-01-19",
    status: "pending"
  }
];

export default function AdminMonitoring() {
  const [selectedTab, setSelectedTab] = useState("live");

  const getRiskBadge = (level: string) => {
    switch (level) {
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>;
      case "warning":
        return <Badge variant="destructive">Warning</Badge>;
      case "passed":
        return <Badge variant="default" className="bg-primary">Passed</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge variant="secondary">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Live Performance Monitoring</h2>
        <p className="text-muted-foreground">
          Real-time tracking of user performance, violations, and challenge results
        </p>
      </div>

      {/* Alert Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-primary" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Live Challenges</p>
                <p className="text-2xl font-bold">128</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Active Violations</p>
                <p className="text-2xl font-bold">7</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-yellow-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Pending Reviews</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Success Rate</p>
                <p className="text-2xl font-bold">34.2%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="live">Live Performance</TabsTrigger>
          <TabsTrigger value="violations">Violations</TabsTrigger>
          <TabsTrigger value="reviews">Pending Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Live Challenge Performance</CardTitle>
              <CardDescription>
                Real-time monitoring of active challenge participants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Challenge</TableHead>
                    <TableHead>Current P&L</TableHead>
                    <TableHead>Daily P&L</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Open Picks</TableHead>
                    <TableHead>Win Rate</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {livePerformance.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.user}</TableCell>
                      <TableCell>{user.challenge}</TableCell>
                      <TableCell className={`font-medium ${
                        user.currentPnL.startsWith('+') ? 'text-primary' : 'text-destructive'
                      }`}>
                        {user.currentPnL}
                      </TableCell>
                      <TableCell className={`font-medium ${
                        user.dailyPnL.startsWith('+') ? 'text-primary' : 'text-destructive'
                      }`}>
                        {user.dailyPnL}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Progress value={user.totalProgress} className="w-16 h-2" />
                            <span className="text-sm">{user.totalProgress}%</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Day {user.dayProgress}/30</p>
                        </div>
                      </TableCell>
                      <TableCell>{getRiskBadge(user.riskLevel)}</TableCell>
                      <TableCell>{user.openPicks}</TableCell>
                      <TableCell>{user.winRate}%</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="violations" className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Active Violations Detected</AlertTitle>
            <AlertDescription>
              {violations.filter(v => v.status === 'active').length} violations require immediate attention. 
              Review and take appropriate action to maintain platform integrity.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Rule Violations</CardTitle>
              <CardDescription>
                Recent violations of challenge rules and trading parameters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Challenge</TableHead>
                    <TableHead>Violation</TableHead>
                    <TableHead>Amount/Value</TableHead>
                    <TableHead>Limit</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {violations.map((violation) => (
                    <TableRow key={violation.id}>
                      <TableCell className="font-medium">{violation.user}</TableCell>
                      <TableCell>{violation.challenge}</TableCell>
                      <TableCell>{violation.violation}</TableCell>
                      <TableCell className="font-medium text-destructive">{violation.amount}</TableCell>
                      <TableCell>{violation.limit}</TableCell>
                      <TableCell>{violation.time}</TableCell>
                      <TableCell>{getSeverityBadge(violation.severity)}</TableCell>
                      <TableCell>
                        <Badge variant={
                          violation.status === 'active' ? 'destructive' :
                          violation.status === 'reviewed' ? 'secondary' : 'default'
                        }>
                          {violation.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Challenge Reviews</CardTitle>
              <CardDescription>
                Challenge results awaiting admin approval for funded account promotion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Challenge</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Profit Target / Reason</TableHead>
                    <TableHead>Final P&L</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingReviews.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell className="font-medium">{review.user}</TableCell>
                      <TableCell>{review.challenge}</TableCell>
                      <TableCell>
                        <Badge variant={review.result === 'Passed' ? 'default' : 'destructive'}>
                          {review.result}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {review.result === 'Passed' ? review.profitTarget : review.reason}
                      </TableCell>
                      <TableCell className={`font-medium ${
                        review.finalPnL.startsWith('+') ? 'text-primary' : 'text-destructive'
                      }`}>
                        {review.finalPnL}
                      </TableCell>
                      <TableCell>
                        {review.result === 'Passed' ? review.completionDate : review.failureDate}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">Pending</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="text-primary">
                            Approve
                          </Button>
                          <Button variant="outline" size="sm" className="text-destructive">
                            Deny
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}