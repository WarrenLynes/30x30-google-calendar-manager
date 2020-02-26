export interface Calendar {
  kind: string;
  etag: string;
  id: string;
  summary: string;
  timeZone: string;
  colorId: string;
  backgroundColor: string;
  foregroundColor: string;
  selected: true,
  accessRole: string;
  defaultReminders: { method: string; minutes: any; }[],
  notificationSettings: { notifications: { type: string; method: string; }[] },
  primary: true,
  conferenceProperties: { allowedConferenceSolutionTypes: string[] }
}

export const emptyCalendar = {
  kind: "calendar#calendarListEntry",
  etag: "",
  id: "",
  summary: "",
  timeZone: "",
  colorId: "",
  backgroundColor: "",
  foregroundColor: "",
  selected: false,
  accessRole: "",
  defaultReminders: [],
  notificationSettings: { notifications: [{ type: "", method: "", }] },
  primary: true,
  conferenceProperties: {
    allowedConferenceSolutionTypes: [
      "hangoutsMeet"
    ]
  }
};
