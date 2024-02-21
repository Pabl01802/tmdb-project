import axios from 'axios'
import { options } from "@/functions/options";

export const getTopRatedMovies = async () => (await axios.get('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options))