$(function() {
    //

    // Get reddit videos list
    function getVideos() {
        $.getJSON('/get-videos', function(data) {
            console.log(data);
        })
        .fail(function(error) {
            alert('Server error.')
        });
    }
    getVideos();
});
