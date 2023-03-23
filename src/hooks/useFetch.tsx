import { useState } from "react";
import { ReposType, UsersType } from "../types";
import { useMutation } from "react-query";
import axios from "axios";

const useFetch = (query: string) => {
  const [users, setUsers] = useState<UsersType[]>([]);
  const [repositories, setRepositories] = useState<ReposType[]>([]);
  const [alert, setAlert] = useState("");

  const {
    mutate: userMutation,
    isLoading: loadingUserMutation,
    isError,
  } = useMutation(getUsers);
  
  const { mutate: reposMutation, isLoading: loadingRepoMutation } =
    useMutation(getRepos);

  async function getUsers() {
    if (!query) {
      setAlert("Please enter input");
      return;
    }
    const response = await axios.get(
      `https://api.github.com/search/users?q=${query.toLowerCase()}&per_page=5`
    );
    setUsers(response.data.items);
  }

  async function getRepos(user: UsersType) {
    const response = await axios.get(user.repos_url);
    setRepositories(response.data);
  }

  return {
    users,
    repositories,
    alert,
    loadingUserMutation,
    loadingRepoMutation,
    userMutation,
    reposMutation,
    isError,
    setAlert,
  };
};

export default useFetch;
