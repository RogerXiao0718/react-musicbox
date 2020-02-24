import axios from "axios";

const KEY = "AIzaSyB9ndiV9PUI3BivKeoXaePunblgGcgvz6I";

const youtubeApi = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/"
});

export default youtubeApi;
export { KEY };
