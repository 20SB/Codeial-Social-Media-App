{   
    // Function to submit form data for a new post using AJAX.
    let createPost = function(){
        // Select the form element for creating a new post.
        let newPostForm = $('#new-post-form');

        // Attach a submit event handler to the form.
        newPostForm.submit(function(e){
            e.preventDefault(); // Prevent the default form submission behavior.
            // console.log('clikced')

            // Perform an AJAX request to create a new post.
            $.ajax({
                type: 'post',  // HTTP method for the request.
                url: '/posts/create',  // URL where the request is sent.
                data: newPostForm.serialize(),  // Serialize form data for submission.
                success: function(data){  // Callback on successful response.
                   console.log(data);  // Log the response data.
                }, error: function(error){  // Callback on error response.
                    console.log(error.responseText);  // Log the error response text.
                }
            });
        });
    }

    // Call the createPost function to set up the form submission handling.
    createPost();
}
