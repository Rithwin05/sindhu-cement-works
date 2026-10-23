import { SEO } from '../components/SEO';

export default function PrivacyPage() {
  return (
    <div data-testid="privacy-page">
      <SEO title="Privacy Policy — Sindhu Cement Works" description="How enquiries submitted on the Sindhu Cement Works website are handled." />
      <section className="grain grid-lines bg-charcoal pb-14 pt-32 text-white lg:pt-40">
        <div className="container-scw">
          <p className="eyebrow text-safety">Legal</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
        </div>
      </section>
      <section className="bg-concrete py-14 lg:py-20">
        <div className="container-scw max-w-3xl space-y-8 text-sm leading-relaxed text-steel">
          <div>
            <h2 className="text-lg font-bold text-graphite">What we collect</h2>
            <p className="mt-2">When you submit a quotation request or contact form, we collect the details you provide: your name, phone number, email (optional), company, buyer type, project location and product requirements. This information is used solely to respond to your enquiry.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-graphite">How it is used</h2>
            <p className="mt-2">Your enquiry details are shared with Sindhu Cement Works so the business can review your requirement and respond with specifications, availability and pricing. Details are not sold or shared with unrelated third parties.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-graphite">WhatsApp & phone</h2>
            <p className="mt-2">WhatsApp and call actions open your own apps and are governed by those platforms' policies. No message is sent without your action.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-graphite">Your data</h2>
            <p className="mt-2">To correct or delete an enquiry you have submitted, contact the business by phone with your enquiry reference number.</p>
          </div>
          <p className="border-t border-line pt-6 font-mono text-[10px] uppercase tracking-[0.2em]">
            Provisional policy for the website concept — to be finalised with the business before launch.
          </p>
        </div>
      </section>
    </div>
  );
}
