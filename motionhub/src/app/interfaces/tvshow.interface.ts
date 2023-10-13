import { Actor } from "./actor.interface";

export interface TvShows {
    id: number;
    name: string;
    poster_path: string;
    genres: { id: number; name: string }[];
    vote_average: number;
    overview: string;
    first_air_date: string;
    number_of_seasons: number;
    number_of_episodes: number;
    episode_run_time: number;
    credits: {
      cast: Actor[];
    };
    status: string;
    last_episode_to_air: { name: string, overview: string },
  }