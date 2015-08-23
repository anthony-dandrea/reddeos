$(function() {
    // Declare vars
    var videos    = {},
        count     = 0,
        counter   = 1,
        vidRank   = $('[data-rank]'),
        vidTitle  = $('[data-title]'),
        vidUrl    = $('[data-url]'),
        ytPlayer;

    function setEmailCookie(email) {
        var now = new Date();
        var time = now.getTime();
        time += 1200 * 1000;
        now.setTime(time);
        document.cookie =
        'whitepaperemail=' + email + '; expires=' +
        now.toUTCString() + ';';
    };

    // Set cookie
    function setCookie(key, value) {
        document.cookie = key + '=' + value + ';';
    }

    // Get cookie value
    var cookieValue = function(key) {
        var regexKey = "^(?:.*;)?"+key+"=([^;]+)(?:.*)?$"
        regexKey = new RegExp(regexKey);
        return (document.cookie.match(regexKey)||[,null])[1];
    }

    // Check if video url is YouTube
    function vimeoCheck(url) {

    }

    // Check if video url is YouTube
    function youtubeCheck(url) {
        // https://gist.github.com/jlong/2428561
        var parser = document.createElement('a');
        parser.href = url;
        var host= parser.hostname;
        if (host.indexOf('youtube') > -1) {
            return true;
        } else if (host.indexOf('youtu.be') > -1) {
            return true;
        } else {
            return false;
        }
    }

    // Make youtube video
    function makeYTPlayer(id) {
        $('#youtube-video-container').show();
        if (typeof ytPlayer == 'undefined') {
            // make new player
            ytPlayer = new YT.Player('youtube-video-container', {
                videoId: id,
                playerVars: { 'autoplay': 1, 'controls': 1, 'rel': 0, 'showinfo': 0 },
                events: {
                    'onReady': onYTPlayerReady,
                    'onStateChange': onYTPlayerStateChange,
                    'onError': onYTPlayerError
                }
            });
        } else {
            // update existing player
            ytPlayer.loadVideoById(id);
        }
    }
    // autoplay youtube video
    function onYTPlayerReady(event) {
        event.target.playVideo();
    }
    // when youtube video finishes
    function onYTPlayerStateChange(event) {
        if (event.data === 0) {
            $(document).trigger('videoDone');
        }
    }
    // when youtube errors out
    function onYTPlayerError(event) {
        $(document).trigger('videoDone');
    }


    // Embed video
    function embedVideo(e) {
        console.log('called embedVideo with e:');
				console.log(e);
				console.log('next_video is: ' + e.next_video);
        if (e.next_video != undefined) {
          /* future proofing:
           * if user can specify the exact video they want from a list, an event
           * is created that sets the next_video event attribute explicitly
           */
          count = e.next_video;
        } else {
          count += counter;
        }
        console.log('counter is: ' + counter);
        console.log('NEW count is: ' + count);
        var url;
        try {
          url = videos[count].url;
        } catch(e) {
          if (count < 0) {
            count = 0;
          } else {
            count--;
          }
          url = videos[count].url;
        }
        $('[data-container]').hide();
        vidRank.text('Rank: '+(count+1));
        vidTitle.text('Title: '+videos[count].title);
        vidUrl.html('URL: <a target="_blank" href="'+url+'">'+url+'</a>');
        if (youtubeCheck(url)) {
            var parser = document.createElement('a');
            parser.href = url;
            var id = parser.search.replace('?v=', '');
            makeYTPlayer(id);
        }
        // vimeo
        // else if () {
        // }
        else {
            // couldn't match video
            // try next video
            console.log('Failed to match video');
            if (e.next_video) {
              embedVideo({});
            } else {
              embedVideo({});
            }
            return false;
        }
    }

    // Event listener for video being done
    $(document).on('videoDone', embedVideo);

    // Get reddit videos list on load
    function getVideos() {
        var d = $.Deferred();
        $.getJSON('/get-videos', function(data) {
            videos = data;
            console.log('about to call foreach');
            videos.forEach(
              function(video, i) {
                console.log('calling for each for the ' + i + ' time');
                var newEl = $('<p>' + (i) + '</p>');
                newEl.data('video', i);
                newEl.on('click', handleClickedVideo);
                $('.previous').after(newEl);
              }
            )
            d.resolve();
        })
        .fail(function(error) {
            alert('Server error. Please refresh.');
        });
        return d.promise();
    }

    // Get libraries
    function getYtLib() {
        var d = $.Deferred();
        $.getScript('//www.youtube.com/iframe_api', function() {
            d.resolve();
        });
        return d.promise();
    }
    function getVimeoLib() {
        var d = $.Deferred();
        $.getScript('//f.vimeocdn.com/js/froogaloop2.min.js', function() {
            d.resolve();
        });
        return d.promise();
    }

    // Promise for multiple library and ajax calls
    $.when(getYtLib(), getVimeoLib(), getVideos())
    .done(function() {
        $('[data-loading]').addClass('hidden');
        embedVideo({next_video: 0});
    });

    // Hud toggle
    $('[data-hud-toggle]').on('click', function() {
        $(this).parent().toggleClass('active');
    });


    $('.next').on('click', handleClickedNext);
    function handleClickedNext() {
        counter = 1;
        $(document).trigger('videoDone');
    }

    $('.previous').on('click', handleClickedPrevious);
    function handleClickedPrevious() {
        counter = -1;
        $(document).trigger('videoDone');
    }

    function handleClickedVideo() {
        $(document).trigger({
          type: 'videoDone',
          next_video: $(this).data('video')
        });
    }

});
