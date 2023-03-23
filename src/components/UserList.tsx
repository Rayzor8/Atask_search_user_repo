import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { UsersType } from "../types";
import capitalizeText from "../utils/capitalizeText";

type UserListProps = {
  user: UsersType;
  handleShowRepo: (user: UsersType) => void;
  status: boolean | null;
};

const UserList = ({ user, handleShowRepo, status }: UserListProps) => {
  return (
    <div className="flex justify-between bg-gray-200 p-2 rounded">
      <p className="text-lg">{capitalizeText(user.login)}</p>
      <button onClick={() => handleShowRepo(user)} className="text-2xl">
        {status ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
      </button>
    </div>
  );
};

export default UserList;
