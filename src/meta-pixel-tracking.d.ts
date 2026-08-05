declare module '@jussimirvfx/meta-pixel-tracking' {
  import type { ReactElement, ReactNode } from 'react';

  export type MetaPixelConfig = {
    PIXEL_ID?: string;
    ACCESS_TOKEN?: string;
    TEST_EVENT_CODE?: string;
    VERBOSE?: boolean;
    [key: string]: unknown;
  };

  export type MetaPixelLeadData = {
    name?: string;
    email?: string;
    phone?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    [key: string]: unknown;
  };

  export function configureMetaPixel(config: MetaPixelConfig): void;

  export function MetaPixelProvider(props: {
    children: ReactNode;
    userData?: Record<string, unknown>;
  }): ReactElement;

  export function MetaPixel(props?: { pixelId?: string }): ReactElement | null;

  export function useMetaPixel(): {
    trackLead: (leadData: MetaPixelLeadData) => Promise<void>;
    trackLeadQualificado: (leadData: MetaPixelLeadData) => Promise<void>;
    trackEvent: (
      eventName: string,
      params?: Record<string, unknown>,
      options?: Record<string, unknown>,
    ) => Promise<void>;
    trackPageView: (userData?: Record<string, unknown>) => Promise<void>;
    trackPageViewWithUserData: (userData?: Record<string, unknown>) => Promise<void>;
    trackCustomEvent: (eventName: string, params?: Record<string, unknown>) => Promise<void>;
    initializePixel: (pixelId?: string) => void;
    isInitialized: boolean;
  };
}
