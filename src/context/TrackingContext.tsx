import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface TrackingData {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  landing_page: string;
  referrer: string;
}

interface TrackingContextType {
  trackingData: TrackingData;
  phoneDisplay: string;
  phoneTel: string;
}

const PHONE_NUMBERS = {
  google_ads: {
    display: '(02) XXXX XXXX',    // TODO: Replace with real Google Ads tracking number
    tel: '+612XXXXXXXX',
  },
  social_ads: {
    display: '(02) XXXX XXXX',    // TODO: Replace with real Social Ads tracking number
    tel: '+612XXXXXXXX',
  },
  organic: {
    display: '(02) 7207 1038',    // Main business number (SEO/Organic)
    tel: '+61272071038',
  },
};

function getPhoneForSource(source: string, medium: string) {
  const s = source.toLowerCase();
  const m = medium.toLowerCase();

  // Google Ads
  if (s === 'google' && (m === 'cpc' || m === 'ppc' || m === 'paid')) {
    return PHONE_NUMBERS.google_ads;
  }

  // Social Ads (Facebook, Instagram, LinkedIn paid)
  if (
    (s === 'facebook' || s === 'instagram' || s === 'linkedin' || s === 'meta') &&
    (m === 'cpc' || m === 'ppc' || m === 'paid' || m === 'paid_social' || m === 'paidsocial')
  ) {
    return PHONE_NUMBERS.social_ads;
  }

  // Everything else: organic
  return PHONE_NUMBERS.organic;
}

function getUTMParams(): Partial<TrackingData> {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const data: Partial<TrackingData> = {};

  (['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const).forEach((key) => {
    const val = params.get(key);
    if (val) data[key] = val;
  });

  return data;
}

function loadFromStorage(): TrackingData | null {
  try {
    const stored = sessionStorage.getItem('cca_tracking');
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }

  // Fallback: cookies
  try {
    const cookie = document.cookie.split('; ').find((c) => c.startsWith('cca_tracking='));
    if (cookie) return JSON.parse(decodeURIComponent(cookie.split('=')[1]));
  } catch { /* ignore */ }

  return null;
}

function saveToStorage(data: TrackingData) {
  try {
    sessionStorage.setItem('cca_tracking', JSON.stringify(data));
  } catch { /* ignore */ }

  // Also save to cookie (30 days)
  try {
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `cca_tracking=${encodeURIComponent(JSON.stringify(data))}; expires=${expires}; path=/; SameSite=Lax`;
  } catch { /* ignore */ }
}

const defaultTracking: TrackingData = {
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
  utm_term: '',
  utm_content: '',
  landing_page: '',
  referrer: '',
};

const TrackingContext = createContext<TrackingContextType>({
  trackingData: defaultTracking,
  phoneDisplay: PHONE_NUMBERS.organic.display,
  phoneTel: PHONE_NUMBERS.organic.tel,
});

export function TrackingProvider({ children }: { children: ReactNode }) {
  const [trackingData, setTrackingData] = useState<TrackingData>(defaultTracking);
  const [phone, setPhone] = useState(PHONE_NUMBERS.organic);

  useEffect(() => {
    // 1. Check URL params first (new visit with UTMs)
    const urlParams = getUTMParams();
    const hasNewUTMs = Object.keys(urlParams).length > 0;

    if (hasNewUTMs) {
      const newData: TrackingData = {
        ...defaultTracking,
        ...urlParams,
        landing_page: window.location.pathname + window.location.search,
        referrer: document.referrer,
      };
      setTrackingData(newData);
      saveToStorage(newData);
      setPhone(getPhoneForSource(newData.utm_source, newData.utm_medium));
    } else {
      // 2. Try to load from storage (returning visitor in same session)
      const stored = loadFromStorage();
      if (stored) {
        setTrackingData(stored);
        setPhone(getPhoneForSource(stored.utm_source, stored.utm_medium));
      } else {
        // 3. First organic visit — save landing page and referrer
        const organicData: TrackingData = {
          ...defaultTracking,
          landing_page: window.location.pathname,
          referrer: document.referrer,
        };
        setTrackingData(organicData);
        saveToStorage(organicData);
      }
    }
  }, []);

  return (
    <TrackingContext.Provider
      value={{
        trackingData,
        phoneDisplay: phone.display,
        phoneTel: phone.tel,
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
}

export function useTracking() {
  return useContext(TrackingContext);
}
