//Jukebox Object
function Jukebox (){
    SC.initialize ({
        client_id: 'fd4e76fc67798bfa742089ed619084a6'
    });
        this.playlist = null;
        var _this =this; //set up variable for this so that you can use this inside of this
        this.currentSongIndex = 0;
        this.currentSongStream = null; //null makes sure to empty before adding song
        this.currentSongObject = null;
//gets track from soundcloud based on parameter is q
    SC.get("/tracks",{
        q: "folk"
    }).then(function(response){  //then is next step in function
        console.log(response);
        _this.playlist = response;  //sets playlist
        _this.currentSongObject = _this.playlist[_this.currentSongIndex]; //object is song
        _this.currentSongStream = SC.stream('/tracks/' + _this.currentSongObject.id);
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
               $("#artist").html('<a target="_blank" href="' +_this.currentSongObject.user.permalink_url + '">' + _this.currentSongObject.user.username + '</a>');
               $("#title").html('<a target="_blank" href="' + _this.currentSongObject.permalink_url + '">' + _this.currentSongObject.title + '</a>');
               $("#genre").html(_this.currentSongObject.genre);
               $("#year-released").html(_this.currentSongObject.created_at);
               $("#description").html(_this.currentSongObject.description);
               $("#poster").attr("src",_this.currentSongObject.artwork_url);
        };

    this.nextSong = function (){
        this.currentSongIndex ++;
        this.currentSongObject = this.playlist[this.currentSongIndex];
        this.currentSongStream = SC.stream('/tracks/' + _this.currentSongObject.id); //null makes sure to empty before adding song
        this.play();

    };
    this.prevSong = function (){
        this.currentSongIndex --;
        this.currentSongObject = this.playlist[this.currentSongIndex];
        this.currentSongStream = SC.stream('/tracks/' + _this.currentSongObject.id); //null makes sure to empty before adding song
        this.play();

    };
};
$(document).ready(function(){
    var play1 = new Jukebox();

    $('#play').click(function(){
        play1.play();
        play1.changeInfo();
    });

    $('#pause').click(function(){
        play1.pause();
    });

    $('#next').click(function(){
        play1.nextSong();
        play1.changeInfo();
    });

    $('#previous').click(function(){
        play1.prevSong();
        play1.changeInfo();
    });

});
