import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [
                {
                    _id: 1, Title: 'Breaking Bad', Description: '"American neo-Western crime drama television series created and produced by Vince Gilligan.', Year: '2008',
                    ImagePath: 'https://upload.wikimedia.org/wikipedia/en/6/61/Breaking_Bad_title_card.png', Genre: 'Crime', Director: 'Alan Ball'
                },
                {
                    _id: 2, Title: 'Game of Thrones', Description: 'Game of Thrones is an American fantasy drama television series created by David Benioff and D. B. Weiss for HBO', Year: '2011',
                    ImagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d8/Game_of_Thrones_title_card.jpg/250px-Game_of_Thrones_title_card.jpg', Genre: 'Fantasy', Director: 'George Raymond Martin'
                },
                {
                    _id: 3, Title: 'The Office', Description: 'The Office is a British television mockumentary sitcom first broadcast in the UK on BBC Two on 9 July 2001.', Year: '2001',
                    ImagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7e/Theoffice.jpg/250px-Theoffice.jpg', Genre: 'Sitcom', Director: 'Ricky Gervais'
                },
                {
                    _id: 3, Title: 'Chernobyl', Description: 'Chernobyl is a 2019 historical drama television miniseries that revolves around the Chernobyl disaster of 1986 and the cleanup efforts that followed.', Year: '2019',
                    ImagePath: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Chernobyl_2019_Miniseries.jpg', Genre: 'History', Director: 'Craig Mazin'
                }
            ],
            selectedMovie: null
        };
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    render() {
        const { movies, selectedMovie } = this.state;

        if (movies.length === 0)
            return <div className="main-view">The list is empty!</div>;

        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
                    ))
                }
            </div>
        );
    }

}
