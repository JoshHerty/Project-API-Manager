import axios from "axios";
import Project from "models/Project";

const baseUrl: string = process.env.API_URL || "";

export const addProject = (newProject: Project): Promise<void> => {
  return axios.post(`${baseUrl}/projects`, newProject).then((res) => res.data);
};

export const getallProjectInfo = (): Promise<Project[]> => {
  return axios
    .get(`${baseUrl}/projects`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// deletes user from database
export const deleteAccount = (id: string): Promise<Project> => {
  return axios
    .delete(`${baseUrl}/projects/${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
