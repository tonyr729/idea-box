let $saveBtn = $(".button__save");
let $ideaTitle = $('.form__input-title');
let $ideaBody = $('.form__input-body');
let $sectionBottom = $('.section__bottom');
let $searchInput = $('.input__search');
let $sortBtn = $('.sorting-container button');
let cardList = [];
let isSorted = false;

$saveBtn.on('click', createIdea);
$sectionBottom.on('click', '.article__button-delete', deleteIdea);
$sectionBottom.on('click', '.article__button-upvote', changeVote);
$sectionBottom.on('click', '.article__button-downvote', changeVote);
$sectionBottom.on('keydown blur', '.article__h2-title', disableContentEditable);
$sectionBottom.on('click', '.article__h2-title', enableContentEditable);
$sectionBottom.on('keydown blur', '.article__p-content', disableContentEditable);
$sectionBottom.on('click', '.article__p-content', enableContentEditable);
$searchInput.on('keyup click input', runSearch);
$sortBtn.on('click', sortByQuality);

$(function () {
  for (let i = 0; i < localStorage.length; i++) {
    let string = localStorage.getItem(localStorage.key(i));
    if (string.includes("inputTitle")) {
      let parsedString = JSON.parse(string);
      templateIdea(parsedString);
    }
  }
});

function Idea(ideaTitleValue, ideaBodyValue) {
  this.id = Date.now();
  this.inputTitle = ideaTitleValue;
  this.inputBody = ideaBodyValue;
  this.quality = 'swill';
  this.qualityValue = 1;
}

function createIdea() {
  event.preventDefault();
  if ($ideaTitle.val() === '' || $ideaBody.val() === '') {
    return;
  }
  prependCard();
  clearInputFields();
}

function prependCard() {
  const idea = new Idea($ideaTitle.val(), $ideaBody.val());
  localStorage.setItem(idea.id, JSON.stringify(idea));
  cardList.push(idea);
  templateIdea(idea);
}

function templateIdea(object) {
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

function clearInputFields() {
  $ideaTitle.val('');
  $ideaBody.val('');
}

function enableContentEditable() {
  $(this).attr('contentEditable', true);
}

function disableContentEditable(event) {
  if (event.keyCode === 13 || event.type === 'focusout') {
    $(this).attr('contentEditable', false);
    if ($(this).hasClass('article__h2-title')) {
      changeTitleStorage(this);
    } else {
      changeBodyStorage(this);
    }
  }
}

function changeTitleStorage(title) {
  let key = $(title).parent().attr('id');
  let idea = JSON.parse(localStorage.getItem(key));
  idea.inputTitle = $(title).text();
  localStorage.setItem(key, JSON.stringify(idea));
}

function changeBodyStorage(body) {
  let key = $(body).parent().attr('id');
  let idea = JSON.parse(localStorage.getItem(key));
  idea.inputBody = $(body).text();
  localStorage.setItem(key, JSON.stringify(idea));
}

function deleteIdea() {
  let idValue = $(this).parent().attr('id');
  localStorage.removeItem(idValue);
  $(this).parent().next().remove();
  $(this).closest($('article')).remove();
}

function changeVote() {
  let voteText = $(this).parent().find('.quality__light');
  let key = $(this).parent().siblings('.container').attr('id');
  let ideaObject = JSON.parse(localStorage.getItem(key));
  let quality = [' swill', ' plausible', ' genius'];
  var index = quality.indexOf(voteText.text());
  console.log('changeVote()')
  if ($(this).hasClass('article__button-upvote')) {
      console.log('upvote')
      index++;
      ideaObject.quality = quality[index];
  } else {
      index--;
      ideaObject.quality = quality[index];
  }
  voteText.text(quality[index]);
  localStorage.setItem(key, JSON.stringify(ideaObject));
};

function runSearch(event) {
  event.preventDefault;
  let searchValue = $(this).val();
  $('.card').each(function () {
    if ($(this).text().indexOf(searchValue.toLowerCase()) > -1) {
      $(this).show();
    } else {
      $(this).hide();
    }
  })
}

function sortByQuality() {
  $('.card').each(function () {
    this.remove();
  });
  if (!isSorted) {
    cardList.sort(function (a, b) {
      return a.qualityValue - b.qualityValue;
    });
    isSorted = true;
  } else {
    cardList.sort(function (a, b) {
      return a.qualityValue + b.qualityValue;
    });
    isSorted = false;
  }
  cardList.forEach(function (card) {
    templateIdea(card);
  })
}
