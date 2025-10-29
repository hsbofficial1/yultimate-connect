import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Trophy, Users, Calendar, Award, TrendingUp, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative gradient-hero text-white">
        <nav className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-8 w-8" />
            <span className="text-2xl font-bold">Y-Ultimate</span>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <Link to="/dashboard">
                <Button variant="secondary">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="secondary">Sign In</Button>
                </Link>
                <Link to="/auth">
                  <Button className="bg-white text-primary hover:bg-white/90">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </nav>

        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Ultimate Frisbee Management Made Simple
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Replace fragmented spreadsheets with a unified platform for tournament management 
              and coaching programs. Real-time, mobile-first, and powerful.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/auth">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/tournaments">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  View Tournaments
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools for tournament directors, coaches, and teams
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-2 transition-all hover:shadow-lg hover:border-primary">
            <CardHeader>
              <Trophy className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Tournament Management</CardTitle>
              <CardDescription>
                Create tournaments, manage teams, and handle approvals seamlessly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5" />
                  <span className="text-sm">Automated team registration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5" />
                  <span className="text-sm">Smart scheduling system</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5" />
                  <span className="text-sm">Capacity management</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 transition-all hover:shadow-lg hover:border-primary">
            <CardHeader>
              <Target className="h-12 w-12 text-accent mb-4" />
              <CardTitle>Live Scoring</CardTitle>
              <CardDescription>
                Mobile-optimized interface for real-time score updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5" />
                  <span className="text-sm">Instant score broadcasting</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5" />
                  <span className="text-sm">Offline functionality</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5" />
                  <span className="text-sm">Real-time leaderboards</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 transition-all hover:shadow-lg hover:border-primary">
            <CardHeader>
              <Award className="h-12 w-12 text-secondary mb-4" />
              <CardTitle>Spirit Scoring</CardTitle>
              <CardDescription>
                Track sportsmanship with comprehensive spirit scores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5" />
                  <span className="text-sm">5-category evaluation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5" />
                  <span className="text-sm">Anomaly detection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5" />
                  <span className="text-sm">Combined rankings</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 transition-all hover:shadow-lg hover:border-primary">
            <CardHeader>
              <Users className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Coaching Programs</CardTitle>
              <CardDescription>
                Manage children, sessions, and track progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5" />
                  <span className="text-sm">Digital attendance tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5" />
                  <span className="text-sm">LSAS assessments</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5" />
                  <span className="text-sm">Home visit logging</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 transition-all hover:shadow-lg hover:border-primary">
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-accent mb-4" />
              <CardTitle>Analytics & Reports</CardTitle>
              <CardDescription>
                Comprehensive insights and exportable reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5" />
                  <span className="text-sm">Performance metrics</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5" />
                  <span className="text-sm">Attendance trends</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5" />
                  <span className="text-sm">Export to Excel/PDF</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 transition-all hover:shadow-lg hover:border-primary">
            <CardHeader>
              <Calendar className="h-12 w-12 text-secondary mb-4" />
              <CardTitle>Gamification</CardTitle>
              <CardDescription>
                Engage participants with streaks and achievements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5" />
                  <span className="text-sm">Attendance streaks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5" />
                  <span className="text-sm">Milestone badges</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5" />
                  <span className="text-sm">Leaderboards</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join Y-Ultimate today and transform how you manage tournaments and coaching programs
          </p>
          <Link to="/auth">
            <Button size="lg" className="bg-white text-secondary hover:bg-white/90">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/tournaments" className="hover:text-primary">Tournaments</Link></li>
                <li><Link to="/leaderboards" className="hover:text-primary">Leaderboards</Link></li>
                <li><Link to="/dashboard" className="hover:text-primary">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
                <li><Link to="/help" className="hover:text-primary">Help Center</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/terms" className="hover:text-primary">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Connect</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="mailto:support@yultimate.org" className="hover:text-primary">Support</a></li>
                <li><a href="mailto:contact@yultimate.org" className="hover:text-primary">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t">
            <div className="flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              <span className="font-bold">Y-Ultimate</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Y-Ultimate. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
