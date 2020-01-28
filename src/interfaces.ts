export interface IPost {
  id: number;
  descendants: number;
  time: number;
  type: string;
  by: string;
  kids: number[];
  score: number;
  title: string;
  url: string;
}

export interface IComment {
  id: number;
  kids: number[];
  parent: number;
  time: number;
  type: string;
  by: string;
  text: string;
}
