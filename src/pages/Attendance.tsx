import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Target, Calendar, MapPin, Save, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const Attendance = () => {
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});

  // TODO: Fetch real session and children from database
  const mockSession = {
    id: '1',
    date: new Date().toLocaleDateString(),
    time: '4:00 PM',
    location: 'Bangalore Sports Complex',
  };

  const mockChildren = [
    { id: '1', name: 'Arjun Kumar', age: 12 },
    { id: '2', name: 'Priya Sharma', age: 11 },
    { id: '3', name: 'Rahul Verma', age: 13 },
    { id: '4', name: 'Sneha Patel', age: 10 },
  ];

  const toggleAttendance = (childId: string) => {
    setAttendance(prev => ({
      ...prev,
      [childId]: !prev[childId]
    }));
  };

  const markAllPresent = () => {
    const allPresent: Record<string, boolean> = {};
    mockChildren.forEach(child => {
      allPresent[child.id] = true;
    });
    setAttendance(allPresent);
    toast.success('Marked all children as present');
  };

  const saveAttendance = () => {
    // TODO: Save to database
    toast.success('Attendance saved successfully');
  };

  const presentCount = Object.values(attendance).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Y-Ultimate</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2">Mark Attendance</h2>
          <p className="text-muted-foreground">Record attendance for today's session</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Session Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Date & Time</p>
                <p className="font-medium">{mockSession.date} at {mockSession.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{mockSession.location}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Children</CardTitle>
                <CardDescription>
                  {presentCount} of {mockChildren.length} present
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={markAllPresent}>
                Mark All Present
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockChildren.map((child) => (
                <div 
                  key={child.id}
                  className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => toggleAttendance(child.id)}
                >
                  <Checkbox
                    checked={attendance[child.id] || false}
                    onCheckedChange={() => toggleAttendance(child.id)}
                    className="h-6 w-6"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{child.name}</p>
                    <p className="text-sm text-muted-foreground">{child.age} years old</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Button 
          className="w-full gradient-secondary text-white" 
          size="lg"
          onClick={saveAttendance}
        >
          <Save className="h-5 w-5 mr-2" />
          Save Attendance
        </Button>
      </main>
    </div>
  );
};

export default Attendance;
