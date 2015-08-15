$(function() {
    // Declare vars
    var videos    = {},
        count     = 1,
        vidRank   = $('[data-rank]'),
        vidTitle  = $('[data-title]'),
        vidUrl  = $('[data-url]');

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

    // Get youtube script on doc.ready and get videos
    // TODO Promise me <3
    $.getScript('https://www.youtube.com/iframe_api', getVideos);

    // Make youtube video
    function makeYTPlayer(id) {
        var player;
        player = new YT.Player('video-container', {
            videoId: id,
            playerVars: { 'autoplay': 1, 'controls': 1, 'rel': 0, 'showinfo': 0 },
            events: {
                'onReady': onYTPlayerReady,
                'onStateChange': onYTPlayerStateChange,
                'onError': onYTPlayerError
            }
        });
    }
    // autoplay youtube video
    function onYTPlayerReady(event) {
        event.target.playVideo();
    }
    // when youtube video finishes
    function onYTPlayerStateChange(event) {
        if (event.data === 0) {
            console.log('yt done');
            $(document).trigger('videoDone');
        }
    }
    function onYTPlayerError(event) {
        alert('Youtube error:', event.data);
    }


    // Embed video
    function embedVideo() {
        console.log('embed start');
        debugger;
        var url = videos[count].url;
        $('[data-container]').html('');
        vidRank.text('Rank: '+count);
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
        count++;
    }

    // Event listener for video being done
    $(document).on('videoDone', embedVideo);

    // Get reddit videos list on load
    // TODO: make this call a promise with youtube api call
    function getVideos() {
        $.getJSON('/get-videos', function(data) {
            console.log(data);
            videos = data;
            embedVideo();
        })
        .fail(function(error) {
            alert('Server error.')
        });
    }
    // getVideos();
});
