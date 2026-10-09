import React, { useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import type { TransportMode, WeddingSide } from '../../types/wedding';
import { TRANSLATIONS } from './LanguageSwitcher';
import {
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  HeartIcon,
  HotelIcon,
  PlaneIcon,
  SparklesIcon,
  UtensilsIcon,
  WineIcon,
  XIcon,
  CarIcon,
} from '../icons/Icons';

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFamilyName?: string;
  initialSide?: WeddingSide;
}

export function RSVPModal({
  isOpen,
  onClose,
  initialFamilyName = 'Morgan Family',
  initialSide = 'groom',
}: RSVPModalProps) {
  const { weddingData, submitRSVP, activeLanguage } = useWedding();
  const t = TRANSLATIONS[activeLanguage] || TRANSLATIONS.en;

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Form State
  const [familyName, setFamilyName] = useState(initialFamilyName);
  const [contactName, setContactName] = useState('James Morgan');
  const [side, setSide] = useState<WeddingSide>(initialSide);
  const [email, setEmail] = useState('james.morgan@example.com');
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  
  // Step 1: Events attendance
  const [selectedEvents, setSelectedEvents] = useState<string[]>(
    weddingData.events.map((e) => e.id)
  );

  // Step 2: Food & drinks & party members
  const [guestCount, setGuestCount] = useState<number>(2);
  const [vegetarian, setVegetarian] = useState<number>(1);
  const [vegan, setVegan] = useState<number>(0);
  const [halal, setHalal] = useState<number>(0);
  const [kosher, setKosher] = useState<number>(0);
  const [glutenFree, setGlutenFree] = useState<number>(1);
  const [allergies, setAllergies] = useState<string>('Tree nut allergy (Sarah)');
  const [drinksPreference, setDrinksPreference] = useState<'wine_cocktails' | 'non_alcoholic' | 'mixed' | 'none'>('wine_cocktails');

  // Step 3: Arrival & Rooms
  const [arrivalDate, setArrivalDate] = useState('2026-12-10');
  const [arrivalTime, setArrivalTime] = useState('14:30');
  const [transportMode, setTransportMode] = useState<TransportMode>('flight');
  const [pickupNeeded, setPickupNeeded] = useState<boolean>(true);
  const [pickupLocation, setPickupLocation] = useState('JFK Airport Terminal 4');
  const [flightOrTrainNumber, setFlightOrTrainNumber] = useState('DL 1402');
  const [roomsNeeded, setRoomsNeeded] = useState<number>(1);
  const [specialRequests, setSpecialRequests] = useState('High floor quiet room preferred');

  if (!isOpen) return null;

  const toggleEvent = (eventId: string) => {
    if (selectedEvents.includes(eventId)) {
      setSelectedEvents(selectedEvents.filter((id) => id !== eventId));
    } else {
      setSelectedEvents([...selectedEvents, eventId]);
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    const isAttending = selectedEvents.length > 0;

    submitRSVP({
      familyName,
      contactName,
      side,
      status: isAttending ? 'confirmed' : 'declined',
      guestCount,
      email,
      phone,
      attendingEventIds: selectedEvents,
      partyMembers: [
        { name: contactName },
        ...(guestCount > 1 ? [{ name: 'Guest 2' }] : []),
      ],
      dietary: {
        vegetarian,
        vegan,
        halal,
        kosher,
        glutenFree,
        allergies,
        drinksPreference,
      },
      arrival: {
        arrivalDate,
        arrivalTime,
        transportMode,
        pickupNeeded,
        pickupLocation,
        flightOrTrainNumber,
        roomsNeeded,
        specialRequests,
      },
    });

    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs overflow-y-auto">
      <div className="relative bg-[var(--bg-card)] border border-[var(--border-card)] rounded-[var(--card-radius)] max-w-xl w-full max-h-[calc(100dvh-2rem)] overflow-y-auto p-5 sm:p-8 shadow-2xl my-auto text-[var(--text-primary)] font-sans">
        {/* Modal Close Button */}
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[#FAF6EE] transition-colors z-20 cursor-pointer"
        >
          <XIcon size={20} />
        </button>

        {!isSubmitted ? (
          <div className="space-y-5">
            {/* Header with Steps Progress */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs text-[var(--accent)] font-medium">
                <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px] font-semibold">
                  <SparklesIcon size={13} />
                  Step {currentStep} of 4
                </span>
                <span className="text-[var(--text-secondary)]">
                  {currentStep === 1 && 'Events Selection'}
                  {currentStep === 2 && 'Dietary & Drinks'}
                  {currentStep === 3 && 'Arrival & Logistics'}
                  {currentStep === 4 && 'Review & Send'}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-[#FAF6EE] h-1.5 rounded-full overflow-hidden flex border border-[var(--border-card)]">
                <div
                  className="bg-[var(--accent)] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                />
              </div>

              <div className="pt-1">
                <h3 className="text-xl sm:text-2xl font-serif font-normal text-[var(--text-primary)]">
                  {currentStep === 1 && t.rsvpStep1Title}
                  {currentStep === 2 && t.rsvpStep2Title}
                  {currentStep === 3 && t.rsvpStep3Title}
                  {currentStep === 4 && t.rsvpStep4Title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  {currentStep === 1 && 'Please let us know which wedding functions your party will celebrate.'}
                  {currentStep === 2 && 'Personalize meal preferences, food allergies, and beverage choices.'}
                  {currentStep === 3 && 'Help the hall arrange airport pickups, transport, and guest rooms.'}
                  {currentStep === 4 && 'Double check your details. One click will confirm your RSVP directly to the dashboard.'}
                </p>
              </div>
            </div>

            {/* STEP 1: EVENTS ATTENDANCE */}
            {currentStep === 1 && (
              <div className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                      Family / Party Name
                    </label>
                    <input
                      type="text"
                      value={familyName}
                      onChange={(e) => setFamilyName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                      Primary Contact Name
                    </label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <label className="block text-xs font-medium text-[var(--text-primary)]">
                    Select Events You Will Attend:
                  </label>
                  {weddingData.events.map((event) => {
                    const isSelected = selectedEvents.includes(event.id);
                    return (
                      <div
                        key={event.id}
                        onClick={() => toggleEvent(event.id)}
                        className={`cursor-pointer p-3 rounded-[var(--btn-radius)] border transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[var(--accent-soft)]/50 border-[var(--accent)] text-[var(--text-primary)]'
                            : 'bg-[#FAF6EE] border-[var(--border-card)] text-[var(--text-secondary)] hover:border-[var(--accent)]/50'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <p className="text-xs font-medium text-[var(--text-primary)]">{event.title}</p>
                          <p className="text-[11px] text-[var(--text-secondary)]">{event.date} • {event.time}</p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-[4px] flex items-center justify-center border transition-colors ${
                            isSelected
                              ? 'bg-[var(--accent)] border-[var(--accent)] text-white'
                              : 'border-[var(--border-card)] bg-[var(--bg-card)]'
                          }`}
                        >
                          {isSelected && <CheckCircleIcon size={14} />}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Wedding Side Tag */}
                <div className="pt-1 flex items-center gap-3">
                  <span className="text-xs text-[var(--text-secondary)]">Affiliation:</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSide('groom')}
                      className={`px-3 py-1 rounded-[var(--btn-radius)] text-xs font-medium border transition-colors cursor-pointer ${
                        side === 'groom'
                          ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                          : 'bg-[#FAF6EE] border-[var(--border-card)] text-[var(--text-secondary)]'
                      }`}
                    >
                      Groom Side
                    </button>
                    <button
                      type="button"
                      onClick={() => setSide('bride')}
                      className={`px-3 py-1 rounded-[var(--btn-radius)] text-xs font-medium border transition-colors cursor-pointer ${
                        side === 'bride'
                          ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                          : 'bg-[#FAF6EE] border-[var(--border-card)] text-[var(--text-secondary)]'
                      }`}
                    >
                      Bride Side
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: FOOD & DRINKS */}
            {currentStep === 2 && (
              <div className="space-y-3.5">
                {/* Total party members */}
                <div className="flex items-center justify-between p-3 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)]">
                  <div>
                    <p className="text-xs font-medium text-[var(--text-primary)]">Total Attending Guests</p>
                    <p className="text-[11px] text-[var(--text-secondary)]">Number of guests in your party</p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                      className="w-7 h-7 rounded-[6px] bg-[var(--bg-card)] border border-[var(--border-card)] text-[var(--text-primary)] hover:bg-[#FAF6EE] flex items-center justify-center font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-sm font-semibold text-[var(--accent)] w-4 text-center">
                      {guestCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setGuestCount(guestCount + 1)}
                      className="w-7 h-7 rounded-[6px] bg-[var(--bg-card)] border border-[var(--border-card)] text-[var(--text-primary)] hover:bg-[#FAF6EE] flex items-center justify-center font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Dietary requirements breakdown */}
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-[var(--text-primary)] flex items-center gap-1.5">
                    <UtensilsIcon size={14} className="text-[var(--accent)]" />
                    Dietary Requirements Count (out of {guestCount} guests)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { label: 'Vegetarian', value: vegetarian, setter: setVegetarian },
                      { label: 'Vegan', value: vegan, setter: setVegan },
                      { label: 'Halal', value: halal, setter: setHalal },
                      { label: 'Kosher', value: kosher, setter: setKosher },
                      { label: 'Gluten-Free', value: glutenFree, setter: setGlutenFree },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="bg-[#FAF6EE] border border-[var(--border-card)] p-2 rounded-[8px] flex items-center justify-between"
                      >
                        <span className="text-[11px] text-[var(--text-primary)]">{item.label}</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => item.setter(Math.max(0, item.value - 1))}
                            className="w-5 h-5 bg-[var(--bg-card)] border border-[var(--border-card)] rounded text-[11px] flex items-center justify-center cursor-pointer"
                          >
                            -
                          </button>
                          <span className="text-[11px] font-semibold text-[var(--accent)] w-3 text-center">
                            {item.value}
                          </span>
                          <button
                            type="button"
                            onClick={() => item.setter(item.value + 1)}
                            className="w-5 h-5 bg-[var(--bg-card)] border border-[var(--border-card)] rounded text-[11px] flex items-center justify-center cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Allergies field */}
                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                    Specific Allergies or Restrictions
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tree nuts, shellfish, dairy"
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                {/* Drinks Preference */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-[var(--text-primary)] flex items-center gap-1.5">
                    <WineIcon size={14} className="text-[var(--accent)]" />
                    Bar Service Preference
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'wine_cocktails', label: 'Wine & Cocktails', desc: 'Full bar package' },
                      { id: 'non_alcoholic', label: 'Non-Alcoholic', desc: 'Mocktails & refreshments' },
                    ].map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => setDrinksPreference(opt.id as any)}
                        className={`cursor-pointer p-2.5 rounded-[8px] border transition-all ${
                          drinksPreference === opt.id
                            ? 'bg-[var(--accent-soft)]/50 border-[var(--accent)] text-[var(--text-primary)]'
                            : 'bg-[#FAF6EE] border-[var(--border-card)] text-[var(--text-secondary)] hover:border-[var(--accent)]/50'
                        }`}
                      >
                        <p className="text-xs font-medium text-[var(--text-primary)]">{opt.label}</p>
                        <p className="text-[10px] text-[var(--text-secondary)]">{opt.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: ARRIVAL & ROOMS */}
            {currentStep === 3 && (
              <div className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                      Expected Arrival Date
                    </label>
                    <input
                      type="date"
                      value={arrivalDate}
                      onChange={(e) => setArrivalDate(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                      Estimated Arrival Time
                    </label>
                    <input
                      type="time"
                      value={arrivalTime}
                      onChange={(e) => setArrivalTime(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>
                </div>

                {/* Mode of Transport */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-[var(--text-primary)]">
                    Mode of Travel
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { mode: 'flight', label: 'Flight', icon: PlaneIcon },
                      { mode: 'car', label: 'Driving / Car', icon: CarIcon },
                      { mode: 'train', label: 'Train', icon: ClockIcon },
                    ].map((item) => (
                      <button
                        key={item.mode}
                        type="button"
                        onClick={() => setTransportMode(item.mode as TransportMode)}
                        className={`p-2.5 rounded-[8px] border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                          transportMode === item.mode
                            ? 'bg-[var(--accent-soft)] border-[var(--accent)] text-[var(--accent)] font-semibold'
                            : 'bg-[#FAF6EE] border-[var(--border-card)] text-[var(--text-secondary)] hover:border-[var(--accent)]/50'
                        }`}
                      >
                        <item.icon size={16} />
                        <span className="text-[11px] font-medium">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Airport Pickup needed checkbox */}
                <div className="bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] p-3 space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pickupNeeded}
                      onChange={(e) => setPickupNeeded(e.target.checked)}
                      className="w-4 h-4 accent-[var(--accent)] rounded cursor-pointer"
                    />
                    <span className="text-xs font-medium text-[var(--text-primary)]">
                      We require venue airport / station pickup shuttle
                    </span>
                  </label>

                  {pickupNeeded && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-[var(--border-card)]">
                      <div>
                        <label className="block text-[11px] text-[var(--text-secondary)] mb-1">
                          Flight / Train Number
                        </label>
                        <input
                          type="text"
                          value={flightOrTrainNumber}
                          onChange={(e) => setFlightOrTrainNumber(e.target.value)}
                          placeholder="e.g. DL 1402"
                          className="w-full px-2.5 py-1.5 bg-[var(--bg-card)] border border-[var(--border-card)] rounded-[6px] text-xs text-[var(--text-primary)]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[var(--text-secondary)] mb-1">
                          Pickup Location
                        </label>
                        <input
                          type="text"
                          value={pickupLocation}
                          onChange={(e) => setPickupLocation(e.target.value)}
                          placeholder="e.g. JFK Terminal 4"
                          className="w-full px-2.5 py-1.5 bg-[var(--bg-card)] border border-[var(--border-card)] rounded-[6px] text-xs text-[var(--text-primary)]"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Hotel Room Blocks */}
                <div className="flex items-center justify-between p-3 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)]">
                  <div className="flex items-center gap-2.5">
                    <HotelIcon size={16} className="text-[var(--accent)]" />
                    <div>
                      <p className="text-xs font-medium text-[var(--text-primary)]">
                        Reserved Hotel Room Blocks Needed
                      </p>
                      <p className="text-[11px] text-[var(--text-secondary)]">
                        Suites reserved at Grand Hall Estate
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setRoomsNeeded(Math.max(0, roomsNeeded - 1))}
                      className="w-6 h-6 bg-[var(--bg-card)] border border-[var(--border-card)] rounded text-xs flex items-center justify-center cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold text-[var(--accent)] w-4 text-center">
                      {roomsNeeded}
                    </span>
                    <button
                      type="button"
                      onClick={() => setRoomsNeeded(roomsNeeded + 1)}
                      className="w-6 h-6 bg-[var(--bg-card)] border border-[var(--border-card)] rounded text-xs flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: REVIEW & CONFIRM CONTACT */}
            {currentStep === 4 && (
              <div className="space-y-3.5">
                <div className="bg-[#FAF6EE] border border-[var(--border-card)] rounded-[12px] p-3.5 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between border-b border-[var(--border-card)] pb-2">
                    <span className="text-[var(--text-secondary)]">Party</span>
                    <span className="font-semibold text-[var(--text-primary)]">
                      {familyName} ({guestCount} Guests)
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-[var(--border-card)] pb-2">
                    <span className="text-[var(--text-secondary)]">Attending Events</span>
                    <span className="font-medium text-[var(--text-primary)]">
                      {selectedEvents.length} events selected
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-[var(--border-card)] pb-2">
                    <span className="text-[var(--text-secondary)]">Dietary Selections</span>
                    <span className="font-medium text-[var(--text-primary)]">
                      {vegetarian > 0 && `${vegetarian} Veg `}
                      {glutenFree > 0 && `${glutenFree} GF `}
                      {allergies && `(${allergies})`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-secondary)]">Logistics & Rooms</span>
                    <span className="font-medium text-[var(--text-primary)]">
                      {pickupNeeded ? 'Shuttle Requested' : 'Self Arrival'} • {roomsNeeded} Room(s)
                    </span>
                  </div>
                </div>

                {/* Email / WhatsApp Number */}
                <div className="space-y-2.5 pt-1">
                  <label className="block text-xs font-medium text-[var(--text-primary)]">
                    Send Instant Confirmation Pass To:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-[var(--text-secondary)] mb-1">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[var(--text-secondary)] mb-1">
                        WhatsApp / Phone
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[var(--btn-radius)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-[var(--border-card)]">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-[var(--btn-radius)] text-xs font-medium bg-[var(--bg-card)] border border-[var(--border-card)] text-[var(--text-primary)] hover:bg-[#FAF6EE] cursor-pointer"
                >
                  <ChevronLeftIcon size={14} />
                  <span>Back</span>
                </button>
              ) : (
                <span />
              )}

              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[var(--btn-radius)] text-xs font-semibold bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-all cursor-pointer shadow-xs"
              >
                <span>{currentStep === 4 ? 'Confirm & Send RSVP' : 'Continue'}</span>
                <ChevronRightIcon size={14} />
              </button>
            </div>
          </div>
        ) : (
          /* THANK YOU CONFIRMATION PAGE */
          <div className="py-6 text-center space-y-5 animate-in fade-in">
            <div className="w-16 h-16 mx-auto rounded-full bg-[var(--accent-soft)] border border-[var(--accent)] flex items-center justify-center text-[var(--accent)] shadow-xs">
              <HeartIcon size={30} className="fill-[var(--accent)]" />
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] uppercase tracking-widest text-[var(--accent)] font-bold">
                RSVP Successfully Recorded
              </span>
              <h3 className="text-2xl font-serif font-normal text-[var(--text-primary)]">
                {t.thankYouTitle} {weddingData.coupleNames}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto leading-relaxed">
                {t.thankYouSubtitle} A confirmation has been sent to{' '}
                <span className="text-[var(--text-primary)] font-medium">{email}</span>.
              </p>
            </div>

            {/* Hall badge */}
            <div className="p-3 bg-[#FAF6EE] border border-[var(--border-card)] rounded-[10px] max-w-xs mx-auto text-xs text-[var(--text-secondary)]">
              <p className="text-[var(--text-primary)] font-medium text-[11px]">
                {weddingData.hallSettings.hallName}
              </p>
              <p className="text-[10px]">
                Concierge & kitchen catering notified with your preferences.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-6 py-2 rounded-[var(--btn-radius)] bg-[var(--accent)] text-white font-medium text-xs hover:bg-[var(--accent-hover)] cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
