$( document ).ready(function() {
  $('button#play-pause').click( function() {
     player.playPause();
     $(this).attr('playState', player.playState);
   });
   // add repeat funciton
   $('button#repeat').attr('repeat', player.repeat);
   $('button#repeat').click( function() {
     if (player.repeat == 'off') {
       var repeatState = 'on';
       player.repeat = repeatState;
       $('button#repeat').attr('repeat', 'on');
     } else {
       repeatState = 'off';
       player.repeat = repeatState;
       $('button#repeat').attr('repeat', 'off');
     }
   });
   //

   $('button#next').click( function() {
     if (player.playState !== 'playing') { return; }

     const currentSongIndex = album.songs.indexOf(player.currentlyPlaying);
     var nextSongIndex = currentSongIndex + 1;
     if (nextSongIndex >= album.songs.length) {
       //if repeat album button is on
       if (player.repeat == 'on') {
         nextSongIndex = 0;
       } else {
       //go back to the first track
       //else terminate execution
         return;
       }
     }

     const nextSong = album.songs[nextSongIndex];
     player.playPause(nextSong);
   });

   $('button#previous').click( function() {
     if (player.playState !== 'playing') { return; }

     const currentPlayingSongIndex = album.songs.indexOf(player.currentlyPlaying);
     var previousSongIndex = currentPlayingSongIndex - 1;
     if (previousSongIndex < 0) {
       if (player.repeat == 'on') {
         previousSongIndex = album.songs.length - 1;
       } else {
         return;
       }
     }
     const previousSong = album.songs[previousSongIndex];
     player.playPause(previousSong);
   });
});
