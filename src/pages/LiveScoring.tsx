import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { useMatches, useUpdateMatchScore } from '@/hooks/useMatches';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Plus, Minus, Play, Pause, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const LiveScoring = () => {
  const { id: matchId } = useParams<{ id: string }>();
  const { data: matches = [], isLoading } = useMatches();
  const updateScore = useUpdateMatchScore();
  
  const match = matches.find((m: any) => m.id === matchId);
  const [teamAScore, setTeamAScore] = useState(match?.team_a_score || 0);
  const [teamBScore, setTeamBScore] = useState(match?.team_b_score || 0);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!match) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Match not found</p>
        </div>
      </Layout>
    );
  }

  const handleScoreUpdate = async (newStatus?: any) => {
    await updateScore.mutateAsync({
      id: match.id,
      team_a_score: teamAScore,
      team_b_score: teamBScore,
      ...(newStatus && { status: newStatus }),
    });
  };

  const incrementScore = (team: 'a' | 'b') => {
    if (team === 'a') {
      setTeamAScore(teamAScore + 1);
    } else {
      setTeamBScore(teamBScore + 1);
    }
  };

  const decrementScore = (team: 'a' | 'b') => {
    if (team === 'a' && teamAScore > 0) {
      setTeamAScore(teamAScore - 1);
    } else if (team === 'b' && teamBScore > 0) {
      setTeamBScore(teamBScore - 1);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      upcoming: 'bg-muted',
      live: 'bg-accent',
      completed: 'bg-primary',
    };
    return colors[status] || 'bg-muted';
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Match Info */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Live Scoring</CardTitle>
                <CardDescription>
                  Field {match.field} • {new Date(match.scheduled_time).toLocaleString()}
                </CardDescription>
              </div>
              <Badge className={`${getStatusColor(match.status)} text-white`}>
                {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Scoring Interface */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Team A */}
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-primary"></div>
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">{match.team_a.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-8xl font-bold mb-4">{teamAScore}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => decrementScore('a')}
                  disabled={teamAScore === 0}
                  className="h-20 text-xl"
                >
                  <Minus className="h-8 w-8" />
                </Button>
                <Button
                  size="lg"
                  onClick={() => incrementScore('a')}
                  className="h-20 text-xl gradient-primary text-white"
                >
                  <Plus className="h-8 w-8" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Team B */}
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-secondary"></div>
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">{match.team_b.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-8xl font-bold mb-4">{teamBScore}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => decrementScore('b')}
                  disabled={teamBScore === 0}
                  className="h-20 text-xl"
                >
                  <Minus className="h-8 w-8" />
                </Button>
                <Button
                  size="lg"
                  onClick={() => incrementScore('b')}
                  className="h-20 text-xl gradient-secondary text-white"
                >
                  <Plus className="h-8 w-8" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Match Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Match Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              className="w-full h-16 text-lg"
              onClick={() => handleScoreUpdate()}
              disabled={updateScore.isPending}
            >
              {updateScore.isPending ? 'Saving...' : 'Save Score'}
            </Button>

            <div className="grid grid-cols-3 gap-3">
              {match.status === 'upcoming' && (
                <Button
                  variant="outline"
                  className="h-12"
                  onClick={() => handleScoreUpdate('live')}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Match
                </Button>
              )}
              
              {match.status === 'live' && (
                <>
                  <Button
                    variant="outline"
                    className="h-12"
                    onClick={() => handleScoreUpdate('upcoming')}
                  >
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </Button>
                  <Button
                    className="h-12 col-span-2 gradient-accent text-white"
                    onClick={() => handleScoreUpdate('completed')}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Final Score
                  </Button>
                </>
              )}
            </div>

            <div className="text-center text-sm text-muted-foreground pt-2">
              Scores auto-broadcast to all viewers in real-time
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default LiveScoring;
