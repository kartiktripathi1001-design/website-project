import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Slider } from "@/components/ui/slider";
import {
  Plus,
  Edit,
  Target,
  TrendingDown,
  Clock,
  DollarSign
} from "lucide-react";

const challengeTypes = [
  {
    id: "1",
    name: "$25K Challenge",
    fee: 249,
    profitTarget: 8,
    maxDailyLoss: 5,
    maxTotalDrawdown: 10,
    minOdds: 1.5,
    maxOdds: 3.0,
    duration: 30,
    active: true,
    totalUsers: 1250
  },
  {
    id: "2", 
    name: "$50K Challenge",
    fee: 399,
    profitTarget: 8,
    maxDailyLoss: 5,
    maxTotalDrawdown: 10,
    minOdds: 1.5,
    maxOdds: 3.0,
    duration: 30,
    active: true,
    totalUsers: 850
  },
  {
    id: "3",
    name: "$100K Challenge",
    fee: 699,
    profitTarget: 8,
    maxDailyLoss: 5,
    maxTotalDrawdown: 10,
    minOdds: 1.5,
    maxOdds: 3.0,
    duration: 30,
    active: true,
    totalUsers: 340
  },
  {
    id: "4",
    name: "$200K Challenge",
    fee: 1249,
    profitTarget: 8,
    maxDailyLoss: 5,
    maxTotalDrawdown: 10,
    minOdds: 1.5,
    maxOdds: 3.0,
    duration: 30,
    active: false,
    totalUsers: 125
  }
];

const activeChallenges = [
  {
    id: "1",
    user: "John Smith",
    challenge: "$50K Challenge",
    startDate: "2024-01-15",
    progress: 65,
    currentPnL: "$2,450",
    status: "active",
    daysLeft: 18
  },
  {
    id: "2",
    user: "Sarah Wilson", 
    challenge: "$25K Challenge",
    startDate: "2024-02-01",
    progress: 85,
    currentPnL: "$1,890",
    status: "active",
    daysLeft: 12
  },
  {
    id: "3",
    user: "Mike Johnson",
    challenge: "$100K Challenge", 
    startDate: "2024-01-20",
    progress: 45,
    currentPnL: "$3,250",
    status: "active",
    daysLeft: 8
  }
];

export default function AdminChallenges() {
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    fee: 0,
    profitTarget: [8],
    maxDailyLoss: [5],
    maxTotalDrawdown: [10],
    minOdds: [1.5],
    maxOdds: [3.0],
    duration: 30
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>;
      case "completed":
        return <Badge variant="default" className="bg-primary">Completed</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Challenge Management</h2>
          <p className="text-muted-foreground">
            Configure challenge parameters and monitor active challenges
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Challenge
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Challenge</DialogTitle>
              <DialogDescription>
                Configure a new challenge type with specific parameters.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 items-center gap-4">
                <div>
                  <Label htmlFor="challenge-name">Challenge Name</Label>
                  <Input 
                    id="challenge-name" 
                    placeholder="e.g., $25K Challenge"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="challenge-fee">Challenge Fee ($)</Label>
                  <Input 
                    id="challenge-fee" 
                    type="number"
                    placeholder="249"
                    value={formData.fee}
                    onChange={(e) => setFormData({...formData, fee: Number(e.target.value)})}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Profit Target (%): {formData.profitTarget[0]}%</Label>
                  <Slider
                    value={formData.profitTarget}
                    onValueChange={(value) => setFormData({...formData, profitTarget: value})}
                    min={5}
                    max={15}
                    step={0.5}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Max Daily Loss (%): {formData.maxDailyLoss[0]}%</Label>
                  <Slider
                    value={formData.maxDailyLoss}
                    onValueChange={(value) => setFormData({...formData, maxDailyLoss: value})}
                    min={3}
                    max={10}
                    step={0.5}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Max Total Drawdown (%): {formData.maxTotalDrawdown[0]}%</Label>
                  <Slider
                    value={formData.maxTotalDrawdown}
                    onValueChange={(value) => setFormData({...formData, maxTotalDrawdown: value})}
                    min={5}
                    max={20}
                    step={0.5}
                    className="mt-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Min Odds: {formData.minOdds[0]}</Label>
                    <Slider
                      value={formData.minOdds}
                      onValueChange={(value) => setFormData({...formData, minOdds: value})}
                      min={1.1}
                      max={2.0}
                      step={0.1}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Max Odds: {formData.maxOdds[0]}</Label>
                    <Slider
                      value={formData.maxOdds}
                      onValueChange={(value) => setFormData({...formData, maxOdds: value})}
                      min={2.0}
                      max={5.0}
                      step={0.1}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="duration">Duration (days)</Label>
                  <Input 
                    id="duration" 
                    type="number"
                    placeholder="30"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: Number(e.target.value)})}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Create Challenge</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="types" className="space-y-4">
        <TabsList>
          <TabsTrigger value="types">Challenge Types</TabsTrigger>
          <TabsTrigger value="active">Active Challenges</TabsTrigger>
        </TabsList>

        <TabsContent value="types" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {challengeTypes.map((challenge) => (
              <Card key={challenge.id} className={`relative ${!challenge.active ? 'opacity-50' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{challenge.name}</CardTitle>
                    <Badge variant={challenge.active ? "default" : "secondary"}>
                      {challenge.active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <CardDescription>${challenge.fee} entry fee</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <Target className="h-3 w-3 text-primary" />
                        Profit Target
                      </span>
                      <span className="font-medium">{challenge.profitTarget}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <TrendingDown className="h-3 w-3 text-destructive" />
                        Daily Loss
                      </span>
                      <span className="font-medium">{challenge.maxDailyLoss}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <TrendingDown className="h-3 w-3 text-destructive" />
                        Total Drawdown
                      </span>
                      <span className="font-medium">{challenge.maxTotalDrawdown}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        Duration
                      </span>
                      <span className="font-medium">{challenge.duration} days</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total Users</span>
                      <span className="font-medium">{challenge.totalUsers}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit Challenge
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Challenges ({activeChallenges.length})</CardTitle>
              <CardDescription>
                Currently running challenge attempts by users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Challenge</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Current P&L</TableHead>
                    <TableHead>Days Left</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeChallenges.map((challenge) => (
                    <TableRow key={challenge.id}>
                      <TableCell className="font-medium">{challenge.user}</TableCell>
                      <TableCell>{challenge.challenge}</TableCell>
                      <TableCell>{challenge.startDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all" 
                              style={{width: `${challenge.progress}%`}}
                            />
                          </div>
                          <span className="text-sm">{challenge.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell className={`font-medium ${
                        challenge.currentPnL.startsWith('+') || !challenge.currentPnL.startsWith('-') 
                          ? 'text-primary' : 'text-destructive'
                      }`}>
                        {challenge.currentPnL}
                      </TableCell>
                      <TableCell>{challenge.daysLeft} days</TableCell>
                      <TableCell>{getStatusBadge(challenge.status)}</TableCell>
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