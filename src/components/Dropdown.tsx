import { useState } from "react";
import { ReposType, UsersType } from "../types";
import UserList from "./UserList";
import RepoList from "./RepoList";
import Loader from "./Loader";

type DropdownTypes = {
  loadingUserMutation: boolean;
  loadingRepoMutation: boolean;
  users: UsersType[];
  reposMutation: (user: UsersType) => void;

  repositories: ReposType[];
};

const Dropdown = ({
  loadingUserMutation,
  users,
  reposMutation,
  loadingRepoMutation,
  repositories,
}: DropdownTypes) => {
  const [openDropdown, setOpenDropDown] = useState<null | UsersType>(null);

  function handleShowRepo(user: UsersType) {
    if (openDropdown?.id === user.id) {
      setOpenDropDown(null);
    } else {
      setOpenDropDown(user);
      reposMutation(user);
    }
  }
  return (
    <>
      {!loadingUserMutation ? (
        <ul className="flex flex-col gap-2 bg-white">
          {users.map((user) => (
            <li key={user.id} className="flex flex-col w-full">
              <UserList
                user={user}
                handleShowRepo={handleShowRepo}
                status={openDropdown?.id === user.id}
              />

              {openDropdown?.id === user.id && (
                <RepoList
                  repositories={repositories}
                  isLoading={loadingRepoMutation}
                />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <Loader color="blue">Loading...</Loader>
      )}
    </>
  );
};

export default Dropdown;
