import React from 'react';
import "../styles/AnimalInfo.css";
import wildanimal from "../assets/wild_animal.jpg";
import reptiles from "../assets/reptiles.png";
import birdsImg from "../assets/birds.jpg";
import dogs from "../assets/dogs.jpg";

const categoryData = [
  {
    category: "Wild Animals",
    image: wildanimal,
    description:
      "Wild animals like deer, leopards, and boars may be injured due to accidents or human conflict.",
    firstAid:
      "Do not approach. Call the forest department or wildlife rescue immediately. Observe from a distance and note location, injuries, and behavior. Never feed or touch a wild animal.",
  },
  {
    category: "Reptiles",
    image: reptiles,
    description:
      "Reptiles like snakes, turtles, and crocodiles are often hit by vehicles or found trapped in human spaces.",
    firstAid:
      "Keep your distance. Avoid sudden movements. Contact a trained reptile rescue team. Do not try to handle or move the animal yourself, especially if venomous.",
  },
  {
    category: "Birds",
    image: birdsImg,
    description:
      "Birds often collide with windows or fall from trees during storms, and chicks may be found grounded.",
    firstAid:
      "Approach calmly. Cover with a cloth to reduce stress. Place in a ventilated box. Do not feed or give water. Call a local bird rescue group or wildlife vet.",
  },
  {
    category: "Domestic Animals",
    image: dogs,
    description:
      "Domestic animals like dogs, cows, and cats may get injured in traffic accidents or suffer abuse.",
    firstAid:
      "If safe, approach gently. Use a cloth as a muzzle if needed. Move to a quiet place and call animal rescue or a vet. Apply light pressure to bleeding wounds if trained.",
  },
];

const AnimalAidInfo = () => {
  return (
    <div className="aid-info-container">
      <h2>What to Do If You See an Injured Animal</h2>
      <div className="aid-grid">
        {categoryData.map((item, index) => (
          <div key={index} className="aid-card">
            <img
              src={item.image}
              alt={`Image of ${item.category}`}
              className="aid-image"
            />
            <h3>{item.category}</h3>
            <p>{item.description}</p>
            <div className="aid-steps">
              <strong>First Aid Tips:</strong>
              <p>{item.firstAid}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimalAidInfo;
