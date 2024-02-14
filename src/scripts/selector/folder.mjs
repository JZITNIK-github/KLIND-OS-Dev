import selectFolder from "win-select-folder";

const root = "/";
const description = "some description";
const newFolderButton = 0;

selectFolder({ root, description, newFolderButton })
  .then((result) => {
    if (result === "cancelled") console.log("Cancelled by user");
    else console.log(result); // logs selected folder
  })
  .catch((err) => console.error(err));
