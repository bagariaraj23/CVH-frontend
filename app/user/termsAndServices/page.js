// pages/terms.js
"use client";
import React from 'react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-[#f5f7fa] py-12 px-4 flex flex-col items-center text-[#0d1945]">
      <h1 className="text-5xl font-extrabold mb-6 text-center text-[#1a237e]">Terms of Service</h1>
      <p className="text-xl text-center max-w-2xl mb-12 text-gray-600">
        Welcome to CareValue Health. These Terms of Service ("Terms") outline the conditions for using our platform and services. By accessing or using our services, you agree to these Terms. Please read them carefully.
      </p>

      <div className="w-full max-w-5xl space-y-8">
        {/* Section Style */}
        <section className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-[#1a237e]">
          <h2 className="text-3xl font-bold mb-4">1. Use of Services</h2>
          <p className="mb-2"><strong>Eligibility:</strong> You must be at least 18 years old to use our services or under the legal age to enter into a contract in your jurisdiction. If you are accessing our services on behalf of a minor, you are responsible for their use.</p>
          <p><strong>Compliance:</strong> You agree to comply with all applicable laws, regulations, and these Terms while using our services.</p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-[#1a237e]">
          <h2 className="text-3xl font-bold mb-4">2. Account Registration</h2>
          <p className="mb-2"><strong>Accuracy:</strong> You are responsible for providing accurate and complete information during account registration.</p>
          <p><strong>Security:</strong> You are responsible for safeguarding your account credentials. Notify us immediately if you suspect any unauthorized use or security breach.</p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-[#1a237e]">
          <h2 className="text-3xl font-bold mb-4">3. Privacy</h2>
          <p><strong>Data Handling:</strong> Your use of our services is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal data.</p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-[#1a237e]">
          <h2 className="text-3xl font-bold mb-4">4. Services and Content</h2>
          <p className="mb-2"><strong>Ownership:</strong> We retain ownership of all content and intellectual property related to our services.</p>
          <p><strong>Prohibited Content:</strong> You agree not to upload, post, or share any content that violates our guidelines or is illegal, harmful, or infringing.</p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-[#1a237e]">
          <h2 className="text-3xl font-bold mb-4">5. Service Changes</h2>
          <p><strong>Modifications:</strong> We reserve the right to modify, suspend, or discontinue our services, or any part of them, at any time.</p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-[#1a237e]">
          <h2 className="text-3xl font-bold mb-4">6. Termination</h2>
          <p><strong>Termination:</strong> We may terminate or suspend your access to our services immediately and without notice for violations of these Terms or for any other reason.</p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-[#1a237e]">
          <h2 className="text-3xl font-bold mb-4">7. Disclaimers and Limitations</h2>
          <p><strong>Medical Services:</strong> Our healthcare services are provided by qualified professionals, but we do not guarantee the outcome of medical consultations.</p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-[#1a237e]">
          <h2 className="text-3xl font-bold mb-4">8. Indemnification</h2>
          <p><strong>Liability:</strong> You agree to indemnify and hold CareValue Health, its affiliates, and its employees harmless from any claims, damages, or losses arising from your use of our services.</p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-[#1a237e]">
          <h2 className="text-3xl font-bold mb-4">9. Governing Law</h2>
          <p><strong>Jurisdiction:</strong> These Terms are governed by the laws of [Choose the Jurisdiction], without regard to its conflict of law principles.</p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-[#1a237e]">
          <h2 className="text-3xl font-bold mb-4">10. Changes to Terms</h2>
          <p><strong>Updates:</strong> We may update these Terms from time to time. Any changes will be posted on our platform.</p>
        </section>

        {/* Contact Information */}
        <section className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-[#1a237e]">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p>If you have questions or concerns about these Terms, please contact us at <a href="mailto:contact@carevaluehealth.com" className="text-blue-600 underline">contact@carevaluehealth.com</a>.</p>
        </section>

        {/* Footer Note */}
        <div className="text-center text-gray-600 mt-12">
          <p>Thank you for choosing CareValue Health. We are committed to providing you with quality healthcare services.</p>
          <div className="mt-4">
            <p>CareValue Health</p>
            <p><a href="mailto:contact@carevaluehealth.com" className="text-blue-600 underline">contact@carevaluehealth.com</a></p>
            <p><a href="https://carevaluehealth.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">carevaluehealth.com</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
