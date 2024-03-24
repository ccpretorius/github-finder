import Spinner from "../layout/Spinner";
import { useContext } from "react";
import UserItem from "./UserItem";
import GithubContext from "../../context/github/GithubContext";

function UserResults() {
  const { users, loading } = useContext(GithubContext);

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  if (!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user) => (
          <div key={user.id}>
            <h3>{user.login}</h3>
            {user.avatar_url ? <UserItem user={user} /> : <div>No Avatar Available</div>}
          </div>
        ))}
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default UserResults;
