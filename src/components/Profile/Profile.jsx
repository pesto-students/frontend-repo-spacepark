import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import { useUser } from '../../context/userContext';
import './Profile.scss';

const Profile = () => {
  const { user, setUser } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log(user, 'user');
        //const userId = '1'; // Replace this with the actual user ID or use dynamic ID
        const userId = user?.id;
        console.log(userId, 'userId');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}users/${userId}`); // Adjusted endpoint URL
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        // Handle error (e.g., show error message to user)
      }
    };
    fetchUser();
  }, [setUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        const uploadResponse = await axios.post(`${process.env.REACT_APP_API_URL}upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        user.profilePicture = uploadResponse.data.fileUrl;
      }

      await axios.patch(`${process.env.REACT_APP_API_URL}users/${user.id}`, user); // Adjusted endpoint URL for update
      setEditMode(false);
    } catch (error) {
      console.error('Error updating user:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const generateQrCode = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}users/qrcode/${user.id}`); // Adjusted endpoint URL for QR code generation
      setQrCode(response.data.qrCode);
      console.log(qrCode);
    } catch (error) {
      console.error('Error generating QR code:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

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
            <input
              type="file"
              name="profilePicture"
              onChange={handleFileChange}
            />
            <button type="submit">Save</button>
          </form>
        ) : (
          <div>
            <img
              src={user.profilePicture || 'default-profile.png'}
              alt="Profile"
              className="profile-picture"
            />
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
        <div className="qrcode-section">
          <QRCode value={qrCode} />
          <a href={qrCode} download="qrcode.png">Download</a>
        </div>
      )}
    </div>
  );
};

export default Profile;
