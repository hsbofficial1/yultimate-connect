import { Layout } from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Shield } from 'lucide-react';

const Privacy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: October 29, 2025</p>
        </div>

        <Card>
          <CardContent className="prose prose-sm max-w-none pt-8">
            <h2>1. Introduction</h2>
            <p>
              Y-Ultimate ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains 
              how we collect, use, disclose, and safeguard your information when you use our Service.
            </p>

            <h2>2. Information We Collect</h2>
            
            <h3>2.1 Information You Provide</h3>
            <p>We collect information that you voluntarily provide to us:</p>
            <ul>
              <li><strong>Account Information:</strong> Name, email address, phone number, password</li>
              <li><strong>Profile Information:</strong> User role, organization affiliation, profile photo</li>
              <li><strong>Tournament Data:</strong> Team names, player information, match scores, spirit scores</li>
              <li><strong>Coaching Data:</strong> Child profiles, attendance records, assessment scores, home visit notes</li>
              <li><strong>Communications:</strong> Messages sent through our support channels</li>
            </ul>

            <h3>2.2 Automatically Collected Information</h3>
            <p>We automatically collect certain information when you use the Service:</p>
            <ul>
              <li><strong>Log Data:</strong> IP address, browser type, operating system, pages viewed, time spent</li>
              <li><strong>Device Information:</strong> Device type, unique device identifiers</li>
              <li><strong>Location Data:</strong> General location based on IP address (not precise GPS)</li>
              <li><strong>Cookies:</strong> Session cookies for authentication and preferences</li>
            </ul>

            <h3>2.3 Child Information</h3>
            <p>
              For coaching programs, we collect information about children including name, age, gender, parent contact 
              information, attendance records, and assessment scores. This information is collected with parental consent 
              and used solely for program management purposes.
            </p>

            <h2>3. How We Use Your Information</h2>
            <p>We use collected information for:</p>
            <ul>
              <li>Providing and maintaining the Service</li>
              <li>User authentication and account management</li>
              <li>Processing tournament registrations and scores</li>
              <li>Tracking attendance and assessments in coaching programs</li>
              <li>Generating reports and analytics</li>
              <li>Sending notifications and reminders (with your consent)</li>
              <li>Responding to support requests</li>
              <li>Detecting and preventing fraud or abuse</li>
              <li>Improving the Service and developing new features</li>
              <li>Complying with legal obligations</li>
            </ul>

            <h2>4. How We Share Your Information</h2>
            
            <h3>4.1 Within Your Organization</h3>
            <p>
              Information is shared with authorized users in your organization based on role-based access controls:
            </p>
            <ul>
              <li>Tournament directors can view teams and matches in their tournaments</li>
              <li>Coaches can view children and sessions in their programs</li>
              <li>Team captains can view their team's information</li>
            </ul>

            <h3>4.2 Public Information</h3>
            <p>
              Certain information is publicly visible:
            </p>
            <ul>
              <li>Tournament names, dates, and locations</li>
              <li>Team names (not player personal information)</li>
              <li>Match scores and leaderboards</li>
            </ul>
            <p>
              Child information from coaching programs is NEVER made public.
            </p>

            <h3>4.3 Service Providers</h3>
            <p>We may share information with third-party service providers:</p>
            <ul>
              <li><strong>Supabase:</strong> Database and authentication services</li>
              <li><strong>Vercel/Netlify:</strong> Hosting and CDN services</li>
              <li><strong>Email Service:</strong> Transactional email delivery</li>
            </ul>
            <p>These providers are contractually obligated to protect your data.</p>

            <h3>4.4 Legal Requirements</h3>
            <p>
              We may disclose information if required by law, court order, or to protect rights, property, or safety.
            </p>

            <h2>5. Data Security</h2>
            <p>We implement security measures including:</p>
            <ul>
              <li>HTTPS/SSL encryption for data in transit</li>
              <li>AES-256 encryption for data at rest</li>
              <li>Multi-factor authentication options</li>
              <li>Row Level Security (RLS) in database</li>
              <li>Regular security audits and penetration testing</li>
              <li>Daily automated backups with 30-day retention</li>
              <li>Role-based access controls</li>
              <li>Audit logs for data modifications</li>
            </ul>

            <h2>6. Data Retention</h2>
            <p>We retain your information for:</p>
            <ul>
              <li><strong>Active Accounts:</strong> As long as your account remains active</li>
              <li><strong>Deleted Accounts:</strong> 30 days for recovery, then permanently deleted</li>
              <li><strong>Legal Compliance:</strong> Longer if required by law</li>
              <li><strong>Anonymized Data:</strong> May be retained indefinitely for analytics</li>
            </ul>

            <h2>7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Rectification:</strong> Correct inaccurate or incomplete information</li>
              <li><strong>Erasure:</strong> Request deletion of your information</li>
              <li><strong>Data Portability:</strong> Export your data in a machine-readable format</li>
              <li><strong>Objection:</strong> Object to processing of your information</li>
              <li><strong>Restriction:</strong> Request restriction of processing</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent for optional processing</li>
            </ul>
            <p>To exercise these rights, contact us at privacy@yultimate.org</p>

            <h2>8. Children's Privacy</h2>
            <p>
              Our Service is not directed to children under 13 for account creation. However, we do store information 
              about children in coaching programs with parental consent.
            </p>
            <p>
              For child participants in coaching programs:
            </p>
            <ul>
              <li>Parental consent is required before collecting child information</li>
              <li>Parents can request access, correction, or deletion of child information</li>
              <li>Child information is accessible only to authorized coaches and program managers</li>
              <li>We do not use child information for marketing purposes</li>
            </ul>

            <h2>9. Cookies and Tracking</h2>
            <p>We use cookies for:</p>
            <ul>
              <li><strong>Essential Cookies:</strong> Authentication and session management (required)</li>
              <li><strong>Preference Cookies:</strong> Remember your settings</li>
              <li><strong>Analytics Cookies:</strong> Understand how users interact with the Service</li>
            </ul>
            <p>
              You can control cookies through your browser settings. Disabling essential cookies may affect functionality.
            </p>

            <h2>10. International Data Transfers</h2>
            <p>
              Your information may be transferred to and maintained on servers located outside your country. 
              We ensure appropriate safeguards are in place for such transfers.
            </p>

            <h2>11. Changes to Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of significant changes via 
              email or in-app notification. Continued use after changes constitutes acceptance.
            </p>

            <h2>12. Third-Party Links</h2>
            <p>
              The Service may contain links to third-party websites. We are not responsible for the privacy practices 
              of these external sites.
            </p>

            <h2>13. Contact Us</h2>
            <p>
              For privacy-related questions or requests:
            </p>
            <p>
              <strong>Email:</strong> privacy@yultimate.org<br />
              <strong>Data Protection Officer:</strong> dpo@yultimate.org<br />
              <strong>Support:</strong> support@yultimate.org
            </p>

            <hr className="my-8" />

            <p className="text-sm text-muted-foreground">
              By using Y-Ultimate, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Privacy;

