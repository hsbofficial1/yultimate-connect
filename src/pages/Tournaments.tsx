import { Layout } from '@/components/Layout';
import { useTournaments } from '@/hooks/useTournaments';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Plus, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Tournaments = () => {
  const { profile } = useAuth();
  const { data: tournaments = [], isLoading } = useTournaments(true);

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

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-2">Tournaments</h2>
            <p className="text-muted-foreground">Browse and manage Ultimate Frisbee tournaments</p>
          </div>
          {isDirector && (
            <Link to="/tournaments/create">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Tournament
              </Button>
            </Link>
          )}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {tournaments.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {tournaments.map((tournament) => (
                  <Link key={tournament.id} to={`/tournaments/${tournament.id}`}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <CardTitle className="text-xl">{tournament.name}</CardTitle>
                          <Badge className={`${getStatusBadge(tournament.status)} text-white`}>
                            {formatStatus(tournament.status)}
                          </Badge>
                        </div>
                        <CardDescription className="space-y-2">
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
                            <span>Max {tournament.max_teams} teams</span>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full">View Details</Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <p className="text-muted-foreground mb-4">No tournaments available yet</p>
                  {isDirector && (
                    <Link to="/tournaments/create">
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Your First Tournament
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Tournaments;
