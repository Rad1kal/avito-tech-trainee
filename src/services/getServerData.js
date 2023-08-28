export default class GetServerData{

    _apiBase = 'https://free-to-play-games-database.p.rapidapi.com/api/';
    
    options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '456b69e556msh13b651f2c64a59ep11d8edjsn4608ab84885d',
          'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    getGames = async (sort, tags, platform) => {
      let url;

      if (sort && tags.length && platform){
        url = this._apiBase + `filter?platform=${platform}&tag=${tags}&sort-by=${sort}`;
      }else if (platform){
        url = this._apiBase + `games?sort-by=${sort}&platform=${platform}`;
      }else {
        url = this._apiBase + `games`;
      }
  
      return this._getReq(url);
    }

    getGame = async (cardId)=>{
      const url = this._apiBase + `game?id=${cardId}`;

      return this._getReq(url);
    }

    _getReq = async (url)=>{
      let res = await fetch(url, this.options)
        
      if (!res.ok) {
        console.log('Response status:', res.status);
        // throw new Error(`Network response was not ok`);
      }

      return await res.json(); 
    }
}
