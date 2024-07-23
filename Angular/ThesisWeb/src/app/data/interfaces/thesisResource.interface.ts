import { PersonResource } from "./personResource.interface";

export interface ThesisResource {
    id: number;
    mainAuthor: PersonResource;
    contactEmail: string;
    otherAuthors: PersonResource[];
    topic: string;
    content: string;
    created: Date;
    updated: Date;
}