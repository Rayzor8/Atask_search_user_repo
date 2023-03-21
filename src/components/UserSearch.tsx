import React, { useState } from 'react';
import axios from 'axios';
import { UsersType } from '../types';



function UserSearch() {
  const [searchUserQuery, setSearchUserQuery] = useState('');
  const [users, setUsers] = useState<UsersType[]>([]);

  const handleSubmit = async (event:React.SyntheticEvent) => {
    event.preventDefault();
    const response = await axios.get(
      `https://api.github.com/search/users?q=${searchUserQuery}&per_page=5`
    );
    setUsers(response.data.items);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchUserQuery}
          onChange={(e)=> setSearchUserQuery(e.target.value)}
          placeholder="Search for a Github user"
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.login}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserSearch;