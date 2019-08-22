import React, {useState} from "react";
import axios from "axios";

const UpdateMovie = props => {
    const initialState = {
        title: '',
        director: '',
        metascore: '',
        stars: []
    }
    const [movie, setMovie] = useState(initialState)

    useEffect(() => {
        const id = props.match.params.id;
        const movieInArr = props.movies.find(mov => `${mov.id}` === id);
        if (movieInArr) setMovie(movieInArr);
      }, [props.movies, props.match.params.id]);
    

    const handleSubmit = () => {
        e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log(res);
        setMovie(initialState);
        props.updateItems(res.data);
        props.history.push('/');
      })
      .catch(err => console.log(err.response));
     }
    
    const changeHandler = (ev) => {
        ev.persist();
        let value = ev.target.value;
        if (ev.target.name === 'metascore') {
            value = parseInt(value, 10);
        }
        setMovie({
            ...movie,
            [ev.target.name]: value
        });
    };

return (
    <>
        <h2>Update Movie</h2>
        <form onSubmit={handleSubmit}>
            <label>Title:</label><br />
            <input
                type="text"
                name="title"
                onChange={changeHandler}
                placeholder="Title..."
                value={movie.title}
            /><br />
            <label>Director:</label><br />
            <input
                type="text"
                name="director"
                onChange={changeHandler}
                placeholder="Director..."
                value={movie.director}
            /><br />
            <label>Metascore:</label><br />
            <input
                type="number"
                name="metascore"
                onChange={changeHandler}
                placeholder="Metascore..."
                value={movie.metascore}
            /><br />
            <label>Stars:</label><br />
            <input
                type="text"
                name="stars"
                onChange={changeHandler}
                placeholder="Stars..."
                value={movie.stars} /><br />
            <button>Update!</button>
        </form>
    </>
)
}

export default UpdateMovie