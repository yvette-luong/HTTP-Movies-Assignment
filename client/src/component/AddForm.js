import React, { useState } from "react";
import {  useHistory } from "react-router-dom";
import axios from "axios";



const initMovie = {
  title: "",
  director: "",
  metascore: "",
  stars: ["a","b","c", "d"],
};

export default function AddForm(props) {
  const history = useHistory();
  const [movie, setMovie] = useState(initMovie);
  const {setMovieList} = props 



  const handleOnChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const addMovie = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/movies`, movie)
      .then((res) => {
        setMovieList(res.data);
      })
      .catch((err) => console.log(err));
    history.push("/");
  };

  return (
    <div className="add-form">
      <form onSubmit={addMovie}> 
      &nbsp;
        <label>Title</label> &nbsp;
        <input
          type="text"
          name="title"
          value={movie.title}
          onChange={handleOnChange}
          placeholder="title"
        /> &nbsp;
        <label>Director</label> &nbsp;
        <input
          type="text"
          name="director"
          value={movie.director}
          onChange={handleOnChange}
          placeholder="director"
        /> &nbsp;
        <label>Metascore</label> &nbsp;
        <input
          type="text"
          name="metascore"
          value={movie.metascore}
          onChange={handleOnChange}
          placeholder="metascore"
        /> &nbsp;
        <button>Submit</button>
      </form>
    </div>
  );
}
