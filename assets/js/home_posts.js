{
    // Function to submit form data for a new post using AJAX.
    let createPost = function () {
        // Select the form element for creating a new post.
        let newPostForm = $("#new-post-form");

        // Attach a submit event handler to the form.
        newPostForm.submit(function (e) {
            e.preventDefault(); // Prevent the default form submission behavior.

            // Perform an AJAX request to create a new post.
            $.ajax({
                type: "post", // HTTP method for the request.
                url: "/posts/create", // URL where the request is sent.
                data: newPostForm.serialize(), // Serialize form data for submission.
                success: function (data) {
                    // Callback on successful response.
                    // console.log(data); // Log the response data.

                    // Create a new post in the DOM using the response data.
                    let newPost = newPostDom(data.data.post);
                    $("#posts-list-container>ul").prepend(newPost);
                    deletePost($('.delete-post-button', newPost));

                    // console.log('post id', data.data.post._id);
                    // Call the PostComments class for managing comments
                    new PostComments(data.data.post._id);

                    // Show a success notification using Noty
                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                },
                error: function (error) {
                    // Callback on error response.
                    console.log(error.responseText); // Log the error response text.
                },
            });
        });
    };

    // Method to create HTML for a new post in the DOM
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
                        <ul id="post-comments-${post._id}" class="comments-list">
                        </ul>
                    </div>

                        <form action="/comments/create" method="post" class="comment-form" id="post-${post._id}-comments-form">
                            <input type="text" name="content" placeholder="Write a comment.." required class="comment-input">
                            <input type="hidden" name="post" value="${post._id}">
                            <input type="submit" value="Add Comment" class="comment-btn">
                        </form>
                    
                    </div>
                </li>`);
    };

    // Method to delete a post from the DOM using AJAX
    let deletePost = function(deleteLink){
        // console.log('delete btn added');
        // Attach a click event handler to the delete link
        $(deleteLink).click(function(e){
            e.preventDefault();

            // Perform an AJAX request to delete the post
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    // On success, remove the deleted post from the DOM
                    $(`#post-${data.data.post_id}`).remove();
                    // Show a success notification using Noty
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    // Loop over existing posts and set up AJAX for delete buttons
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            
            let self = $(this);
            // console.log('Ajax request for', self);
            let deleteButton = $('.delete-post-button', self);
            deletePost(deleteButton);

            // Get the post's ID from the element's ID attribute
            let postId = self.prop('id').split("-")[1];
            // console.log('ajax post id  ', postId);
            // Call the PostComments class to handle comments for each post
            new PostComments(postId);
        });
    }

    // Call necessary functions to set up AJAX interactions
    createPost();
    convertPostsToAjax();
}
