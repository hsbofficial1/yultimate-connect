import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Users, Plus, Search, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';

const Children = () => {
  // TODO: Fetch real children from database
  const mockChildren = [
    {
      id: '1',
      name: 'Arjun Kumar',
      age: 12,
      gender: 'Male',
      school: 'Delhi Public School',
      active: true,
      attendanceRate: 92,
    },
    {
      id: '2',
      name: 'Priya Sharma',
      age: 11,
      gender: 'Female',
      school: 'St. Mary\'s School',
      active: true,
      attendanceRate: 88,
    },
  ];

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

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold mb-2">Child Profiles</h2>
            <p className="text-muted-foreground">Manage children in your coaching programs</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Child
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, school, or community..."
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockChildren.map((child) => (
            <Card key={child.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{child.name}</CardTitle>
                    <CardDescription>
                      {child.age} years • {child.gender}
                    </CardDescription>
                  </div>
                  {child.active && (
                    <Badge className="bg-secondary text-white">Active</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">School</p>
                  <p className="font-medium">{child.school}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Attendance Rate</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full gradient-secondary"
                        style={{ width: `${child.attendanceRate}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{child.attendanceRate}%</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">View Profile</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {mockChildren.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No children registered yet</p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Child
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Children;
