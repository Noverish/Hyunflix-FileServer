export interface TokenPayload {
  userId: number;
  authority: number;
  allowedPaths: string[];
}

export interface SMICue {
  startTime: number;
  endTime: number;
  languages: {[lan: string]: string};
}
