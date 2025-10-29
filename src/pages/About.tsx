import { Layout } from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Heart, 
  Users, 
  Zap, 
  Shield, 
  Globe,
  Award,
  TrendingUp,
  CheckCircle
} from 'lucide-react';

const About = () => {
  const stats = [
    { label: "Tournaments Managed", value: "150+", icon: Trophy },
    { label: "Active Users", value: "1,500+", icon: Users },
    { label: "Children Enrolled", value: "1,000+", icon: Heart },
    { label: "Communities Served", value: "25+", icon: Globe },
  ];

  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "Making Ultimate Frisbee accessible and manageable for everyone"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Leveraging technology to solve real-world problems"
    },
    {
      icon: Shield,
      title: "Reliability",
      description: "Building secure, trustworthy platforms you can depend on"
    },
    {
      icon: Heart,
      title: "Community First",
      description: "Empowering coaches, directors, and players to do their best work"
    }
  ];

  const team = [
    {
      name: "Development Team",
      role: "Full-Stack Engineers",
      description: "Building robust, scalable solutions"
    },
    {
      name: "Design Team",
      role: "UX/UI Designers",
      description: "Creating intuitive, beautiful experiences"
    },
    {
      name: "Y-Ultimate India",
      role: "Ultimate Frisbee Organization",
      description: "Providing domain expertise and feedback"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="gradient-hero text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About Y-Ultimate</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Empowering Ultimate Frisbee communities with modern technology
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Y-Ultimate was born from a simple observation: tournament directors and coaches 
              were spending countless hours managing spreadsheets, manually tracking scores, 
              and struggling with disconnected tools. We believed there was a better way.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mt-4">
              Our mission is to provide a unified, intuitive platform that eliminates administrative 
              burden and empowers organizers to focus on what truly matters: building vibrant 
              Ultimate Frisbee communities.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-2 hover:border-primary transition-colors">
                <CardContent className="pt-8 pb-6">
                  <stat.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                  <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-muted/50 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we build
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8 pb-6">
                    <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What We Do</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions for Ultimate Frisbee management
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-2">
              <CardContent className="pt-8">
                <Trophy className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-3">Tournament Management</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span>Streamlined team registration and approval</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span>Real-time live scoring and leaderboards</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span>Comprehensive spirit scoring system</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span>Automated reports and analytics</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-8">
                <Users className="h-12 w-12 text-secondary mb-4" />
                <h3 className="text-2xl font-bold mb-3">Coaching Programs</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span>Unified child profile management</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span>Offline-capable attendance tracking</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span>LSAS assessment tracking</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span>Gamification and engagement tools</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-muted/50 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Built by Experts</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A collaboration between technology professionals and Ultimate Frisbee experts
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-8 pb-6">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                    <p className="text-sm text-primary mb-2">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Modern Technology</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built with cutting-edge tools for reliability and performance
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold mb-2">Frontend</h3>
                <p className="text-sm text-muted-foreground">
                  React, TypeScript, Tailwind CSS, Progressive Web App
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold mb-2">Backend</h3>
                <p className="text-sm text-muted-foreground">
                  Supabase, PostgreSQL, Real-time subscriptions
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold mb-2">Infrastructure</h3>
                <p className="text-sm text-muted-foreground">
                  Cloud hosting, CDN, Automated backups
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="gradient-secondary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join hundreds of tournament directors and coaches already using Y-Ultimate
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="bg-white text-secondary hover:bg-white/90">
                  Create Free Account
                </Button>
              </Link>
              <Link to="/help">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

function Trophy(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

export default About;

