function createReplies(comment, currentUser) {
  const replies = comment.replies;
  const repliesListContainer = document.createElement('ul');
  repliesListContainer.classList.add('replies-list');

  replies.forEach((reply) => {

    const itemElement = document.createElement('li');
    const commentContainer = document.createElement('div');
    commentContainer.classList.add('comment');
    // content, createdAt, score, user --> image --> png, user --> username, replies
    const commentUserDiv = document.createElement('div');
    commentUserDiv.classList.add('comment-details');

    const userImg = document.createElement('img');
    userImg.src = reply.user.image.png;
    userImg.classList.add('avatar-user');

    const username = document.createElement('div');
    username.innerText = reply.user.username;

    if (reply.user.username === currentUser.username) {
      const youSpan = document.createElement('span');
      youSpan.innerText = 'you';
      youSpan.classList.add('span-you');
      username.append(youSpan);
    }

    const commentAge = document.createElement('div');
    commentAge.innerText = reply.createdAt;
    commentAge.classList.add('comment-age');

    commentUserDiv.append(userImg, username, commentAge);

    const commentContent = document.createElement('div');
    commentContent.innerText = reply.content;
    const replyingToContainer = document.createElement('span');
    replyingToContainer.innerText = `@${reply.replyingTo} `;
    replyingToContainer.classList.add('replyingTo');
    commentContent.prepend(replyingToContainer);

    const likesContainer = document.createElement('div');
    likesContainer.classList.add('likes-container')
    const plusIcon = document.createElement('img');
    plusIcon.src = '../images/icon-plus.svg';
    plusIcon.classList.add('icon-plus');

    const minusIcon = document.createElement('img');
    minusIcon.src = '../images/icon-minus.svg';
    minusIcon.classList.add('icon-minus');

    const likes = document.createElement('div');
    likes.innerText = reply.score;

    likesContainer.append(plusIcon, likes, minusIcon);

    const replyContainer = document.createElement('div');
    replyContainer.classList.add('reply-container');

    const replyIcon = document.createElement('img');
    replyIcon.src = '../images/icon-reply.svg';
    replyIcon.classList.add('icon-reply');

    replyContainer.innerText = 'Reply';
    replyContainer.prepend(replyIcon);

    if (reply.user.username === currentUser.username) {
      const deleteDiv = document.createElement('div');
      deleteDiv.innerText = 'Delete';
      deleteDiv.classList.add('div-delete');

      const deleteImg = document.createElement('img');
      deleteImg.src = '../images/icon-delete.svg';
      deleteImg.classList.add('icon-delete');
      deleteDiv.prepend(deleteImg);

      replyContainer.prepend(deleteDiv);
    }

    commentContainer.append(commentUserDiv, commentContent, likesContainer, replyContainer);
    itemElement.append(commentContainer);

    repliesListContainer.append(itemElement);
  });
  return repliesListContainer;
}

function createComments(obj) {
  const comments = obj.comments; // returns first level comments for user jsonObj.currentUser;
  const firstLevelCommentsListElement = document.createElement('ul');

  comments.forEach((comment) => {
    const itemElement = document.createElement('li');
    const commentContainer = document.createElement('div');
    commentContainer.classList.add('comment');
    // Need to add user-specific layout elements if comment is from user.
    // content, createdAt, score, user --> image --> png, user --> username, replies
    const commentUserDiv = document.createElement('div');
    commentUserDiv.classList.add('comment-details');

    const userImg = document.createElement('img');
    userImg.src = comment.user.image.png;
    userImg.classList.add('avatar-user');

    const username = document.createElement('div');
    username.innerText = comment.user.username;

    if (comment.user.username === obj.currentUser.username) {
      const youSpan = document.createElement('span');
      youSpan.innerText = 'you';
      youSpan.classList.add('span-you');
      username.append(youSpan);
    }

    const commentAge = document.createElement('div');
    commentAge.innerText = comment.createdAt;
    commentAge.classList.add('comment-age');

    commentUserDiv.append(userImg, username, commentAge);

    const commentContent = document.createElement('div');
    commentContent.innerText = comment.content;

    const likesContainer = document.createElement('div');
    likesContainer.classList.add('likes-container')
    const plusIcon = document.createElement('img');
    plusIcon.src = '../images/icon-plus.svg';
    plusIcon.classList.add('icon-plus');

    const minusIcon = document.createElement('img');
    minusIcon.src = '../images/icon-minus.svg';
    minusIcon.classList.add('icon-minus');

    const likes = document.createElement('div');
    likes.innerText = comment.score;

    likesContainer.append(plusIcon, likes, minusIcon);

    const replyContainer = document.createElement('div');
    replyContainer.classList.add('reply-container');

    const replyIcon = document.createElement('img');
    replyIcon.src = '../images/icon-reply.svg';
    replyIcon.classList.add('icon-reply');

    replyContainer.innerText = 'Reply';
    replyContainer.prepend(replyIcon);

    if (comment.user.username === obj.currentUser.username) {
      const deleteDiv = document.createElement('div');
      deleteDiv.innerText = 'Delete';
      deleteDiv.classList.add('div-delete');

      const deleteImg = document.createElement('img');
      deleteImg.src = '../images/icon-delete.svg';
      deleteImg.classList.add('icon-delete');
      deleteDiv.prepend(deleteImg);

      replyContainer.prepend(deleteDiv);
    }

    commentContainer.append(commentUserDiv, commentContent, likesContainer, replyContainer);
    itemElement.append(commentContainer);

    if (comment.replies.length !== 0) {
      const repliesList = createReplies(comment, obj.currentUser);
      itemElement.append(repliesList);
    }

    firstLevelCommentsListElement.append(itemElement);
  });

  return firstLevelCommentsListElement;
};

document.addEventListener('DOMContentLoaded', () => {
  // Loading a comment thread
  const commentSection = document.querySelector('div.comment-section');
  const xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const jsonObj = JSON.parse(this.responseText);

      const firstLevelComments = createComments(jsonObj);

      commentSection.prepend(firstLevelComments);
    }
  }

  xmlhttp.open('GET', '../data.json', true);
  xmlhttp.send();
});