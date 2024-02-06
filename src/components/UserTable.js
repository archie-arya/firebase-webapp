import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, updateDoc, addDoc, doc } from 'firebase/firestore';
import { db } from '../firestore';

const UserTable = () => {
  const [userData, setUserData] = useState([]);
  const [isAddingUser, setAddingUser] = useState(false);
  const [newUserDetails, setNewUserDetails] = useState({
    username: '',
    status: '',
    addedDate: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        const usersData = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log('Users data from Firestore:', usersData);
        setUserData(usersData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await deleteDoc(doc(db, 'users', userId));
      setUserData((prevData) => prevData.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  const handleChangeStatus = async (userId, newStatus) => {
    try {
      await updateDoc(doc(db, 'users', userId), { status: newStatus });
      setUserData((prevData) =>
        prevData.map((user) =>
          user.id === userId ? { ...user, status: newStatus } : user
        )
      );
    } catch (error) {
      console.error('Error changing status:', error.message);
    }
  };

  const handleAddUser = async () => {
    try {
      // Add the new user to Firestore
      const newUserRef = await addDoc(collection(db, 'users'), newUserDetails);
      // Update the state to reflect the addition
      setUserData((prevData) => [...prevData, { id: newUserRef.id, ...newUserDetails }]);
      // Reset new user details
      setNewUserDetails({
        username: '',
        status: '',
        addedDate: '',
      });
      // Close the modal or form (you can use state to manage this)
      setAddingUser(false);
    } catch (error) {
      console.error('Error adding user:', error.message);
    }
  };

  return (
    <div>
      <h2>User Data</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Date Added</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.addedDate}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
                <button onClick={() => handleChangeStatus(user.id, 'inactive')}>
                  Change Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Add User Button */}
      <div>
        <button onClick={() => setAddingUser(true)}>Add User</button>
      </div>
      {/* Modal or Form for Adding User */}
      {isAddingUser && (
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={newUserDetails.username}
            onChange={(e) => setNewUserDetails({ ...newUserDetails, username: e.target.value })}
          />
          <label>Status:</label>
          <input
            type="text"
            value={newUserDetails.status}
            onChange={(e) => setNewUserDetails({ ...newUserDetails, status: e.target.value })}
          />
          <label>Date Added:</label>
          <input
            type="text"
            value={newUserDetails.addedDate}
            onChange={(e) => setNewUserDetails({ ...newUserDetails, addedDate: e.target.value })}
          />
          <button onClick={handleAddUser}>Add</button>
          <button onClick={() => setAddingUser(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default UserTable;
