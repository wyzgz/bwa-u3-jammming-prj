import React from 'react';

const clientID = '6b018735a25b45f9964bb3dae0cb2b8a';
const redirectURI = 'http://lei_jammming.surge.sh';
let expiresIn = 0;
let userAccessToken = '';

class Spotify extends React.Component{
  getAccessToken(){
    let url = window.location.href;
    userAccessToken = /access_token=([^&]*)/.exec(url)[1];
    expiresIn = /expires_in=([^&]*)/.exec(url)[1];
    if(userAccessToken && expiresIn){
      window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return userAccessToken;
    }else{
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
    }
  }

  savePlaylist(playlistName,trackURIs){
    if(!playlistName && trackURIs){
        return;
    }
    let headers = {Authorization:`Bearer ${userAccessToken}`};
     let userID = fetch('https://api.spotify.com/v1/me',{headers:headers})
          .then(response=>response.json())
          .then(jsonResponse=>jsonResponse.id);
      let playlistID = fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
            {headers:headers,
            method:'POST',
          body:{name:playlistName}})
          .then(response=>response.json())
          .then(jsonResponse=>jsonResponse.id);


  }
  search(term){
    return fetch(`https://accounts.spotify.com/authorize?access_token=${userAccessToken}/https://api.spotify.com/v1/search?type=track&q=TERM`,{
      headers: {Authorization: `Bearer ${userAccessToken}`}
    }).then(response=>response.json())
    .then(jsonResponse=>jsonResponse.map(track=>{
      return {
        id: track.id,
        name:track.name,
        artist: track.atists[0].name,
        album: track.album.name,
        uri: track.uri
      }
    }));
  }
}

export default Spotify;
