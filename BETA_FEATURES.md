# 🚀 Sentryax Beta - Features & Technical Architecture

## 📋 Features Overview

### ✅ Core Features (Must-Have)

#### 1. 💰 Surveillance des Prix (Price Monitoring)
**Description**: Track competitor prices in real-time with historical data and instant alerts.

**Features**:
- Real-time price tracking (hourly/daily checks)
- Price history with interactive charts
- Price drop/increase alerts (email, Slack, Discord, webhooks)
- Multi-currency support
- Percentage change calculations
- Competitor comparison dashboard

**Tech Stack**:
- **Scraping**: Puppeteer/Playwright (headless Chrome)
- **Proxies**: Bright Data, Oxylabs, or ScraperAPI (rotating proxies)
- **Storage**: PostgreSQL (price history), Redis (cache)
- **Cron**: Vercel Cron or Inngest for scheduled scraping
- **Charts**: Recharts or Chart.js

**Supported Sites (Initial)**:
- Amazon
- Fnac
- Darty
- Boulanger
- Cdiscount
- Custom URLs (user-provided)

**Data Model**:
```typescript
interface PriceHistory {
  id: string;
  productId: string;
  competitorId: string;
  price: number;
  currency: string;
  inStock: boolean;
  scrapedAt: Date;
}
```

---

#### 2. 🔍 Change Detection (Site Monitoring)
**Description**: Detect any changes on competitor websites (prices, descriptions, images, stock).

**Features**:
- Visual diff (screenshot comparison)
- Text diff (descriptions, titles, specs)
- Image change detection
- Stock availability tracking
- DOM element monitoring
- Change history timeline
- Side-by-side comparison view

**Tech Stack**:
- **Scraping**: Puppeteer (screenshots + HTML)
- **Diff Algorithms**: 
  - `pixelmatch` (image diff)
  - `diff-match-patch` (text diff)
  - `jsondiffpatch` (structured data)
- **Storage**: S3/Cloudflare R2 (screenshots), PostgreSQL (metadata)
- **Processing**: Background jobs (Inngest/BullMQ)

**Data Model**:
```typescript
interface ChangeDetection {
  id: string;
  productId: string;
  changeType: 'price' | 'description' | 'image' | 'stock' | 'other';
  oldValue: string;
  newValue: string;
  screenshotBefore?: string; // S3 URL
  screenshotAfter?: string;
  detectedAt: Date;
}
```

---

#### 3. 🆕 Surveillance Nouveaux Produits (New Product Detection)
**Description**: Get alerted when competitors launch new products.

**Features**:
- Automatic new product detection
- Product catalog monitoring
- Launch date tracking
- Product details extraction (name, price, category, images)
- Instant alerts on new launches

**Tech Stack**:
- **Detection Methods**:
  - Sitemap.xml parsing
  - RSS feed monitoring
  - Category page scraping
  - Product ID range detection
- **Storage**: PostgreSQL (product catalog)
- **Alerts**: Email, Slack, Discord

**Data Model**:
```typescript
interface Product {
  id: string;
  competitorId: string;
  externalId: string; // Competitor's product ID
  name: string;
  url: string;
  price: number;
  category: string;
  imageUrl: string;
  firstSeenAt: Date;
  isNew: boolean;
}
```

---

#### 4. ⭐ Analyse des Avis Clients (Review Analysis)
**Description**: Monitor and analyze customer reviews with sentiment analysis.

**Features**:
- Review scraping from multiple sources
- Sentiment analysis (positive/negative/neutral)
- Rating trends over time
- Common complaints/praises detection
- Review volume tracking
- Competitor review comparison

**Tech Stack**:
- **Scraping**: 
  - Google Reviews (via SerpAPI or scraping)
  - Trustpilot API
  - Amazon reviews (scraping)
  - Site-specific reviews
- **AI**: OpenAI API (GPT-4 for sentiment analysis)
- **Storage**: PostgreSQL (reviews), Vector DB (embeddings)

**APIs**:
- SerpAPI ($50-200/month) - Google Reviews
- Trustpilot API (free tier available)
- OpenAI API ($20-100/month for sentiment)

**Data Model**:
```typescript
interface Review {
  id: string;
  productId: string;
  competitorId: string;
  rating: number; // 1-5
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  sentimentScore: number; // -1 to 1
  author: string;
  date: Date;
  source: string; // 'google', 'trustpilot', 'amazon'
}
```

---

#### 5. 📧 Email Espion (Email Campaign Tracking)
**Description**: Track competitor email marketing campaigns.

**Features**:
- Email inbox monitoring
- Campaign frequency tracking
- Subject line analysis
- Promo code extraction
- Email template screenshots
- Send time analysis

**Tech Stack**:
- **Email Creation**: 
  - TempMail API (free, disposable emails)
  - Guerrilla Mail API
  - User's own emails (BYOE - Bring Your Own Email)
- **Email Parsing**: 
  - SendGrid Inbound Parse (free 100 emails/day)
  - Mailgun API
  - Custom IMAP client
- **Storage**: PostgreSQL (campaigns), S3 (email HTML)

**Legal Disclaimer**:
```
⚠️ Users must only track emails sent to addresses they control.
Sentryax does not create fake accounts or violate GDPR/CAN-SPAM.
```

**Data Model**:
```typescript
interface EmailCampaign {
  id: string;
  competitorId: string;
  subject: string;
  fromEmail: string;
  htmlContent: string;
  textContent: string;
  promoCode?: string;
  sentAt: Date;
  screenshotUrl?: string;
}
```

---

#### 6. 🔎 Analyse SEO Mots-Clés (SEO Keyword Tracking)
**Description**: Track competitor keyword rankings and discover opportunities.

**Features**:
- Keyword position tracking (Google, Bing)
- Competitor ranking comparison
- Keyword difficulty scores
- Search volume data
- SERP feature tracking (featured snippets, ads)
- Keyword gap analysis

**Tech Stack**:
- **APIs**:
  - SerpAPI ($50-500/month) - SERP scraping
  - DataForSEO ($100-300/month) - Cheaper alternative
  - ValueSERP ($50/month) - Budget option
- **Storage**: PostgreSQL (rankings history)
- **Cron**: Daily/weekly ranking checks

**Pricing Strategy**:
- User pays for API credits (pass-through pricing)
- Or include X keywords in each plan tier

**Data Model**:
```typescript
interface KeywordRanking {
  id: string;
  competitorId: string;
  keyword: string;
  position: number;
  url: string;
  searchEngine: 'google' | 'bing';
  country: string;
  checkedAt: Date;
}
```

---

#### 7. 📱 Surveillance Médias Sociaux (Social Media Monitoring)
**Description**: Track competitor social media activity and ad campaigns.

**Features**:
- Ad campaign tracking (Facebook, Google, TikTok)
- Organic post monitoring
- Engagement metrics (likes, shares, comments)
- Posting frequency analysis
- Content type analysis (video, image, text)
- Influencer partnerships detection

**Tech Stack - LEGAL Methods Only**:

**Facebook Ads**:
- Facebook Ad Library API (FREE, public data)
- No scraping needed, fully legal
- API: `https://www.facebook.com/ads/library/api/`

**Twitter/X**:
- Twitter API v2 (Basic: $100/month, Pro: $5000/month)
- Alternative: Apify Twitter Scraper ($49/month)

**TikTok**:
- TikTok Creative Center (public, free)
- Manual scraping with rate limiting

**Instagram**:
- Instagram Graph API (limited, requires business account)
- Alternative: Apify Instagram Scraper

**LinkedIn**:
- LinkedIn API (very limited)
- Manual tracking

**APIs & Costs**:
```
Facebook Ad Library API: FREE ✅
Twitter API v2 Basic: $100/month
Apify (all platforms): $49-199/month
RapidAPI Social Media Bundle: $50-150/month
```

**Data Model**:
```typescript
interface SocialPost {
  id: string;
  competitorId: string;
  platform: 'facebook' | 'twitter' | 'instagram' | 'tiktok' | 'linkedin';
  postType: 'ad' | 'organic';
  content: string;
  mediaUrls: string[];
  engagement: {
    likes: number;
    shares: number;
    comments: number;
  };
  postedAt: Date;
  adSpend?: number; // If available
}
```

---

## 🏗️ Technical Architecture

### **Backend Stack**
```
- Framework: Next.js 15 (App Router)
- Database: PostgreSQL (Supabase)
- Cache: Redis (Upstash)
- Storage: S3 / Cloudflare R2
- Jobs: Inngest or BullMQ
- Scraping: Puppeteer + Bright Data proxies
```

### **Frontend Stack**
```
- Framework: Next.js 15 + React 19
- Styling: TailwindCSS
- Components: shadcn/ui
- Charts: Recharts
- State: Zustand or React Query
```

### **Infrastructure**
```
- Hosting: Vercel (frontend + API routes)
- Database: Supabase (PostgreSQL + Auth)
- Scraping: Railway or Fly.io (Puppeteer instances)
- Cron: Vercel Cron or Inngest
- Monitoring: Sentry
```

### **APIs & Services**
```
✅ Free/Cheap:
- Facebook Ad Library API (FREE)
- TempMail API (FREE)
- SendGrid (FREE 100 emails/day)
- Supabase (FREE tier)

💰 Paid (Required):
- Bright Data proxies ($50-200/month)
- SerpAPI ($50-200/month)
- OpenAI API ($20-100/month)
- Twitter API v2 ($100/month)

💰 Optional:
- Trustpilot API (FREE tier)
- Apify ($49-199/month)
```

---

## 📊 Database Schema

```sql
-- Competitors
CREATE TABLE competitors (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  name TEXT NOT NULL,
  website_url TEXT NOT NULL,
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products
CREATE TABLE products (
  id UUID PRIMARY KEY,
  competitor_id UUID REFERENCES competitors,
  external_id TEXT,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  current_price DECIMAL,
  currency TEXT DEFAULT 'EUR',
  in_stock BOOLEAN DEFAULT true,
  image_url TEXT,
  category TEXT,
  first_seen_at TIMESTAMPTZ DEFAULT NOW(),
  last_checked_at TIMESTAMPTZ
);

-- Price History
CREATE TABLE price_history (
  id UUID PRIMARY KEY,
  product_id UUID REFERENCES products,
  price DECIMAL NOT NULL,
  currency TEXT,
  in_stock BOOLEAN,
  scraped_at TIMESTAMPTZ DEFAULT NOW()
);

-- Change Detection
CREATE TABLE change_detections (
  id UUID PRIMARY KEY,
  product_id UUID REFERENCES products,
  change_type TEXT NOT NULL,
  old_value TEXT,
  new_value TEXT,
  screenshot_before TEXT,
  screenshot_after TEXT,
  detected_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews
CREATE TABLE reviews (
  id UUID PRIMARY KEY,
  product_id UUID REFERENCES products,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  text TEXT,
  sentiment TEXT CHECK (sentiment IN ('positive', 'negative', 'neutral')),
  sentiment_score DECIMAL,
  author TEXT,
  source TEXT,
  review_date TIMESTAMPTZ,
  scraped_at TIMESTAMPTZ DEFAULT NOW()
);

-- Email Campaigns
CREATE TABLE email_campaigns (
  id UUID PRIMARY KEY,
  competitor_id UUID REFERENCES competitors,
  subject TEXT NOT NULL,
  from_email TEXT,
  html_content TEXT,
  promo_code TEXT,
  screenshot_url TEXT,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Keyword Rankings
CREATE TABLE keyword_rankings (
  id UUID PRIMARY KEY,
  competitor_id UUID REFERENCES competitors,
  keyword TEXT NOT NULL,
  position INTEGER,
  url TEXT,
  search_engine TEXT DEFAULT 'google',
  country TEXT DEFAULT 'FR',
  checked_at TIMESTAMPTZ DEFAULT NOW()
);

-- Social Posts
CREATE TABLE social_posts (
  id UUID PRIMARY KEY,
  competitor_id UUID REFERENCES competitors,
  platform TEXT NOT NULL,
  post_type TEXT CHECK (post_type IN ('ad', 'organic')),
  content TEXT,
  media_urls TEXT[],
  likes INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  posted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Alerts
CREATE TABLE alerts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  alert_type TEXT NOT NULL,
  conditions JSONB,
  channels TEXT[], -- ['email', 'slack', 'discord']
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 🎯 MVP Roadmap (8 weeks)

### **Week 1-2: Core Infrastructure**
- ✅ Database schema setup
- ✅ Authentication (Supabase)
- ✅ Dashboard layout
- ✅ Competitor management (CRUD)
- ✅ Product management (CRUD)

### **Week 3-4: Price Monitoring**
- ✅ Puppeteer scraping setup
- ✅ Proxy integration (Bright Data)
- ✅ Price history tracking
- ✅ Charts & visualizations
- ✅ Email alerts

### **Week 5: Change Detection**
- ✅ Screenshot capture
- ✅ Diff algorithms (image + text)
- ✅ Change history UI
- ✅ Alerts

### **Week 6: New Products + Reviews**
- ✅ Sitemap parsing
- ✅ New product detection
- ✅ Review scraping
- ✅ Sentiment analysis (OpenAI)

### **Week 7: Email + SEO**
- ✅ Email tracking setup
- ✅ Campaign dashboard
- ✅ SEO keyword tracking (SerpAPI)
- ✅ Ranking charts

### **Week 8: Social Media + Polish**
- ✅ Facebook Ad Library integration
- ✅ Twitter API integration
- ✅ Social dashboard
- ✅ Final testing & bug fixes
- ✅ Launch prep

---

## 💰 Pricing Tiers

### **Starter - $49/month**
- 1 competitor
- 50 products tracked
- Hourly price checks
- Email alerts
- 30-day history
- Basic change detection

### **Pro - $99/month**
- 3 competitors
- 200 products tracked
- Real-time price checks
- All alerts (email, Slack, Discord)
- 90-day history
- Full change detection
- New product alerts
- Review analysis (100 reviews/month)
- Email tracking (5 campaigns/month)

### **Business - $199/month**
- 10 competitors
- 1000 products tracked
- Real-time monitoring
- All features included
- Unlimited history
- API access
- SEO tracking (50 keywords)
- Social media monitoring
- Priority support

### **Enterprise - Custom**
- Unlimited competitors & products
- White-label option
- Dedicated scraping infrastructure
- Custom integrations
- SLA guarantee

---

## 🚀 Launch Checklist

### **Pre-Launch**
- [ ] All 7 features implemented
- [ ] Database optimized (indexes, queries)
- [ ] Error handling & logging (Sentry)
- [ ] Rate limiting (scraping + API)
- [ ] Legal pages (Terms, Privacy, GDPR)
- [ ] Pricing page
- [ ] Onboarding flow
- [ ] Email templates (transactional)

### **Marketing**
- [ ] Landing page SEO optimized
- [ ] Product Hunt launch prep
- [ ] Social media accounts
- [ ] Demo video
- [ ] Case studies (beta users)
- [ ] Blog posts (SEO content)

### **Post-Launch**
- [ ] User feedback collection
- [ ] Bug fixes
- [ ] Performance optimization
- [ ] Feature requests prioritization
- [ ] Growth experiments

---

## 📝 Notes

### **Legal Considerations**
- ✅ All scraping is legal (public data)
- ✅ Respect robots.txt
- ✅ Rate limiting to avoid DDoS accusations
- ✅ GDPR compliant (user data handling)
- ✅ Clear Terms of Service
- ✅ Email tracking disclaimer

### **Scalability**
- Use job queues for scraping (avoid blocking)
- Implement caching (Redis) for expensive operations
- Horizontal scaling for Puppeteer instances
- CDN for static assets (screenshots)
- Database read replicas for analytics

### **Monitoring**
- Sentry for error tracking
- Uptime monitoring (UptimeRobot)
- Scraping success rate dashboard
- API usage tracking
- Cost monitoring (APIs, proxies)

---

## 🔥 Let's Build This! 

**Next Steps**:
1. Set up database schema
2. Implement competitor & product CRUD
3. Build first scraper (price monitoring)
4. Deploy to production
5. Iterate based on feedback

**Questions? Let's code! 🚀**
