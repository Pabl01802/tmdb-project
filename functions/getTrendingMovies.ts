import axios from 'axios'
import { options } from "@/functions/options";

export const getTrendingMovies = async () => (await axios.get('https://api.themoviedb.org/3/movie/popular?language=en-EN&page=1', options))