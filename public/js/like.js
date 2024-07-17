
// Select all like buttons
const likeButtons = document.querySelectorAll('.like-button');


// Loop through each button and add event listener
likeButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        const clickedButton = event.target;
        clickedButton.classList.toggle('liked');
        //console.log('clicked');
        // Here you can add the code to send the like status to the server
        const mediaId = clickedButton.getAttribute('data-media-id');
        const userId = clickedButton.getAttribute('data-user-id');
        if (clickedButton.classList.contains('liked')) {
            fetch(`/wellness/like/:${mediaId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ mediaId, userId })
            })
        } else {
            fetch(`/wellness/unlike/:${mediaId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ mediaId, userId })
            })
        }
        //return mediaId;
    });
});


            //const isLiked = heartButton.classList.contains('liked');
            // 
            // Example:
            // fetch('/like', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({ mediaId, isLiked })
            // });
        
    //});
//});
