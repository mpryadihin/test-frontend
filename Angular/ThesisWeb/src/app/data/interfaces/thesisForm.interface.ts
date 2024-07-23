import { PersonResource } from "./personResource.interface";

export interface ThesisForm {
    mainAuthor: PersonResource;
    contactEmail: string;
    otherAuthors?: PersonResource[];
    topic: string;
    content: string;
}