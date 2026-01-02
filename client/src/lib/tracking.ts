declare global {
  interface Window {
    dataLayer: any[];
    fbq: (...args: any[]) => void;
  }
}

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

export const trackInitiateCheckout = (value: number, currency: string = 'INR') => {
  trackEvent('begin_checkout', { value, currency });
  trackMetaEvent('InitiateCheckout', { value, currency });
};

export const trackPurchase = (
  value: number, 
  transactionId: string, 
  currency: string = 'INR'
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
};

export const trackLead = (params?: Record<string, any>) => {
  trackEvent('generate_lead', params);
  trackMetaEvent('Lead', params);
};

export const trackViewContent = (contentName: string, value?: number) => {
  trackEvent('view_content', { content_name: contentName, value });
  trackMetaEvent('ViewContent', { content_name: contentName, value });
};

export const trackPaymentFailed = (orderId?: string, error?: string) => {
  trackEvent('payment_failed', { order_id: orderId, error });
  trackMetaEvent('PaymentFailed', { order_id: orderId, error });
};
