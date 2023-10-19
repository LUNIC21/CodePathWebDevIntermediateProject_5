import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Client } from "@petfinder/petfinder-js";

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY;

function App() {
  console.log(ACCESS_KEY);
  console.log(SECRET_KEY);

  const API_LIST = "https://api.petfinder.com/v2/animals"
  const [animalList, setAnimalList] = useState([]);

  const client = new Client({ apiKey: ACCESS_KEY, secret: SECRET_KEY });

  const animalListInitialize = async () => {
    try {
      const response = await client.animal.search({
        limit: 100
      }); 
      console.log('Animal list response:', response);
      setAnimalList(response.data.animals); 
    } catch (error) {
      console.error('Error fetching animal list:', error);
    }
  };


  useEffect(() =>{
    animalListInitialize();
  },[]);


  return (
    <div>
      <h1>Hello</h1>
      <div className="animal-list">
        {animalList.map((animal) => (
          <div key={animal.id} className="animal-card">
            <img src={animal.primary_photo_cropped?.small || 'fallback-image-url'} alt={animal.name} />
            <h2>{animal.name}</h2>
            <p>Species: {animal.species}</p>
            <p>Breed: {animal.breeds.primary}</p>
            <p>Age: {animal.age}</p>
            <p>Size: {animal.size}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
