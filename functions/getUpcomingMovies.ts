import axios from 'axios'
import { options } from "@/functions/options";

export const getUpcomingMovies = async () => (await axios.get('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options))