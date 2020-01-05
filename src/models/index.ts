export interface Session {
  id: string;
  userId: number;
  authority: number;
  allowedPaths: string[];
}