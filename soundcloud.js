/*
Git request use API Key fd4e76fc67798bfa742089ed619084a6 with the folloiwng
Create a SoundCloud main account (Links to an external site.) if you haven't already
Use the API Key provided to you by your instructor
Read and understand the streaming music example (Links to an external site.) provided to you by their provided sdk
Unfortunately, the SoundCloud 3.0 SDK playback feature uses flash when on Google Chrome and does not work by default. Try disabling the flash plugin through the chrome://plugins/ menu (type it into the location bar).
If you intend on the doing the challenge take a look at the playlist documentation (Links to an external site.)
For further documentation check out their API guide (Links to an external site.)
Your SoundCloud enabled jukebox should allow the user to do the following things:
Play a track off of SoundCloud based on its track ID
Pause the currently playing track
Display the following current track information:
Artist name with link to his/her profile page
Title with link to track's page
Description and genre
Artwork
*/
// SoundCloud Code: https://developers.soundcloud.com/docs/api/reference
// Code in here will only run once the DOM has loaded
 $(document).ready(function() {
    var Jukebox = { //Scope of Jukebox fxn is inside  doc.ready fxn
    var currentSong
        currentSong: 1, // Default to song #1
        maxIndex: 4,
        play: function(index) {
            if (index == 0) {
                index = Jukebox.currentSong;
            }
            var song = $("div[song=" + index + "] > audio").get(0); //same as line 49. Nested in fxn and only applies to what it is nested in. Scope exists in jukebox.play only
            console.log("song = " +  song.play());
            song.play();
            setControlActive("play");  //Changes color of play, pause & stop buttons
        },
        pause: function(index) {
            if (index == 0) {
                index = Jukebox.currentSong;
            }
            var song = $("div[song=" + index + "] > audio").get(0);  //This var song is scoped in jukebox.pause
            song.pause();
            setControlActive("pause");
        },
        stop: function(index) {
            if (index == 0) {
                index = Jukebox.currentSong;
            }
            var song = $("div[song=" + index + "] > audio").get(0); // Scoped to jukebox.stop Find css <div song="1"> and on html line 36 > audio finds in html .get 0 gets first audio tag
            song.pause();
            song.currentTime = 0;
            setControlActive("stop");
        },
        info: function(){
           $("#artist").html('<a target="_blank" href="' +currentSong.user.permalink_url + '">' + currentSong.user.username + '</a>');
           $("#title").html('<a target="_blank" href="' + currentSong.permalink_url + '">' + currentSong.title + '</a>');
           $("#genre").html(currentSong.genre);
           $("#year-released").html(currentSong.created_at);
           $("#description").html(currentSong.description);
           $("#poster").attr("src",currentSong.artwork_url);
    },
        load: function(url, title, trackID) {
            Jukebox.maxIndex++;
            var arr_from_json;
            if (trackID > 0) {
               // API makes a call to a website on internet but doesn't refresh web browser.
                $.ajax({
                    method: "GET",   //GET request gets data eg song from soundcloud
                    url: "https://api.soundcloud.com/tracks/" + trackID + "?client_id=fd4e76fc67798bfa742089ed619084a6"
                }).then(function (response){    //the response will be json (key,value pair code)
                    console.log("Heres our response: ");
                    console.log(response);
                    console.log("title - " + title);
                    console.log(response.title);
                    $("#TrackTitleHere").text(response.title);
                    if(title != "")  {
                    title = response.title;
                }
                    //arr_from_json = JSON.parse(response);
                });
            }
/*var arr_from_json = JSON.parse( json_string ); //Deserialize JSON*/
            console.log(arr_from_json.title); //dot syntax needs key value pairs
            var content = '<div song="'+ Jukebox.maxIndex +'"> <p>'+ title +'</p> <audio> <source src="'+ url +'" type="audio/mp3"> </audio> </div>';
            $('.songs').append(content);
            var content2 = '<div song="4"> <p>myTitle</p> <audio> <source src="https://api.soundcloud.com/tracks/306625430/stream?client_id=fd4e76fc67798bfa742089ed619084a6" type="audio/mp3"> </audio> </div>';
            $('.songs').append(content2);
        }
    } //Var JukeBox Stops
    /* Event Listeners */
    // User clicked on a song title
    $(document.body).on('click', "div[song]", function() {  //line 75-line 88 attaching click event to div song tag in html
        // Stop current song
        Jukebox.stop(Jukebox.currentSong);  //stops current song.
        // Get song index that was clicked
        var index = $(this).attr('song');   //Grabs number of song from div tag in html. this refers to div song on line 75. attr assigns the number of the song
        // Play that song
        Jukebox.play(index);  //index provides number of song
        // Update current song
        Jukebox.currentSong = index; //sets current song to whiver song number is chosen
        // Underline currently playing song
        $('div[song] > p').css("border-bottom", "0px"); //goes to paragraph tag nested in div song
        $(this).find('p').css("border-bottom", "1px solid green"); //Changes bottom grn
        //console.log("clicked " + $(this).find('p').text());
    });
    // User clicked on Play Button
    $("#playBtn").on('click', function() {
        Jukebox.play(0);  //0 refers to index value on line 25
        Jukebox.info(0);
    });
    // User clicked on Pause Button
    $("#pauseBtn").on('click', function() {
        Jukebox.pause(0); //0 refers to index value on line 39
    });
    // User clicked on Stop Button
    $("#stopBtn").on('click', function() {
        Jukebox.stop(0); //0 refers to index value on line 47
    });
    // User clicked on Add Song Button
    $("#addSongBtn").on('click', function() {
        var url = $("#inputURL").val();
        var title = $('#inputTitle').val();
        Jukebox.load(url, title, 0);
    });
    // User clicked on Add Soundcloud (song)
    $("#addSoundCloud").on('click', function(){
        var trackID = $("#inputCloudURL").val();
        var title = $("#inputCloudTitle").val();
        var url = "https://api.soundcloud.com/tracks/" + trackID +"/stream?client_id=fd4e76fc67798bfa742089ed619084a6"
        console.log(trackID);
        console.log(title);
        console.log(url);
        Jukebox.load(url, title, trackID);
    });
    // $.ajax({
    //  method: "GET",   //GET request gets data
    //  url: "https://api.soundcloud.com/tracks?client_id=fd4e76fc67798bfa742089ed619084a6" //To Add more values include the following after api key in url &genre=hiphop
    // }).then(function(response){
    //  console.log(response);
    // });
    // SAMPLE ID: 305697186
    /* Helper Functions */
    // Colors background of given control (play/pause/stop)
    function setControlActive(name) {
        // Reset all to default/white color
        $('#playBtn').css("background-color", "white");
        $('#pauseBtn').css("background-color", "white");
        $('#stopBtn').css("background-color", "white");
        switch (name) {    //switch compares the same variable, alt if, else statements
            case "play":
                $('#playBtn').css("background-color", "green");
                break;
            case "pause":
                $('#pauseBtn').css("background-color", "yellow");
                break;
            case "stop":
                $('#stopBtn').css("background-color", "red");
                break;
            default:
                console.log("invalid control name");
                break;
        }
    }
}); // End document.ready
Add Comment
