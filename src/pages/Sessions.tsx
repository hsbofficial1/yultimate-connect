import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useSessions, useCreateSession } from '@/hooks/useAttendance';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, Plus, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sessions = () => {
  const { data: sessions = [] } = useSessions();
  const createSession = useCreateSession();
  
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [programType, setProgramType] = useState<'school' | 'community'>('school');
  const [notes, setNotes] = useState('');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createSession.mutateAsync({
      date,
      time,
      location,
      program_type: programType,
      notes: notes || null,
    });
    setIsCreateOpen(false);
    // Reset form
    setDate('');
    setTime('');
    setLocation('');
    setNotes('');
  };

  const today = new Date().toISOString().split('T')[0];
  const todaySessions = sessions.filter(s => s.date === today);
  const upcomingSessions = sessions.filter(s => s.date > today);
  const pastSessions = sessions.filter(s => s.date < today);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-2">Sessions</h2>
            <p className="text-muted-foreground">Manage coaching sessions and schedules</p>
          </div>
          
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Session
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Session</DialogTitle>
                <DialogDescription>Schedule a coaching session</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Bangalore Sports Complex"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="programType">Program Type *</Label>
                  <Select value={programType} onValueChange={(v: any) => setProgramType(v)}>
                    <SelectTrigger id="programType">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="school">School</SelectItem>
                      <SelectItem value="community">Community</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Input
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Optional session notes"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={createSession.isPending}>
                  {createSession.isPending ? 'Creating...' : 'Create Session'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {todaySessions.length > 0 && (
          <Card className="border-accent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-accent">
                <Calendar className="h-5 w-5" />
                Today's Sessions ({todaySessions.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {todaySessions.map((session) => (
                  <Card key={session.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{session.time}</CardTitle>
                      <CardDescription className="space-y-1">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{session.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span className="capitalize">{session.program_type}</span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link to={`/attendance?session=${session.id}`}>
                        <Button className="w-full gradient-accent text-white">
                          Mark Attendance
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Sessions ({upcomingSessions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium">{new Date(session.date).toLocaleDateString()} at {session.time}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{session.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span className="capitalize">{session.program_type}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {upcomingSessions.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No upcoming sessions</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Past Sessions ({pastSessions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {pastSessions.slice(0, 10).map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{new Date(session.date).toLocaleDateString()} at {session.time}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span>{session.location}</span>
                      <span className="capitalize">{session.program_type}</span>
                    </div>
                  </div>
                  <Link to={`/attendance?session=${session.id}`}>
                    <Button variant="outline" size="sm">View</Button>
                  </Link>
                </div>
              ))}
              {pastSessions.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No past sessions</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Sessions;
