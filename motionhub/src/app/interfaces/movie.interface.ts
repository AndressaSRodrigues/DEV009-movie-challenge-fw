import { Actor } from "./actor.interface";

export interface Movie {
  id: number;
  title: string;
  tagline: string;
  genres: { id: number; name: string }[];
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
  runtime: number;
  original_language: string;
  credits: {
    cast: Actor[];
  };
  optional?: any; // an example of optional properties
}