import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
import { Switch } from "@/components/ui/switch";
import {
  FileText,
  Plus,
  Edit,
  Eye,
  Bell,
  HelpCircle,
  Shield,
  Trash2,
  Send
} from "lucide-react";

const faqs = [
  {
    id: "1",
    question: "How do I start a trading challenge?",
    answer: "To start a trading challenge, you need to complete your account verification, choose a challenge type, pay the entry fee, and begin trading according to the challenge rules.",
    category: "Getting Started",
    status: "published",
    lastUpdated: "2024-01-15"
  },
  {
    id: "2",
    question: "What happens if I violate a trading rule?",
    answer: "Rule violations will result in immediate challenge failure. Common violations include exceeding daily loss limits, trading outside allowed hours, or using prohibited instruments.",
    category: "Trading Rules",
    status: "published",
    lastUpdated: "2024-01-12"
  },
  {
    id: "3",
    question: "How long does KYC verification take?",
    answer: "KYC verification typically takes 1-3 business days. Make sure to submit clear photos of your documents and ensure all information matches exactly.",
    category: "Account",
    status: "draft",
    lastUpdated: "2024-01-10"
  }
];

const announcements = [
  {
    id: "1",
    title: "New Challenge Types Available",
    content: "We've added $200K and $500K challenge options with enhanced features and better profit splits.",
    type: "feature",
    status: "active",
    startDate: "2024-01-20",
    endDate: "2024-02-20",
    targetAudience: "all"
  },
  {
    id: "2", 
    title: "Scheduled Maintenance Window",
    content: "Platform will be unavailable on Sunday, January 28th from 2:00 AM to 6:00 AM EST for system upgrades.",
    type: "maintenance",
    status: "scheduled",
    startDate: "2024-01-28",
    endDate: "2024-01-28",
    targetAudience: "all"
  }
];

const termsConditions = [
  {
    id: "1",
    title: "Terms of Service",
    version: "2.1",
    status: "active",
    lastUpdated: "2024-01-01",
    description: "General terms and conditions for platform usage"
  },
  {
    id: "2",
    title: "Privacy Policy", 
    version: "1.3",
    status: "active",
    lastUpdated: "2023-12-15",
    description: "How we collect, use, and protect user data"
  },
  {
    id: "3",
    title: "Trading Rules & Regulations",
    version: "3.0",
    status: "active", 
    lastUpdated: "2024-01-15",
    description: "Comprehensive trading rules for all challenge types"
  }
];

export default function AdminContent() {
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    type: "info",
    audience: "all"
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
      case "active":
        return <Badge variant="default" className="bg-primary">Published</Badge>;
      case "draft":
        return <Badge variant="secondary">Draft</Badge>;
      case "scheduled":
        return <Badge variant="outline">Scheduled</Badge>;
      case "archived":
        return <Badge variant="secondary">Archived</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "feature":
        return <Badge variant="default">Feature</Badge>;
      case "maintenance":
        return <Badge variant="destructive">Maintenance</Badge>;
      case "info":
        return <Badge variant="secondary">Info</Badge>;
      case "warning":
        return <Badge variant="destructive">Warning</Badge>;
      default:
        return <Badge variant="outline">General</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Content Management</h2>
          <p className="text-muted-foreground">
            Manage FAQs, announcements, terms & conditions, and notifications
          </p>
        </div>
      </div>

      <Tabs defaultValue="faqs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="faqs" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>
                    Manage help articles and common user questions
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add FAQ
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Add New FAQ</DialogTitle>
                      <DialogDescription>
                        Create a new frequently asked question and answer.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="faq-question">Question</Label>
                        <Input id="faq-question" placeholder="Enter the question..." />
                      </div>
                      <div>
                        <Label htmlFor="faq-category">Category</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="getting-started">Getting Started</SelectItem>
                            <SelectItem value="trading-rules">Trading Rules</SelectItem>
                            <SelectItem value="account">Account</SelectItem>
                            <SelectItem value="payments">Payments</SelectItem>
                            <SelectItem value="technical">Technical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="faq-answer">Answer</Label>
                        <Textarea 
                          id="faq-answer" 
                          placeholder="Enter the detailed answer..."
                          rows={6}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="publish-now" />
                        <Label htmlFor="publish-now">Publish immediately</Label>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Save as Draft</Button>
                      <Button>Publish FAQ</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Question</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {faqs.map((faq) => (
                    <TableRow key={faq.id}>
                      <TableCell className="font-medium max-w-md">
                        <div className="truncate">{faq.question}</div>
                      </TableCell>
                      <TableCell>{faq.category}</TableCell>
                      <TableCell>{getStatusBadge(faq.status)}</TableCell>
                      <TableCell>{faq.lastUpdated}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            Preview
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
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

        <TabsContent value="announcements" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Platform Announcements</CardTitle>
                  <CardDescription>
                    Manage platform-wide announcements and updates
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Announcement
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Create Announcement</DialogTitle>
                      <DialogDescription>
                        Create a new platform announcement or update.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="announcement-title">Title</Label>
                        <Input id="announcement-title" placeholder="Announcement title..." />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="announcement-type">Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="feature">Feature Update</SelectItem>
                              <SelectItem value="maintenance">Maintenance</SelectItem>
                              <SelectItem value="info">Information</SelectItem>
                              <SelectItem value="warning">Warning</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="target-audience">Target Audience</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select audience" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Users</SelectItem>
                              <SelectItem value="active-challenges">Active Challenges</SelectItem>
                              <SelectItem value="funded-traders">Funded Traders</SelectItem>
                              <SelectItem value="new-users">New Users</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="start-date">Start Date</Label>
                          <Input id="start-date" type="datetime-local" />
                        </div>
                        <div>
                          <Label htmlFor="end-date">End Date (Optional)</Label>
                          <Input id="end-date" type="datetime-local" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="announcement-content">Content</Label>
                        <Textarea 
                          id="announcement-content" 
                          placeholder="Enter announcement content..."
                          rows={6}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Save Draft</Button>
                      <Button>Publish Now</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Audience</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {announcements.map((announcement) => (
                    <TableRow key={announcement.id}>
                      <TableCell className="font-medium">{announcement.title}</TableCell>
                      <TableCell>{getTypeBadge(announcement.type)}</TableCell>
                      <TableCell>{getStatusBadge(announcement.status)}</TableCell>
                      <TableCell className="capitalize">{announcement.targetAudience.replace('-', ' ')}</TableCell>
                      <TableCell>{announcement.startDate}</TableCell>
                      <TableCell>{announcement.endDate}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-destructive">
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
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

        <TabsContent value="terms" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Terms & Conditions</CardTitle>
                  <CardDescription>
                    Manage legal documents and platform policies
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Document
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {termsConditions.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.title}</TableCell>
                      <TableCell>v{doc.version}</TableCell>
                      <TableCell>{getStatusBadge(doc.status)}</TableCell>
                      <TableCell>{doc.lastUpdated}</TableCell>
                      <TableCell className="max-w-xs">
                        <div className="truncate">{doc.description}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
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

        <TabsContent value="notifications" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Send Notification</CardTitle>
                <CardDescription>
                  Send immediate notifications to users
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="notification-title">Title</Label>
                  <Input 
                    id="notification-title" 
                    placeholder="Notification title..."
                    value={newNotification.title}
                    onChange={(e) => setNewNotification({...newNotification, title: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="notification-message">Message</Label>
                  <Textarea 
                    id="notification-message" 
                    placeholder="Notification message..."
                    rows={4}
                    value={newNotification.message}
                    onChange={(e) => setNewNotification({...newNotification, message: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="notification-type">Type</Label>
                    <Select 
                      value={newNotification.type}
                      onValueChange={(value) => setNewNotification({...newNotification, type: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="success">Success</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="notification-audience">Audience</Label>
                    <Select 
                      value={newNotification.audience}
                      onValueChange={(value) => setNewNotification({...newNotification, audience: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="active">Active Users</SelectItem>
                        <SelectItem value="funded">Funded Traders</SelectItem>
                        <SelectItem value="new">New Users</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Send className="h-4 w-4 mr-2" />
                    Send Now
                  </Button>
                  <Button variant="outline">
                    Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
                <CardDescription>
                  Recently sent notifications and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Bell className="h-4 w-4 text-primary" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">New Challenge Types Available</div>
                      <div className="text-xs text-muted-foreground">Sent to all users • 2 hours ago</div>
                    </div>
                    <Badge variant="default" className="bg-primary">Delivered</Badge>
                  </div>

                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Bell className="h-4 w-4 text-yellow-500" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">Scheduled Maintenance Window</div>
                      <div className="text-xs text-muted-foreground">Sent to all users • 1 day ago</div>
                    </div>
                    <Badge variant="secondary">Delivered</Badge>
                  </div>

                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">Payment Processing Update</div>
                      <div className="text-xs text-muted-foreground">Sent to funded traders • 3 days ago</div>
                    </div>
                    <Badge variant="outline">Delivered</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}