import React, { useEffect, useState } from 'react';
import './photos.css';

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:5000/images');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setImages(data);  
        console.log(data);  
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <div className="image-gallery">
        {images.map((img, index) => (
          <div key={index} className="image-item">
            <img
              src={`data:image/jpeg;base64,${img.image}`}
              alt={img.name}
              style={{ width: '30rem', height: 'auto' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
