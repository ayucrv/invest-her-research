// Pendo Track Events for InvestHer (Women Invest Tracker)
//
// Client-side tracking module — call these functions from UI event handlers
// to send pendo.track() events. Requires the Pendo agent to be installed
// and initialized on the page before any of these functions are called.
//
// Usage:
//   import { trackOnboardingCompleted, trackInvestmentAdded } from './pendo-track-events';
//   trackOnboardingCompleted({ steps_completed: 5, investor_persona: "Growth Seeker" });

// --- Deduplication guards (module-level, survive component remounts) ---
const _trackedOnboarding = new Set();
const _trackedFirstTransaction = new Set();
const _trackedMilestones = new Set();
const _trackedReferralConversions = new Set();

/**
 * Safely call pendo.track(), no-op if Pendo is not loaded.
 */
function _track(eventName, properties) {
  if (typeof pendo !== "undefined" && typeof pendo.track === "function") {
    pendo.track(eventName, properties);
  }
}

// ─── 1. Onboarding & Profile ────────────────────────────────────────────────

/**
 * Fires when a new user completes the onboarding tutorial flow.
 * Deduplicated per visitor — fires once per browser session.
 */
export function trackOnboardingCompleted({
  steps_completed,
  onboarding_duration_seconds,
  investor_persona,
  referral_source,
  device_type,
} = {}) {
  const key = "onboarding";
  if (_trackedOnboarding.has(key)) return;
  _trackedOnboarding.add(key);

  _track("onboarding_completed", {
    steps_completed,
    onboarding_duration_seconds,
    investor_persona,
    referral_source,
    device_type,
  });
}

/**
 * Fires when a user completes the investor persona/profile questionnaire.
 */
export function trackInvestorProfileCompleted({
  assigned_persona,
  risk_tolerance,
  investment_experience_level,
  primary_decision_driver,
  primary_barrier,
  age_group,
  income_bracket,
} = {}) {
  _track("investor_profile_completed", {
    assigned_persona,
    risk_tolerance,
    investment_experience_level,
    primary_decision_driver,
    primary_barrier,
    age_group,
    income_bracket,
  });
}

/**
 * Fires when a user completes their very first investment transaction.
 * Deduplicated — fires at most once per browser session.
 */
export function trackFirstTransactionCompleted({
  transaction_amount,
  investment_type,
  fund_name,
  time_since_signup_days,
  time_since_onboarding_days,
  investor_persona,
  acquisition_channel,
} = {}) {
  const key = "first_txn";
  if (_trackedFirstTransaction.has(key)) return;
  _trackedFirstTransaction.add(key);

  _track("first_transaction_completed", {
    transaction_amount,
    investment_type,
    fund_name,
    time_since_signup_days,
    time_since_onboarding_days,
    investor_persona,
    acquisition_channel,
  });
}

// ─── 2. Portfolio & Investments ─────────────────────────────────────────────

/**
 * Fires when a user adds a new investment to their portfolio.
 */
export function trackInvestmentAdded({
  investment_type,
  investment_name,
  amount,
  currency,
  fund_category,
  is_first_investment,
  basket_source,
  is_esg_fund,
} = {}) {
  _track("investment_added", {
    investment_type,
    investment_name,
    amount,
    currency,
    fund_category,
    is_first_investment,
    basket_source,
    is_esg_fund,
  });
}

/**
 * Fires when a user sets up a new Systematic Investment Plan (SIP).
 */
export function trackSipCreated({
  sip_amount,
  sip_frequency,
  fund_name,
  fund_category,
  is_micro_sip,
  is_first_sip,
  investor_persona,
} = {}) {
  _track("sip_created", {
    sip_amount,
    sip_frequency,
    fund_name,
    fund_category,
    is_micro_sip,
    is_first_sip,
    investor_persona,
  });
}

/**
 * Fires when a user selects a curated fund basket (Beginner, Growth, or ESG).
 */
export function trackFundBasketSelected({
  basket_name,
  basket_type,
  fund_count,
  total_investment_amount,
  is_first_investment,
  decision_time_seconds,
  investor_persona,
} = {}) {
  _track("fund_basket_selected", {
    basket_name,
    basket_type,
    fund_count,
    total_investment_amount,
    is_first_investment,
    decision_time_seconds,
    investor_persona,
  });
}

/**
 * Fires when a user sells or redeems an investment.
 */
export function trackInvestmentSold({
  investment_type,
  investment_name,
  sell_amount,
  gain_loss_amount,
  gain_loss_percentage,
  holding_duration_days,
  is_full_redemption,
  market_condition,
} = {}) {
  _track("investment_sold", {
    investment_type,
    investment_name,
    sell_amount,
    gain_loss_amount,
    gain_loss_percentage,
    holding_duration_days,
    is_full_redemption,
    market_condition,
  });
}

/**
 * Fires when a portfolio reaches a value milestone (e.g. ₹10K, ₹50K, ₹1L).
 * Deduplicated per milestone_name — each milestone fires at most once per session.
 */
export function trackPortfolioMilestoneReached({
  milestone_value,
  milestone_name,
  portfolio_total_value,
  time_to_reach_days,
  total_investments_count,
  investor_persona,
} = {}) {
  if (!milestone_name) return;
  const key = `milestone_${milestone_name}`;
  if (_trackedMilestones.has(key)) return;
  _trackedMilestones.add(key);

  _track("portfolio_milestone_reached", {
    milestone_value,
    milestone_name,
    portfolio_total_value,
    time_to_reach_days,
    total_investments_count,
    investor_persona,
  });
}

/**
 * Fires when a user enables round-up investing (spare change auto-invested).
 */
export function trackRoundUpInvestingEnabled({
  linked_account_type,
  round_up_target_fund,
  investor_persona,
  portfolio_value_at_activation,
} = {}) {
  _track("round_up_investing_enabled", {
    linked_account_type,
    round_up_target_fund,
    investor_persona,
    portfolio_value_at_activation,
  });
}

/**
 * Fires when a user subscribes to the premium advisory tier.
 */
export function trackPremiumAdvisorySubscribed({
  subscription_plan,
  monthly_price,
  investor_persona,
  portfolio_value_at_upgrade,
  months_since_signup,
  referral_source,
} = {}) {
  _track("premium_advisory_subscribed", {
    subscription_plan,
    monthly_price,
    investor_persona,
    portfolio_value_at_upgrade,
    months_since_signup,
    referral_source,
  });
}

// ─── 3. AI Insights ─────────────────────────────────────────────────────────

/**
 * Fires when a user submits a query to the AI Insights feature.
 */
export function trackAiInsightRequested({
  query_text,
  query_category,
  response_type,
  portfolio_context_provided,
  investor_persona,
  is_first_query,
} = {}) {
  _track("ai_insight_requested", {
    query_text: query_text ? String(query_text).substring(0, 200) : undefined,
    query_category,
    response_type,
    portfolio_context_provided,
    investor_persona,
    is_first_query,
  });
}

/**
 * Fires when a user acts on an AI-generated recommendation.
 */
export function trackAiRecommendationActedOn({
  recommendation_type,
  recommendation_id,
  action_taken,
  investment_amount,
  fund_name,
  time_to_action_seconds,
} = {}) {
  _track("ai_recommendation_acted_on", {
    recommendation_type,
    recommendation_id,
    action_taken,
    investment_amount,
    fund_name,
    time_to_action_seconds,
  });
}

// ─── 4. Education ───────────────────────────────────────────────────────────

/**
 * Fires when a user completes an educational module or lesson.
 */
export function trackEducationModuleCompleted({
  module_id,
  module_name,
  module_level,
  learning_path,
  completion_duration_seconds,
  quiz_score,
  investor_persona,
  modules_completed_total,
} = {}) {
  _track("education_module_completed", {
    module_id,
    module_name,
    module_level,
    learning_path,
    completion_duration_seconds,
    quiz_score,
    investor_persona,
    modules_completed_total,
  });
}

/**
 * Fires when a user begins a persona-specific learning path.
 */
export function trackLearningPathStarted({
  learning_path_name,
  investor_persona,
  total_modules_in_path,
  difficulty_level,
} = {}) {
  _track("learning_path_started", {
    learning_path_name,
    investor_persona,
    total_modules_in_path,
    difficulty_level,
  });
}

// ─── 5. Community & Referrals ───────────────────────────────────────────────

/**
 * Fires when a user sends a referral invitation.
 */
export function trackReferralSent({
  referral_method,
  referral_channel,
  referrer_investor_persona,
  referrer_portfolio_value,
  referrer_months_active,
  total_referrals_sent,
} = {}) {
  _track("referral_sent", {
    referral_method,
    referral_channel,
    referrer_investor_persona,
    referrer_portfolio_value,
    referrer_months_active,
    total_referrals_sent,
  });
}

/**
 * Fires when a referred user signs up and completes their first investment.
 * Deduplicated per referrer — fires once per converted referral per session.
 */
export function trackReferralConverted({
  referrer_user_id,
  referral_channel,
  time_to_convert_days,
  first_investment_amount,
  referred_user_persona,
} = {}) {
  if (referrer_user_id) {
    const key = `ref_${referrer_user_id}`;
    if (_trackedReferralConversions.has(key)) return;
    _trackedReferralConversions.add(key);
  }

  _track("referral_converted", {
    referral_channel,
    time_to_convert_days,
    first_investment_amount,
    referred_user_persona,
  });
}

/**
 * Fires when a user joins an investment circle (peer group).
 */
export function trackCommunityCircleJoined({
  circle_id,
  circle_name,
  circle_member_count,
  investor_persona,
  is_first_circle,
  join_method,
} = {}) {
  _track("community_circle_joined", {
    circle_id,
    circle_name,
    circle_member_count,
    investor_persona,
    is_first_circle,
    join_method,
  });
}

/**
 * Fires when a user shares a portfolio milestone on the Wall of Wins.
 */
export function trackMilestoneShared({
  milestone_type,
  milestone_value,
  share_visibility,
  community_reactions_count,
  investor_persona,
} = {}) {
  _track("milestone_shared", {
    milestone_type,
    milestone_value,
    share_visibility,
    community_reactions_count,
    investor_persona,
  });
}

/**
 * Fires when a user posts a question in the community Q&A forum.
 */
export function trackCommunityQuestionPosted({
  question_category,
  question_length,
  circle_id,
  investor_persona,
  is_first_post,
  total_posts_by_user,
} = {}) {
  _track("community_question_posted", {
    question_category,
    question_length,
    circle_id,
    investor_persona,
    is_first_post,
    total_posts_by_user,
  });
}

// ─── 6. Dashboard & Reports ────────────────────────────────────────────────

/**
 * Fires when a user generates or exports a portfolio performance report.
 */
export function trackPortfolioReportGenerated({
  report_type,
  report_period,
  export_format,
  portfolio_value,
  investments_count,
  gain_loss_percentage,
} = {}) {
  _track("portfolio_report_generated", {
    report_type,
    report_period,
    export_format,
    portfolio_value,
    investments_count,
    gain_loss_percentage,
  });
}
