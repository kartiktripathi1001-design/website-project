import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Label } from "@/components/ui/label";
import {
  MessageSquare,
  Clock,
  User,
  AlertTriangle,
  CheckCircle,
  Search,
  Filter,
  Send,
  Paperclip
} from "lucide-react";

const ticketStats = [
  {
    title: "Open Tickets",
    value: "23",
    change: "+3",
    icon: MessageSquare,
    color: "text-yellow-500"
  },
  {
    title: "In Progress",
    value: "12",
    change: "+2",
    icon: Clock,
    color: "text-blue-500"
  },
  {
    title: "Resolved Today",
    value: "18",
    change: "+6",
    icon: CheckCircle,
    color: "text-primary"
  },
  {
    title: "Avg Response Time",
    value: "2.3h",
    change: "-0.5h",
    icon: Clock,
    color: "text-primary"
  },
];

const supportTickets = [
  {
    id: "T-001",
    user: "John Smith",
    email: "john@example.com",
    subject: "Challenge verification issue",
    category: "Technical",
    priority: "high",
    status: "open",
    created: "2024-01-20 14:30",
    lastUpdate: "2024-01-20 16:45",
    assignedTo: "Sarah Admin",
    messages: 3
  },
  {
    id: "T-002",
    user: "Emma Davis",
    email: "emma@example.com", 
    subject: "Withdrawal request delayed",
    category: "Financial",
    priority: "high",
    status: "in-progress",
    created: "2024-01-19 09:15",
    lastUpdate: "2024-01-20 11:20",
    assignedTo: "Mike Support",
    messages: 5
  },
  {
    id: "T-003",
    user: "David Brown",
    email: "david@example.com",
    subject: "KYC document upload problem",
    category: "Account",
    priority: "medium",
    status: "open",
    created: "2024-01-18 16:22",
    lastUpdate: "2024-01-19 08:30",
    assignedTo: "Unassigned",
    messages: 2
  },
  {
    id: "T-004",
    user: "Lisa Johnson",
    email: "lisa@example.com",
    subject: "Question about challenge rules",
    category: "General",
    priority: "low",
    status: "resolved",
    created: "2024-01-17 13:45",
    lastUpdate: "2024-01-18 10:15",
    assignedTo: "Tom Support",
    messages: 4
  }
];

const disputes = [
  {
    id: "D-001",
    user: "Alex Thompson",
    challenge: "$50K Challenge",
    dispute: "Challenge result disputed - claims rule violation was incorrect",
    amount: "$2,500",
    status: "under-review",
    created: "2024-01-18",
    priority: "high"
  },
  {
    id: "D-002",
    user: "Maria Garcia", 
    challenge: "$25K Challenge",
    dispute: "Withdrawal delay - funds not received after 5 business days",
    amount: "$1,200",
    status: "investigating",
    created: "2024-01-17",
    priority: "medium"
  }
];

export default function AdminSupport() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge variant="destructive">Open</Badge>;
      case "in-progress":
        return <Badge variant="secondary">In Progress</Badge>;
      case "resolved":
        return <Badge variant="default" className="bg-primary">Resolved</Badge>;
      case "closed":
        return <Badge variant="outline">Closed</Badge>;
      case "under-review":
        return <Badge variant="secondary">Under Review</Badge>;
      case "investigating":
        return <Badge variant="outline">Investigating</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const filteredTickets = supportTickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Support Management</h2>
          <p className="text-muted-foreground">
            Handle customer support tickets and manage disputes
          </p>
        </div>
      </div>

      {/* Support Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {ticketStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.change} from yesterday
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="tickets" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
          <TabsTrigger value="disputes">Disputes</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tickets..."
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
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tickets Table */}
          <Card>
            <CardHeader>
              <CardTitle>Support Tickets ({filteredTickets.length})</CardTitle>
              <CardDescription>
                Manage customer support requests and inquiries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Last Update</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">{ticket.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {ticket.user.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium">{ticket.user}</div>
                            <div className="text-xs text-muted-foreground">{ticket.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{ticket.subject}</div>
                          <div className="text-xs text-muted-foreground">{ticket.messages} messages</div>
                        </div>
                      </TableCell>
                      <TableCell>{ticket.category}</TableCell>
                      <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                      <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                      <TableCell>
                        <div className="text-sm">{ticket.assignedTo}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{ticket.lastUpdate}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">View</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[700px]">
                            <DialogHeader>
                              <DialogTitle>Ticket {ticket.id} - {ticket.subject}</DialogTitle>
                              <DialogDescription>
                                Support conversation with {ticket.user}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <Label>Status</Label>
                                  <Select defaultValue={ticket.status}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="open">Open</SelectItem>
                                      <SelectItem value="in-progress">In Progress</SelectItem>
                                      <SelectItem value="resolved">Resolved</SelectItem>
                                      <SelectItem value="closed">Closed</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label>Priority</Label>
                                  <Select defaultValue={ticket.priority}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="low">Low</SelectItem>
                                      <SelectItem value="medium">Medium</SelectItem>
                                      <SelectItem value="high">High</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div className="border rounded-lg p-4 max-h-60 overflow-y-auto">
                                <div className="space-y-3">
                                  <div className="flex gap-3">
                                    <Avatar className="h-6 w-6">
                                      <AvatarFallback className="text-xs">
                                        {ticket.user.split(" ").map(n => n[0]).join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <div className="text-sm font-medium">{ticket.user}</div>
                                      <div className="text-xs text-muted-foreground">{ticket.created}</div>
                                      <div className="text-sm mt-1">
                                        I'm having trouble with my challenge verification. The system shows my trade was successful but it's not reflected in my dashboard.
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <Label htmlFor="reply">Reply</Label>
                                <Textarea 
                                  id="reply"
                                  placeholder="Type your response..." 
                                  className="mt-2"
                                  rows={3}
                                />
                              </div>

                              <div className="flex justify-between">
                                <Button variant="outline">
                                  <Paperclip className="h-4 w-4 mr-2" />
                                  Attach File
                                </Button>
                                <div className="flex gap-2">
                                  <Button variant="outline">Save Draft</Button>
                                  <Button>
                                    <Send className="h-4 w-4 mr-2" />
                                    Send Reply
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disputes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Disputes</CardTitle>
              <CardDescription>
                Manage user disputes and challenge-related issues
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dispute ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Challenge</TableHead>
                    <TableHead>Issue</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {disputes.map((dispute) => (
                    <TableRow key={dispute.id}>
                      <TableCell className="font-medium">{dispute.id}</TableCell>
                      <TableCell>{dispute.user}</TableCell>
                      <TableCell>{dispute.challenge}</TableCell>
                      <TableCell className="max-w-xs">
                        <div className="truncate">{dispute.dispute}</div>
                      </TableCell>
                      <TableCell className="font-medium">{dispute.amount}</TableCell>
                      <TableCell>{getPriorityBadge(dispute.priority)}</TableCell>
                      <TableCell>{getStatusBadge(dispute.status)}</TableCell>
                      <TableCell>{dispute.created}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Review</Button>
                          <Button variant="outline" size="sm" className="text-primary">
                            Resolve
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