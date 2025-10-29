import { Layout } from '@/components/Layout';
import { useTeams, useUpdateTeamStatus } from '@/hooks/useTeams';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Mail, Phone, CheckCircle, XCircle, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

const TeamsList = () => {
  const { profile } = useAuth();
  const { data: teams = [] } = useTeams();
  const updateStatus = useUpdateTeamStatus();
  const [search, setSearch] = useState('');

  const isDirector = profile?.role === 'tournament_director' || profile?.role === 'admin';

  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(search.toLowerCase()) ||
    team.email.toLowerCase().includes(search.toLowerCase())
  );

  const pendingTeams = filteredTeams.filter(t => t.status === 'pending');
  const approvedTeams = filteredTeams.filter(t => t.status === 'approved');
  const rejectedTeams = filteredTeams.filter(t => t.status === 'rejected');

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-accent',
      approved: 'bg-secondary',
      rejected: 'bg-destructive',
    };
    return styles[status] || 'bg-muted';
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-4xl font-bold mb-2">Teams</h2>
          <p className="text-muted-foreground">Manage tournament team registrations</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Input
              placeholder="Search teams..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-md"
            />
          </CardContent>
        </Card>

        {isDirector && pendingTeams.length > 0 && (
          <Card className="border-accent">
            <CardHeader>
              <CardTitle className="text-accent">Pending Approvals ({pendingTeams.length})</CardTitle>
              <CardDescription>Teams awaiting review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingTeams.map((team) => (
                  <Card key={team.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{team.name}</CardTitle>
                          <CardDescription className="space-y-1 mt-2">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              <span>{team.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              <span>{team.phone}</span>
                            </div>
                          </CardDescription>
                        </div>
                        <Badge className={`${getStatusBadge(team.status)} text-white`}>
                          {team.status.charAt(0).toUpperCase() + team.status.slice(1)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="gradient-secondary text-white"
                          onClick={() => updateStatus.mutate({ id: team.id, status: 'approved' })}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => updateStatus.mutate({ id: team.id, status: 'rejected' })}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                        <Link to={`/teams/${team.id}`} className="ml-auto">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
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
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{team.name}</CardTitle>
                        <Badge className="bg-secondary text-white">Approved</Badge>
                      </div>
                      <CardDescription className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Mail className="h-3 w-3" />
                          <span className="text-xs">{team.email}</span>
                        </div>
                      </CardDescription>
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

        {isDirector && rejectedTeams.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Rejected Teams ({rejectedTeams.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {rejectedTeams.map((team) => (
                  <div key={team.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{team.name}</p>
                      <p className="text-sm text-muted-foreground">{team.email}</p>
                      {team.notes && (
                        <p className="text-sm text-destructive mt-1">Reason: {team.notes}</p>
                      )}
                    </div>
                    <Link to={`/teams/${team.id}`}>
                      <Button variant="outline" size="sm">View</Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default TeamsList;
