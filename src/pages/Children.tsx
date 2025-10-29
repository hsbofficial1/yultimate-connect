import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useChildren } from '@/hooks/useChildren';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Children = () => {
  const { data: children = [], isLoading } = useChildren();
  const [search, setSearch] = useState('');

  const filteredChildren = children.filter(child =>
    child.name.toLowerCase().includes(search.toLowerCase())
  );
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
      <div className="space-y-6">
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
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredChildren.map((child) => (
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
                  <p className="text-sm text-muted-foreground">Parent</p>
                  <p className="font-medium">{child.parent_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contact</p>
                  <p className="font-medium text-sm">{child.parent_phone}</p>
                </div>
                <Button variant="outline" className="w-full">View Profile</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredChildren.length === 0 && (
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
      </div>
    </Layout>
  );
};

export default Children;
