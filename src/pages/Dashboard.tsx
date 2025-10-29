import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Users, Calendar, Target, Award, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { profile } = useAuth();

  const getRoleDashboard = () => {
    switch (profile?.role) {
      case 'admin':
      case 'tournament_director':
        return <TournamentDirectorDashboard />;
      case 'team_captain':
        return <TeamCaptainDashboard />;
      case 'coach':
      case 'program_manager':
        return <CoachDashboard />;
      default:
        return <PlayerDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Y-Ultimate</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, <span className="font-medium text-foreground">{profile?.name}</span>
            </span>
            <Link to="/profile">
              <Button variant="outline" size="sm">Profile</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {getRoleDashboard()}
      </main>
    </div>
  );
};

const TournamentDirectorDashboard = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-3xl font-bold mb-2">Tournament Director Dashboard</h2>
      <p className="text-muted-foreground">Manage tournaments, teams, and live scoring</p>
    </div>

    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="gradient-primary text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-white/80">Active Tournaments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">3</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Registered Teams</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">48</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Matches Today</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">24</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">5</div>
        </CardContent>
      </Card>
    </div>

    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Tournament Management
          </CardTitle>
          <CardDescription>Create and manage tournaments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Link to="/tournaments">
            <Button className="w-full" variant="default">View All Tournaments</Button>
          </Link>
          <Link to="/tournaments/new">
            <Button className="w-full" variant="outline">Create New Tournament</Button>
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Live Scoring
          </CardTitle>
          <CardDescription>Update scores in real-time</CardDescription>
        </CardHeader>
        <CardContent>
          <Link to="/scoring">
            <Button className="w-full gradient-accent text-white">Go to Live Scoring</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  </div>
);

const TeamCaptainDashboard = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-3xl font-bold mb-2">Team Captain Dashboard</h2>
      <p className="text-muted-foreground">Manage your team and view schedules</p>
    </div>

    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Upcoming Matches</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">5</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Team Rank</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">#12</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Spirit Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">16/20</div>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2 md:grid-cols-2">
        <Link to="/tournaments">
          <Button className="w-full" variant="default">View Schedule</Button>
        </Link>
        <Link to="/teams">
          <Button className="w-full" variant="outline">Manage Team</Button>
        </Link>
      </CardContent>
    </Card>
  </div>
);

const CoachDashboard = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-3xl font-bold mb-2">Coach Dashboard</h2>
      <p className="text-muted-foreground">Track attendance and child progress</p>
    </div>

    <div className="grid gap-4 md:grid-cols-4">
      <Card className="gradient-secondary text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-white/80">Active Children</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">156</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Sessions This Week</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">8</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">87%</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Pending Assessments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">12</div>
        </CardContent>
      </Card>
    </div>

    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Attendance
          </CardTitle>
          <CardDescription>Mark attendance for today's sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <Link to="/attendance">
            <Button className="w-full">Mark Attendance</Button>
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Child Profiles
          </CardTitle>
          <CardDescription>View and manage child profiles</CardDescription>
        </CardHeader>
        <CardContent>
          <Link to="/children">
            <Button className="w-full" variant="outline">View Children</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  </div>
);

const PlayerDashboard = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-3xl font-bold mb-2">Player Dashboard</h2>
      <p className="text-muted-foreground">View tournaments and leaderboards</p>
    </div>

    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Active Tournaments
          </CardTitle>
          <CardDescription>Browse and view tournament details</CardDescription>
        </CardHeader>
        <CardContent>
          <Link to="/tournaments">
            <Button className="w-full">View Tournaments</Button>
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Leaderboards
          </CardTitle>
          <CardDescription>Check real-time standings</CardDescription>
        </CardHeader>
        <CardContent>
          <Link to="/leaderboards">
            <Button className="w-full" variant="outline">View Leaderboards</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default Dashboard;
