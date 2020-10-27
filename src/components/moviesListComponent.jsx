import React, { Component } from 'react';
import { getMovies, deleteMovie } from '../services/fakeMovieService';
import Like from './common/like';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';

class MoviesListComponent extends Component {
    state = { 
        movies: getMovies(),
        pageSize: 4,
        currentPage: 1
    };

    render() { 
        const { currentPage, movies: allMovies, pageSize } = this.state;
        const movies = paginate(allMovies, currentPage, pageSize);

        return ( 
            <div>
                <div> { allMovies.length < 1 ?  <p>No movies available</p> : this.generateTable(movies) }</div>
                <Pagination 
                    currentPage={currentPage}
                    itemsCount={allMovies.length}
                    pageSize={pageSize}
                    onPageChange={this.handlePageChange}
                />
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

    generateTable = (movies) => {
        return( 
            <div>
                <p>Showing {movies.length} movies in the database.</p>
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
                        { movies.map(movie => this.generateRow(movie) )}
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

    handlePageChange = page => {
        this.setState({currentPage: page});
    }
}
 
export default MoviesListComponent;