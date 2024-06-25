import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../context/userContext";
import "./Profile.scss";

const Profile = () => {
  const { user, setUser } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [initialUser, setInitialUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = user?.id;
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
  }, [setUser, user?.id]);

  useEffect(() => {
    if (user) {
      setInitialUser(user);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      

      await axios.patch(
        `${process.env.REACT_APP_API_URL}users/${user.id}`,
        user
      );
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setUser(initialUser);
    setEditMode(false);
  };

  const generateQrCode = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}users/qrcode/${user.id}`
      );
      setQrCode(response.data.qrCode);
    } catch (error) {
      console.error("Error generating QR code:", error);
      // Handle error
    } finally {
      setLoading(false);
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
              placeholder="Username"
              className="profile-input"
            />
            <input
              type="email"
              name="email"
              value={user.email || ""}
              onChange={handleInputChange}
              placeholder="Email"
              className="profile-input"
            />
            <input
              type="text"
              name="mobile"
              value={user.mobile || ""}
              onChange={handleInputChange}
              placeholder="Mobile"
              className="profile-input"
            />
            <div className="form-buttons">
              <button type="submit" disabled={loading} className="save-button">
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                disabled={loading}
                className="cancel-button"
              >
                {loading ? "Loading..." : "Cancel"}
              </button>
            </div>
          </form>
        ) : (
          <div>
            <p><strong>User ID:</strong> {user.id}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Mobile:</strong> {user.mobile}</p>
            <div className="action-buttons">
              <button onClick={() => setEditMode(true)} disabled={loading} className="edit-button">
                {loading ? "Loading..." : "Edit Profile"}
              </button>
              <button onClick={generateQrCode} disabled={loading} className="generate-button">
                {loading ? "Generating QR Code..." : "Generate QR Code"}
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="qr-code-container">
        {qrCode && (
          <div className="qrcode-section">
            <img src={qrCode} alt="qrCode" className="qr-code-img" />
            <a href={qrCode} download="qrcode.png" className="download-button">
              Download QR Code
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
