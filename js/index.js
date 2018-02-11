var $saveBtn = $(".button__save");
var $ideaTitle = $('.form__input-title');
var $ideaBody = $('.form__input-body');
var $upvoteBtn = $('.article__button-upvote');
var $downvoteBtn = $('.article__button-downvote');
var $sectionBottom = $('.section__bottom');

$saveBtn.on('click', createIdea);
$sectionBottom.on('mouseenter', '.article__button-upvote', upvoteHover);
$sectionBottom.on('mouseleave', '.article__button-upvote', upvoteHover);
$sectionBottom.on('mouseenter', '.article__button-downvote', downvoteHover);
$sectionBottom.on('mouseleave', '.article__button-downvote', downvoteHover);
$sectionBottom.on('mouseenter', '.article__button-delete', deleteHover);
$sectionBottom.on('mouseleave', '.article__button-delete', deleteHover);
$sectionBottom.on('click', '.article__button-delete', deleteIdea);
$sectionBottom.on('click', '.article__button-upvote', qualityUp);
$sectionBottom.on('click', '.article__button-downvote', qualityDown);

function Idea(ideaTitleValue, ideaBodyValue) {
  this.id = Date.now();
  this.inputTitle = ideaTitleValue;
  this.inputBody = ideaBodyValue;
  this.quality = 'swill';
}

function createIdea() {
  event.preventDefault();
  var idea = new Idea($ideaTitle.val(), $ideaBody.val());
  localStorage.setItem(idea.id, JSON.stringify(idea));
  prependIdea(idea);
}

function upvoteHover(event) {
  if (event.type === 'mouseenter') {
    $(this).attr('src', 'images/upvote-hover.svg');
  } else {
    $(this).attr('src', 'images/upvote.svg');
  }
}

function downvoteHover(event) {
  if (event.type === 'mouseenter') {
    $(this).attr('src', 'images/downvote-hover.svg');
  } else {
    $(this).attr('src', 'images/downvote.svg');
  }
}

function deleteHover(event) {
  if (event.type === 'mouseenter') {
    $(this).attr('src', 'images/delete-hover.svg');
  } else {
    $(this).attr('src', 'images/delete.svg');
  }
}

function prependIdea(object) {
  $('.section__bottom').prepend(
    `<article id="${object.id}" class="container">
      <h2 class="article__h2-title">${object.inputTitle}</h2>
      <input class="article__button-delete" type="image" alt="delete" src="images/delete.svg">
      <p class="article__p-content">${object.inputBody}</p>
    </article>
    <article class="container2">
      <input class="article__button-upvote" type="image" alt="upvote" src="images/upvote.svg">
      <input class="article__button-downvote" type="image" alt="downvote" src="images/downvote.svg">
      <p class="quality">quality:<span class="quality__light"> ${object.quality}</span></p>
    </article>
    <footer></footer>`
  )
}

$(function () {
  for (var i = 0; i < localStorage.length; i++) {
    var string = localStorage.getItem(localStorage.key(i));
    if (string.includes("inputTitle")) {
      var parsedString = JSON.parse(string);
      prependIdea(parsedString);
    }
  }
});

function deleteIdea() {
  let idValue = $(this).parent().attr('id');
  localStorage.removeItem(idValue);
  $(this).parent().next().remove();
  $(this).closest($('article')).remove();
}

function qualityUp() {
  let key = $(this).parent().siblings('.container').attr('id');
  let idea = JSON.parse(localStorage.getItem(key));
  if ($(this).siblings('.quality').text().includes('swill')) {
    $(this).siblings('.quality').text('quality: plausible');
    idea.quality = 'plausible';
  } else if ($(this).siblings('.quality').text().includes('quality: plausible')){
    $(this).siblings('.quality').text('quality: genius');
    idea.quality = 'genius';
  }
  localStorage.setItem(key, JSON.stringify(idea));
}

function qualityDown() {
  let key = $(this).parent().siblings('.container').attr('id');
  let idea = JSON.parse(localStorage.getItem(key));
  if ($(this).nextAll('.quality').text().includes('genius')) {
    $(this).nextAll('.quality').text('quality: plausible');
    idea.quality = 'plausible';
  } else {
    $(this).nextAll('.quality').text('quality: swill');
    idea.quality = 'swill';
  }
  localStorage.setItem(key, JSON.stringify(idea));
}