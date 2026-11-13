'use client';

import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Clock, Check, Loader2, ArrowRight, ExternalLink } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { useQuote } from '@/components/QuoteModal';
import { BUSINESS, buildWhatsAppLink, WHATSAPP_CONFIGURED, API_URL } from '@/config/business';

interface FormData {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

const EMPTY: FormData = { name: '', phone: '', email: '', subject: '', message: '' };
const phoneOk = (v: string) => /^\+?[0-9\s\-()]{8,16}$/.test(v.trim());
const emailOk = (v: string) => !v.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export function ContactClient() {
  const { openQuote } = useQuote();
  const [data, setData] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const [result, setResult] = useState<{ reference: string; message: string } | null>(null);

  const set = (k: keyof FormData, v: string) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (data.name.trim().length < 2) errs.name = 'Enter your full name.';
    if (!phoneOk(data.phone)) errs.phone = 'Enter a valid phone number.';
    if (!emailOk(data.email)) errs.email = 'Enter a valid email address.';
    if (data.message.trim().length < 10) errs.message = 'Tell us a little more (min. 10 characters).';
    setErrors(errs);
    if (Object.keys(errs).length || sending) return;
    setSending(true);
    setSendError('');
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, email: data.email || null, subject: data.subject || null }),
      });
      if (!res.ok) throw new Error('Could not send your message. Please call or WhatsApp us directly.');
      setResult(await res.json());
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Could not send your message. Please call or WhatsApp us directly.';
      setSendError(msg);
    } finally {
      setSending(false);
    }
  };

  return (
    <div data-testid="contact-page">
      <section className="grain grid-lines bg-charcoal pb-16 pt-32 text-white lg:pb-20 lg:pt-40">
        <div className="container-scw">
          <p className="eyebrow text-safety">Contact</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl" data-testid="contact-title">
            Talk to Sindhu Cement Works.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-smoke">
            Call, message or send the form below. For pricing, the quotation form carries your exact product
            requirements.
          </p>
        </div>
      </section>

      <section className="bg-concrete py-14 lg:py-20">
        <div className="container-scw grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="border border-line bg-white p-6 sm:p-9" data-testid="contact-form-panel">
              {result ? (
                <div className="py-10 text-center" data-testid="contact-success">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-safety/10">
                    <Check className="h-7 w-7 text-safety" />
                  </span>
                  <h2 className="mt-6 text-2xl font-bold text-graphite">Message sent.</h2>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-steel">{result.message}</p>
                  <p className="mt-5 font-mono text-sm tracking-[0.2em] text-graphite">
                    REF:{' '}
                    <span className="font-semibold text-safety" data-testid="contact-reference">
                      {result.reference}
                    </span>
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setResult(null);
                      setData(EMPTY);
                    }}
                    className="btn-outline-dark mt-8"
                    data-testid="contact-send-another"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate data-testid="contact-form">
                  <h2 className="text-xl font-bold text-graphite">Send an enquiry</h2>
                  <p className="mt-2 text-sm text-steel">Fields marked * are required.</p>
                  <div className="mt-7 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="c-name" className="field-label">
                        Full name <span className="text-safety">*</span>
                      </label>
                      <input
                        id="c-name"
                        className="field-input"
                        value={data.name}
                        onChange={(e) => set('name', e.target.value)}
                        data-testid="contact-name-input"
                      />
                      {errors.name && (
                        <p className="field-error" role="alert">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="c-phone" className="field-label">
                        Phone <span className="text-safety">*</span>
                      </label>
                      <input
                        id="c-phone"
                        type="tel"
                        className="field-input"
                        placeholder="+91 …"
                        value={data.phone}
                        onChange={(e) => set('phone', e.target.value)}
                        data-testid="contact-phone-input"
                      />
                      {errors.phone && (
                        <p className="field-error" role="alert">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="c-email" className="field-label">
                        Email (optional)
                      </label>
                      <input
                        id="c-email"
                        type="email"
                        className="field-input"
                        value={data.email}
                        onChange={(e) => set('email', e.target.value)}
                        data-testid="contact-email-input"
                      />
                      {errors.email && (
                        <p className="field-error" role="alert">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="c-subject" className="field-label">
                        Subject (optional)
                      </label>
                      <input
                        id="c-subject"
                        className="field-input"
                        placeholder="e.g. Drain cover pricing"
                        value={data.subject}
                        onChange={(e) => set('subject', e.target.value)}
                        data-testid="contact-subject-input"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="c-message" className="field-label">
                        Message <span className="text-safety">*</span>
                      </label>
                      <textarea
                        id="c-message"
                        rows={5}
                        className="field-input resize-none"
                        placeholder="Tell us what you need — product, quantity, location…"
                        value={data.message}
                        onChange={(e) => set('message', e.target.value)}
                        data-testid="contact-message-input"
                      />
                      {errors.message && (
                        <p className="field-error" role="alert">
                          {errors.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {sendError && (
                    <p
                      className="mt-4 border border-[#B3402A]/30 bg-[#B3402A]/5 px-4 py-3 text-sm font-medium text-[#B3402A]"
                      role="alert"
                      data-testid="contact-submit-error"
                    >
                      {sendError}
                    </p>
                  )}
                  <div className="mt-7 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <button
                      type="submit"
                      disabled={sending}
                      className="btn-primary"
                      data-testid="contact-submit-btn"
                    >
                      {sending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                        </>
                      ) : (
                        <>
                          Send Message <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => openQuote()}
                      className="text-sm font-semibold text-safety transition-colors hover:text-[#c35d2c]"
                      data-testid="contact-use-quote-builder"
                    >
                      Need pricing? Use the quotation builder →
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="space-y-5">
              <div className="border border-line bg-white p-6" data-testid="contact-details-panel">
                <h2 className="eyebrow text-safety">Direct contact</h2>
                <a
                  href={BUSINESS.phoneHref}
                  className="mt-4 flex items-center gap-3 text-lg font-bold text-graphite transition-colors hover:text-safety"
                  data-testid="contact-phone-link"
                >
                  <Phone className="h-5 w-5 text-safety" /> {BUSINESS.phoneDisplay}
                </a>
                {WHATSAPP_CONFIGURED && (
                  <a
                    href={buildWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center gap-3 text-sm font-semibold text-graphite transition-colors hover:text-safety"
                    data-testid="contact-whatsapp-link"
                  >
                    <MessageCircle className="h-5 w-5 text-safety" /> WhatsApp: {BUSINESS.phoneDisplay}
                  </a>
                )}
                <div className="mt-5 border-t border-line pt-5">
                  <p className="flex items-start gap-3 text-sm leading-relaxed text-steel">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-safety" />
                    {BUSINESS.address}
                  </p>
                  <p className="mt-3 flex items-start gap-3 text-sm text-steel">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-safety" />
                    <span>
                      {BUSINESS.hours}
                      <br />
                      <span className="text-xs">{BUSINESS.hoursNote}</span>
                    </span>
                  </p>
                </div>
                <a
                  href={BUSINESS.mapsDirections}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-dark mt-6 w-full"
                  data-testid="contact-directions-link"
                >
                  Get Directions <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              <div className="overflow-hidden border border-line bg-white" data-testid="contact-map">
                <iframe
                  title="Map — Sindhu Cement Works, Cherlapalli, Secunderabad"
                  src={BUSINESS.mapsEmbed}
                  className="h-64 w-full grayscale-[35%]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

