import React, { useState, useEffect } from "react";
import axios from "axios";
import QRCode from "qrcode.react";
import { useUser } from "../../context/userContext";
import "./Profile.scss";

const Profile = () => {
  const { user, setUser } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [initialUser, setInitialUser] = useState(null); // To store initial user data for cancel action
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = user?.id || localStorage.getItem("role");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}users/${userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        // Handle error (e.g., show error message to user)
      }
    };
    fetchUser();
  }, [setUser,user?.id ]);

  useEffect(() => {
    if (user) {
      setInitialUser(user); // Store initial user data when user is fetched
    }
  }, [user]);

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
        formData.append("profileImage", selectedFile);
        const uploadResponse = await axios.post(
          `${process.env.REACT_APP_API_URL}uploadProfileImage/${user.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setUser({
          ...user,
          profilePicture: uploadResponse.data.profileImageUrl,
        });
      }

      await axios.patch(
        `${process.env.REACT_APP_API_URL}users/${user.id}`,
        user
      );
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleCancelEdit = () => {
    setUser(initialUser); // Reset user data to initial state
    setEditMode(false); // Exit edit mode
  };

  const generateQrCode = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}users/qrcode/${user.id}`
      );
      setQrCode(response.data.qrCode);
    } catch (error) {
      console.error("Error generating QR code:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-info">
        {editMode ? (
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="username"
              value={user.username || ""}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              value={user.email || ""}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="mobile"
              value={user.mobile || ""}
              onChange={handleInputChange}
            />
            <input
              type="file"
              name="profilePicture"
              onChange={handleFileChange}
            />
            <div className="form-buttons">
              <button type="submit">Save</button>
              <button type="button" onClick={handleCancelEdit}>
                Cancel
              </button>
            </div>
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
      {!editMode && <button onClick={generateQrCode}>Generate QR Code</button>}
      {qrCode && (
        <div className="qrcode-section">
          <QRCode value={qrCode} />
          <a href={qrCode} download="qrcode.png">
            Download
          </a>
        </div>
      )}
    </div>
  );
};

export default Profile;
