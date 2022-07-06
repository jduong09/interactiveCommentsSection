function createSVG(width, height, className, d, fill) {
  const svgEle = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgEle.setAttributeNS(null, 'width', width);
  svgEle.setAttributeNS(null, 'height', height);
  svgEle.classList.add(className);

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttributeNS(null, 'd', d);
  path.setAttributeNS(null, 'fill', fill);
  
  svgEle.append(path);
  
  return svgEle;
}

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
    
    const plusIcon = createSVG('11', '11', 'icon-plus', 'M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z', '#C5C6EF');
    const minusIcon = createSVG('11', '3', 'icon-minus', 'M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z', '#C5C6EF');

    const likes = document.createElement('div');
    likes.innerText = reply.score;

    likesContainer.append(plusIcon, likes, minusIcon);

    const editCommentsContainer = document.createElement('div');
    editCommentsContainer.classList.add('edit-comments-container');

    const replyContainer = document.createElement('div');
    replyContainer.classList.add('reply-container');
    const replyIcon = document.createElement('img');
    replyIcon.src = '../images/icon-reply.svg';
    replyIcon.classList.add('icon-reply');

    replyContainer.innerText = 'Reply';
    replyContainer.prepend(replyIcon);

    editCommentsContainer.append(replyContainer);

    if (reply.user.username === currentUser.username) {
      const deleteDiv = document.createElement('div');
      deleteDiv.innerText = 'Delete';
      deleteDiv.classList.add('div-delete');

      const deleteImg = document.createElement('img');
      deleteImg.src = '../images/icon-delete.svg';
      deleteImg.classList.add('icon-delete');
      deleteDiv.prepend(deleteImg);

      editCommentsContainer.prepend(deleteDiv);
    }

    commentContainer.append(commentUserDiv, commentContent, likesContainer, editCommentsContainer);
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

    const plusIcon = createSVG('11', '11', 'icon-plus', 'M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z', '#C5C6EF');
    const minusIcon = createSVG('11', '3', 'icon-minus', 'M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z', '#C5C6EF');

    const likes = document.createElement('div');
    likes.innerText = comment.score;

    likesContainer.append(plusIcon, likes, minusIcon);

    const editCommentsContainer = document.createElement('div');
    editCommentsContainer.classList.add('edit-comments-container');

    const replyContainer = document.createElement('div');
    replyContainer.classList.add('reply-container');
    const replyIcon = document.createElement('img');
    replyIcon.src = '../images/icon-reply.svg';
    replyIcon.classList.add('icon-reply');

    replyContainer.innerText = 'Reply';
    replyContainer.prepend(replyIcon);

    editCommentsContainer.append(replyContainer);

    if (comment.user.username === obj.currentUser.username) {
      const deleteDiv = document.createElement('div');
      deleteDiv.innerText = 'Delete';
      deleteDiv.classList.add('div-delete');

      const deleteImg = document.createElement('img');
      deleteImg.src = '../images/icon-delete.svg';
      deleteImg.classList.add('icon-delete');
      deleteDiv.prepend(deleteImg);

      editCommentsContainer.prepend(deleteDiv);
    }

    commentContainer.append(commentUserDiv, commentContent, likesContainer, editCommentsContainer);
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