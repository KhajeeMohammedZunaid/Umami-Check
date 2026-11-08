declare global {
  interface Window {
    umami?: {
      track: {
        (eventName: string, eventData?: Record<string, string | number | boolean>): void;
        (customPayload: (defaultPayload: Record<string, unknown>) => Record<string, unknown>): void;
      };
      identify?: (userId: string | Record<string, unknown>) => void;
    };
  }
}

export interface DispatchedEventLog {
  id: string;
  eventName: string;
  eventData?: Record<string, string | number | boolean>;
  timestamp: string;
  source: "code" | "attribute";
}

/**
 * Tracks a custom event in Umami with optional metadata.
 */
export function trackUmamiEvent(
  eventName: string,
  eventData?: Record<string, string | number | boolean>,
  source: "code" | "attribute" = "code"
): boolean {
  if (typeof window === "undefined") return false;

  // Track in Umami if available
  if (window.umami?.track) {
    window.umami.track(eventName, eventData);
  }

  // Dispatch local DOM event so the on-screen live feed can display it immediately
  window.dispatchEvent(
    new CustomEvent("umami-event-logged", {
      detail: {
        id: Math.random().toString(36).substring(2, 9),
        eventName,
        eventData,
        timestamp: new Date().toLocaleTimeString(),
        source,
      },
    })
  );

  return true;
}

