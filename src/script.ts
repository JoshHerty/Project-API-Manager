import ButtonStyling from "./models/ButtonStyling";
import Collaborator from "./models/Collaborator";
import Project from "./models/Project";
import Styling from "./models/Styling";
import { addProject, deleteAccount, getallProjectInfo } from "./services/api";
import { deleteFile, uploadFile } from "./services/uploadFile";

const projectContainer = document.querySelector(".projects-container")!;

let projects: Project[] | undefined;

const loadProjects = () => {
  getallProjectInfo().then((res) => {
    projects = res;
    renderProjects();
  });
};

const renderProjects = () => {
  if (projects) {
    // clear everything in the element before we rebuild:
    projectContainer.innerHTML = "";
    projects.forEach((project) => {
      const parentDiv = document.createElement("div");
      const deleteButton = document.createElement("button");
      const titleH2 = document.createElement("h2");
      const webLink = document.createElement("a");
      const webGitHubLink = document.createElement("a");
      const shortSummary = document.createElement("p");
      const summary = document.createElement("p");
      const skills = document.createElement("h3");
      const skillList = document.createElement("ul");

      const videoLink = document.createElement("a");
      const imageLink = document.createElement("a");
      const collaborators = document.createElement("h3");
      const collaboratorList = document.createElement("ul");

      // styles
      parentDiv.classList.add("project");
      parentDiv.style.backgroundColor = project.styling.backgroundColor;
      parentDiv.style.color = project.styling.summary;

      deleteButton.classList.add("remove");
      deleteButton.style.backgroundColor =
        project.styling.button.buttonBackgroundColor;
      deleteButton.style.border = `1px solid ${project.styling.button.border}`;
      deleteButton.style.color = project.styling.button.text;

      titleH2.style.color = project.styling.title;

      // attributes
      webLink.setAttribute("href", project.webLink);
      webGitHubLink.setAttribute("href", project.gitHubLink);
      videoLink.setAttribute("href", project.videoLink!);
      imageLink.setAttribute("href", project.imgLink!);
      deleteButton.setAttribute("data-id", project._id!);

      // text content
      deleteButton.textContent = "X";
      titleH2.textContent = project.websiteTitle;
      webLink.textContent = "Web Link";
      webGitHubLink.textContent = "GitHub Link";

      shortSummary.textContent =
        project.shortSummary.length >= 100
          ? `${project.shortSummary.slice(0, 100)}...`
          : project.shortSummary;
      summary.textContent =
        project.summary.length >= 100
          ? `${project.summary.slice(0, 100)}...`
          : project.summary;
      skills.textContent = "Skills";
      collaborators.textContent = "Collaborators";

      project.skills.forEach((skill) => {
        const skillElement = document.createElement("li");

        skillElement.textContent = skill;

        skillList.append(skillElement);
      });

      project.collaborators.forEach((collaborator) => {
        const collaboratorElement = document.createElement("li");
        const collaboratorGitHubLink = document.createElement("a");
        const collaboratorLinkedInLink = document.createElement("a");

        collaboratorGitHubLink.setAttribute("href", collaborator.gitHubLink);
        collaboratorLinkedInLink.setAttribute(
          "href",
          collaborator.linkedInLink
        );

        collaboratorElement.textContent = collaborator.name;
        collaboratorGitHubLink.textContent = "GitHub Link";
        collaboratorLinkedInLink.textContent = "LinkedIn Link";
        videoLink.textContent = "Video Link";
        imageLink.textContent = "Image Link";

        collaboratorElement.append(
          collaboratorGitHubLink,
          collaboratorLinkedInLink
        );
        collaboratorList.append(collaboratorElement);
      });

      parentDiv.append(
        deleteButton,
        titleH2,
        webLink,
        webGitHubLink,
        shortSummary,
        summary,
        videoLink,
        imageLink,
        skills,
        skillList,
        collaborators,
        collaboratorList
      );
      projectContainer.append(parentDiv);
    });
  }
};

loadProjects();

// selectors
const body = document.body;
const projectForm = document.querySelector(".project-form")!;
const skillContainer = document.querySelector(".skill-container")!;
const collaboratorsContainer = document.querySelector(
  ".collaborators-container"
)!;
const skillInput = document.querySelector("#skill") as HTMLInputElement;

const nameInput = document.getElementById("name") as HTMLInputElement;
const gitHubInput = document.getElementById("git-hub-link") as HTMLInputElement;
const linkedInInput = document.getElementById(
  "linked-in-link"
) as HTMLInputElement;

const addSkillButton = document.getElementById("add-skill")!;

const addCollaboratorButton = document.getElementById("add-collaborator")!;

// Functions
const toggleScroll = () => {
  if (body.style.overflow === "hidden") {
    body.style.overflow = "";
  } else {
    body.style.overflow = "hidden";
  }
};

// skill Funcitons
const skills: string[] = [];

const renderSkills = () => {
  // clear everything in the element before we rebuild:
  skillContainer.innerHTML = "";

  skills.forEach((skill, index) => {
    const strIndex: string = index.toFixed();

    // create elements
    const liElement = document.createElement("li");
    const deleteButton = document.createElement("button");
    const skillText = document.createElement("p");

    // modify elements
    //style:
    liElement.classList.add("skill");
    deleteButton.classList.add("remove");

    // Attribute:
    deleteButton.setAttribute("data-skill-index", strIndex);

    // text content
    deleteButton.textContent = "X";
    skillText.textContent = skill;

    // add (append) to HTML:
    liElement.append(deleteButton, skillText);
    skillContainer.append(liElement);
  });
};

const addSkill = () => {
  if (skillInput.value !== "") {
    skills.push(skillInput.value);
    renderSkills();
    skillInput.value = "";
  }
};

const removeSkill = (index: string) => {
  skills.splice(+index, 1);
  renderSkills();
};

// collaborator Functions
const collaborators: Collaborator[] = [];

const renderCollaborators = () => {
  // clear everything in the element before we rebuild:
  collaboratorsContainer.innerHTML = "";

  collaborators.forEach((collaborator, index) => {
    const strIndex: string = index.toFixed();

    // create elements
    const liElement = document.createElement("li");
    const deleteButton = document.createElement("button");
    const name = document.createElement("p");
    const gitHub = document.createElement("a");
    const linkedIn = document.createElement("a");

    // styles
    liElement.classList.add("collaborator");
    deleteButton.classList.add("remove");

    // Attributes:
    gitHub.setAttribute("href", collaborator.gitHubLink);
    gitHub.setAttribute("target", "_blank");
    linkedIn.setAttribute("href", collaborator.linkedInLink);
    linkedIn.setAttribute("target", "_blank");
    deleteButton.setAttribute("data-collaborator-index", strIndex);

    // text content
    name.textContent = collaborator.name;
    gitHub.textContent = "GitHub";
    linkedIn.textContent = "LinkedIn";
    deleteButton.textContent = "X";

    // add (append) to HTML:
    liElement.append(deleteButton, name, gitHub, linkedIn);
    collaboratorsContainer.append(liElement);
  });
};

const addCollaborator = () => {
  const name = nameInput.value;
  const gitHubLink = gitHubInput.value;
  const linkedInLink = linkedInInput.value;

  if (name !== "" && gitHubLink !== "" && linkedInLink !== "") {
    const newCollaborator: Collaborator = {
      name,
      gitHubLink,
      linkedInLink,
    };
    collaborators.push(newCollaborator);
    renderCollaborators();
    nameInput.value = "";
    gitHubInput.value = "";
    linkedInInput.value = "";
  }
};

const removeCollaborator = (index: string) => {
  collaborators.splice(+index, 1);
  renderCollaborators();
};

// Event Listeners

addSkillButton.addEventListener("click", (e) => {
  e.preventDefault();
  addSkill();
});

skillContainer.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;

  // delete button
  if (target.classList.contains("remove")) {
    const index = target.getAttribute("data-skill-index")!;
    removeSkill(index);
  }
});

projectContainer.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;

  const extractFilePathFromUrl = (url: string) => {
    const startIndex = url.indexOf("/o/") + 3; // +3 to skip the '/o/'
    const endIndex = url.indexOf("?alt=media");
    if (startIndex !== -1 && endIndex !== -1) {
      const filePath = url.substring(startIndex, endIndex);
      return decodeURIComponent(filePath);
    } else {
      return null;
    }
  };

  // delete button
  if (target.classList.contains("remove")) {
    const id = target.getAttribute("data-id")!;

    const foundIndex = projects!.findIndex((project) => project._id === id);

    const overlay = document.createElement("div");
    const prompt = document.createElement("div");
    const promptText = document.createElement("p");
    const projectToDelete = document.createElement("p");
    const confirmDelete = document.createElement("button");
    const cancelDelete = document.createElement("button");

    overlay.classList.add("overlay");
    prompt.classList.add("prompt");
    confirmDelete.classList.add("confirm-delete");
    cancelDelete.classList.add("cancel-delete");

    promptText.textContent = "Confirm Delete?";
    projectToDelete.textContent = `(${projects![foundIndex].websiteTitle})`;
    confirmDelete.textContent = "Confirm";
    cancelDelete.textContent = "Cancel";

    toggleScroll();
    prompt.append(promptText, projectToDelete, confirmDelete, cancelDelete);
    overlay.append(prompt);
    body.append(overlay);

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.classList.contains("confirm-delete")) {
        if (foundIndex !== -1) {
          const imageUrl = extractFilePathFromUrl(
            projects![foundIndex].imgLink!
          );
          const videoUrl = extractFilePathFromUrl(
            projects![foundIndex].videoLink!
          );

          deleteFile(imageUrl!);
          deleteFile(videoUrl!);

          deleteAccount(id)
            .then(loadProjects)
            .then(() => {
              toggleScroll();
              body.removeChild(overlay);
              overlay.removeEventListener("click", handleClick);
            });
        }
      }

      if (target.classList.contains("cancel-delete")) {
        toggleScroll();
        body.removeChild(overlay);
        prompt.removeEventListener("click", handleClick);
      }
    };

    overlay.addEventListener("click", handleClick);
  }
});

collaboratorsContainer.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;

  // delete button
  if (target.classList.contains("remove")) {
    const index = target.getAttribute("data-collaborator-index")!;
    removeCollaborator(index);
  }
});

addCollaboratorButton.addEventListener("click", (e) => {
  e.preventDefault();
  addCollaborator();
});

projectForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevents reload

  const websiteTitleInput = document.querySelector(
    "#website-title"
  ) as HTMLInputElement;
  const webLinkInput = document.querySelector("#web-link") as HTMLInputElement;
  const gitHubLinkInput = document.querySelector(
    "#project-git-hub-link"
  ) as HTMLInputElement;
  const shortSummaryInput = document.querySelector(
    "#short-summary"
  ) as HTMLTextAreaElement;
  const summaryInput = document.querySelector(
    "#summary"
  ) as HTMLTextAreaElement;

  const videoLinkInput = document.querySelector(
    "#video-link"
  ) as HTMLInputElement;
  const imgLinkInput = document.querySelector("#img-link") as HTMLInputElement;

  // Styling
  const titleInput = document.querySelector(
    "#title-text-color"
  ) as HTMLInputElement;
  const summaryStylingInput = document.querySelector(
    "#summary-text-color"
  ) as HTMLInputElement;
  const backgroundColorInput = document.querySelector(
    "#background-color"
  ) as HTMLInputElement;

  const borderInput = document.querySelector("#border") as HTMLInputElement;
  const textInput = document.querySelector("#text") as HTMLInputElement;
  const buttonBackgroundColorInput = document.querySelector(
    "#button-background-color"
  ) as HTMLInputElement;

  if (
    websiteTitleInput.value &&
    webLinkInput.value &&
    gitHubLinkInput.value &&
    shortSummaryInput.value &&
    summaryInput.value &&
    skills &&
    collaborators &&
    videoLinkInput.files?.[0] &&
    imgLinkInput.files?.[0] &&
    borderInput.value &&
    textInput.value &&
    buttonBackgroundColorInput.value &&
    titleInput.value &&
    summaryInput.value &&
    backgroundColorInput.value
  ) {
    const websiteTitle: string = websiteTitleInput.value;
    const webLink: string = webLinkInput.value;
    const gitHubLink: string = gitHubLinkInput.value;
    const shortSummary: string = shortSummaryInput.value;
    const summary: string = summaryInput.value;

    const videoFile: File = videoLinkInput.files?.[0];
    const imgFile: File = imgLinkInput.files?.[0];

    const title = titleInput.value;
    const summaryStyling = summaryStylingInput.value;
    const backgroundColor = backgroundColorInput.value;

    const border = borderInput.value;
    const text = textInput.value;
    const buttonBackgroundColor = buttonBackgroundColorInput.value;

    const button: ButtonStyling = { border, text, buttonBackgroundColor };
    const styling: Styling = {
      title,
      summary: summaryStyling,
      backgroundColor,
      button,
    };

    const newProject: Project = {
      websiteTitle,
      webLink,
      gitHubLink,
      shortSummary,
      summary,
      skills,
      styling,
      collaborators,
    };

    const uploadFiles = async () => {
      let videoLink = undefined;
      let imgLink = undefined;

      if (videoFile && imgFile) {
        try {
          [videoLink, imgLink] = await Promise.all([
            uploadFile(videoFile, "videos")!,
            uploadFile(imgFile, "pictures")!,
          ]);
        } catch (error) {
          console.error("Error uploading files:", error);
        }
      }
      return { videoLink, imgLink };
    };

    uploadFiles().then(({ videoLink, imgLink }) => {
      if (videoLink) {
        newProject.videoLink = videoLink;
      }
      if (imgLink) {
        newProject.imgLink = imgLink;
      }
      addProject(newProject)
        .then((data: any) => {
          console.log("Project added:", data);
          loadProjects();
        })
        .catch((error: any) => {
          console.error("Error adding project:", error);
        });
    });

    websiteTitleInput.value = "";
    webLinkInput.value = "";
    gitHubLinkInput.value = "";
    shortSummaryInput.value = "";
    summaryInput.value = "";
    skillInput.value = "";
    skills.splice(0, skills.length);
    nameInput.value = "";
    gitHubInput.value = "";
    linkedInInput.value = "";
    collaborators.splice(0, skills.length);
    videoLinkInput.files = null;
    imgLinkInput.files = null;
    borderInput.value = "";
    textInput.value = "";
    buttonBackgroundColorInput.value = "";
    titleInput.value = "";
    summaryInput.value = "";
    backgroundColorInput.value = "";
    renderSkills();
    renderCollaborators();
  }
});

// background functions
