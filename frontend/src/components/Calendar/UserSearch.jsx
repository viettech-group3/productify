import React, { useState } from 'react';
import styles from './UserSearch.module.css';

const UserSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Perform the search action using the searchQuery value
    // TO-DO: implement your search logic here
    console.log(`Search query: ${searchQuery}`);
  };

  return (
    <div>
        <h2 className={styles.button1}>Meet with...</h2>
        <form onSubmit={handleSearchSubmit}>
          <input className = {styles.search}
              type="text"
              placeholder="Search for people"
              value={searchQuery}
              onChange={handleSearchChange}
          />
        <button className={styles.searchButton} type="submit">Search</button>
        </form>
    </div>
  );
};

export default UserSearch;
