import React, { useState } from "react";
import axios from "axios";
import { ReposType, UsersType } from "../types";
import { useMutation } from "react-query";
import UserList from "./UserList";
import RepoList from "./RepoList";

function UserSearch() {
  const [searchUserQuery, setSearchUserQuery] = useState("");
  const [users, setUsers] = useState<UsersType[]>([]);
  const [openDropdown, setOpenDropDown] = useState(false);
  const [selectedUser, setSelectedUser] = useState<null | UsersType>(null);
  const [repositories, setRepositories] = useState<ReposType[]>([]);

  const { mutate: userMutation, isLoading: loadingUserMutation } =
    useMutation(getUsers);
  const { mutate: reposMutation, isLoading: loadingRepoMutation } =
    useMutation(getRepos);
    

  async function getUsers() {
    console.log("fetching users");
    const response = await axios.get(
      `https://api.github.com/search/users?q=${searchUserQuery.toLowerCase()}&per_page=5`
    );
    setUsers(response.data.items);
  }

  async function getRepos(user: UsersType) {
    console.log("fetching repos");
    const response = await axios.get(user.repos_url);
    setRepositories(response.data);
  }

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setSelectedUser(null);
    userMutation();
  }

  async function handleShowRepo(user: UsersType) {
    setSelectedUser(user);
    setOpenDropDown((prev) => !prev);
    reposMutation(user);
  }

  return (
    <div className="bg-gray-200 w-full min-h-screen flex justify-center">
      <section className="p-4 rounded w-[500px] bg-white my-6 flex justify-center flex-col shadow-md h-max gap-2 m-2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            value={searchUserQuery}
            onChange={(e) => setSearchUserQuery(e.target.value)}
            placeholder="Enter Username"
            className="p-2 border border-black rounded bg-gray-200"
          />
          <button type="submit" className="bg-blue-400 p-2 text-white rounded">
            Search
          </button>
        </form>

        {searchUserQuery && <p>{`Showing user for : "${searchUserQuery}"`}</p>}
        <ul className="flex flex-col gap-2 bg-white">
          {!loadingUserMutation ? (
            users.map((user) => (
              <li key={user.id} className="flex flex-col w-full">
                <UserList
                  user={user}
                  handleShowRepo={handleShowRepo}
                  status={openDropdown && selectedUser?.id === user.id}
                />

                {selectedUser?.id === user.id && openDropdown && (
                  <RepoList
                    repositories={repositories}
                    isLoading={loadingRepoMutation}
                  />
                )}
              </li>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </ul>
      </section>
    </div>
  );
}

export default UserSearch;
