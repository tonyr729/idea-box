var $saveBtn = $(".button__save");
var $ideaTitle = $('.form__input-title');
var $ideaBody = $('.form__input-body');
var $sectionBottom = $('.section__bottom');
var $searchInput = $('.input__search');


$saveBtn.on('click', createIdea);
$sectionBottom.on('click', '.article__button-delete', deleteIdea);
$sectionBottom.on('click', '.article__button-upvote', increaseQuality);
$sectionBottom.on('click', '.article__button-downvote', decreaseQuality);
$sectionBottom.on('keydown', '.article__h2-title', disableTitleContentEditable);
$sectionBottom.on('click', '.article__h2-title', enableTitleContentEditable);
$sectionBottom.on('keydown', '.article__p-content', disableBodyContentEditable);
$sectionBottom.on('click', '.article__p-content', enableBodyContentEditable);
$searchInput.on('keyup click input', runSearch);

$(function () {
  for (var i = 0; i < localStorage.length; i++) {
    var string = localStorage.getItem(localStorage.key(i));
    if (string.includes("inputTitle")) {
      var parsedString = JSON.parse(string);
      prependIdea(parsedString);
    }
  }
});

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

function prependIdea(object) {
  $('.section__bottom').prepend(
    `<article class="card">
      <article id="${object.id}" class="container">
        <h2 class="article__h2-title" contenteditable="true">${object.inputTitle}</h2>
        <input class="article__button-delete" type="" alt="delete button" src="">
        <p class="article__p-content" contenteditable="true">${object.inputBody}</p>
      </article>
      <article class="container2">
        <!--<input class="article__button-upvote" type="image" alt="upvote" src="images/upvote.svg">-->
        <!--<input class="article__button-downvote" type="image" alt="downvote" src="images/downvote.svg">-->
        <input class="article__button-upvote" type="" alt="upvote button" src="">
        <input class="article__button-downvote" type="" alt="downvote button" src="">
        <p class="quality">quality:<span class="quality__light"> ${object.quality}</span></p>
      </article>
      <footer></footer>
    </article>`

  )
}

function enableTitleContentEditable() {
  $(this).attr('contentEditable', true);
}

function disableTitleContentEditable(event) {
  if (event.keyCode === 13) {
    $(this).attr('contentEditable', false);
    let key = $(this).parent().attr('id');
    let idea = JSON.parse(localStorage.getItem(key));
    idea.inputTitle = $(this).text();
    localStorage.setItem(key, JSON.stringify(idea));
  }
}

function enableBodyContentEditable() {
  $(this).attr('contentEditable', true);
}

function disableBodyContentEditable(event) {
  if (event.keyCode === 13) {
    $(this).attr('contentEditable', false);
    let key = $(this).parent().attr('id');
    let idea = JSON.parse(localStorage.getItem(key));
    idea.inputBody = $(this).text();
    localStorage.setItem(key, JSON.stringify(idea));
  }
}

function deleteIdea() {
  let idValue = $(this).parent().attr('id');
  localStorage.removeItem(idValue);
  $(this).parent().next().remove();
  $(this).closest($('article')).remove();
}

function increaseQuality() {
  let key = $(this).parent().siblings('.container').attr('id');
  let idea = JSON.parse(localStorage.getItem(key));
  if ($(this).siblings('.quality').text().includes('swill')) {
    $(this).siblings('.quality').text('quality: plausible');
    idea.quality = 'plausible';
  } else if ($(this).siblings('.quality').text().includes('quality: plausible')) {
    $(this).siblings('.quality').text('quality: genius');
    idea.quality = 'genius';
  }
  localStorage.setItem(key, JSON.stringify(idea));
}

function decreaseQuality() {
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

function runSearch(event) {
  event.preventDefault;
  var searchValue = $(this).val();
 $('.card').each(function(){
  if($(this).text().indexOf(searchValue.toLowerCase()) > -1){
    console.log('bang');
    $(this).show();
  } else {
    $(this).hide();
   }
    })
}

