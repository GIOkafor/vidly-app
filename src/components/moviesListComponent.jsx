import React, { Component } from 'react';
import { getMovies, deleteMovie } from '../services/fakeMovieService';
import Like from './common/like';

class MoviesListComponent extends Component {
    state = { 
        movies: getMovies(),
        likes: []
    };

    render() { 
        return ( 
            <div>
                <div> { this.state.movies.length < 1 ?  <p>No movies available</p> : this.generateTable() }</div>
                <ul className="pagination">
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                </ul>
            </div>
        );
    }

    deleteMovie = (movie) => {
        deleteMovie(movie._id);
        this.setState({movies: getMovies()});
    }

    generateRow(movie) {
        return (
            <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td> 
                    <Like
                        liked={movie.liked}
                        onClick={() => this.handleLike(movie)}
                    /> 
                </td>
                <td><button className="btn btn-danger btn-sm" onClick={() => this.deleteMovie(movie)}>Delete</button></td>
            </tr>);
    }

    generateTable = () => {
        return( 
            <div>
                <p>Showing {this.state.movies.length} movies in the database.</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        { this.state.movies.map(movie => this.generateRow(movie) )}
                    </tbody>
                </table>
            </div>
        )
    }

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({movies});
    }
}
 
export default MoviesListComponent;