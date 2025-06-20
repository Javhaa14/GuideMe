# Website Translation Implementation Guide

This guide shows how to implement translations across all pages of your GuideMe website.

## Overview

The translation system is now set up with:

- ✅ **7 Languages**: English, Chinese, Japanese, Spanish, German, Korean, Mongolian
- ✅ **Global Context**: `LanguageContext` provides translations throughout the app
- ✅ **Consistent Branding**: "Welcome to GuideMe" stays the same in all languages
- ✅ **Comprehensive Coverage**: 100+ translation keys for all UI elements

## Quick Start

### 1. Basic Usage in Any Component

```typescript
import { useTranslation } from "@/lib/translationHelpers";

const MyComponent = () => {
  const { t, language, setLanguage } = useTranslation();

  return (
    <div>
      <h1>{t("welcome")}</h1>
      <p>{t("discover")}</p>
      <button>{t("getStarted")}</button>
    </div>
  );
};
```

### 2. Available Translation Keys

The system includes translations for:

#### Navigation & Common UI

- `guides`, `travelers`, `trips`
- `search`, `filter`, `sort`, `view`, `edit`, `delete`
- `save`, `cancel`, `confirm`, `submit`, `close`
- `back`, `next`, `previous`

#### Profile & Settings

- `profile`, `settings`, `personalInfo`
- `firstName`, `lastName`, `email`, `phone`, `location`, `bio`
- `updateProfile`, `changePassword`, `notifications`

#### Booking System

- `book`, `booking`, `bookingDetails`
- `price`, `duration`, `date`, `time`, `participants`
- `total`, `pay`, `confirmBooking`, `paymentMethod`

#### Reviews & Ratings

- `reviews`, `rating`, `averageRating`
- `writeReview`, `submitReview`, `noReviews`

#### Admin Panel

- `dashboard`, `users`, `statistics`, `reports`
- `manage`, `analytics`, `system`

#### Chat & Messaging

- `chat`, `messages`, `sendMessage`
- `typeMessage`, `online`, `offline`, `lastSeen`

#### Status & Actions

- `loading`, `error`, `success`
- `pending`, `completed`, `cancelled`
- `approved`, `rejected`, `active`, `inactive`

## Implementation Examples

### Profile Page

```typescript
import { useTranslation } from "@/lib/translationHelpers";

const ProfilePage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("profile")}</h1>
      <h2>{t("personalInfo")}</h2>
      <form>
        <label>{t("firstName")}</label>
        <input type="text" />
        <label>{t("lastName")}</label>
        <input type="text" />
        <label>{t("email")}</label>
        <input type="email" />
        <label>{t("phone")}</label>
        <input type="tel" />
        <label>{t("location")}</label>
        <input type="text" />
        <label>{t("bio")}</label>
        <textarea />
        <button type="submit">{t("updateProfile")}</button>
        <button type="button">{t("cancel")}</button>
      </form>
    </div>
  );
};
```

### Booking Page

```typescript
import { useTranslation } from "@/lib/translationHelpers";

const BookingPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("booking")}</h1>
      <h2>{t("bookingDetails")}</h2>
      <div>
        <label>{t("date")}</label>
        <input type="date" />
        <label>{t("time")}</label>
        <input type="time" />
        <label>{t("participants")}</label>
        <input type="number" />
        <div>
          <span>{t("total")}: $100</span>
        </div>
        <button>{t("confirmBooking")}</button>
        <button>{t("cancel")}</button>
      </div>
    </div>
  );
};
```

### Trip Listing Page

```typescript
import { useTranslation } from "@/lib/translationHelpers";

const TripListingPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("allTrips")}</h1>
      <div>
        <input placeholder={t("search")} />
        <button>{t("filter")}</button>
        <button>{t("sort")}</button>
      </div>
      <div>
        {trips.map((trip) => (
          <div key={trip.id}>
            <h3>{trip.title}</h3>
            <p>
              {t("price")}: ${trip.price}
            </p>
            <p>
              {t("duration")}: {trip.duration} {t("days")}
            </p>
            <p>
              {t("rating")}: {trip.rating}/5
            </p>
            <button>{t("view")}</button>
            <button>{t("book")}</button>
          </div>
        ))}
      </div>
    </div>
  );
};
```

### Chat Page

```typescript
import { useTranslation } from "@/lib/translationHelpers";

const ChatPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("chat")}</h1>
      <div>
        <div>
          <span>{t("online")}</span>
          <span>
            {t("lastSeen")}: 2 {t("hours")} ago
          </span>
        </div>
        <div>
          {messages.map((message) => (
            <div key={message.id}>
              <p>{message.text}</p>
              <span>{message.time}</span>
            </div>
          ))}
        </div>
        <div>
          <input placeholder={t("typeMessage")} />
          <button>{t("sendMessage")}</button>
        </div>
      </div>
    </div>
  );
};
```

### Admin Dashboard

```typescript
import { useTranslation } from "@/lib/translationHelpers";

const AdminDashboard = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("dashboard")}</h1>
      <div>
        <div>
          <h2>{t("users")}</h2>
          <p>{t("active")}: 150</p>
          <p>{t("inactive")}: 25</p>
        </div>
        <div>
          <h2>{t("statistics")}</h2>
          <p>
            {t("total")} {t("bookings")}: 1,234
          </p>
          <p>{t("completed")}: 1,100</p>
          <p>{t("pending")}: 134</p>
        </div>
        <div>
          <h2>{t("reports")}</h2>
          <button>{t("view")}</button>
          <button>{t("manage")}</button>
        </div>
      </div>
    </div>
  );
};
```

## Advanced Usage

### Conditional Translations

```typescript
import { getConditionalTranslation } from "@/lib/translationHelpers";

const StatusComponent = ({ isOnline }) => {
  const status = getConditionalTranslation(isOnline, "online", "offline");
  return <span>{status}</span>;
};
```

### Plural Translations

```typescript
import { getPluralTranslation } from "@/lib/translationHelpers";

const CountComponent = ({ count }) => {
  const text = getPluralTranslation(count, "onePerson", "multiplePeople");
  return (
    <p>
      {count} {text}
    </p>
  );
};
```

### Fallback Translations

```typescript
import { getTranslatedText } from "@/lib/translationHelpers";

const CustomComponent = () => {
  const text = getTranslatedText("customKey", "Default Text");
  return <p>{text}</p>;
};
```

## Language Switching

### Programmatic Language Change

```typescript
import { useTranslation } from "@/lib/translationHelpers";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useTranslation();

  return (
    <div>
      <button onClick={() => setLanguage("en")}>🇺🇸 English</button>
      <button onClick={() => setLanguage("zh")}>🇨🇳 中文</button>
      <button onClick={() => setLanguage("ja")}>🇯🇵 日本語</button>
      <button onClick={() => setLanguage("es")}>🇪🇸 Español</button>
      <button onClick={() => setLanguage("de")}>🇩🇪 Deutsch</button>
      <button onClick={() => setLanguage("ko")}>🇰🇷 한국어</button>
      <button onClick={() => setLanguage("mn")}>🇲🇳 Монгол</button>
    </div>
  );
};
```

## Adding New Translations

### 1. Add to LanguageContext.tsx

```typescript
// In websiteTranslations object
en: {
  // ... existing translations
  newKey: "New Translation",
},
zh: {
  // ... existing translations
  newKey: "新翻译",
},
// ... add to all other languages
```

### 2. Use in Components

```typescript
const MyComponent = () => {
  const { t } = useTranslation();
  return <p>{t("newKey")}</p>;
};
```

## Best Practices

1. **Consistent Keys**: Use descriptive, consistent key names
2. **Fallbacks**: Always provide fallback text for missing translations
3. **Testing**: Test all languages to ensure proper display
4. **Performance**: The translation system is optimized for performance
5. **Persistence**: Language preference is automatically saved to localStorage

## Troubleshooting

### Common Issues

1. **Translation not showing**: Check if the key exists in `LanguageContext.tsx`
2. **Language not switching**: Ensure `LanguageProvider` wraps your app
3. **Missing translations**: Add the key to all language objects

### Debug Mode

```typescript
const { t, language } = useTranslation();
console.log("Current language:", language);
console.log("Translation key:", t("someKey"));
```

## Files to Update

To implement translations across your entire website, update these files:

1. **All page components** - Add `useTranslation()` hook
2. **Form components** - Replace hardcoded text with `t()` calls
3. **Button components** - Use translation keys for button text
4. **Modal components** - Translate titles and content
5. **Error messages** - Use translation keys for error states
6. **Success messages** - Use translation keys for success states

## Example: Complete Page Translation

Here's how a typical page should look after translation:

```typescript
import { useTranslation } from "@/lib/translationHelpers";

const CompletePage = () => {
  const { t } = useTranslation();

  return (
    <div>
      {/* Header */}
      <header>
        <h1>{t("pageTitle")}</h1>
        <p>{t("pageDescription")}</p>
      </header>

      {/* Search Section */}
      <section>
        <input placeholder={t("search")} />
        <button>{t("filter")}</button>
        <button>{t("sort")}</button>
      </section>

      {/* Content */}
      <main>
        {items.map((item) => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <p>
              {t("price")}: ${item.price}
            </p>
            <p>
              {t("rating")}: {item.rating}/5
            </p>
            <button>{t("view")}</button>
            <button>{t("book")}</button>
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer>
        <p>{t("loading")}</p>
        <button>{t("loadMore")}</button>
      </footer>
    </div>
  );
};
```

This system provides a complete, scalable translation solution for your entire GuideMe website!
