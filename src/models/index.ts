export interface Auth {
  id: number;
  token: string;
  authority: string[];
  allowedPaths: string[];
}