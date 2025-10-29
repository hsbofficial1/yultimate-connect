import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { useCreateTeam } from '@/hooks/useTeams';
import { useTournament } from '@/hooks/useTournaments';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Loader2 } from 'lucide-react';

const RegisterTeam = () => {
  const { id: tournamentId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const createTeam = useCreateTeam();
  const { data: tournament, isLoading } = useTournament(tournamentId!);
  
  const [teamName, setTeamName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [players, setPlayers] = useState([
    { name: '', age: 18, gender: 'male', email: '' }
  ]);

  const addPlayer = () => {
    setPlayers([...players, { name: '', age: 18, gender: 'male', email: '' }]);
  };

  const removePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const updatePlayer = (index: number, field: string, value: any) => {
    const updated = [...players];
    updated[index] = { ...updated[index], [field]: value };
    setPlayers(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (players.length < 7) {
      return alert('Minimum 7 players required');
    }
    if (players.length > 15) {
      return alert('Maximum 15 players allowed');
    }

    await createTeam.mutateAsync({
      team: {
        tournament_id: tournamentId!,
        name: teamName,
        email,
        phone,
        logo_url: null,
        notes: null,
      },
      players,
    });

    navigate(`/tournaments/${tournamentId}`);
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

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Register Team</h2>
          <p className="text-muted-foreground">
            Register your team for {tournament?.name}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Information</CardTitle>
              <CardDescription>Basic details about your team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="teamName">Team Name *</Label>
                <Input
                  id="teamName"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="e.g., Thunder Strikers"
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Contact Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="captain@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Team Roster</CardTitle>
                  <CardDescription>
                    Add 7-15 players ({players.length} player{players.length !== 1 ? 's' : ''})
                  </CardDescription>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addPlayer}
                  disabled={players.length >= 15}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Player
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {players.map((player, index) => (
                <div key={index} className="grid gap-4 md:grid-cols-5 p-4 border rounded-lg">
                  <div className="md:col-span-2 space-y-2">
                    <Label>Player Name *</Label>
                    <Input
                      value={player.name}
                      onChange={(e) => updatePlayer(index, 'name', e.target.value)}
                      placeholder="Full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Age *</Label>
                    <Input
                      type="number"
                      value={player.age}
                      onChange={(e) => updatePlayer(index, 'age', parseInt(e.target.value))}
                      min={10}
                      max={100}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Gender *</Label>
                    <Select
                      value={player.gender}
                      onValueChange={(value) => updatePlayer(index, 'gender', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end">
                    {players.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removePlayer(index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(`/tournaments/${tournamentId}`)}
              className="w-full"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createTeam.isPending || players.length < 7 || players.length > 15}
              className="w-full"
            >
              {createTeam.isPending ? 'Submitting...' : 'Register Team'}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default RegisterTeam;
