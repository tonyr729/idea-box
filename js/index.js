var saveBtn = $(".button__save");
var ideaTitle = $('.form__input-title');
var ideaBody = $('.form__input-body');

saveBtn.on('click', createIdea);

function createIdea() {
  event.preventDefault();
  var idea = new Idea(ideaTitle.val(), ideaBody.val());
  idea.prepend();
}

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
      <input class="article__button-qualityup" type="image" alt="delete" src="images/delete.svg">
      <input class="article__button-qualitydown" type="image" alt="delete" src="images/delete.svg">
      <span class="quality">${this.quality}</span>
    </article>   
    `
  )
};





// $(".website-title, .bookmark-link").on('keyup', checkInput);
