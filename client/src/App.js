import React, { useEffect, useState } from 'react';
import './App.css';
import { getImages } from './api';

function App() {
  const [imageList, setImageList] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const responseJson = await getImages();
      setImageList(responseJson.resources);
      setNextCursor(responseJson.next_cursor);
    }

    fetchData();
  }, []);

  const handleLoadMoreButtonClick = async () => {
    const responseJson = await getImages(nextCursor);
    setImageList((currentImageList) => [
      ...currentImageList,
      ...responseJson.resources
    ]);
    setNextCursor(responseJson.next_cursor)
  }

  return (
    <>
      <form>
        <input
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          required 
          placeholder='Enter a search value...'
        ></input>

        <button type='submit'>Search</button>
        <button type='button'>Clear</button>
      </form>

      <div className="image-grid">
        {imageList.map((image) => (
          <img src={image.url} alt={image.public_id} />
        ))}
      </div>
      <div className='footer'>
        { nextCursor && <button onClick={handleLoadMoreButtonClick}>Load More</button> }
      </div>
    </>
  );
}

export default App;
