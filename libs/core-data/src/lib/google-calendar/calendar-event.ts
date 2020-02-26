export interface CalendarEvent {
  kind: "calendar#event";
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  description: string;
  location: string;
  creator: { email: string; displayName: string; };
  organizer: { email: string; displayName: string; };
  start: { dateTime: string; };
  end: { dateTime: string; };
  recurringEventId: string;
  originalStartTime: { dateTime: string; };
  iCalUID: string;
  sequence: any;
  attendees: { email: string; responseStatus: string; }[];
  guestsCanModify: boolean;
  reminders: { useDefault: boolean }
}

export const emptyCalendarEvent: CalendarEvent = {
  kind: "calendar#event",
  etag: null,
  id: null,
  status: null,
  htmlLink: null,
  created: null,
  updated: null,
  summary: null,
  description: null,
  location: null,
  creator: null,
  organizer: null,
  start: null,
  end: null,
  recurringEventId: null,
  originalStartTime: null,
  iCalUID: null,
  sequence: null,
  attendees: null,
  guestsCanModify: false,
  reminders: { useDefault: true }
};
