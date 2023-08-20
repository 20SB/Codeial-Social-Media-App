{
    console.log("got here");
    // Function to submit form data for a new comment using AJAX.
    let createComment = function () {

        // Select the form element for creating a new comment.
        let newCommentForm = $("#new-comment-form");

         // Attach a submit event handler to the form.
         newCommentForm.submit(function (e) {
            e.preventDefault(); // Prevent the default form submission behavior.
            console.log('clikced comment submit');

            // Perform an AJAX request to create a new comment.
            $.ajax({
                type: "post", // HTTP method for the request.
                url: "/comments/create", // URL where the request is sent.
                data: newCommentForm.serialize(), // Serialize form data for submission.
                success: function (data) {
                    // Callback on successful response.
                    console.log(data); // Log the response data.

                    let newComment = newCommentDom(data.data.comment);
                    var postId =  data.data.comment.post._id;
                    console.log(postId);
                    $(`#post-comment-${postId}`).prepend(newComment);
                    // deletePost($(' .delete-post-button', newPost), data);
                },
                error: function (error) {
                    // Callback on error response.
                    console.log(error.responseText); // Log the error response text.
                },
            });
        });

    };

    // method to create a post in DOM
    let newCommentDom = function (comment) {
        return $(` <div class="comment">
                    <!-- Display the comment author's name in bold -->
                    <b>
                    ${ comment.user.name }
                    </b>
                    <!-- Display delete link for the comment if the user is authenticated and the comment belongs to the user -->
                    
                    <a href="/comments/destroy/${ comment._id }">X</a>
                    
                    <br>
                    <!-- Display the comment content -->
                    ${ comment.content }
                </div> `);
    }


    // Call the createComment function to set up the form submission handling.
    createComment();
}