$( document ).ready(function() {
  $('button#like').click( function() {
    var likeStatus = $('button#like').attr('status');
    if (likeStatus === 'unliked') {
      $('button#like').attr('status','liked');
    } else {
      $('button#like').attr('status','unliked')
    }
  });

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

   //volume
   var currentVolume = player.setVolume(player.volume);
   //add attribute value to input element = currentVolume
   $('#volume-control input').val(currentVolume);
   //listen to input value
   $('#volume-control input').on('input', function (event) {
     $('#volume-control input').attr('value',event.target.value);
     player.setVolume(event.target.value);
   })
   //volume end

   setInterval( () => {
     const currentTime = player.getTime();
     const duration = player.getDuration();
     const percent = Math.floor((currentTime / duration) * 100);
     $('#time-control .current-time').text( player.prettyTime(currentTime));
     $('#time-control .total-time').text( player.prettyTime(duration));
     $('#time-control input').val(percent);
     $('#time-control input').attr('value',percent);

     if(percent === 100) {
       var enddingSongIndex = album.songs.indexOf(player.currentlyPlaying);
       var nextSongIndex = enddingSongIndex +1;
       if (nextSongIndex >= album.songs.length) {
         if (player.repeat == 'on') {
           nextSongIndex = 0;
         } else {
           return;
         }
       }
       var playNext = album.songs[nextSongIndex] ;
       player.playPause(playNext);
     }
   }, 1000);
   /*
   var playValue = $('#time-control input').val();
   var enddingSongIndex = album.songs.indexOf(player.currentlyPlaying);
   var nextSongIndex = enddingSongIndex +1;
   console.log(playValue);
   if (playValue == 100) {
     if (nextSongIndex >= album.songs.length) {
       if (player.repeat == 'on') {
         nextSongIndex = 0;
       } else {
         return;
       }
     } else {
       return;
     }
     var playNext = album.songs[nextSongIndex] ;
     player.playPause(playNext);
   };*/

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
