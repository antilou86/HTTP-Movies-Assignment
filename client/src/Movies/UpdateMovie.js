import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateMovie = props => {
    console.log(props)
    const initialState = {
        id: '',
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


    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                console.log(res);
                console.log(props);
                setMovie(initialState);
                props.updateItems(res.data);
                props.history.push('/');
            })
            .catch(err => {
                console.log(err.response)
                props.history.push('/');
            })
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

    const starChangeHandler = (idx, e) => {
        const newStars = [...movie.stars];
        newStars[idx] = e.target.value;
        setMovie({...movie, stars: newStars})
    }
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
                {movie.stars.map((star, idx) => {
                    return ( <> <input
                        key={idx}
                        type='text'
                        name='star'
                        onChange={e => starChangeHandler(idx, e)}
                        placeholder="Star..."
                        value={movie.stars[idx]} /> <br /> </>) })}
                <button>Update!</button>
            </form>
        </>
    )
}

export default UpdateMovie