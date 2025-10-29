import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { useTournament, useUpdateTournament } from '@/hooks/useTournaments';
import { useTeams } from '@/hooks/useTeams';
import { useMatches } from '@/hooks/useMatches';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Calendar, MapPin, Users, Trophy, ArrowLeft, Plus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const TournamentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { profile } = useAuth();
  const { data: tournament, isLoading } = useTournament(id!);
  const { data: teams = [] } = useTeams(id);
  const { data: matches = [] } = useMatches(id);
  const updateTournament = useUpdateTournament();

  const isDirector = profile?.role === 'tournament_director' || profile?.role === 'admin';

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      draft: 'bg-muted',
      registration_open: 'bg-secondary',
      in_progress: 'bg-accent',
      completed: 'bg-primary',
    };
    return styles[status] || 'bg-muted';
  };

  const formatStatus = (status: string) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const handleStatusChange = (newStatus: string) => {
    if (tournament) {
      updateTournament.mutate({
        id: tournament.id,
        status: newStatus as any,
      });
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!tournament) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Tournament not found</p>
        </div>
      </Layout>
    );
  }

  const approvedTeams = teams.filter(t => t.status === 'approved');
  const pendingTeams = teams.filter(t => t.status === 'pending');
  const upcomingMatches = matches.filter((m: any) => m.status === 'upcoming');
  const liveMatches = matches.filter((m: any) => m.status === 'live');
  const completedMatches = matches.filter((m: any) => m.status === 'completed');

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/tournaments">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>

        {/* Tournament Header */}
        <Card className="gradient-hero text-white">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-3xl text-white">{tournament.name}</CardTitle>
                <CardDescription className="text-white/80 flex flex-col gap-2 text-base">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{tournament.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(tournament.start_date).toLocaleDateString()} - 
                      {new Date(tournament.end_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{approvedTeams.length}/{tournament.max_teams} teams</span>
                  </div>
                </CardDescription>
              </div>
              <div className="flex items-center gap-3">
                {isDirector && (
                  <Select value={tournament.status} onValueChange={handleStatusChange}>
                    <SelectTrigger className="w-[200px] bg-white text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="registration_open">Registration Open</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                )}
                <Badge className={`${getStatusBadge(tournament.status)} text-white`}>
                  {formatStatus(tournament.status)}
                </Badge>
              </div>
            </div>
          </CardHeader>
          {tournament.description && (
            <CardContent>
              <p className="text-white/90">{tournament.description}</p>
            </CardContent>
          )}
        </Card>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Registered Teams</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{approvedTeams.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pendingTeams.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Matches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{matches.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Live Matches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{liveMatches.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="teams">Teams ({teams.length})</TabsTrigger>
            <TabsTrigger value="matches">Matches ({matches.length})</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tournament Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium">{formatStatus(tournament.status)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{tournament.location}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dates</p>
                  <p className="font-medium">
                    {new Date(tournament.start_date).toLocaleDateString()} - 
                    {new Date(tournament.end_date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Team Capacity</p>
                  <p className="font-medium">{approvedTeams.length} / {tournament.max_teams}</p>
                </div>
              </CardContent>
            </Card>

            {isDirector && (
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-2 md:grid-cols-2">
                  <Link to={`/tournaments/${id}/register-team`}>
                    <Button className="w-full" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Register Team
                    </Button>
                  </Link>
                  <Link to={`/tournaments/${id}/create-match`}>
                    <Button className="w-full" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Schedule Match
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="teams" className="space-y-4">
            {isDirector && pendingTeams.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Pending Approvals ({pendingTeams.length})</CardTitle>
                  <CardDescription>Teams waiting for approval</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {pendingTeams.map((team) => (
                      <div key={team.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{team.name}</p>
                          <p className="text-sm text-muted-foreground">{team.email}</p>
                        </div>
                        <Link to={`/teams/${team.id}`}>
                          <Button size="sm">Review</Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Approved Teams ({approvedTeams.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {approvedTeams.map((team) => (
                    <Link key={team.id} to={`/teams/${team.id}`}>
                      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader>
                          <CardTitle className="text-lg">{team.name}</CardTitle>
                          <CardDescription>{team.email}</CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  ))}
                </div>
                {approvedTeams.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No approved teams yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="matches" className="space-y-4">
            {liveMatches.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Live Matches</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {liveMatches.map((match: any) => (
                      <Link key={match.id} to={`/scoring/${match.id}`}>
                        <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex-1">
                            <p className="font-medium">{match.team_a.name} vs {match.team_b.name}</p>
                            <p className="text-sm text-muted-foreground">Field {match.field}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold">{match.team_a_score} - {match.team_b_score}</p>
                            <Badge className="bg-accent text-white">Live</Badge>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>All Matches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {matches.map((match: any) => (
                    <Link key={match.id} to={`/scoring/${match.id}`}>
                      <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex-1">
                          <p className="font-medium">{match.team_a.name} vs {match.team_b.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(match.scheduled_time).toLocaleString()} • Field {match.field}
                          </p>
                        </div>
                        <div className="text-center">
                          {match.status !== 'upcoming' && (
                            <p className="text-xl font-bold">{match.team_a_score} - {match.team_b_score}</p>
                          )}
                          <Badge className={`${getStatusBadge(match.status)} text-white`}>
                            {formatStatus(match.status)}
                          </Badge>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                {matches.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No matches scheduled yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Tournament Standings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Link to={`/leaderboards/${id}`}>
                  <Button className="w-full">View Full Leaderboard</Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default TournamentDetail;
