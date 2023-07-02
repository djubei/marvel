//
//
//
class MarvelService {

  _apiKey = '7b0e77047351d61cfd81c50d3a749ab7'
  _apiBase = 'https://gateway.marvel.com:443/v1/public'

  _baseOffset = 210
  getResources = async (url) => {
    const res = await fetch(url)

    if (!res.ok) {
      throw new Error(`Превед я ошибга мой адрес не дом и не улица мой адрес сегодня такой ${ url }, а статус:${ res.status }`)
    }

    return await res.json()
  }
  getAllCharacters = async (offset = this._baseOffset) => {
    const res = await this.getResources(`${ this._apiBase }/characters?limit=9&offset=${ offset }&apikey=${ this._apiKey }`)
    return await res.data.results.map(char => this._transformCharacter(char))
  }
  getCharacter = async (id) => {

    const res = await this.getResources(`${ this._apiBase }/characters/${ id }?apikey=${ this._apiKey }`)
    return this._transformCharacter(res.data.results[0])

  }

  _transformCharacter = (res) => {
    /* let descr = ''
     if (res.description.length > 0) {
       if (res.description.length > 15) {
         descr = res.description.slice(0, 229) + '...'
       } else {
         descr = res.description
       }

     } else {
       descr = 'данный о персонаже нет'
     }*/

    return {
      res: res,
      id: res.id,
      name: res.name,
      description: res.description ? res.description.slice(0, 210) + '...' : 'нет данный о персонаже',
      thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
      homepage: res.urls[0].url,
      wiki: res.urls[0].url,
      selected: false,
      comics: res.comics.items
    }
  }
}

export default MarvelService