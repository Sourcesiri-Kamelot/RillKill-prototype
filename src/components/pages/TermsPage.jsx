import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const TermsPage = () => {
  return (
    <div className="min-h-screen gradient-bg text-foreground p-4 md:p-8">
      <div className="glass-effect p-6 md:p-10 rounded-lg shadow-2xl max-w-3xl mx-auto">
        <Link to="/signup">
          <Button variant="ghost" className="mb-6 text-primary hover:text-primary/80">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sign Up
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-white mb-6">Terms, Waivers, and Disclaimers</h1>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">1. Acceptance of Terms</h2>
            <p>By creating an account and using RILLKILL.APP (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the Service.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">2. Service Description</h2>
            <p>RILLKILL.APP is a production-day file manager. The free version offers local-only storage and organization for one project. The premium version (one-time purchase of $100 USD) unlocks cloud access, team sharing, and advanced AI tools.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">3. User Accounts</h2>
            <p>You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.</p>
            <p>Login is via email and password only. We use this for software updates and account management, not for tracking your activity within the local application.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">4. Free Version Limitations</h2>
            <p>The free version is limited to one (1) project. A project is defined as a collection of files managed within a single instance of the application. Files are stored locally on your device. RILLKILL.APP does not access, store, or backup files for free users on its servers.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">5. Premium Version</h2>
            <p>A one-time payment of $100 USD grants access to premium features, including but not limited to cloud storage sync, team sharing, and advanced AI capabilities. Specific cloud storage limits and feature details will be provided at the time of upgrade.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">6. Data Privacy and Security (Local Files)</h2>
            <p>For the free version, all uploaded files (MP4, TXT, PDF, JPG, etc.) are stored exclusively on your local device. RILLKILL.APP does not transmit these files to its servers or any third-party cloud storage unless you upgrade to the Premium version and explicitly initiate a sync.</p>
            <p>You are solely responsible for the security and backup of your local files. RILLKILL.APP is not liable for any loss or corruption of data stored locally.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">7. User Conduct and Responsibilities</h2>
            <p>You agree not to use the Service for any unlawful purpose or to upload any content that is illegal, harmful, or infringes on the rights of others. You are solely responsible for the content you upload and manage through the Service.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">8. Disclaimers</h2>
            <p>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. RILLKILL.APP DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">9. Limitation of Liability</h2>
            <p>TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT SHALL RILLKILL.APP BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (A) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE; (B) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE; OR (C) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">10. Changes to Terms</h2>
            <p>RILLKILL.APP reserves the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page and updating the "Last updated" date. Your continued use of the Service after any such change constitutes your acceptance of the new Terms.</p>
          </section>

          <p className="text-sm text-gray-500 mt-8">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
