import React, { Component } from 'react';
import { getMovies, deleteMovie } from '../services/fakeMovieService';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable';
import _ from 'lodash';

class MoviesListComponent extends Component {
    state = { 
        genres: [],
        movies: [],
        pageSize: 4,
        currentPage: 1,
        sortColumn: { path: 'title', order: 'asc' }
    };

    componentDidMount(){
        const genres = [{name: "All Movies"}, ...getGenres()];
        this.setState({ 
            genres,
            movies: getMovies()
        })
    }

    handleDelete = (movie) => {
        deleteMovie(movie._id);
        this.setState({movies: getMovies()});
    }

    handleGenreSelect = genre => {
        this.setState({selectedGenre: genre, currentPage: 1})
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

    handleSort = sortColumn => {    
        this.setState({ sortColumn });
    }

    getPagedData = () => {
        const { currentPage, movies: allMovies, pageSize, selectedGenre, sortColumn } = this.state;
        const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const movies = paginate(sorted, currentPage, pageSize);
        return { totalCount: filtered.length, data: movies };
    }

    render() { 
        const { currentPage, genres, pageSize, sortColumn } = this.state;

        const { totalCount, data: movies } = this.getPagedData();

        return ( 
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col col-3">
                            <ListGroup
                                items={genres}
                                onItemSelect={this.handleGenreSelect}
                                selectedItem={this.state.selectedGenre}
                            />
                        </div>
                        <div className="col">
                            <p>Showing {totalCount} movies in the database.</p>

                            <MoviesTable 
                                movies={movies}
                                onLike={this.handleLike}
                                onDelete={this.handleDelete}
                                onSort={this.handleSort}
                                sortColumn={sortColumn}
                            />

                            <Pagination 
                                currentPage={currentPage}
                                itemsCount={totalCount}
                                pageSize={pageSize}
                                onPageChange={this.handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default MoviesListComponent;