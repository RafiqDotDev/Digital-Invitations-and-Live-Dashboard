import React, { useState } from 'react';
import {
  CheckCircleIcon,
  XIcon,
  SparklesIcon,
} from '../icons/Icons';

export function PackagesShowcase() {
  const [selectedTier, setSelectedTier] = useState<'signature' | 'essential' | 'luxury'>('signature');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoBooked, setDemoBooked] = useState(false);

  const packages = [
    {
      id: 'essential',
      name: 'Essential',
      tagline: 'Ideal for intimate banquets and single-day ceremonies.',
      badge: 'Starter',
      popular: false,
      features: [
        { label: 'Animated Tap to Open Invitation', value: 'Standard Envelope' },
        { label: 'Wedding Page & RSVP with Meals/Plus Ones', value: 'Included' },
        { label: 'Events Covered', value: 'Up to 2 Events' },
        { label: 'Hall Operations Dashboard', value: 'Basic Headcounts' },
        { label: 'Arrival, Transport & Room Tracking', value: 'Not Included', disabled: true },
        { label: 'Reminders to Pending Guests', value: 'Email Channel' },
        { label: 'Multi-Language Support', value: '1 Language' },
        { label: 'Hall Branding', value: 'Hall Name' },
        { label: 'Seating Chart & QR Check-in', value: 'Not Included', disabled: true },
      ],
      wholesaleRate: '$149',
      retailPrice: '$299',
    },
    {
      id: 'signature',
      name: 'Signature',
      tagline: 'Most popular for full wedding celebrations with multiday itineraries.',
      badge: 'Most Popular',
      popular: true,
      features: [
        { label: 'Animated Tap to Open Invitation', value: 'Gold Wax Seal & Unfold' },
        { label: 'Wedding Page & RSVP with Meals/Plus Ones', value: 'Included' },
        { label: 'Events Covered', value: 'Up to 4 Events' },
        { label: 'Hall Operations Dashboard', value: 'Full, with BEO & CSV Exports' },
        { label: 'Arrival, Transport & Room Tracking', value: 'Full Tracking & Shuttles' },
        { label: 'Reminders to Pending Guests', value: 'All Channels (WhatsApp, SMS, Email)' },
        { label: 'Multi-Language Support', value: '2 Languages (e.g. EN + UR/HI)' },
        { label: 'Hall Branding', value: 'Full Logo, Custom Colours & Card' },
        { label: 'Seating Chart & QR Check-in', value: 'Add-on Option', disabled: true },
      ],
      wholesaleRate: '$249',
      retailPrice: '$499',
    },
    {
      id: 'luxury',
      name: 'Luxury',
      tagline: 'For high-end grand ballroom galas and high-profile wedding parties.',
      badge: 'VIP White Label',
      popular: false,
      features: [
        { label: 'Animated Tap to Open Invitation', value: 'Fully Custom Bespoke Animation' },
        { label: 'Wedding Page & RSVP with Meals/Plus Ones', value: 'Included' },
        { label: 'Events Covered', value: 'Unlimited Functions' },
        { label: 'Hall Operations Dashboard', value: 'Full, with Family Views & Concierge' },
        { label: 'Arrival, Transport & Room Tracking', value: 'VIP Flight & Room Block Management' },
        { label: 'Reminders to Pending Guests', value: 'All Channels, Fully Automated' },
        { label: 'Multi-Language Support', value: 'Up to 4 Languages' },
        { label: 'Hall Branding', value: 'Full White Label on Your Own Domain' },
        { label: 'Seating Chart & QR Check-in', value: 'Interactive Seating & QR Pass Included' },
      ],
      wholesaleRate: '$399',
      retailPrice: '$799',
    },
  ];

  const partnershipModels = [
    {
      title: 'Revenue Share',
      tag: 'Highest Margin',
      desc: 'You sell the service to couples at your own price and keep the difference. We invoice you a wholesale rate per wedding. No upfront cost.',
      bullet: 'Halls typically charge $399–$699 and retain $200–$400 profit per wedding.',
    },
    {
      title: 'Bundled with Packages',
      tag: 'Zero Sales Friction',
      desc: 'Include digital invitations inside your premium banquet packages as a complimentary differentiator. We invoice a flat wholesale rate.',
      bullet: 'Distinguishes your venue against competing halls in your local market.',
    },
    {
      title: 'Referral Commission',
      tag: 'Zero Effort',
      desc: 'Recommend us directly to booked families. We deliver directly to the couple and pay your venue a generous referral commission on every booking.',
      bullet: 'Direct monthly commission disbursements to the venue.',
    },
    {
      title: 'Annual Partner Plan',
      tag: 'Max Volume Discount',
      desc: 'A fixed annual contract for high-volume wedding halls hosting 20+ weddings a year, with white-labeled branding and dedicated turnaround.',
      bullet: 'Includes dedicated account manager and priority 24h design SLA.',
    },
  ];

  const workflowSteps = [
    {
      step: '1. Brief',
      time: '1 Day',
      desc: 'We collect the couple’s theme, colors, photos, story, events, and guest list.',
    },
    {
      step: '2. Design',
      time: '3 to 5 Days',
      desc: 'We design the interactive invitation and wedding landing page for review.',
    },
    {
      step: '3. Build & Connect',
      time: '2 to 3 Days',
      desc: 'We deploy the invitation, set up the RSVP logic, and connect the hall dashboard.',
    },
    {
      step: '4. Launch',
      time: 'Day of Launch',
      desc: 'The link is shared with guests; replies immediately flow into your manager dashboard.',
    },
    {
      step: '5. Manage',
      time: 'Until Wedding',
      desc: 'Reminders, exports, and updates; our team supports your operations team until event day.',
    },
  ];

  return (
    <div className="w-full bg-[var(--bg-page)] text-[var(--text-primary)] min-h-screen py-10 px-4 sm:px-8 space-y-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-2.5 max-w-2xl mx-auto">
          <span className="text-[11px] uppercase tracking-widest font-semibold text-[var(--accent)] bg-[var(--accent-soft)] px-3 py-1 rounded-[var(--chip-radius)]">
            Venue Partnership Program
          </span>
          <h2 className="text-[32px] sm:text-[42px] font-normal font-serif text-[var(--text-primary)]">
            Packages for Wedding Halls
          </h2>
          <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
            A turnkey premium service your hall can offer to every couple that books. Know your exact headcount before catering orders are placed.
          </p>
        </div>

        {/* Packages Pricing Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => {
            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedTier(pkg.id as any)}
                className={`relative rounded-[var(--card-radius)] p-6 border transition-all cursor-pointer flex flex-col justify-between ${
                  pkg.popular
                    ? 'bg-[var(--bg-card)] border-[var(--accent)] shadow-md ring-1 ring-[var(--accent)]/40'
                    : 'bg-[var(--bg-card)] border-[var(--border-card)] hover:border-[var(--accent)]/50'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[var(--accent)] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                    {pkg.badge}
                  </div>
                )}

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-[20px] font-normal font-serif text-[var(--text-primary)]">
                      {pkg.name}
                    </h4>
                    <p className="text-[12px] text-[var(--text-secondary)] min-h-[34px]">
                      {pkg.tagline}
                    </p>
                  </div>

                  <div className="p-3 bg-[#FAF6EE] rounded-[10px] border border-[var(--border-card)] text-[12px] space-y-1">
                    <div className="flex justify-between items-center text-[var(--text-secondary)]">
                      <span>Wholesale Rate to Hall:</span>
                      <span className="font-mono font-semibold text-[var(--text-primary)]">{pkg.wholesaleRate}</span>
                    </div>
                    <div className="flex justify-between items-center text-[var(--accent)]">
                      <span>Suggested Retail:</span>
                      <span className="font-mono font-bold text-[15px]">{pkg.retailPrice}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[var(--border-card)]">
                    {pkg.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-[12px]">
                        {feat.disabled ? (
                          <XIcon size={14} className="text-[#C4B7A6] mt-0.5 shrink-0" />
                        ) : (
                          <CheckCircleIcon size={14} className="text-[var(--accent)] mt-0.5 shrink-0" />
                        )}
                        <div className={feat.disabled ? 'text-[var(--text-secondary)] line-through' : 'text-[var(--text-primary)]'}>
                          <span className="font-medium">{feat.label}:</span>{' '}
                          <span>{feat.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-[var(--border-card)]">
                  <button
                    type="button"
                    onClick={() => setIsDemoModalOpen(true)}
                    className={`w-full py-2.5 rounded-[var(--btn-radius)] text-[13px] font-medium transition-all cursor-pointer ${
                      pkg.popular
                        ? 'bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white'
                        : 'border border-[var(--border-card)] bg-[var(--bg-card)] text-[var(--text-primary)] hover:bg-[#FAF6EE]'
                    }`}
                  >
                    Select {pkg.name} Tier
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Partnership Models */}
        <div className="space-y-4 pt-4">
          <div className="text-center space-y-1">
            <h3 className="text-[24px] font-normal font-serif text-[var(--text-primary)]">Partnership Models</h3>
            <p className="text-[12px] text-[var(--text-secondary)]">
              Flexible options to suit your banquet sales operations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {partnershipModels.map((model) => (
              <div
                key={model.title}
                className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-[var(--card-radius)] p-5 space-y-2 hover:border-[var(--accent)]/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-[17px] font-normal font-serif text-[var(--text-primary)]">
                    {model.title}
                  </h4>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-[var(--chip-radius)] bg-[var(--accent-soft)] text-[var(--text-primary)]">
                    {model.tag}
                  </span>
                </div>
                <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">{model.desc}</p>
                <div className="p-2.5 rounded-[8px] bg-[#FAF6EE] border border-[var(--border-card)] text-[11px] text-[var(--text-secondary)] flex items-center gap-2">
                  <SparklesIcon size={13} className="text-[var(--accent)] shrink-0" />
                  <span>{model.bullet}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5-Step Process */}
        <div className="space-y-4 pt-4">
          <div className="text-center space-y-1">
            <h3 className="text-[24px] font-normal font-serif text-[var(--text-primary)]">How It Works</h3>
            <p className="text-[12px] text-[var(--text-secondary)]">
              No technology to build. We design, host, edit, and support everything for your hall.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {workflowSteps.map((step) => (
              <div
                key={step.step}
                className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-[var(--card-radius)] p-4 space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-semibold text-[var(--accent)]">{step.step}</span>
                    <span className="text-[10px] text-[var(--text-secondary)] bg-[#FAF6EE] px-2 py-0.5 rounded-full border border-[var(--border-card)]">
                      {step.time}
                    </span>
                  </div>
                  <p className="text-[12px] text-[var(--text-secondary)] mt-2 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="rounded-[var(--card-radius)] bg-[#F7EBDD] border border-[var(--border-card)] p-8 text-center space-y-3">
          <h3 className="text-[24px] sm:text-[28px] font-normal font-serif text-[var(--text-primary)]">
            Let’s make your next wedding the easiest one your hall has ever hosted.
          </h3>
          <p className="text-[13px] text-[var(--text-secondary)] max-w-lg mx-auto">
            Book a 20-minute live demonstration or launch a single wedding trial at introductory pricing.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsDemoModalOpen(true)}
              className="px-6 py-2.5 rounded-[var(--btn-radius)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-[13px] font-medium transition-all cursor-pointer"
            >
              Book a 20-Min Demo
            </button>
          </div>
        </div>
      </div>

      {/* Demo Modal */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs">
          <div className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-[var(--card-radius)] max-w-md w-full p-6 sm:p-8 space-y-4 shadow-xl relative">
            <button
              type="button"
              onClick={() => {
                setIsDemoModalOpen(false);
                setDemoBooked(false);
              }}
              className="absolute top-4 right-4 p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              <XIcon size={20} />
            </button>

            {!demoBooked ? (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="text-[20px] font-normal font-serif text-[var(--text-primary)]">Schedule Hall Demo</h4>
                  <p className="text-[12px] text-[var(--text-secondary)]">
                    We will walk your team through the live invitation and catering dashboard.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[12px] text-[var(--text-secondary)] mb-1">Wedding Hall Name</label>
                    <input
                      type="text"
                      defaultValue="The Grand Hall Ballroom"
                      className="w-full px-3 py-2 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-[12px] text-[var(--text-primary)]"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] text-[var(--text-secondary)] mb-1">Contact Email / WhatsApp</label>
                    <input
                      type="text"
                      defaultValue="events@grandhall.com"
                      className="w-full px-3 py-2 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-[12px] text-[var(--text-primary)]"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setDemoBooked(true)}
                  className="w-full py-2.5 rounded-[var(--btn-radius)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-[13px] font-medium transition-all cursor-pointer"
                >
                  Confirm 20-Min Demo
                </button>
              </div>
            ) : (
              <div className="text-center py-6 space-y-2">
                <h4 className="text-[20px] font-normal font-serif text-[var(--text-primary)]">Demo Scheduled!</h4>
                <p className="text-[12px] text-[var(--text-secondary)]">
                  Our partnership specialist will be in touch with your team.
                </p>
                <button
                  type="button"
                  onClick={() => setIsDemoModalOpen(false)}
                  className="px-5 py-2 rounded-[var(--btn-radius)] bg-[#FAF6EE] border border-[var(--border-card)] text-[12px] text-[var(--text-primary)] cursor-pointer mt-2"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
