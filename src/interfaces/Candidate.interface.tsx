// TODO: Create an interface for the Candidate objects returned by the API

export interface Candidate {
    login: string;
    location?: string | null;
    email: string;
    company: string;
    bio: string
}