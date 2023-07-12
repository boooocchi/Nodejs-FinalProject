import { DefaultSession } from "next-auth";

export interface SessionWithId extends DefaultSession {
  id: string | null;
}
