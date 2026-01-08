declare global {
  interface Window {
    dataLayer: any[];
    fbq: (...args: any[]) => void;
  }
}

// Get Facebook cookies for better attribution
const getFbCookies = () => {
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);
  
  return {
    fbc: cookies['_fbc'] || undefined,
    fbp: cookies['_fbp'] || undefined,
  };
};

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...params,
    });
  }
};

export const trackMetaEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
  }
};

// Server-side Meta Conversion API call
export const sendMetaConversionEvent = async (
  eventName: string,
  userData?: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
  },
  customData?: Record<string, any>
) => {
  try {
    const fbCookies = getFbCookies();
    
    const response = await fetch('/api/meta/conversion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventName,
        eventTime: Math.floor(Date.now() / 1000),
        eventSourceUrl: window.location.href,
        userData: {
          ...userData,
          ...fbCookies,
        },
        customData,
        actionSource: 'website',
      }),
    });

    if (!response.ok) {
      console.error('Meta Conversion API error:', await response.text());
    }
  } catch (error) {
    console.error('Failed to send Meta Conversion event:', error);
  }
};

export const trackPageView = (pageName: string) => {
  trackEvent('page_view', { page_name: pageName });
  trackMetaEvent('PageView');
  sendMetaConversionEvent('PageView', undefined, { content_name: pageName });
};

export const trackInitiateCheckout = (value: number, currency: string = 'INR') => {
  trackEvent('begin_checkout', { value, currency });
  trackMetaEvent('InitiateCheckout', { value, currency });
  sendMetaConversionEvent('InitiateCheckout', undefined, { value, currency });
};

export const trackPurchase = (
  value: number, 
  transactionId: string, 
  currency: string = 'INR',
  userData?: { email?: string; phone?: string; firstName?: string; lastName?: string }
) => {
  trackEvent('purchase', { 
    value, 
    currency, 
    transaction_id: transactionId 
  });
  trackMetaEvent('Purchase', { 
    value, 
    currency, 
    content_type: 'product',
    content_name: 'Vyaparify Premium Annual Subscription'
  });
  sendMetaConversionEvent('Purchase', userData, {
    value,
    currency,
    content_type: 'product',
    content_name: 'Vyaparify Premium Annual Subscription',
    order_id: transactionId,
  });
};

export const trackLead = (params?: { 
  email?: string; 
  phone?: string; 
  firstName?: string; 
  lastName?: string;
  source?: string;
}) => {
  trackEvent('generate_lead', params);
  trackMetaEvent('Lead', params);
  sendMetaConversionEvent('Lead', {
    email: params?.email,
    phone: params?.phone,
    firstName: params?.firstName,
    lastName: params?.lastName,
  }, { source: params?.source });
};

export const trackViewContent = (contentName: string, value?: number) => {
  trackEvent('view_content', { content_name: contentName, value });
  trackMetaEvent('ViewContent', { content_name: contentName, value });
  sendMetaConversionEvent('ViewContent', undefined, { content_name: contentName, value });
};

export const trackPaymentFailed = (orderId?: string, error?: string) => {
  trackEvent('payment_failed', { order_id: orderId, error });
  trackMetaEvent('PaymentFailed', { order_id: orderId, error });
  sendMetaConversionEvent('PaymentFailed', undefined, { order_id: orderId, error });
};
