import UsersStats from "../components/UsersStats";
import userService from "../services/users";
import Loading from "../components/Loading";
import Error from "../components/Error";

const Users = () => {
  const usersQuery = userService.useGetAllUsersQuery();
  const users = usersQuery.data ? usersQuery.data : [];

  switch (usersQuery.status) {
    case "loading":
      return <Loading />;
    case "error":
      return <Error />;
  }

  return <article>
    <header>
      <h4>Users</h4>
    </header>
    <UsersStats users={users}/>
  </article>;
};

export default Users;
