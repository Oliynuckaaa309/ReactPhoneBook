import { useEffect } from "react";
import { AppDispatch, RootState } from "../Store/userStore"
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from "../Store/userDownload";
import styles from './ContactList.module.css'
import Filter from "./FilterForm";

export default function ContactList() {
  const dispatch: AppDispatch = useDispatch();
  const { filteredUsers, loading, error } = useSelector((state: RootState) => state.users);
  useEffect(() => { dispatch(fetchUsers()) }, [dispatch]);
  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  const notFoundMessage = filteredUsers.length === 0 ? <div className={styles.notFoundMessage}>Not found any matches...</div> : null
  return (
    <div >
      <Filter />
      <h1>Contact List</h1>
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        {notFoundMessage}
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}