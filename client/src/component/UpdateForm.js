import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";


const initMovie = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

export default function UpdateForm(props) {
  const { id } = useParams();
  const history = useHistory();
  const [movie, setMovie] = useState(initMovie);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`)
    .then((res) => {
      setMovie(res.data);
    });
  }, [id]);

  const handleOnChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeMovie = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then((res) => {
        setMovie(movie);
      })
      .catch((err) => console.log(err));
    history.push("/");
  };

  return (
    <div className="update-form">
      <form onSubmit={onChangeMovie}> 
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
