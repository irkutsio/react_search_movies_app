import { Loader } from 'components/Loader/Loader';

import { TrandMoviesList } from 'components/TrandMoviesList/TrandMoviesList';
import { useEffect, useState } from 'react';

import { fetchMovies } from 'services';

const HomePage = () => {
  const [trandingMovies, setTrandingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrandingMovie = async () => {
      setIsLoading(true);
      try {
        const fetchedTrandingMovies = await fetchMovies();
        setTrandingMovies(fetchedTrandingMovies.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getTrandingMovie();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {error && <p>{error}</p>}

      <TrandMoviesList trandMovies={trandingMovies} />
    </>
  );
};

export default HomePage;
