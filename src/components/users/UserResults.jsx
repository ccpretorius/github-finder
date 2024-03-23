import Spinner from "../layout/Spinner";
import { useEffect, useContext } from "react";
import UserItem from "./UserItem";
import GithubContext from "../../context/github/GithubContext";

function UserResults() {
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);
  const { users, loading, fetchUsers } = useContext(GithubContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  // const fetchUsers = async () => {
  //   const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
  //     headers: {
  //       Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
  //     },
  //   });
  //   console.log(response);
  //   if (response.ok) {
  //     // Proceed to log and set state
  //   } else {
  //     console.error("Error fetching data:", response.statusText);
  //   }

  //   const data = await response.json();
  //   console.log("Fetched data:", data);

  //   setUsers(data);
  //   setLoading(false);
  // };

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
