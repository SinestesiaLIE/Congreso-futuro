export interface KeyQuote {
  quote: string;
  speaker: string;
  talk_title: string;
  congress_name: string;
}

export interface CongressMention {
  name: string;
  year: number;
  theme: string;
}

export interface TimelineEvent {
    year: number;
    speaker: string;
    talk_title: string;
    congress_name: string;
}

export interface QueryResult {
  congresses: CongressMention[];
  timeline_events: TimelineEvent[];
  main_concepts: string[];
  key_quotes: KeyQuote[];
  summary: string;
}
