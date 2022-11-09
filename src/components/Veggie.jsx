import { useEffect, useState } from "react";
import {styled} from 'react'

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";

import { Link } from "react-router-dom";

const Veggie = () => {
  const [veggies, setVeggies] = useState([]);

  const getVeggies = async () => {
    const getData = localStorage.getItem("veggies");

    if (getData && getData !== "undefined") {
      setVeggies(JSON.parse(getData));
    } else {
      const resp = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_FOOD_API_KEY}&tags=vegetarian&number=10`
      );
      const data = await resp.json();
      setVeggies(data.recipes);
      localStorage.setItem("veggies", JSON.stringify(data.recipes));
      console.log(data.recipes);
    }
  };

  useEffect(() => {
    getVeggies();
  }, []);

  return (
    <div>
      <h3>Vegetarian Picks</h3>
      <Splide
        options={{
          perPage: 3,
          arrows: false,
          pagination: false,
          drag: "free",
          gap: "5rem",
          breakpoints: {
            767: {
              perPage: 2,
            },
            640: {
              perPage: 1,
            },
          },
        }}
      >
        {veggies.map(({ title, id, image }) => (
          <SplideSlide key={id}>
            <div class='card'>
              <Link to={`/recipe/${id}`}>
                <p>{title}</p>
                <img src={image} alt={title} />
              </Link>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default Veggie;