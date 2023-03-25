export type Event = Readonly<{
  name: string;
  slug: string;
  image: string;
  startTime: string;
  city: string;
}>;

export type EventExtended = Event &
  Readonly<{
    description: string;
    venue: string;
  }>;
