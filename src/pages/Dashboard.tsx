import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { TickerBanner } from '@/components/TickerBanner';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, DollarSign, Activity, Award, BarChart3 } from 'lucide-react';

interface Enrollment {
  id: string;
  status: string;
  current_phase: number;
  total_paid: number;
  current_profit: number;
  total_trades: number;
  winning_trades: number;
  enrolled_at: string;
  challenge: {
    name: string;
    balance: number;
    type: string;
    steps: number;
    phase1_target: number;
    phase2_target: number;
    phase3_target: number;
    reward_split: number;
  };
}

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();
      setProfile(profileData);

      // Fetch enrollments with challenge details
      const { data: enrollmentData, error } = await supabase
        .from('challenge_enrollments')
        .select(`
          *,
          challenge:challenges(*)
        `)
        .eq('user_id', user?.id)
        .order('enrolled_at', { ascending: false });

      if (error) throw error;
      setEnrollments(enrollmentData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background">
        <TickerBanner />
        <Header />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  const activeEnrollments = enrollments.filter(e => e.status === 'active');
  const completedEnrollments = enrollments.filter(e => e.status === 'passed');

  return (
    <div className="min-h-screen bg-background">
      <TickerBanner />
      <Header />
      
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome back, {profile?.first_name || 'Trader'}!
          </h1>
          <p className="text-muted-foreground">Track your challenges and trading progress</p>
        </div>

        {enrollments.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Target className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Active Challenges</h3>
              <p className="text-muted-foreground mb-6">
                Start your trading journey by enrolling in a challenge
              </p>
              <Button asChild>
                <Link to="/challenges">Browse Challenges</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="active" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="active">
                Active ({activeEnrollments.length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed ({completedEnrollments.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-6">
              {activeEnrollments.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">No active challenges</p>
                  </CardContent>
                </Card>
              ) : (
                activeEnrollments.map((enrollment) => (
                  <EnrollmentCard key={enrollment.id} enrollment={enrollment} />
                ))
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-6">
              {completedEnrollments.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">No completed challenges yet</p>
                  </CardContent>
                </Card>
              ) : (
                completedEnrollments.map((enrollment) => (
                  <EnrollmentCard key={enrollment.id} enrollment={enrollment} />
                ))
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}

function EnrollmentCard({ enrollment }: { enrollment: Enrollment }) {
  const challenge = enrollment.challenge;
  const phaseTarget =
    enrollment.current_phase === 1
      ? challenge.phase1_target
      : enrollment.current_phase === 2
      ? challenge.phase2_target
      : challenge.phase3_target || 0;

  const progress = (enrollment.current_profit / phaseTarget) * 100;
  const winRate =
    enrollment.total_trades > 0
      ? ((enrollment.winning_trades / enrollment.total_trades) * 100).toFixed(1)
      : 0;

  const statusColors = {
    active: 'bg-green-500',
    pending: 'bg-yellow-500',
    passed: 'bg-blue-500',
    failed: 'bg-red-500',
    cancelled: 'bg-gray-500',
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl md:text-2xl">{challenge.name}</CardTitle>
            <CardDescription>
              Phase {enrollment.current_phase} of {challenge.steps}
            </CardDescription>
          </div>
          <Badge className={statusColors[enrollment.status as keyof typeof statusColors]}>
            {enrollment.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Balance</p>
              <p className="text-lg font-semibold">${challenge.balance.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-xs text-muted-foreground">Profit</p>
              <p className="text-lg font-semibold">${enrollment.current_profit}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Target</p>
              <p className="text-lg font-semibold">${phaseTarget}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Win Rate</p>
              <p className="text-lg font-semibold">{winRate}%</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress to Target</span>
            <span className="font-medium">{Math.min(progress, 100).toFixed(1)}%</span>
          </div>
          <Progress value={Math.min(progress, 100)} className="h-3" />
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {enrollment.total_trades} trades ({enrollment.winning_trades}W / {enrollment.total_trades - enrollment.winning_trades}L)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{challenge.reward_split}% profit split</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
