
import { FormSection } from '@/types/form';

export const formSections: FormSection[] = [
  {
    id: 'platform-goals',
    title: 'Platform Goals & Property Types',
    description: 'Let\'s understand your primary objectives and target market.',
    questions: [
      {
        id: 'primary_goal',
        label: '1. What is the primary goal of your PMS platform?',
        type: 'multiselect',
        required: true,
        options: [
          { value: 'automate_operations', label: 'Automate hotel operations' },
          { value: 'saas_platform', label: 'Build a SaaS platform' },
          { value: 'compete_legacy', label: 'Compete with legacy PMS providers' },
          { value: 'white_label', label: 'Create a white-label solution' },
          { value: 'other', label: 'Other' }
        ]
      },
      {
        id: 'property_types',
        label: '2. What types of properties will your system support?',
        type: 'multiselect',
        required: true,
        options: [
          { value: 'independent_hotels', label: 'Independent hotels' },
          { value: 'resorts', label: 'Resorts' },
          { value: 'guesthouses', label: 'Guesthouses / B&Bs' },
          { value: 'serviced_apartments', label: 'Serviced apartments' },
          { value: 'other', label: 'Other' }
        ]
      },
      {
        id: 'deployment_model',
        label: '3. What deployment models do you want to support?',
        type: 'radio',
        required: true,
        options: [
          { value: 'cloud', label: 'Cloud (SaaS)' },
          { value: 'on_premise', label: 'On-premise' },
          { value: 'hybrid', label: 'Hybrid (on-prem + cloud backup)' }
        ]
      },
      {
        id: 'multi_property',
        label: '4. Will your system support multi-property management (multi-tenancy)?',
        type: 'radio',
        required: true,
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]
      }
    ]
  },
  {
    id: 'reservations-rates',
    title: 'Reservations & Rate Management',
    description: 'Define how your system will handle bookings and pricing.',
    questions: [
      {
        id: 'reservation_types',
        label: '5. What types of reservations should be supported?',
        type: 'multiselect',
        required: true,
        options: [
          { value: 'walk_in', label: 'Walk-in' },
          { value: 'direct_website', label: 'Direct website bookings' },
          { value: 'ota', label: 'OTA (e.g., Booking.com, Airbnb)' },
          { value: 'corporate_group', label: 'Corporate / Group bookings' }
        ]
      },
      {
        id: 'rate_plan_types',
        label: '6. What rate plan types should be supported?',
        type: 'multiselect',
        required: true,
        options: [
          { value: 'standard_daily', label: 'Standard daily rate' },
          { value: 'seasonal_pricing', label: 'Seasonal pricing' },
          { value: 'promo_codes', label: 'Promo/discount codes' },
          { value: 'meal_plan', label: 'Meal plan bundling' },
          { value: 'per_guest', label: 'Per-guest pricing' }
        ]
      },
      {
        id: 'reservation_interface',
        label: '7. Should the reservation interface include the following?',
        type: 'multiselect',
        required: false,
        options: [
          { value: 'calendar_view', label: 'Calendar view (day/week/month)' },
          { value: 'auto_assignment', label: 'Auto room assignment' },
          { value: 'drag_drop', label: 'Drag-and-drop reservation edit' },
          { value: 'waitlist', label: 'Waitlist and hold bookings' }
        ]
      }
    ]
  },
  {
    id: 'payments-operations',
    title: 'Payments & Daily Operations',
    description: 'Configure payment processing and operational workflows.',
    questions: [
      {
        id: 'payment_methods',
        label: '8. What payment methods will the system need to support?',
        type: 'multiselect',
        required: true,
        options: [
          { value: 'credit_debit', label: 'Credit/debit cards' },
          { value: 'online_gateways', label: 'Online gateways (Stripe, Razorpay)' },
          { value: 'wallets_upi', label: 'Wallets / UPI' },
          { value: 'cash_bank', label: 'Cash / Bank transfer' }
        ]
      },
      {
        id: 'housekeeping_functions',
        label: '9. What housekeeping functions should be supported?',
        type: 'multiselect',
        required: true,
        options: [
          { value: 'room_status', label: 'Room status: Clean, Dirty, Inspected, Maintenance' },
          { value: 'task_assignment', label: 'Task assignment by shift' },
          { value: 'mobile_updates', label: 'Mobile updates for staff' },
          { value: 'lost_found', label: 'Lost & found tracking' }
        ]
      },
      {
        id: 'maintenance_features',
        label: '10. What maintenance features are required?',
        type: 'multiselect',
        required: true,
        options: [
          { value: 'ticketing_system', label: 'Maintenance ticketing system' },
          { value: 'preventive_scheduling', label: 'Preventive maintenance scheduling' },
          { value: 'technician_assignment', label: 'Technician task assignment' },
          { value: 'maintenance_log', label: 'Maintenance log per room' }
        ]
      }
    ]
  },
  {
    id: 'billing-features',
    title: 'Billing & Financial Management',
    description: 'Set up billing, payments, and financial reporting features.',
    questions: [
      {
        id: 'billing_features',
        label: '11. What billing features should be included?',
        type: 'multiselect',
        required: true,
        options: [
          { value: 'split_billing', label: 'Split billing (e.g., room + minibar)' },
          { value: 'invoice_generation', label: 'Invoice generation' },
          { value: 'refund_management', label: 'Refund management' },
          { value: 'multi_currency', label: 'Multi-currency handling' },
          { value: 'tax_configuration', label: 'Tax configuration (e.g., GST/VAT)' }
        ]
      },
      {
        id: 'payment_features',
        label: '12. Which payment features do you want?',
        type: 'multiselect',
        required: true,
        options: [
          { value: 'gateway_integration', label: 'Secure payment gateway integration' },
          { value: 'folio_management', label: 'Folio management (group & individual)' },
          { value: 'pci_compliance', label: 'PCI-DSS compliance' }
        ]
      }
    ]
  },
  {
    id: 'integrations',
    title: 'OTA & Channel Integrations',
    description: 'Define your online travel agency and distribution channel requirements.',
    questions: [
      {
        id: 'ota_integrations',
        label: '13. Which OTA integrations are needed?',
        type: 'multiselect',
        required: true,
        options: [
          { value: 'booking_com', label: 'Booking.com' },
          { value: 'airbnb', label: 'Airbnb' },
          { value: 'expedia', label: 'Expedia' },
          { value: 'agoda', label: 'Agoda' },
          { value: 'hotelbeds', label: 'Hotelbeds' },
          { value: 'other', label: 'Other' }
        ]
      },
      {
        id: 'ota_phase1',
        label: '14. Do you require OTA/channel manager integration in Phase 1?',
        type: 'radio',
        required: true,
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]
      },
      {
        id: 'ota_sync_method',
        label: '15. How will OTA sync be handled?',
        type: 'radio',
        required: true,
        options: [
          { value: 'native', label: 'Native integration' },
          { value: 'third_party', label: 'Third-party channel manager (e.g., STAAH, SiteMinder)' }
        ]
      }
    ]
  },
  {
    id: 'reviews-analytics',
    title: 'Review Management & Analytics',
    description: 'Configure review management and reporting capabilities.',
    questions: [
      {
        id: 'review_platforms',
        label: '16. Which review platforms should be integrated?',
        type: 'multiselect',
        required: false,
        options: [
          { value: 'google', label: 'Google' },
          { value: 'booking_com', label: 'Booking.com' },
          { value: 'tripadvisor', label: 'TripAdvisor' },
          { value: 'airbnb', label: 'Airbnb' },
          { value: 'yelp', label: 'Yelp' },
          { value: 'hotels_com', label: 'Hotels.com' },
          { value: 'other', label: 'Other' }
        ]
      },
      {
        id: 'review_frequency',
        label: '17. How frequently should reviews be fetched?',
        type: 'select',
        required: false,
        options: [
          { value: 'realtime', label: 'Real-time' },
          { value: 'hourly', label: 'Hourly' },
          { value: 'daily', label: 'Daily' },
          { value: 'weekly', label: 'Weekly' }
        ]
      },
      {
        id: 'review_features',
        label: '18. What review features should be supported?',
        type: 'multiselect',
        required: false,
        options: [
          { value: 'centralized_inbox', label: 'Centralized inbox' },
          { value: 'sentiment_analysis', label: 'Sentiment analysis' },
          { value: 'tagging_filtering', label: 'Tagging & filtering' },
          { value: 'ai_replies', label: 'AI-generated replies' },
          { value: 'reply_publishing', label: 'Reply publishing via API' },
          { value: 'multilingual_replies', label: 'Multilingual reply generation' },
          { value: 'analytics_reporting', label: 'Analytics & reporting' }
        ]
      },
      {
        id: 'ai_reply_type',
        label: '19. What kind of AI replies should be enabled?',
        type: 'radio',
        required: false,
        options: [
          { value: 'suggested', label: 'Suggested reply with manual approval' },
          { value: 'auto_rating', label: 'Auto-reply based on rating' },
          { value: 'manual_only', label: 'None (manual replies only)' }
        ]
      },
      {
        id: 'analytics_reports',
        label: '20. Which analytics reports do you need?',
        type: 'multiselect',
        required: true,
        options: [
          { value: 'daily_revenue', label: 'Daily revenue' },
          { value: 'occupancy_adr', label: 'Occupancy & ADR' },
          { value: 'tax_summary', label: 'Tax summary' },
          { value: 'channel_performance', label: 'Source/channel performance' },
          { value: 'review_sentiment', label: 'Review sentiment trends' },
          { value: 'exportable', label: 'Exportable (PDF, Excel)' }
        ]
      },
      {
        id: 'scheduled_reports',
        label: '21. Should reports be scheduled and emailed automatically?',
        type: 'radio',
        required: true,
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]
      }
    ]
  },
  {
    id: 'system-access',
    title: 'System Access & Security',
    description: 'Define user roles, security requirements, and access controls.',
    questions: [
      {
        id: 'third_party_integrations',
        label: '22. What third-party integrations are required?',
        type: 'multiselect',
        required: false,
        options: [
          { value: 'pos', label: 'POS (F&B, Spa)' },
          { value: 'door_locks', label: 'Door lock system' },
          { value: 'wifi_login', label: 'Wi-Fi login' },
          { value: 'crm', label: 'CRM' },
          { value: 'accounting', label: 'Accounting software' },
          { value: 'custom_api', label: 'Custom API access' }
        ]
      },
      {
        id: 'public_api',
        label: '23. Do you require a public API for developers/partners?',
        type: 'radio',
        required: true,
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]
      },
      {
        id: 'user_roles',
        label: '24. What user roles should the system support?',
        type: 'multiselect',
        required: true,
        options: [
          { value: 'admin', label: 'Admin' },
          { value: 'front_desk', label: 'Front Desk' },
          { value: 'housekeeping', label: 'Housekeeping' },
          { value: 'maintenance', label: 'Maintenance' },
          { value: 'marketing', label: 'Marketing' },
          { value: 'review_manager', label: 'Review Manager' }
        ]
      },
      {
        id: 'security_features',
        label: '25. What security features are important to you?',
        type: 'multiselect',
        required: true,
        options: [
          { value: 'role_based_access', label: 'Role-based access' },
          { value: 'two_factor_auth', label: '2FA' },
          { value: 'audit_logging', label: 'Audit logging' },
          { value: 'gdpr_pci_compliance', label: 'GDPR/PCI compliance' }
        ]
      }
    ]
  },
  {
    id: 'business-model',
    title: 'Business Model & Launch Timeline',
    description: 'Define your business model, pricing strategy, and launch timeline.',
    questions: [
      {
        id: 'white_label',
        label: '26. Should the PMS be white-labeled?',
        type: 'radio',
        required: true,
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]
      },
      {
        id: 'billing_models',
        label: '27. What SaaS billing models should be supported?',
        type: 'multiselect',
        required: true,
        options: [
          { value: 'monthly', label: 'Monthly subscription' },
          { value: 'annual', label: 'Annual plans' },
          { value: 'per_room', label: 'Per-room or per-property pricing' },
          { value: 'usage_based', label: 'Usage-based (e.g., per booking)' }
        ]
      },
      {
        id: 'mvp_timeline',
        label: '28. What is your target timeline for MVP launch?',
        type: 'text',
        required: true,
        placeholder: 'e.g., 6 months, Q2 2024, etc.'
      },
      {
        id: 'training_tools',
        label: '29. Do you need training/onboarding tools for your clients?',
        type: 'radio',
        required: true,
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]
      },
      {
        id: 'additional_requirements',
        label: '30. Any specific requirements, goals, or technical constraints?',
        type: 'textarea',
        required: false,
        placeholder: 'Please describe any additional requirements, specific goals, technical constraints, or other considerations for your PMS development...'
      }
    ]
  }
];
