const likeModel = require("../../models/likeModel");


document.addEventListener('DOMContentLoaded', function() {

    document.querySelectorAll('.like-button').forEach(button => {
        button.addEventListener('click', function() {
            const heartButton = this.querySelector('.heart-button');
            heartButton.classList.toggle('liked');

            // Here you can add the code to send the like status to the server
            const mediaId = this.getAttribute('data-media-id');
            const isLiked = heartButton.classList.contains('liked');

            if (isLiked) {
                heartButton.classList.add('liked');
                likeModel.likeMedia(mediaId);
            } else {
                heartButton.classList.remove('liked');
                likeModel.unlikeMedia(mediaId);
            }

            //const isLiked = heartButton.classList.contains('liked');
            // Send AJAX request to update the like status in the database
            // Example:
            // fetch('/like', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({ mediaId, isLiked })
            // });
        });
    });
});
