import React from 'react';
import type { SupportedLanguage } from '../../types/wedding';
import { useWedding } from '../../context/WeddingContext';
import { GlobeIcon } from '../icons/Icons';

export const TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    tapToOpen: 'Tap to Open Invitation',
    cordiallyInvited: 'You are cordially invited to celebrate the wedding of',
    storyTitle: 'Our Journey',
    itineraryTitle: 'Wedding Itinerary & Events',
    dressCode: 'Dress Code',
    viewMap: 'View Map',
    addToCalendar: 'Add to Calendar',
    rsvpNow: 'RSVP Now',
    completedInTwoMin: 'Quick 2-minute RSVP',
    hallInfoTitle: 'Venue & Guest Information',
    valetParking: 'Valet & Parking',
    entryInstructions: 'Entry & Arrival',
    dearFamily: 'Dear',
    rsvpStep1Title: 'Which events will you attend?',
    rsvpStep2Title: 'Food, Drinks & Dietary Needs',
    rsvpStep3Title: 'Arrival & Accommodations',
    rsvpStep4Title: 'Review your RSVP',
    thankYouTitle: 'Your reply has reached',
    thankYouSubtitle: 'We are thrilled to celebrate this momentous occasion with you.',
  },
  ur: {
    tapToOpen: 'دعوت نامہ کھولنے کے لیے کلک کریں',
    cordiallyInvited: 'ہم آپ کو شادی کی پرمسرت تقریب میں شرکت کی دعوت دیتے ہیں',
    storyTitle: 'ہماری محبت کی کہانی',
    itineraryTitle: 'تقاریب کے اوقات اور تفصیلات',
    dressCode: 'لباس / ڈریس کوڈ',
    viewMap: 'نقشہ دیکھیں',
    addToCalendar: 'کیلنڈر میں شامل کریں',
    rsvpNow: 'شرکت کی تصدیق کریں (RSVP)',
    completedInTwoMin: 'صرف 2 منٹ کا آسان فارم',
    hallInfoTitle: 'شادی ہال اور مہمانوں کی معلومات',
    valetParking: 'پارکنگ کی سہولت',
    entryInstructions: 'داخلے کی ہدایات',
    dearFamily: 'محترم',
    rsvpStep1Title: 'آپ کن تقاریب میں شرکت کریں گے؟',
    rsvpStep2Title: 'کھانا، مشروبات اور غذائی ترجیحات',
    rsvpStep3Title: 'آمد کا وقت اور رہائش کی ضرورت',
    rsvpStep4Title: 'اپنے جوابات کا جائزہ لیں',
    thankYouTitle: 'آپ کی تصدیق موصول ہو گئی ہے',
    thankYouSubtitle: 'ہم آپ کے تشریف لانے کے منتظر ہیں!',
  },
  hi: {
    tapToOpen: 'निमंत्रण पत्र खोलने के लिए टैप करें',
    cordiallyInvited: 'आप सादर आमंत्रित हैं हमारे विवाह उत्सव में',
    storyTitle: 'हमारी कहानी',
    itineraryTitle: 'विवाह कार्यक्रम और समय',
    dressCode: 'पहनावा',
    viewMap: 'नक्शा देखें',
    addToCalendar: 'कैलेंडर में जोड़ें',
    rsvpNow: 'उपस्थिति पुष्टि (RSVP)',
    completedInTwoMin: '2 मिनट में आसान पुष्टि',
    hallInfoTitle: 'स्थान और अतिथि जानकारी',
    valetParking: 'पार्किंग सुविधा',
    entryInstructions: 'प्रवेश निर्देश',
    dearFamily: 'सादर',
    rsvpStep1Title: 'आप किन कार्यक्रमों में शामिल होंगे?',
    rsvpStep2Title: 'भोजन, पेय और खानपान प्राथमिकताएं',
    rsvpStep3Title: 'आगमन समय और आवास की आवश्यकता',
    rsvpStep4Title: 'अपने विवरण की समीक्षा करें',
    thankYouTitle: 'आपकी प्रतिक्रिया स्वीकार कर ली गई है',
    thankYouSubtitle: 'हम आपका स्वागत करने के लिए अत्यंत उत्सुक हैं!',
  },
  ar: {
    tapToOpen: 'انقر لفتح بطاقة الدعوة',
    cordiallyInvited: 'يسرنا دعوتكم لحضور حفل زفاف',
    storyTitle: 'قصتنا',
    itineraryTitle: 'جدول الفعاليات والاحتفالات',
    dressCode: 'قواعد الزي',
    viewMap: 'عرض الخريطة',
    addToCalendar: 'إضافة للتقويم',
    rsvpNow: 'تأكيد الحضور (RSVP)',
    completedInTwoMin: 'تأكيد سريع خلال دقيقتين',
    hallInfoTitle: 'معلومات القاعة والضيوف',
    valetParking: 'مواقف السيارات',
    entryInstructions: 'تعليمات الدخول والوصول',
    dearFamily: 'عائلة',
    rsvpStep1Title: 'ما هي الفعاليات التي ستحضرونها؟',
    rsvpStep2Title: 'الوجبات والمشروبات والاحتياجات الغذائية',
    rsvpStep3Title: 'موعد الوصول والإقامة في الفندق',
    rsvpStep4Title: 'مراجعة بيانات الحضور',
    thankYouTitle: 'تم استلام تأكيد حضوركم بنجاح',
    thankYouSubtitle: 'نتطلع بشوق للاحتفال معكم بهذه المناسبة السعيدة.',
  },
};

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { activeLanguage, setActiveLanguage } = useWedding();

  const languages: { code: SupportedLanguage; label: string; short: string }[] = [
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'ur', label: 'اردو', short: 'اردو' },
    { code: 'hi', label: 'हिंदी', short: 'हिंदी' },
    { code: 'ar', label: 'العربية', short: 'عربي' },
  ];

  return (
    <div className="inline-flex items-center gap-0.5 bg-[var(--bg-card)] border border-[var(--border-card)] rounded-full p-0.5 text-xs text-[var(--text-primary)] shadow-xs">
      <div className="pl-1.5 pr-0.5 text-[var(--accent)]">
        <GlobeIcon size={12} />
      </div>
      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => setActiveLanguage(lang.code)}
          className={`px-2 py-0.5 rounded-full transition-all text-[10px] font-medium cursor-pointer ${
            activeLanguage === lang.code
              ? 'bg-[var(--accent)] text-white shadow-xs font-semibold'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[#F7EBDD]'
          }`}
          title={lang.label}
        >
          {compact ? lang.short : lang.label}
        </button>
      ))}
    </div>
  );
}
