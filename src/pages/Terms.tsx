import { Layout } from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const Terms = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <FileText className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: October 29, 2025</p>
        </div>

        <Card>
          <CardContent className="prose prose-sm max-w-none pt-8">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using Y-Ultimate ("the Service"), you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to these Terms of Service, please do not use the Service.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              Y-Ultimate provides a web-based platform for managing Ultimate Frisbee tournaments and coaching programs. 
              The Service includes features for team registration, live scoring, spirit scores, leaderboards, attendance 
              tracking, assessments, and reporting.
            </p>

            <h2>3. User Accounts</h2>
            <p>
              To use certain features of the Service, you must register for an account. You agree to:
            </p>
            <ul>
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security of your password and account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Accept responsibility for all activities that occur under your account</li>
            </ul>

            <h2>4. User Roles and Permissions</h2>
            <p>
              The Service provides different user roles with varying levels of access:
            </p>
            <ul>
              <li><strong>Admin:</strong> Full system access and configuration</li>
              <li><strong>Tournament Director:</strong> Create and manage tournaments</li>
              <li><strong>Team Captain:</strong> Register teams and submit scores</li>
              <li><strong>Coach:</strong> Manage children, sessions, and attendance</li>
              <li><strong>Program Manager:</strong> Oversee coaching programs</li>
              <li><strong>Volunteer:</strong> Update match scores</li>
              <li><strong>Player:</strong> View tournaments and participate</li>
            </ul>

            <h2>5. Acceptable Use</h2>
            <p>
              You agree not to:
            </p>
            <ul>
              <li>Use the Service for any unlawful purpose or in violation of any laws</li>
              <li>Impersonate any person or entity or misrepresent your affiliation</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Attempt to gain unauthorized access to any portion of the Service</li>
              <li>Upload viruses, malware, or any malicious code</li>
              <li>Harass, abuse, or harm another person through the Service</li>
              <li>Scrape, spider, or crawl the Service</li>
            </ul>

            <h2>6. Content and Data</h2>
            <p>
              <strong>Your Content:</strong> You retain all rights to the data and content you submit to the Service. 
              By submitting content, you grant us a license to use, store, and display that content as necessary to provide the Service.
            </p>
            <p>
              <strong>Our Content:</strong> The Service and its original content (excluding user content) are the 
              property of Y-Ultimate and are protected by intellectual property laws.
            </p>

            <h2>7. Child Safety and Privacy</h2>
            <p>
              For users managing children's data through coaching programs:
            </p>
            <ul>
              <li>All child data must be collected with proper parental consent</li>
              <li>Users must comply with applicable child protection laws</li>
              <li>Personal information about children must be handled responsibly</li>
              <li>Background checks for coaches may be required by your organization</li>
            </ul>

            <h2>8. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your data, including:
            </p>
            <ul>
              <li>Encrypted data transmission (HTTPS/SSL)</li>
              <li>Secure authentication and authorization</li>
              <li>Regular security audits</li>
              <li>Database-level Row Level Security (RLS)</li>
              <li>Automatic daily backups</li>
            </ul>
            <p>
              However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
            </p>

            <h2>9. Service Availability</h2>
            <p>
              We strive to keep the Service available 24/7, but we do not guarantee uninterrupted access. 
              The Service may be unavailable during:
            </p>
            <ul>
              <li>Scheduled maintenance (with advance notice)</li>
              <li>Emergency maintenance</li>
              <li>Force majeure events beyond our control</li>
            </ul>

            <h2>10. Termination</h2>
            <p>
              We may terminate or suspend your account and access to the Service immediately, without prior notice 
              or liability, for any reason, including breach of these Terms. Upon termination, your right to use 
              the Service will immediately cease.
            </p>
            <p>
              You may terminate your account at any time by contacting support. Upon termination, we will retain 
              your data for 30 days for recovery purposes, after which it will be permanently deleted.
            </p>

            <h2>11. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, 
              INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND 
              NON-INFRINGEMENT.
            </p>

            <h2>12. Limitation of Liability</h2>
            <p>
              IN NO EVENT SHALL Y-ULTIMATE, ITS DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF YOUR USE OF THE SERVICE.
            </p>

            <h2>13. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Y-Ultimate from any claims, damages, losses, liabilities, and 
              expenses arising out of your use of the Service or violation of these Terms.
            </p>

            <h2>14. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify users of significant changes 
              via email or in-app notification. Continued use of the Service after changes constitutes acceptance 
              of the modified Terms.
            </p>

            <h2>15. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India, without regard 
              to conflict of law principles.
            </p>

            <h2>16. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p>
              <strong>Email:</strong> legal@yultimate.org<br />
              <strong>Support:</strong> support@yultimate.org
            </p>

            <hr className="my-8" />

            <p className="text-sm text-muted-foreground">
              By using Y-Ultimate, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Terms;

