import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DollarSign,
  CreditCard,
  Banknote,
  TrendingUp,
  Search,
  Download,
  CheckCircle,
  X,
  Clock,
  AlertTriangle
} from "lucide-react";

const paymentStats = [
  {
    title: "Total Revenue",
    value: "$2,847,329",
    change: "+23.1%",
    icon: DollarSign,
  },
  {
    title: "Challenge Fees",
    value: "$1,456,780",
    change: "+18.5%",
    icon: CreditCard,
  },
  {
    title: "Pending Withdrawals",
    value: "$245,600",
    change: "+12.3%",
    icon: Clock,
  },
  {
    title: "Profit Splits Paid",
    value: "$892,450",
    change: "+28.7%",
    icon: TrendingUp,
  },
];

const challengeFees = [
  {
    id: "1",
    user: "John Smith",
    challenge: "$50K Challenge",
    amount: "$399",
    method: "Credit Card",
    date: "2024-01-20",
    status: "completed",
    transactionId: "TXN_001234"
  },
  {
    id: "2",
    user: "Sarah Wilson",
    challenge: "$25K Challenge", 
    amount: "$249",
    method: "PayPal",
    date: "2024-01-19",
    status: "completed",
    transactionId: "TXN_001235"
  },
  {
    id: "3",
    user: "Mike Johnson",
    challenge: "$100K Challenge",
    amount: "$699",
    method: "Bank Transfer",
    date: "2024-01-18",
    status: "pending",
    transactionId: "TXN_001236"
  }
];

const withdrawals = [
  {
    id: "1",
    user: "Emma Davis",
    amount: "$15,000",
    method: "Bank Transfer",
    requestDate: "2024-01-18",
    status: "pending",
    reason: "Profit withdrawal from funded account",
    accountDetails: "****1234"
  },
  {
    id: "2",
    user: "David Brown",
    amount: "$8,500",
    method: "PayPal",
    requestDate: "2024-01-17",
    status: "approved",
    reason: "Monthly profit split",
    accountDetails: "david@example.com"
  },
  {
    id: "3",
    user: "Lisa Johnson",
    amount: "$25,000",
    method: "Wire Transfer",
    requestDate: "2024-01-16",
    status: "processing",
    reason: "Quarterly profit withdrawal",
    accountDetails: "****5678"
  }
];

const profitSplits = [
  {
    id: "1",
    user: "Alex Thompson",
    tradingAccount: "$50K Funded",
    profit: "$4,200",
    traderShare: "$3,360",
    platformShare: "$840",
    splitRatio: "80/20",
    paymentDate: "2024-01-15",
    status: "paid"
  },
  {
    id: "2",
    user: "Maria Garcia",
    tradingAccount: "$100K Funded",
    profit: "$8,750",
    traderShare: "$7,000",
    platformShare: "$1,750",
    splitRatio: "80/20",
    paymentDate: "2024-01-14",
    status: "paid"
  }
];

export default function AdminPayments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
      case "paid":
        return <Badge variant="default" className="bg-primary">Completed</Badge>;
      case "approved":
        return <Badge variant="default">Approved</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "processing":
        return <Badge variant="outline">Processing</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Payment Management</h2>
          <p className="text-muted-foreground">
            Track payments, manage withdrawals, and monitor financial transactions
          </p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Payment Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {paymentStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-primary">
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="fees" className="space-y-4">
        <TabsList>
          <TabsTrigger value="fees">Challenge Fees</TabsTrigger>
          <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
          <TabsTrigger value="splits">Profit Splits</TabsTrigger>
        </TabsList>

        <TabsContent value="fees" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Challenge Fee Payments</CardTitle>
              <CardDescription>
                Track challenge fee payments from users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search payments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Challenge</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {challengeFees.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.user}</TableCell>
                      <TableCell>{payment.challenge}</TableCell>
                      <TableCell className="font-medium">{payment.amount}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      <TableCell className="font-mono text-sm">{payment.transactionId}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="withdrawals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Withdrawal Requests</CardTitle>
              <CardDescription>
                Manage user withdrawal requests and approvals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Account</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {withdrawals.map((withdrawal) => (
                    <TableRow key={withdrawal.id}>
                      <TableCell className="font-medium">{withdrawal.user}</TableCell>
                      <TableCell className="font-medium">{withdrawal.amount}</TableCell>
                      <TableCell>{withdrawal.method}</TableCell>
                      <TableCell>{withdrawal.requestDate}</TableCell>
                      <TableCell>{withdrawal.reason}</TableCell>
                      <TableCell className="font-mono text-sm">{withdrawal.accountDetails}</TableCell>
                      <TableCell>{getStatusBadge(withdrawal.status)}</TableCell>
                      <TableCell className="text-right">
                        {withdrawal.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="text-primary">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                            <Button variant="outline" size="sm" className="text-destructive">
                              <X className="h-3 w-3 mr-1" />
                              Deny
                            </Button>
                          </div>
                        )}
                        {withdrawal.status !== 'pending' && (
                          <Button variant="outline" size="sm">View Details</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="splits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profit Split Payments</CardTitle>
              <CardDescription>
                Track profit sharing payments to funded traders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Trading Account</TableHead>
                    <TableHead>Total Profit</TableHead>
                    <TableHead>Trader Share</TableHead>
                    <TableHead>Platform Share</TableHead>
                    <TableHead>Split Ratio</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {profitSplits.map((split) => (
                    <TableRow key={split.id}>
                      <TableCell className="font-medium">{split.user}</TableCell>
                      <TableCell>{split.tradingAccount}</TableCell>
                      <TableCell className="font-medium text-primary">{split.profit}</TableCell>
                      <TableCell className="font-medium">{split.traderShare}</TableCell>
                      <TableCell className="font-medium">{split.platformShare}</TableCell>
                      <TableCell>{split.splitRatio}</TableCell>
                      <TableCell>{split.paymentDate}</TableCell>
                      <TableCell>{getStatusBadge(split.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">View Details</Button>
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