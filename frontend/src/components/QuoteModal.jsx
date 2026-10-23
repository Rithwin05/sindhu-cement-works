import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, Check, Loader2, MessageCircle } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { API_URL, buildWhatsAppLink } from '../config/business';

const QuoteContext = createContext(null);
export const useQuote = () => useContext(QuoteContext);

const STEPS = ['Product', 'Requirements', 'Your Details', 'Review'];
const BUYER_TYPES = [
  'Contractor / Civil Engineer',
  'Builder / Developer',
  'Dealer / Distributor',
  'Government / EPC Procurement',
  'Individual Buyer',
  'Other',
];
const UNITS = ['pieces', 'sets', 'metres', 'runs'];
const TIMELINES = ['Immediately', 'Within 2 weeks', 'Within a month', '1–3 months', 'Planning stage'];

const EMPTY = {
  product_slug: '', product_name: '',
  quantity: '', unit: 'pieces', length: '', width: '', thickness: '', requirements: '',
  name: '', company: '', buyer_type: '', phone: '', email: '', city: '', postcode: '',
  timeline: '', notes: '', consent: false,
};

const phoneOk = (v) => /^\+?[0-9\s\-()]{8,16}$/.test(v.trim());
const emailOk = (v) => !v.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export function QuoteProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preset, setPreset] = useState(null);
  const openQuote = (slug = null) => { setPreset(slug); setIsOpen(true); };
  const closeQuote = () => setIsOpen(false);
  const value = useMemo(() => ({ openQuote, closeQuote, isOpen }), [isOpen]);
  return (
    <QuoteContext.Provider value={value}>
      {children}
      <QuoteModal preset={preset} />
    </QuoteContext.Provider>
  );
}

function Field({ label, error, required, children, htmlFor }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="field-label">
        {label} {required && <span className="text-safety">*</span>}
      </label>
      {children}
      {error && <p className="field-error" role="alert">{error}</p>}
    </div>
  );
}

export function QuoteModal({ preset }) {
  const { closeQuote, isOpen } = useQuote();
  const [step, setStep] = useState(0);
  const [data, setData] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [result, setResult] = useState(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const p = PRODUCTS.find((x) => x.slug === preset);
      setData({ ...EMPTY, product_slug: p?.slug || '', product_name: p?.name || '' });
      setStep(0); setErrors({}); setResult(null); setSubmitError('');
      document.body.style.overflow = 'hidden';
      window.__lenis?.stop?.();
      setTimeout(() => panelRef.current?.querySelector('input,select,textarea,button')?.focus(), 120);
    } else {
      document.body.style.overflow = '';
      window.__lenis?.start?.();
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen, preset]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && isOpen && closeQuote();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, closeQuote]);

  const set = (k, v) => { setData((d) => ({ ...d, [k]: v })); setErrors((e) => ({ ...e, [k]: undefined })); };
  const pickProduct = (p) => { set('product_slug', p.slug); set('product_name', p.name); };

  const validateStep = (s) => {
    const e = {};
    if (s === 0 && !data.product_slug) e.product_slug = 'Select a product to continue.';
    if (s === 1) {
      if (!data.quantity.trim() || isNaN(Number(data.quantity)) || Number(data.quantity) <= 0)
        e.quantity = 'Enter a valid quantity.';
    }
    if (s === 2) {
      if (data.name.trim().length < 2) e.name = 'Enter your full name.';
      if (!data.buyer_type) e.buyer_type = 'Select your buyer type.';
      if (!phoneOk(data.phone)) e.phone = 'Enter a valid phone number.';
      if (!emailOk(data.email)) e.email = 'Enter a valid email address.';
      if (data.city.trim().length < 2) e.city = 'Enter your project city.';
    }
    if (s === 3 && !data.consent) e.consent = 'Please confirm consent to share your details.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => validateStep(step) && setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    if (!validateStep(3) || submitting) return;
    setSubmitting(true); setSubmitError('');
    try {
      const payload = { ...data };
      ['length', 'width', 'thickness', 'requirements', 'company', 'postcode', 'timeline', 'notes', 'email'].forEach((k) => {
        if (!payload[k] || !String(payload[k]).trim()) payload[k] = null;
      });
      const res = await fetch(`${API_URL}/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(
          typeof body?.detail === 'string' ? body.detail : 'Submission failed. Please try again or call us directly.'
        );
      }
      setResult(await res.json());
    } catch (err) {
      setSubmitError(err.message || 'Submission failed. Please try again or call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const dims = [data.length && `L ${data.length}`, data.width && `W ${data.width}`, data.thickness && `T ${data.thickness}`]
    .filter(Boolean).join(' × ');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-end justify-center bg-charcoal/70 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={closeQuote}
          data-testid="quote-modal-overlay"
        >
          <motion.div
            ref={panelRef}
            role="dialog" aria-modal="true" aria-label="Request a quotation"
            initial={{ y: 48, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 48, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[92vh] w-full max-w-2xl flex-col bg-concrete sm:max-h-[86vh]"
            data-testid="quote-modal"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <div>
                <p className="eyebrow text-safety">Request a Quote</p>
                {!result && (
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-steel" data-testid="quote-step-indicator">
                    Step {step + 1} / 4 — {STEPS[step]}
                  </p>
                )}
              </div>
              <button onClick={closeQuote} aria-label="Close quote form" data-testid="quote-close-btn"
                className="flex h-9 w-9 items-center justify-center border border-line text-graphite transition-colors hover:border-graphite">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {result ? (
                <div className="py-8 text-center" data-testid="quote-success">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-safety/10">
                    <Check className="h-7 w-7 text-safety" />
                  </span>
                  <h3 className="mt-6 text-2xl font-bold text-graphite">Enquiry received.</h3>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-steel">{result.message}</p>
                  <p className="mt-6 font-mono text-sm tracking-[0.2em] text-graphite">
                    REFERENCE: <span className="font-semibold text-safety" data-testid="quote-reference">{result.reference}</span>
                  </p>
                  <p className="mt-2 text-xs text-steel">Save this reference for follow-up.</p>
                  <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <a
                      href={buildWhatsAppLink({ product: data.product_name, quantity: `${data.quantity} ${data.unit}`, dimensions: dims, location: data.city, notes: data.notes })}
                      target="_blank" rel="noopener noreferrer"
                      className="btn-primary" data-testid="quote-success-whatsapp"
                    >
                      <MessageCircle className="h-4 w-4" /> Continue on WhatsApp
                    </a>
                    <button onClick={closeQuote} className="btn-outline-dark" data-testid="quote-success-done">Done</button>
                  </div>
                </div>
              ) : (
                <>
                  {step === 0 && (
                    <div data-testid="quote-step-product">
                      <p className="mb-4 text-sm text-steel">Which product are you enquiring about?</p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {PRODUCTS.map((p) => (
                          <button
                            key={p.slug}
                            onClick={() => pickProduct(p)}
                            aria-pressed={data.product_slug === p.slug}
                            data-testid={`quote-product-${p.slug}`}
                            className={`flex items-center gap-3 border p-3 text-left transition-colors duration-150 ${
                              data.product_slug === p.slug ? 'border-safety bg-white' : 'border-line bg-white hover:border-smoke'
                            }`}
                          >
                            <span className="flex h-14 w-14 shrink-0 items-center justify-center bg-concrete">
                              <img src={p.image} alt="" className="max-h-12 max-w-12 object-contain" loading="lazy" />
                            </span>
                            <span>
                              <span className="block text-sm font-semibold text-graphite">{p.name}</span>
                              <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.15em] text-steel">{p.code}</span>
                            </span>
                          </button>
                        ))}
                      </div>
                      {errors.product_slug && <p className="field-error mt-3" role="alert">{errors.product_slug}</p>}
                    </div>
                  )}

                  {step === 1 && (
                    <div className="grid gap-5 sm:grid-cols-2" data-testid="quote-step-requirements">
                      <Field label="Quantity" required error={errors.quantity} htmlFor="q-qty">
                        <input id="q-qty" type="number" min="1" inputMode="numeric" className="field-input" placeholder="e.g. 50"
                          value={data.quantity} onChange={(e) => set('quantity', e.target.value)} data-testid="quote-quantity-input" />
                      </Field>
                      <Field label="Unit" htmlFor="q-unit">
                        <select id="q-unit" className="field-input" value={data.unit} onChange={(e) => set('unit', e.target.value)} data-testid="quote-unit-select">
                          {UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
                        </select>
                      </Field>
                      <Field label="Length (optional)" htmlFor="q-len">
                        <input id="q-len" className="field-input" placeholder="e.g. 600 mm" value={data.length} onChange={(e) => set('length', e.target.value)} data-testid="quote-length-input" />
                      </Field>
                      <Field label="Width (optional)" htmlFor="q-wid">
                        <input id="q-wid" className="field-input" placeholder="e.g. 450 mm" value={data.width} onChange={(e) => set('width', e.target.value)} data-testid="quote-width-input" />
                      </Field>
                      <Field label="Thickness / Height (optional)" htmlFor="q-thk">
                        <input id="q-thk" className="field-input" placeholder="e.g. 75 mm" value={data.thickness} onChange={(e) => set('thickness', e.target.value)} data-testid="quote-thickness-input" />
                      </Field>
                      <div className="sm:col-span-2">
                        <Field label="Additional technical requirements (optional)" htmlFor="q-req">
                          <textarea id="q-req" rows={3} className="field-input resize-none" placeholder="Load class, finish, drawings, site conditions…"
                            value={data.requirements} onChange={(e) => set('requirements', e.target.value)} data-testid="quote-requirements-input" />
                        </Field>
                        <p className="mt-2 text-xs text-steel">Dimensions are optional — share them if you know them. A reference photo can be shared later on WhatsApp.</p>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="grid gap-5 sm:grid-cols-2" data-testid="quote-step-details">
                      <Field label="Full name" required error={errors.name} htmlFor="q-name">
                        <input id="q-name" className="field-input" placeholder="Your name" value={data.name} onChange={(e) => set('name', e.target.value)} data-testid="quote-name-input" />
                      </Field>
                      <Field label="Company (optional)" htmlFor="q-company">
                        <input id="q-company" className="field-input" placeholder="Company / firm" value={data.company} onChange={(e) => set('company', e.target.value)} data-testid="quote-company-input" />
                      </Field>
                      <Field label="Buyer type" required error={errors.buyer_type} htmlFor="q-buyer">
                        <select id="q-buyer" className="field-input" value={data.buyer_type} onChange={(e) => set('buyer_type', e.target.value)} data-testid="quote-buyer-type-select">
                          <option value="">Select buyer type</option>
                          {BUYER_TYPES.map((b) => <option key={b} value={b}>{b}</option>)}
                        </select>
                      </Field>
                      <Field label="Phone number" required error={errors.phone} htmlFor="q-phone">
                        <input id="q-phone" type="tel" className="field-input" placeholder="+91 …" value={data.phone} onChange={(e) => set('phone', e.target.value)} data-testid="quote-phone-input" />
                      </Field>
                      <Field label="Email (optional)" error={errors.email} htmlFor="q-email">
                        <input id="q-email" type="email" className="field-input" placeholder="you@company.com" value={data.email} onChange={(e) => set('email', e.target.value)} data-testid="quote-email-input" />
                      </Field>
                      <Field label="Project city" required error={errors.city} htmlFor="q-city">
                        <input id="q-city" className="field-input" placeholder="e.g. Secunderabad" value={data.city} onChange={(e) => set('city', e.target.value)} data-testid="quote-city-input" />
                      </Field>
                      <Field label="Delivery postcode (optional)" htmlFor="q-post">
                        <input id="q-post" className="field-input" placeholder="e.g. 501302" value={data.postcode} onChange={(e) => set('postcode', e.target.value)} data-testid="quote-postcode-input" />
                      </Field>
                      <Field label="Preferred timeline" htmlFor="q-time">
                        <select id="q-time" className="field-input" value={data.timeline} onChange={(e) => set('timeline', e.target.value)} data-testid="quote-timeline-select">
                          <option value="">Select timeline</option>
                          {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </Field>
                      <div className="sm:col-span-2">
                        <Field label="Additional notes (optional)" htmlFor="q-notes">
                          <textarea id="q-notes" rows={2} className="field-input resize-none" value={data.notes} onChange={(e) => set('notes', e.target.value)} data-testid="quote-notes-input" />
                        </Field>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div data-testid="quote-step-review">
                      <dl className="divide-y divide-line border border-line bg-white text-sm">
                        {[
                          ['Product', `${data.product_name}`],
                          ['Quantity', `${data.quantity} ${data.unit}`],
                          ['Dimensions', dims || 'To be confirmed'],
                          ['Technical requirements', data.requirements || '—'],
                          ['Name', data.name],
                          ['Company', data.company || '—'],
                          ['Buyer type', data.buyer_type],
                          ['Phone', data.phone],
                          ['Email', data.email || '—'],
                          ['Project city', data.city],
                          ['Timeline', data.timeline || '—'],
                          ['Notes', data.notes || '—'],
                        ].map(([k, v]) => (
                          <div key={k} className="grid grid-cols-3 gap-4 px-4 py-3">
                            <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-steel">{k}</dt>
                            <dd className="col-span-2 font-medium text-graphite">{v}</dd>
                          </div>
                        ))}
                      </dl>
                      <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm text-steel" data-testid="quote-consent-label">
                        <input type="checkbox" checked={data.consent} onChange={(e) => set('consent', e.target.checked)}
                          className="mt-0.5 h-4 w-4 accent-safety" data-testid="quote-consent-checkbox" />
                        <span>I agree to share these details with Sindhu Cement Works so the business can respond to my enquiry.</span>
                      </label>
                      {errors.consent && <p className="field-error" role="alert">{errors.consent}</p>}
                      {submitError && (
                        <p className="mt-4 border border-[#B3402A]/30 bg-[#B3402A]/5 px-4 py-3 text-sm font-medium text-[#B3402A]" role="alert" data-testid="quote-submit-error">
                          {submitError}
                        </p>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            {!result && (
              <div className="flex items-center justify-between border-t border-line px-6 py-4">
                <button onClick={back} disabled={step === 0}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-steel transition-colors hover:text-graphite disabled:invisible"
                  data-testid="quote-back-btn">
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                {step < 3 ? (
                  <button onClick={next} className="btn-primary" data-testid="quote-next-btn">
                    Continue <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button onClick={submit} disabled={submitting} className="btn-primary" data-testid="quote-submit-btn">
                    {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</> : <>Submit Enquiry <ArrowRight className="h-4 w-4" /></>}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
