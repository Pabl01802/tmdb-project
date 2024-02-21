import axios from 'axios'
import { options } from "@/functions/options";

export const getPlayingMovies = async () => (await axios.get('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options))