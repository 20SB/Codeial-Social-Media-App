{
    // Function to submit form data for a new post using AJAX.
    let createPost = function () {
        // Select the form element for creating a new post.
        let newPostForm = $("#new-post-form");

        // Attach a submit event handler to the form.
        newPostForm.submit(function (e) {
            e.preventDefault(); // Prevent the default form submission behavior.
            // console.log('clikced')

            // Perform an AJAX request to create a new post.
            $.ajax({
                type: "post", // HTTP method for the request.
                url: "/posts/create", // URL where the request is sent.
                data: newPostForm.serialize(), // Serialize form data for submission.
                success: function (data) {
                    // Callback on successful response.
                    console.log(data); // Log the response data.

                    let newPost = newPostDom(data.data.post);
                    $("#posts-list-container>ul").prepend(newPost);
                    deletePost($(' .delete-post-button', newPost), data);
                },
                error: function (error) {
                    // Callback on error response.
                    console.log(error.responseText); // Log the error response text.
                },
            });
        });
    };

    // method to create a post in DOM
    let newPostDom = function (post) {
        return $(`<li class="post mini-container" id="post-${post._id}">
                    <p>
                        <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                    
                    <!-- Display the post author's name -->
                    ${post.user.name} <hr>
                    <!-- Display the post content -->
                    ${post.content}
                    </p>

                    <div class="post-comments">

                    <div class="post-comments-list">
                        <ul id="post-comment-${post._id}">
                        </ul>
                    </div>

                    <!-- Display comment form if the user is authenticated -->
                        <form action="/comments/create" method="post" class="comment-form">
                        <!-- Input field for entering a new comment -->
                        <input type="text" name="content" placeholder="Write a comment.." required class="comment-input">
                        <!-- Hidden field to store the post's ID to which the comment is related -->
                        <input type="hidden" name="post" value="${post._id}">
                        <!-- Submit button for adding a new comment -->
                        <input type="submit" value="Add Comment" class="comment-btn">
                        </form>

                    
                    </div>
                </li>`);
    };

    // method to delete a post from DOM
    let deletePost = function(deleteLink, data){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success : function(){
                    $(`#post-${data.data.post._id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    // Call the createPost function to set up the form submission handling.
    createPost();
}
