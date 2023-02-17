import {useHttp} from "../Hooks/http.hook.js";

export class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    // ЗДЕСЬ БУДЕТ ВАШ КЛЮЧ, ЭТОТ КЛЮЧ МОЖЕТ НЕ РАБОТАТЬ
    _apiKey = 'apikey=3bf254dd4a6d8bc9d57fae6dc9653f2a';

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}characters?&offset=210&${this._apiKey}`);
    }
    getLimitCharacters = async (offset = 210, limit = 9) => {

            let res = await this.getResource(`${this._apiBase}characters?limit=${limit}&offset=${offset}&${this._apiKey}`).then(data => data.data.results);

            return res.map(el => {
                return this._transformChar2State(el);
            })
    }
    _transformChar2State = (res) => {
            return {
                id:res.id,
                name:res.name,
                description:res.description,
                thumbnail:res.thumbnail.path + '.' + res.thumbnail.extension,
                homepage:res.urls[1].url,
                wiki:res.urls[1].url,
                comics:res.comics.items,

            }
    }
    getCharacter = async (id) => {
        let res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`).then(data => data.data.results[0]);
        return  this._transformChar2State(res);
    }
}

export default MarvelService;