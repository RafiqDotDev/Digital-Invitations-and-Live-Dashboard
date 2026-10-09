export type WeddingSide = 'bride' | 'groom' | 'mutual';
export type RSVPStatus = 'confirmed' | 'declined' | 'pending';
export type TransportMode = 'car' | 'flight' | 'train' | 'other';
export type SupportedLanguage = 'en' | 'ur' | 'hi' | 'ar';

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  venueName: string;
  address: string;
  dressCode: string;
  mapEmbedUrl?: string;
  googleMapsUrl?: string;
  calendarTime?: {
    start: string;
    end: string;
  };
}

export interface DietaryChoice {
  vegetarian: number;
  vegan: number;
  halal: number;
  kosher: number;
  glutenFree: number;
  allergies: string;
  drinksPreference: 'wine_cocktails' | 'non_alcoholic' | 'mixed' | 'none';
}

export interface ArrivalDetails {
  arrivalDate: string;
  arrivalTime: string;
  transportMode: TransportMode;
  pickupNeeded: boolean;
  pickupLocation?: string;
  flightOrTrainNumber?: string;
  roomsNeeded: number;
  specialRequests?: string;
}

export interface GuestPartyMember {
  name: string;
  dietaryNotes?: string;
}

export interface GuestRSVP {
  id: string;
  familyName: string;
  contactName: string;
  side: WeddingSide;
  status: RSVPStatus;
  guestCount: number;
  email: string;
  phone: string;
  attendingEventIds: string[];
  partyMembers: GuestPartyMember[];
  dietary: DietaryChoice;
  arrival: ArrivalDetails;
  submittedAt?: string;
  reminderSent?: boolean;
}

export interface HallSettings {
  hallName: string;
  hallLogoUrl: string;
  customDomain: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  city: string;
  parkingInstructions: string;
  entryInstructions: string;
  mapEmbedUrl: string;
  themeColor: string; // e.g. 'amber' | 'emerald' | 'rose' | 'navy'
}

export interface WeddingData {
  id: string;
  coupleNames: string;
  partnerOne: string;
  partnerTwo: string;
  weddingDate: string;
  formattedDate: string;
  weddingLocation: string;
  heroHeadline: string;
  storyQuote: string;
  coverImage: string;
  audioMusicUrl?: string;
  events: EventItem[];
  guests: GuestRSVP[];
  hallSettings: HallSettings;
  rsvpFormSettings: {
    allowPlusOnes: boolean;
    askDietary: boolean;
    askDrinks: boolean;
    askArrival: boolean;
    askRoomBlocks: boolean;
  };
}

export interface PackageTier {
  id: 'essential' | 'signature' | 'luxury';
  name: string;
  tagline: string;
  pricePerWedding: string;
  wholesaleRate: string;
  recommendedMarkup: string;
  features: {
    eventsCovered: string;
    animation: string;
    dashboard: string;
    logisticsTracking: string;
    reminders: string;
    languages: string;
    branding: string;
    seatingChartAndQR: boolean;
  };
}

