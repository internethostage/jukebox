$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

var LIBRARY = [
  {title: 'C Major Scale', notes: 'A B C D E F G' },
  {title: 'Chromatic Scale', notes: 'A A# B C C# D D# E F F# G G#' },
  {title: 'Random Song', notes: 'A B*2 C D A*4 D E*2 F A B A A*2' },
  {title: 'Adup Licate', notes: 'A B*2 C D A*4 D E*2 F A B A A*2' },
  {title: 'Yankee Doodle', notes: 'C F*4 C F*4 B C D A*2 B*2 A B*2 C' },
  {title: 'Descending Notes', notes: 'G F E D C B A G F E D C B A' }
];

var BPM = 600;

// Add a song with the given title and notes to the library.
var addSongToLibrary = function(title, notes) {
  $('#library-list').append("<li>" +
                                "<i class='fa fa-bars'></i>" +
                                "<i class='fa fa-trash'></i>" +
                                "<span class='title'>" + title + "</span>" +
                                "<div class='notes'>" + notes + "</div>" +
                              "</li>");
};


// Add all LIBRARY songs to the library.
var initializeLibrary = function() {
  for(var i=0; i < LIBRARY.length; i+=1) {
    addSongToLibrary(LIBRARY[i].title, LIBRARY[i].notes);
  }
};


// Play all songs in the playlist.
var playAll = function() {
  var songItem = $('#playlist-list li:first-child');
  if (songItem.length == 0) {
    $('#play-button').animateCss('shake');
  } else {

  // Grab the top song in the queue, parse its notes and play them.
  // Then recurse until there are no more songs left in the queue.
  //
  var playNext = function() {
    var songItem = $('#playlist-list li:first-child');

    if (songItem.length == 0) {
      // No more songs.

      // Re-enable the play button.
      $('#play-button').attr('disabled', false).text('Play All');

      // Fade out the message.
      $('#message').fadeOut();

      return;
    }

    var title = songItem.find('.title').text();
    var notes = songItem.find('.notes').text();
    var song = parseSong(notes);

    $('#message').html("Now playing: <strong>" + title + "</strong>").show();

    playSong(song, BPM, function() {
      songItem.remove();
      $('#library-list').append(songItem);
      playNext();
    });
  };

  // Disable the play button to start.
  $('#play-button').attr('disabled', true).text('Playing');

  playNext();
}
}


$(document).ready(function() {
  // Initialize the library with some songs.
  initializeLibrary();

  // Play all songs in the playlist when the "play" button is clicked.
  $('#play-button').on('click', playAll);

  // Add Your Code Here.
  // When the delete icons for a song are clicked slide up that song over 0.5s. AFTER the song is finished sliding up, remove it from the list entirely.

  $('body').on('click', '.fa-trash', function() {
    $(this).parent().slideUp(500, function () {
      $(this).remove();
    });
  });




  // Make the song notes hidden when the page initially loads. Then, when you double click a song, they should slide down over 0.3 second. (Hint: See the dblclick event type)
  $('div.notes').hide()
  $('body').on('dblclick', 'li', function() {
    $(this).children('div.notes').slideToggle(300);
  });

  // When the page loads, make the message fade in over 0.8s. Then, after 3s have passed, fade out the message over 0.8s.
  $('#message').fadeIn(800)
  setInterval(function () {
    $('#message').fadeOut(800)
  }, 3000);

// Make the songs' delete icons have a default opacity of 0.3.  (done on CSS) opacity: 0.3;

// When your mouse hovers over a song, animate its delete icon's opacity to 1 using CSS transitions. (Hint: The ":hover" CSS Selector may be helpful) (done on CSS)
// li:hover i.fa-trash {
//   opacity: 1;
// }

// When a song is hovered, animate its background color to a lighter grey over 0.5s, using CSS selectors.

// Make the Library and Playlist sortable. sortable class added to both boxes
// Allow dragging and dropping songs between the Library and the Playlist. connectWith class added to both boxes
$(function() {
    $( ".sortable" ).sortable({connectWith: ".connectedSortable"});
    $( ".sortable" ).disableSelection();
  });

// Filter the library, so that it includes only songs that match whatever is typed in the "filter" box. (Hint: Look up the :contains selector or the filter jQuery method)
$('input:text').on('keyup', function() {
  var userInput = $('input:text').val();
  if ($('input:text').val() === "") {
    $('li').show();
  } else if ($('.title:contains("'+userInput+'")')) {
    $('.title:not(:contains("'+userInput+'"))').parent("li").hide();
  }
})


});
