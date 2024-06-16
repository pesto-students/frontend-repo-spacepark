import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import './Profile.scss';

const Profile = () => {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [qrCode, setQrCode] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = '1'; // Replace this with the actual user ID or use dynamic ID
        const response = await axios.get(`/users/${userId}`); // Adjusted endpoint URL
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        // Handle error (e.g., show error message to user)
      }
    };
    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/users/${user.id}`, user); // Adjusted endpoint URL for update
      setEditMode(false);
    } catch (error) {
      console.error('Error updating user:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const generateQrCode = async () => {
    try {
      const response = await axios.get(`/users/qrcode/${user.id}`); // Adjusted endpoint URL for QR code generation
      setQrCode(response.data.qrCode);
      console.log(qrCode);
    } catch (error) {
      console.error('Error generating QR code:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="profile-container">
      <h1>Profile Page</h1>
      <div className="profile-info">
        {editMode ? (
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="username"
              value={user.username || ''}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              value={user.email || ''}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="mobile"
              value={user.mobile || ''}
              onChange={handleInputChange}
            />
            <button type="submit">Save</button>
          </form>
        ) : (
          <div>
            <p>User ID: {user.id}</p>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Mobile: {user.mobile}</p>
            <button onClick={() => setEditMode(true)}>Edit Profile</button>
          </div>
        )}
      </div>
      <button onClick={generateQrCode}>Generate QR Code</button>
      {qrCode && (
        <div>
          <QRCode value={qrCode} />
          <a href={qrCode} download="qrcode.png">Download</a>
        </div>
      )}
    </div>
  );
};

export default Profile;
