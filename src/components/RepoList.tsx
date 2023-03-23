import { BsStarFill } from "react-icons/bs";
import { ReposType } from "../types";
import capitalizeText from "../utils/capitalizeText";
import Loader from "./Loader";

type RepoListTypes = {
  repositories: ReposType[];
  isLoading: boolean;
};

const RepoList = ({ repositories, isLoading }: RepoListTypes) => {

  if (isLoading) return <Loader color="blue">Loading...</Loader>;

  return (
    <ul className="flex flex-col gap-2 mt-4">
      {repositories.length > 0 ? (
        repositories.map((repo) => (
          <li key={repo.id} className="bg-gray-300 p-2 rounded">
            <div className="flex justify-between">
              <p className="font-bold">{capitalizeText(repo.name)}</p>
              <p className="flex gap-2 justify-center items-center">
                {repo.stargazers_count} {<BsStarFill />}
              </p>
            </div>
            <p className="mt-2">{capitalizeText(repo.description)}</p>
          </li>
        ))
      ) : (
        <p>Repo is empty</p>
      )}
    </ul>
  );
};

export default RepoList;
