import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Calendar, MapPin, Users, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Tournaments = () => {
  // TODO: Fetch real tournaments from database
  const mockTournaments = [
    {
      id: '1',
      name: 'Summer Championship 2024',
      location: 'Bangalore Sports Complex',
      startDate: '2024-06-15',
      endDate: '2024-06-17',
      status: 'registration_open',
      teamCount: 12,
      maxTeams: 16,
    },
    {
      id: '2',
      name: 'Delhi Ultimate Open',
      location: 'Delhi University Grounds',
      startDate: '2024-07-20',
      endDate: '2024-07-22',
      status: 'in_progress',
      teamCount: 16,
      maxTeams: 16,
    },
  ];

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
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Y-Ultimate</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2">Tournaments</h2>
          <p className="text-muted-foreground">Browse and register for upcoming tournaments</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockTournaments.map((tournament) => (
            <Card key={tournament.id} className="hover:shadow-lg transition-shadow">
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
                      {new Date(tournament.startDate).toLocaleDateString()} - 
                      {new Date(tournament.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{tournament.teamCount}/{tournament.maxTeams} teams</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {mockTournaments.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground mb-4">No tournaments available yet</p>
              <Link to="/auth">
                <Button>Create Your First Tournament</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Tournaments;
