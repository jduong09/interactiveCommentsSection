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

function addEditReplyContainer(comment, currentUser) {
  const editCommentsContainer = document.createElement('div');
  editCommentsContainer.classList.add('edit-comments-container');

  if (comment.user.username === currentUser.username) {
    const deleteDiv = document.createElement('button');
    deleteDiv.innerText = 'Delete';
    deleteDiv.classList.add('div-delete');

    const deleteImg = document.createElement('img');
    deleteImg.src = '../images/icon-delete.svg';
    deleteImg.classList.add('icon-delete');
    deleteDiv.prepend(deleteImg);

    const editDiv = document.createElement('button');
    editDiv.innerText = 'Edit';
    editDiv.classList.add('edit-reply-container');

    const editImg = document.createElement('img');
    editImg.src = '../images/icon-edit.svg';
    editImg.classList.add('icon-edit');

    editDiv.prepend(editImg);

    editCommentsContainer.append(deleteDiv, editDiv);
  } else {
    const replyContainer = document.createElement('button');
    replyContainer.classList.add('edit-reply-container');
    const replyIcon = document.createElement('img');
    replyIcon.src = '../images/icon-reply.svg';
    replyIcon.classList.add('icon-reply');

    replyContainer.innerText = 'Reply';
    replyContainer.prepend(replyIcon);

    editCommentsContainer.append(replyContainer);
  }

  return editCommentsContainer;
}

function configureReplyButton (commentOwner, buttonIndex) {
  const newReplyContainer = document.createElement('div');
  newReplyContainer.classList.add('comment-user-create');
  
  const commentForm = document.createElement('form');
  commentForm.classList.add('comment-form');
  commentForm.id = `comment-form-${buttonIndex}`;

  const userPfpDiv = document.createElement('div');
  const userPfp = document.createElement('img');
  userPfp.src = '../images/avatars/image-juliusomo.png';
  userPfp.alt = 'profile picture of juliusomo';
  userPfp.classList.add('user-pfp');

  userPfpDiv.append(userPfp);

  const formTextAreaLabel = document.createElement('label');
  formTextAreaLabel.htmlFor = `form-textArea-${buttonIndex}`;

  const textArea = document.createElement('textarea');
  textArea.id = `form-textArea-${buttonIndex}`;
  textArea.classList.add('form-textArea');
  textArea.rows = 4;
  textArea.value = `@${commentOwner}`;

  formTextAreaLabel.append(textArea);

  const commentSubmitLabel = document.createElement('label');
  commentSubmitLabel.htmlFor = `comment-submit-${buttonIndex}`;

  const commentSubmitBtn = document.createElement('input');
  commentSubmitBtn.type = 'submit';
  commentSubmitBtn.value = 'Send';
  commentSubmitBtn.id = `comment-submit-${buttonIndex}`;
  commentSubmitBtn.classList.add('comment-submit');

  commentSubmitLabel.append(commentSubmitBtn);

  commentForm.append(userPfpDiv, formTextAreaLabel, commentSubmitLabel);

  newReplyContainer.append(commentForm);
  return newReplyContainer;
}

function createEditForm(editComment, commentBody) {
  const formDiv = document.createElement('div');
  const formEle = document.createElement('form');
  formEle.id = 'edit-comment-form';

  const editLabelEle = document.createElement('label');
  editLabelEle.htmlFor = 'edit-form-input';
  const editTextAreaEle = document.createElement('textarea');
  editTextAreaEle.id = 'edit-form-textarea';
  editTextAreaEle.classList.add('form-textArea');
  editTextAreaEle.rows = 4;
  editTextAreaEle.value = commentBody;

  editLabelEle.append(editTextAreaEle);

  const editSubmitInputEle = document.createElement('input');
  editSubmitInputEle.type = 'submit';
  editSubmitInputEle.id = 'edit-form-submit-btn';
  editSubmitInputEle.value= 'Update';

  formEle.append(editLabelEle, editSubmitInputEle);

  formDiv.append(formEle);

  const removedCommentBody = editComment.replaceChild(formDiv, editComment.children[1]);

  editSubmitInputEle.addEventListener('click', (e) => {
    e.preventDefault();
    const editedCommentBody = document.createElement('span');
    editedCommentBody.innerText = editTextAreaEle.value;
    removedCommentBody.replaceChild(editedCommentBody, removedCommentBody.children[1]);
    editComment.replaceChild(removedCommentBody, formDiv);
  });
}

function createCommentStructure(commentInfo, currentUser) {
  // const itemElement = document.createElement('li');
  const commentContainer = document.createElement('div');
  commentContainer.classList.add('comment');
  // content, createdAt, score, user --> image --> png, user --> username, replies
  const commentUserDiv = document.createElement('div');
  commentUserDiv.classList.add('comment-details');

  const userImg = document.createElement('img');
  userImg.src = commentInfo.user.image.png;
  userImg.classList.add('avatar-user');

  const username = document.createElement('div');
  username.innerText = commentInfo.user.username;

  if (commentInfo.user.username === currentUser.username) {
    const youSpan = document.createElement('span');
    youSpan.innerText = 'you';
    youSpan.classList.add('span-you');
    username.append(youSpan);
  }

  const commentAge = document.createElement('div');
  commentAge.innerText = commentInfo.createdAt;
  commentAge.classList.add('comment-age');

  commentUserDiv.append(userImg, username, commentAge);

  const commentContentContainer = document.createElement('div');
  const commentContent = document.createElement('span');
  commentContent.innerText = commentInfo.content;

  commentContentContainer.append(commentContent);

  const likesContainer = document.createElement('div');
  likesContainer.classList.add('likes-container')
  
  const plusIcon = createSVG('11', '11', 'icon-plus', 'M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z', '#C5C6EF');
  const minusIcon = createSVG('11', '3', 'icon-minus', 'M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z', '#C5C6EF');

  const likes = document.createElement('div');
  likes.innerText = commentInfo.score;

  likesContainer.append(plusIcon, likes, minusIcon);

  const editCommentsContainer = addEditReplyContainer(commentInfo, currentUser);

  commentContainer.append(commentUserDiv, commentContentContainer, likesContainer, editCommentsContainer);

  return commentContainer;
}

function createReplies(comment, currentUser) {
  const replies = comment.replies;
  const repliesListContainer = document.createElement('ul');
  repliesListContainer.classList.add('replies-list');

  replies.forEach((reply) => {

    const itemElement = document.createElement('li');
    const commentContainer = createCommentStructure(reply, currentUser);

    const commentContentContainer = commentContainer.children[1];
    const replyingToContainer = document.createElement('span');
    replyingToContainer.innerText = `@${reply.replyingTo} `;
    replyingToContainer.classList.add('replyingTo');
    commentContentContainer.prepend(replyingToContainer);

    itemElement.append(commentContainer);

    repliesListContainer.append(itemElement);
  });
  return repliesListContainer;
}

function createComments(obj) {
  const comments = obj.comments;
  const firstLevelCommentsListElement = document.createElement('ul');

  comments.forEach((comment) => {
    const itemElement = document.createElement('li');
    const commentContainer = createCommentStructure(comment, obj.currentUser);

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

window.addEventListener('load', () => {
  const replyAndEditBtns = document.getElementsByClassName('edit-reply-container');

  for (let i = 0; i < replyAndEditBtns.length; i++) {
    const btn = replyAndEditBtns[i];
    const commentParent = btn.parentElement.parentElement;
    commentParent.id = `comment-${i}`;
    const commentOwner = commentParent.children[0].children[1].innerText;

    const liCommentParent = commentParent.parentElement;

    btn.addEventListener('click', (e) => {
      e.preventDefault();

      // configure reply button event listener.
      if (e.target.innerText === 'Reply') {
        const replyContainer = configureReplyButton(commentOwner, i);

        // append reply box to comment reply list.
        if (liCommentParent.children[1]) {
          const liReplyContainer = document.createElement('li');
          liReplyContainer.append(replyContainer);

          liCommentParent.children[1].append(liReplyContainer);
        } else {
          liCommentParent.append(replyContainer);
        }
      } else {
        // configure edit button event listener
        const editComment = e.target.parentElement.parentElement;
        const commentBody = editComment.children[1].children[1].innerText;

        createEditForm(editComment, commentBody);
      }
    });
  }
})
