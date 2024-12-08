import './userprofile.css';
import React, { useState, useEffect, useContext } from 'react'; 
import { PostContext } from '../../contexts/PostContext';

const UserProfile = () => {
  const { posts, isLoading } = useContext(PostContext);
  
  // Debug logs
  console.log('UserProfile - Received posts:', posts);
  
  const [userData, setUserData] = useState({
    profilePicture: '',
    name: 'Tuan Bayangan',
    storyCount: 0,
    followers: 0,
    following: 0,
  });

  const [activeTab, setActiveTab] = useState('cerita');

  // Filter posts yang dimiliki user
  const userPosts = !isLoading && posts ? posts.filter(post => post.username === userData.name) : [];

  console.log('UserProfile - Filtered posts:', userPosts);

  useEffect(() => {
    if (posts?.length > 0) {
      const matchingPosts = posts.filter(post => post.username === userData.name);
      console.log('Found matching posts:', matchingPosts);
      
      setUserData(prev => ({
        ...prev,
        storyCount: matchingPosts.length,
        profilePicture: matchingPosts[0]?.profilePic || ''
      }));
    }
  }, [posts, userData.name]);

  if (isLoading) {
    return (
      <div className="userprofile">
        <div className="padding-profile">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="userprofile">
      <div className="padding-profile">
        <div className="profile-header">
          <img 
            src={userPosts[0]?.profilePic || userData.profilePicture} 
            alt="Profile" 
            className="profile-picture"
          />
          <div className="profile-info">
            <h2>{userData.name}</h2>
            <p className='count'>
              {userPosts.length} cerita &nbsp; &nbsp; 
              {userData.followers} pengikut &nbsp; &nbsp; 
              {userData.following} mengikuti
            </p>
            <p className="tagline">Bayangan itu tak akan pernah hilang</p>
          </div>
        </div>

        <nav className="profile-nav">
          <ul>
            <li className={activeTab === 'cerita' ? 'active' : ''}>
              <button onClick={() => setActiveTab('cerita')}>Cerita</button>
            </li>
            <li className={activeTab === 'disukai' ? 'active' : ''}>
              <button onClick={() => setActiveTab('disukai')}>Disukai</button>
            </li>
            <li className={activeTab === 'tersimpan' ? 'active' : ''}>
              <button onClick={() => setActiveTab('tersimpan')}>Tersimpan</button>
            </li>
          </ul>
        </nav>

        <div className="posts-grid">
          {activeTab === 'cerita' && userPosts.map((post, index) => (
            <div key={index} className="post-thumbnail">
              <img 
                src={post.postImage} 
                alt={`Post ${index + 1}`}
                onLoad={() => console.log('Image loaded:', post.postImage)}
                onError={(e) => console.error('Image failed to load:', e)}
              />
            </div>
          ))}
          {activeTab === 'cerita' && userPosts.length === 0 && (
            <div>Belum ada cerita</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;