import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Mail, 
  MessageCircle, 
  Book, 
  Video, 
  HelpCircle,
  Trophy,
  Users,
  Calendar,
  FileText
} from 'lucide-react';

const Help = () => {
  const tournamentFaqs = [
    {
      question: "How do I create a tournament?",
      answer: "Go to Dashboard → Tournaments → Create Tournament. Fill in the tournament details including name, location, dates, and maximum number of teams. Once created, you can start accepting team registrations."
    },
    {
      question: "How do I approve team registrations?",
      answer: "Navigate to your tournament page and click on the 'Teams' tab. You'll see all pending registrations. Review team details and click 'Approve' or 'Reject' for each team."
    },
    {
      question: "Can I schedule matches automatically?",
      answer: "Currently, match scheduling is manual. Our automated bracket generation feature is coming soon. For now, you can create matches by going to the tournament page and clicking 'Add Match'."
    },
    {
      question: "How does live scoring work?",
      answer: "During a match, volunteers or tournament directors can access the scoring interface from the match page. Scores are updated in real-time and instantly visible to all users viewing the leaderboard."
    },
    {
      question: "What is spirit scoring?",
      answer: "Spirit scoring is a key aspect of Ultimate Frisbee. After each match, teams rate their opponents on 5 categories: Rules Knowledge, Fouls & Body Contact, Fair-Mindedness, Positive Attitude, and Communication. Each category is rated 0-4."
    }
  ];

  const coachingFaqs = [
    {
      question: "How do I add children to the program?",
      answer: "Go to Children → Add Child. Fill in the child's details including name, age, gender, parent information, and assign them to a school or community. You can also import multiple children from a spreadsheet."
    },
    {
      question: "Can I mark attendance offline?",
      answer: "Yes! Our Progressive Web App works offline. Mark attendance during your session even without internet. Data will automatically sync when you're back online."
    },
    {
      question: "What are attendance streaks?",
      answer: "Attendance streaks track consecutive sessions attended by children. They earn badges for 5, 10, 20, and 50-session streaks. This gamification helps improve engagement."
    },
    {
      question: "How do I record home visits?",
      answer: "Go to the child's profile and click 'Add Home Visit'. Record the date, purpose, duration, notes, and any action items. You can also attach photos."
    },
    {
      question: "What is LSAS assessment?",
      answer: "LSAS (Life Skills Assessment System) tracks a child's development across 4 domains: Physical, Social, Emotional, and Cognitive. Conduct baseline, midline, and endline assessments to measure progress."
    }
  ];

  const accountFaqs = [
    {
      question: "How do I reset my password?",
      answer: "Click 'Forgot Password' on the login page. Enter your email address and we'll send you a reset link. Follow the link to set a new password."
    },
    {
      question: "Can I change my user role?",
      answer: "User roles can only be changed by administrators. Contact your organization's admin to request a role change."
    },
    {
      question: "How do I enable notifications?",
      answer: "Go to Settings → Notifications. Toggle the notifications you want to receive. You can choose email notifications, match reminders, spirit score reminders, and more."
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Search our knowledge base or browse frequently asked questions
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search for help articles..." 
              className="pl-10 h-12 text-base"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="text-center hover:border-primary transition-colors cursor-pointer">
            <CardContent className="pt-6 pb-4">
              <Trophy className="h-10 w-10 text-primary mx-auto mb-3" />
              <p className="font-medium">Tournaments</p>
            </CardContent>
          </Card>
          <Card className="text-center hover:border-primary transition-colors cursor-pointer">
            <CardContent className="pt-6 pb-4">
              <Users className="h-10 w-10 text-secondary mx-auto mb-3" />
              <p className="font-medium">Coaching</p>
            </CardContent>
          </Card>
          <Card className="text-center hover:border-primary transition-colors cursor-pointer">
            <CardContent className="pt-6 pb-4">
              <Calendar className="h-10 w-10 text-accent mx-auto mb-3" />
              <p className="font-medium">Scheduling</p>
            </CardContent>
          </Card>
          <Card className="text-center hover:border-primary transition-colors cursor-pointer">
            <CardContent className="pt-6 pb-4">
              <FileText className="h-10 w-10 text-primary mx-auto mb-3" />
              <p className="font-medium">Reports</p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Sections */}
        <Tabs defaultValue="tournaments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
            <TabsTrigger value="coaching">Coaching</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="tournaments">
            <Card>
              <CardHeader>
                <CardTitle>Tournament FAQs</CardTitle>
                <CardDescription>
                  Common questions about tournament management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {tournamentFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`tournament-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="coaching">
            <Card>
              <CardHeader>
                <CardTitle>Coaching Program FAQs</CardTitle>
                <CardDescription>
                  Common questions about coaching and child management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {coachingFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`coaching-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account & Settings FAQs</CardTitle>
                <CardDescription>
                  Common questions about your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {accountFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`account-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Resources */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="hover:border-primary transition-colors">
            <CardHeader>
              <Book className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Documentation</CardTitle>
              <CardDescription>
                Comprehensive guides and tutorials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Browse Docs
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:border-primary transition-colors">
            <CardHeader>
              <Video className="h-10 w-10 text-secondary mb-2" />
              <CardTitle>Video Tutorials</CardTitle>
              <CardDescription>
                Learn with step-by-step video guides
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Watch Videos
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:border-primary transition-colors">
            <CardHeader>
              <MessageCircle className="h-10 w-10 text-accent mb-2" />
              <CardTitle>Community Forum</CardTitle>
              <CardDescription>
                Connect with other Y-Ultimate users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Join Forum
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Contact Support */}
        <Card className="mt-12 border-2 border-primary/20 bg-primary/5">
          <CardHeader className="text-center">
            <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle>Still need help?</CardTitle>
            <CardDescription>
              Our support team is here to assist you
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="gap-2">
              <Mail className="h-4 w-4" />
              Email Support
            </Button>
            <Button variant="outline" className="gap-2">
              <MessageCircle className="h-4 w-4" />
              Live Chat
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Help;

