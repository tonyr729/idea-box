var $saveBtn = $(".button__save");
var $ideaTitle = $('.form__input-title');
var $ideaBody = $('.form__input-body');
var $upvoteBtn = $('.article__button-upvote');
var $downvoteBtn = $('.article__button-downvote');
var $sectionBottom = $('.section__bottom');

$saveBtn.on('click', createIdea);

function createIdea() {
  event.preventDefault();
  var idea = new Idea($ideaTitle.val(), $ideaBody.val());
  idea.prepend();
}
$sectionBottom.on('mouseenter', $upvoteBtn, function () {
  $('.article__button-upvote').attr('src', 'images/upvote-hover.svg');
});

function Idea(ideaTitleValue, ideaBodyValue) {
  this.id = Date.now();
  this.inputTitle = ideaTitleValue;
  this.inputBody = ideaBodyValue;
  this.quality = 'swill';
}

Idea.prototype.prepend = function () {
  $('.section__bottom').prepend(
    `<article id="${this.id}" class="container">
      <h2 class="article__h2-title">${this.inputTitle}</h2>
      <input class="article__button-delete" type="image" alt="delete" src="images/delete.svg">
      <p class="article__p-content">${this.inputBody}</p>
    </article>
    <article class="container2">
      <input class="article__button-upvote" type="image" alt="upvote" src="images/upvote.svg">
      <input class="article__button-downvote" type="image" alt="downvote" src="images/downvote.svg">
      <span class="quality">${this.quality}</span>
    </article>   
    `
  )};


// $(".website-title, .bookmark-link").on('keyup', checkInput);
