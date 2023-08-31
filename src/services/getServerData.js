export default class GetServerData{
    _apiBase = 'https://free-to-play-games-database.p.rapidapi.com/api/';
    
    options = {
        method: 'GET',
        mode: 'cors',
        headers: {
          'X-RapidAPI-Key': '3f23e3c562msh6f8447e828dbb24p1b112bjsnd0e2cdb4b483',
          'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    maxRetries = 3;

    getGames = async (sort, tags, platform) => {
      let url;

      if (sort && tags.length && platform){
        url = this._apiBase + `filter?platform=${platform}&tag=${tags}&sort-by=${sort}`;
      }else if (platform){
        url = this._apiBase + `games?sort-by=${sort}&platform=${platform}`;
      }else {
        url = this._apiBase + `games`;
      }

      let retryCount = 0;

      while (retryCount < this.maxRetries) {
        try {
          return await this._getReq(url);
        } catch (error) {
          retryCount++;
          console.error(`Request failed. Retrying (${retryCount}/${this.maxRetries})`);
        }
      }
      throw new Error(`Failed after ${this.maxRetries} retries`);
    }

    getGame = async (cardId)=>{
      const url = this._apiBase + `game?id=${cardId}`;

      return this._getReq(url);
    }

    _getReq = async (url)=>{
      let res = await fetch(url, this.options);

      if (!res.ok) {
        throw new Error(res.status);
      }

      try {return await res.json()}
      catch {throw new Error(404)}
    }
}
