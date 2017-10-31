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

   $('#time-control input').on('input', function (event) {
     player.skipTo(event.target.value);
   });

   var currentVolume = player.setVolume(player.volume);
   $('#volume-control input').val(currentVolume);
   $('#volume-control input').on('input', function (event) {
     $('#volume-control input').attr('value',event.target.value);
     player.setVolume(event.target.value);
   })

   setInterval( () => {
     const currentTime = player.getTime();
     const duration = player.getDuration();
     const percent = (currentTime / duration) * 100;
     $('#time-control .current-time').text( player.prettyTime(currentTime));
     $('#time-control .total-time').text( player.prettyTime(duration));
     $('#time-control input').val(percent);
     $('#time-control input').attr('value',percent);
   }, 1000);

   //I try to add code that execute when the song end and play the next song
  // $('#time-control input').on('input', function(event) {
  //   var enddingSongIndex = album.songs.indexOf(player.currentlyPlaying);
  //   var nextPlayingIndex = enddingSongIndex + 1;
  //   var playValue = $('#time-control input').value;
  //   if (playValue == 100) {
  //     if (nextPlayingIndex >= album.songs.length) {
  //       if (player.repeat == 'on') {
  //         nextPlayingIndex = 0;
  //       } else {
  //         return;
  //       }
  //     }
  //   }
  //   const playNext = album.songs[nextPlayIndex] ;
  //   player.playPause(playNext);
  // });

});
