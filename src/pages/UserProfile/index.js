import React from 'react'
import './userprofile.css';
import { useState, useEffect } from 'react';



const UserProfile = () => {

  const [userData, setUserData] = useState({
    profilePicture: '',
    name: '',
    storyCount: 0,
    followers: 0,
    following: 0,
  });

  const [activeTab, setActiveTab] = useState('cerita');

  useEffect(() => {
    // Fetch data dari API atau database
    fetch('/api/user-profile')
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div class="userprofile">
      <div class="padding-profile">

      <div className="profile-header">
        <img src={userData.profilePicture} alt="Profile" className="profile-picture" />
        <div className="profile-info">
          <h2>{userData.name}</h2>
          <p className='count'>{userData.storyCount} cerita &nbsp;  &nbsp; {userData.followers} pengikut &nbsp;  &nbsp; {userData.following} mengikuti</p>
          <p className="tagline">Bayangan itu tak akan pernah hilang</p>
        </div>
      </div>

          <nav class="profile-nav">
            <ul>
                <li>
                    <a href="#">Cerita</a>
                </li>
                <li>
                    <a href="#">Disukai</a>
                </li>
                <li>
                    <a href="#">Tersimpan</a>
                </li>
            </ul>
        </nav>
      </div>
    </div>

  )
}

export default UserProfile