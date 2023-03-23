import React, { useState } from "react";
import axios from "axios";
import { ReposType, UsersType } from "../types";
import { useMutation } from "react-query";
import Dropdown from "./Dropdown";
import Loader from "./Loader";

function UserSearch() {
  const [searchUserQuery, setSearchUserQuery] = useState("");
  const [users, setUsers] = useState<UsersType[]>([]);
  const [repositories, setRepositories] = useState<ReposType[]>([]);

  const {
    mutate: userMutation,
    isLoading: loadingUserMutation,
    isError,
  } = useMutation(getUsers);
  const { mutate: reposMutation, isLoading: loadingRepoMutation } =
    useMutation(getRepos);

  async function getUsers() {
    if (!searchUserQuery) return;

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

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    userMutation();
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
        {isError && <Loader color="red">Error Fetching data...</Loader>}

        <Dropdown
          users={users}
          reposMutation={reposMutation}
          loadingRepoMutation={loadingRepoMutation}
          loadingUserMutation={loadingUserMutation}
          repositories={repositories}
        />
      </section>
    </div>
  );
}

export default UserSearch;
