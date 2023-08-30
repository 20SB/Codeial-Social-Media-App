// Let's implement this via classes

// This class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX
class PostComments {
    // The constructor is used to initialize the instance of the class whenever a new instance is created
    constructor(postId) {
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        // Create a new comment when the instance is created
        this.createComment(postId);

        let self = this;
        // Set up event listeners for all existing comments' delete buttons
        $(' .delete-comment-button', this.postContainer).each(function () {
            self.deleteComment($(this));
        });
    }

    createComment(postId) {
        let pSelf = this;
        // Attach a submit event handler to the new comment form
        this.newCommentForm.submit(function (e) {
            e.preventDefault();
            let self = this;
            
            // Perform an AJAX request to create a new comment
            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function(data){
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).append(newComment);
                    console.log(newComment, '**********');
                    pSelf.deleteComment($(' .delete-comment-button', newComment));

                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    newCommentDom(comment) {
        // Create and return HTML structure for a new comment using template literals
        return $(`
            <li class="comment" id="comment-${comment._id}">
                <b>  
                    ${comment.user.name}
                </b>
                <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
                <br>
                    ${comment.content}
            </li>`
        );
    }

    deleteComment(deleteLink) {
        // Attach a click event handler to the delete link for each comment
        $(deleteLink).click(function (e) {
            e.preventDefault();

            // Perform an AJAX request to delete the comment
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    // On success, remove the deleted comment from the DOM
                    $(`#comment-${data.data.comment_id}`).remove();
                    // Show a success notification using Noty
                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }
}
