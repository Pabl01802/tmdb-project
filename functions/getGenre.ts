import axios from 'axios'
import { options } from "@/functions/options";
export const getGenres = async () => await axios.get('https://api.themoviedb.org/3/genre/movie/list', options)