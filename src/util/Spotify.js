const CLIENT_ID='6b018735a25b45f9964bb3dae0cb2b8a';
//const REDIRECT_URI = 'http://localhost:3000/';

const REDIRECT_URI = 'http://lei_jammming.surge.sh';

const Spotify = {
   USER_ACCESS_TOKEN :'',
   EXPIRESIN : 0,
  getAccessToken(){
    if(this.USER_ACCESS_TOKEN !== null && this.USER_ACCESS_TOKEN.length>1){
      return this.USER_ACCESS_TOKEN;
    }else{
      let url = window.location.href;
      let userAccessToken = /access_token=([^&]*)/.exec(url);
      let expiresIn = /expires_in=([^&]*)/.exec(url);
      if(userAccessToken && expiresIn){
        this.USER_ACCESS_TOKEN = userAccessToken[1];
        this.EXPIRESIN = expiresIn[1];
        //window.setTimeout(() => this.USER_ACCESS_TOKEN = '', this.EXPIRESIN * 1000);
        //window.history.pushState('Access Token', null, '/');
        return this.USER_ACCESS_TOKEN;
      }else{
        let tokenURI = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
        window.location = tokenURI;

      }
    }
  },
  search(term){
    let token = this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
       {headers: {
         Authorization: `Bearer ${token}`
       }}
            ).then(response=>response.json())
            .then(data=>{
              if(data.tracks && data.tracks.items){
                 let newlist =  data.tracks.items.map(track=>({
                   id: track.id,
                   name:track.name,
                   artist:track.artists[0].name,
                   album: track.album.name,
                   uri: track.uri
                 }));
                 return newlist;
              }else{
                return [];
              }
            })

  },
  savePlaylist(name,trackURIs){
    if(!name && trackURIs){
      return;
    }
    let token = this.getAccessToken();
    const headers = {Authorization: `Bearer ${token}` ,
                  'Content-Type':'application/json'};

    let userId = '';
    let playlistID='';
    fetch('https://api.spotify.com/v1/me',{headers:headers})
    .then(response=>response.json())
    .then(user =>{
      userId = user.id;
      fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
      {headers:headers,
        method:'POST',
       body:JSON.stringify({ name: name })
     }).then(response=>response.json())
     .then(data=>{
       playlistID = data.id;
       fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`,
       {headers:headers,
         method: 'POST',
         body:JSON.stringify({uris: trackURIs})
       }).then(response=>console.log(response.json()))
     })


    });





  }






}

export default Spotify;
