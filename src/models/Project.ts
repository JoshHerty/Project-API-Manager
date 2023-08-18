import Collaborator from "./Collaborator";
import Styling from "./Styling";

export default interface Project {
  _id?: string;
  websiteTitle: string;
  webLink: string;
  gitHubLink: string;
  shortSummary: string;
  summary: string;
  skills: string[];
  videoLink?: string;
  imgLink?: string;
  styling: Styling;
  collaborators: Collaborator[];
}
