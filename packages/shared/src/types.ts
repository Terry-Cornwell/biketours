export interface User {
  id: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  socialLinks?: string[];
}

export interface Trip {
  id: string;
  ownerId: string;
  title: string;
  summary?: string;
  startDate: string;
  endDate?: string;
  coverImage?: string;
  privacy: "public" | "private" | "unlisted";
  stages: Stage[];
}

export interface Stage {
  id: string;
  tripId: string;
  sequence: number;
  startLocation: string;
  endLocation: string;
  narrative: string;
  photos: Media[];
  stats?: StageStats;
  createdAt: string;
  updatedAt: string;
}

export interface StageStats {
  distanceKm: number;
  durationMinutes?: number;
  elevationGainM?: number;
  weatherSummary?: string;
}

export interface Comment {
  id: string;
  targetId: string;
  authorId: string;
  body: string;
  createdAt: string;
  visibility: "public" | "private";
}

export interface Media {
  path: string;
  thumbnailPath?: string;
  dominantColor?: string;
  exif?: Record<string, unknown>;
  processed: boolean;
}

export interface CreateTripRequest {
  title: string;
  summary?: string;
  startDate: string;
  endDate?: string;
  coverImage?: string;
  privacy?: Trip["privacy"];
}

export interface TripFeedItem {
  tripId: string;
  stageId?: string;
  title: string;
  summary: string;
  coverImage?: string;
  ownerDisplayName: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  data: T;
  errors?: string[];
}
