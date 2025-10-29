import { useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { useMatches } from '@/hooks/useMatches';
import { useTeams } from '@/hooks/useTeams';
import { useSpiritScores } from '@/hooks/useSpiritScores';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Trophy, Award, TrendingUp, Loader2 } from 'lucide-react';

const Leaderboard = () => {
  const { id: tournamentId } = useParams<{ id: string }>();
  const { data: matches = [], isLoading: matchesLoading } = useMatches(tournamentId);
  const { data: teams = [], isLoading: teamsLoading } = useTeams(tournamentId);
  const { data: spiritScores = [], isLoading: spiritLoading } = useSpiritScores(tournamentId);

  if (matchesLoading || teamsLoading || spiritLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  // Calculate performance standings
  const performanceStandings = teams.filter(t => t.status === 'approved').map(team => {
    const teamMatches = matches.filter((m: any) => 
      (m.team_a_id === team.id || m.team_b_id === team.id) && m.status === 'completed'
    );

    let wins = 0;
    let losses = 0;
    let pointsFor = 0;
    let pointsAgainst = 0;

    teamMatches.forEach((match: any) => {
      if (match.team_a_id === team.id) {
        pointsFor += match.team_a_score;
        pointsAgainst += match.team_b_score;
        if (match.team_a_score > match.team_b_score) wins++;
        else losses++;
      } else {
        pointsFor += match.team_b_score;
        pointsAgainst += match.team_a_score;
        if (match.team_b_score > match.team_a_score) wins++;
        else losses++;
      }
    });

    return {
      ...team,
      wins,
      losses,
      pointsFor,
      pointsAgainst,
      pointDifferential: pointsFor - pointsAgainst,
      gamesPlayed: teamMatches.length,
    };
  }).sort((a, b) => {
    if (b.wins !== a.wins) return b.wins - a.wins;
    return b.pointDifferential - a.pointDifferential;
  });

  // Calculate spirit standings
  const spiritStandings = teams.filter(t => t.status === 'approved').map(team => {
    const receivedScores = spiritScores.filter((s: any) => s.to_team_id === team.id);
    const avgSpirit = receivedScores.length > 0
      ? receivedScores.reduce((sum: number, s: any) => sum + (s.total || 0), 0) / receivedScores.length
      : 0;

    return {
      ...team,
      spiritScore: avgSpirit,
      scoresReceived: receivedScores.length,
    };
  }).sort((a, b) => b.spiritScore - a.spiritScore);

  // Calculate combined standings (70% performance, 30% spirit)
  const combinedStandings = performanceStandings.map(team => {
    const spiritTeam = spiritStandings.find(s => s.id === team.id);
    const maxWins = Math.max(...performanceStandings.map(t => t.wins), 1);
    const performanceScore = (team.wins / maxWins) * 70;
    const spiritScore = ((spiritTeam?.spiritScore || 0) / 20) * 30;
    const combinedScore = performanceScore + spiritScore;

    return {
      ...team,
      spiritScore: spiritTeam?.spiritScore || 0,
      combinedScore,
    };
  }).sort((a, b) => b.combinedScore - a.combinedScore);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-4xl font-bold mb-2">Leaderboards</h2>
          <p className="text-muted-foreground">Real-time tournament standings</p>
        </div>

        <Tabs defaultValue="combined" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="combined">
              <TrendingUp className="h-4 w-4 mr-2" />
              Combined
            </TabsTrigger>
            <TabsTrigger value="performance">
              <Trophy className="h-4 w-4 mr-2" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="spirit">
              <Award className="h-4 w-4 mr-2" />
              Spirit
            </TabsTrigger>
          </TabsList>

          <TabsContent value="combined" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Combined Standings</CardTitle>
                <CardDescription>70% Performance + 30% Spirit Score</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {combinedStandings.map((team, index) => (
                    <div key={team.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 font-bold text-primary">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{team.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {team.wins}W-{team.losses}L • Spirit: {team.spiritScore.toFixed(1)}/20
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{team.combinedScore.toFixed(1)}</div>
                        <p className="text-xs text-muted-foreground">Combined Score</p>
                      </div>
                      {index === 0 && (
                        <Trophy className="h-8 w-8 text-accent" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Standings</CardTitle>
                <CardDescription>Based on wins and point differential</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Rank</th>
                        <th className="text-left p-2">Team</th>
                        <th className="text-center p-2">W</th>
                        <th className="text-center p-2">L</th>
                        <th className="text-center p-2">PF</th>
                        <th className="text-center p-2">PA</th>
                        <th className="text-center p-2">Diff</th>
                      </tr>
                    </thead>
                    <tbody>
                      {performanceStandings.map((team, index) => (
                        <tr key={team.id} className="border-b hover:bg-muted/50">
                          <td className="p-2">
                            <Badge variant={index < 3 ? 'default' : 'outline'}>
                              {index + 1}
                            </Badge>
                          </td>
                          <td className="p-2 font-medium">{team.name}</td>
                          <td className="text-center p-2">{team.wins}</td>
                          <td className="text-center p-2">{team.losses}</td>
                          <td className="text-center p-2">{team.pointsFor}</td>
                          <td className="text-center p-2">{team.pointsAgainst}</td>
                          <td className="text-center p-2 font-semibold">
                            {team.pointDifferential > 0 ? '+' : ''}{team.pointDifferential}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="spirit" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Spirit Standings</CardTitle>
                <CardDescription>Based on spirit scores received from opponents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {spiritStandings.map((team, index) => (
                    <div key={team.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary/10 font-bold text-secondary">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{team.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Based on {team.scoresReceived} score{team.scoresReceived !== 1 ? 's' : ''}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{team.spiritScore.toFixed(1)}</div>
                        <p className="text-xs text-muted-foreground">out of 20</p>
                      </div>
                      {index === 0 && (
                        <Award className="h-8 w-8 text-secondary" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Leaderboard;
