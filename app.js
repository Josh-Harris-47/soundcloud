function Jukebox () {


  SC.initialize({
          client_id: "fd4e76fc67798bfa742089ed619084a6"
      });
      var _this = this;
      this.playlist = null;
      this.currentSongindex = 0;
      this.currentSongStream = null;
      this.currentSongObject = null;
      this.search = 'rock';
  //get tracks gets the music from soundcloud based on the parameter passed
  //in which for mine is dubstep
      SC.get("/tracks",{
          q: this.search
      }).then(function(response){
          console.log(response);
          console.log(this.search);
          _this.playlist = response;
          _this.currentSongObject = _this.playlist[_this.currentSongindex];
          _this.currentSongStream = SC.stream("/tracks/" + _this.currentSongObject.id);
      });


      this.play = function(){
        _this.currentSongStream.then(function(player){
          player.play();
        });
      };
      this.pause = function(){
        _this.currentSongStream.then(function(player){
          player.pause();
        });
      };
      this.changeInfo = function(){
        $('.artistInfo').html(_this.currentSongObject.title)
        $('.artistInfo').html(_this.currentSongObject.description)
        $('.currentpic').attr('src',_this.currentSongObject.artwork_url);
      };
      this.nextSong = function(){
        this.currentSongindex++;
        this.currentSongObject = this.playlist[this.currentSongindex];
        this.currentSongStream = SC.stream('/tracks/' + _this.currentSongObject.id);
        this.play();
      };
      this.lastSong = function(){
        this.currentSongindex--;
        this.currentSongObject = this.playlist[this.currentSongindex];
        this.currentSongStream = SC.stream('/tracks/' + _this.currentSongObject.id);
        this.play();
      };
      this.stop = function(){
        _this.currentSongStream.then(function(player){
          player.pause();
          player.currentTime = null;
        });
      }
        

}


$(document).ready(function(){
  
  var player = new Jukebox();

  $('#play').click(function(){
    player.play();
    player.changeInfo();
  });

  $('#pause').click(function(){
    player.pause();
  });

  $('#next').click(function(){
    player.nextSong();
    player.changeInfo();
  });
  $('#last').click(function(){
    player.lastSong();
    player.changeInfo();
  });
  document.getElementById('search').addEventListener('submit', function(evt){
    evt.preventDefault();
    console.log(evt.srcElement.childNodes[1].value);
    player.search = evt.srcElement.childNodes[1].value;
    player.play();
    player.changeInfo();
  });
  $('#stop').click(function(){
    player.stop();
  });

});
