# Pendo Track Events — InvestHer

Client-side Pendo Track Event instrumentation for the Women Invest Tracker platform.

## Setup

The Pendo agent must be installed and initialized on the page **before** any tracking function is called. See [Pendo Install Guide](https://support.pendo.io/hc/en-us/articles/21362607464987-Developer-s-guide-to-installing-Pendo) for details.

## Usage

Import the functions you need and call them from your UI event handlers:

```js
import {
  trackOnboardingCompleted,
  trackInvestmentAdded,
  trackSipCreated,
} from "./pendo-track-events";

// After the user finishes onboarding
trackOnboardingCompleted({
  steps_completed: 5,
  onboarding_duration_seconds: 240,
  investor_persona: "Growth Seeker",
  referral_source: "friend",
  device_type: "mobile",
});

// After a successful investment submission
trackInvestmentAdded({
  investment_type: "mutual_fund",
  investment_name: "Axis Bluechip Fund",
  amount: 5000,
  currency: "INR",
  fund_category: "equity",
  is_first_investment: true,
  basket_source: "Beginner",
  is_esg_fund: false,
});

// After a SIP is created
trackSipCreated({
  sip_amount: 100,
  sip_frequency: "monthly",
  fund_name: "HDFC Index Fund",
  fund_category: "index",
  is_micro_sip: true,
  is_first_sip: true,
  investor_persona: "Cautious Analyzer",
});
```

## Events

| Event | Function | When to fire |
|---|---|---|
| `onboarding_completed` | `trackOnboardingCompleted` | User finishes the onboarding tutorial |
| `investor_profile_completed` | `trackInvestorProfileCompleted` | User completes the persona questionnaire |
| `first_transaction_completed` | `trackFirstTransactionCompleted` | User makes their very first investment |
| `investment_added` | `trackInvestmentAdded` | User adds an investment to their portfolio |
| `sip_created` | `trackSipCreated` | User sets up a Systematic Investment Plan |
| `fund_basket_selected` | `trackFundBasketSelected` | User picks a curated fund basket |
| `investment_sold` | `trackInvestmentSold` | User sells/redeems an investment |
| `portfolio_milestone_reached` | `trackPortfolioMilestoneReached` | Portfolio crosses a value milestone |
| `round_up_investing_enabled` | `trackRoundUpInvestingEnabled` | User enables round-up investing |
| `premium_advisory_subscribed` | `trackPremiumAdvisorySubscribed` | User subscribes to premium advisory |
| `ai_insight_requested` | `trackAiInsightRequested` | User queries the AI Insights feature |
| `ai_recommendation_acted_on` | `trackAiRecommendationActedOn` | User acts on an AI recommendation |
| `education_module_completed` | `trackEducationModuleCompleted` | User completes a learning module |
| `learning_path_started` | `trackLearningPathStarted` | User begins a learning path |
| `referral_sent` | `trackReferralSent` | User sends a referral invitation |
| `referral_converted` | `trackReferralConverted` | A referred user completes their first investment |
| `community_circle_joined` | `trackCommunityCircleJoined` | User joins an investment circle |
| `milestone_shared` | `trackMilestoneShared` | User shares a milestone on the Wall of Wins |
| `community_question_posted` | `trackCommunityQuestionPosted` | User posts in the Q&A forum |
| `portfolio_report_generated` | `trackPortfolioReportGenerated` | User generates a portfolio report |

## Deduplication

One-time milestone events (`onboarding_completed`, `first_transaction_completed`, `portfolio_milestone_reached`, `referral_converted`) use module-level `Set` guards. They fire at most once per page session — surviving component remounts but resetting on full page reload. If you need lifetime deduplication, gate on a persistent flag (localStorage or database) before calling the function.
