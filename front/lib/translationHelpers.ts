// Translation helpers for implementing website-wide translations
import { useLanguage } from "@/app/context/LanguageContext";

// Hook for easy translation access
export const useTranslation = () => {
  const { t, language, setLanguage } = useLanguage();
  return { t, language, setLanguage };
};

// Common translation patterns for different page types
export const translationPatterns = {
  // For profile pages
  profile: {
    title: "profile",
    subtitle: "personalInfo",
    editButton: "edit",
    saveButton: "save",
    cancelButton: "cancel",
    deleteButton: "delete",
    updateButton: "updateProfile",
  },

  // For booking pages
  booking: {
    title: "booking",
    subtitle: "bookingDetails",
    confirmButton: "confirmBooking",
    payButton: "pay",
    cancelButton: "cancel",
    totalLabel: "total",
    priceLabel: "price",
    dateLabel: "date",
    timeLabel: "time",
    participantsLabel: "participants",
  },

  // For trip/guide listing pages
  listing: {
    title: "allTrips",
    subtitle: "featuredTrips",
    searchPlaceholder: "search",
    filterButton: "filter",
    sortButton: "sort",
    viewButton: "view",
    bookButton: "book",
    priceLabel: "price",
    durationLabel: "duration",
    ratingLabel: "rating",
    reviewsLabel: "reviews",
  },

  // For forms
  form: {
    submitButton: "submit",
    cancelButton: "cancel",
    saveButton: "save",
    deleteButton: "delete",
    confirmButton: "confirm",
    firstNameLabel: "firstName",
    lastNameLabel: "lastName",
    emailLabel: "email",
    passwordLabel: "password",
    confirmPasswordLabel: "confirmPassword",
    messageLabel: "message",
    subjectLabel: "subject",
    descriptionLabel: "description",
    titleLabel: "title",
  },

  // For admin pages
  admin: {
    title: "dashboard",
    usersTitle: "users",
    statisticsTitle: "statistics",
    reportsTitle: "reports",
    manageButton: "manage",
    analyticsTitle: "analytics",
    systemTitle: "system",
  },

  // For chat/messaging
  chat: {
    title: "chat",
    messagesTitle: "messages",
    sendButton: "sendMessage",
    typePlaceholder: "typeMessage",
    onlineStatus: "online",
    offlineStatus: "offline",
    lastSeenLabel: "lastSeen",
  },

  // For notifications and status
  status: {
    loading: "loading",
    error: "error",
    success: "success",
    pending: "pending",
    completed: "completed",
    cancelled: "cancelled",
    approved: "approved",
    rejected: "rejected",
    active: "active",
    inactive: "inactive",
  },

  // For common actions
  actions: {
    view: "view",
    edit: "edit",
    delete: "delete",
    save: "save",
    cancel: "cancel",
    confirm: "confirm",
    submit: "submit",
    close: "close",
    back: "back",
    next: "next",
    previous: "previous",
  },
};

// Utility function to get translated text with fallback
export const getTranslatedText = (key: string, fallback?: string) => {
  const { t } = useLanguage();
  const translated = t(key);
  return translated !== key ? translated : fallback || key;
};

// Utility function for conditional translations
export const getConditionalTranslation = (
  condition: boolean,
  trueKey: string,
  falseKey: string
) => {
  const { t } = useLanguage();
  return t(condition ? trueKey : falseKey);
};

// Utility function for plural translations
export const getPluralTranslation = (
  count: number,
  singularKey: string,
  pluralKey: string
) => {
  const { t } = useLanguage();
  return t(count === 1 ? singularKey : pluralKey);
};

// Get all available languages
export const getAvailableLanguages = () => [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "mn", name: "Монгол", flag: "🇲🇳" },
];
