const likeModel = require("../../models/likeModel");
const likeButtons = document.querySelectorAll('.like-button');

document.addEventListener(function() {

    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const heartButton = document.querySelector('.heart-button');
            heartButton.classList.toggle('liked');
            console.log('clicked');

            // Here you can add the code to send the like status to the server
            const mediaId = document.getAttribute('data-media-id');
            const isLiked = heartButton.classList.contains('liked');

            if (!isLiked) {
                heartButton.classList.add('liked');
                likeModel.likeMedia(mediaId);
                return mediaId;
            } else {
                heartButton.classList.remove('liked');
                likeModel.unlikeMedia(mediaId);
                return mediaId;
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
