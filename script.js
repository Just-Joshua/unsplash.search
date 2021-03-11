$(() => {
  let hasApiRun = false;
  let endpoint = 'https://api.unsplash.com/search/?page=1';
  let apikey = 'vSAXAyLMNEm0XpKTMGIXqYjsNa6wSV3fAdbKclFjQWQ';
  let query;
  let runCounter;
  let runtime = 0;
  let searchedPreviously = false;

  const startApi = () => {
    let orientation = 'portrait';
    $.ajax({
      url: `${endpoint}&query=white&client_id=${apikey}&per_page=30&orientation=${orientation}`,
      contentType: 'application/json',
      success: (result) => {
        hasApiRun = true;
      },
    });
  };
  // const applyBG = (e) => {
  //   $('.container').css({
  //     background: `url("./asset/lofiGirl.png")`,
  //     'background-position': 'center',
  //     'background-repeat': 'no-repeat',
  //     'background-size': '100%',
  //     'min-height': '100vh',
  //     height: 'max-content',
  //   });
  //   loadContent();
  // };

  // const loadContent = () => {
  //   $('#loader').hide();
  //   $('.container').show();
  //   // $('.result').hide();
  // };
  // applyBG();

  const apiSearch = (input) => {
    runCounter = 0;
    $.ajax({
      url: `${endpoint}&query=${input}&client_id=${apikey}`,
      contentType: 'application/json',
      success: (result) => {
        $('.imgForeground').css('backdrop-filter', 'blur(10px)');
        $('.result').show();
        console.log(input);
        $('.queryName')[0].innerHTML = input.toUpperCase();
        result.photos.results.forEach((element) => {
          if (searchedPreviously === false) {
            appendResult(element);
          } else if (searchedPreviously === true) {
            removeResult();
            appendResult(element);
          }
          runCounter += 1;
          // console.log(runCounter);
          if (runCounter >= 10) {
            searchedPreviously = true;
            // runCounter = 0;
          } else {
            searchedPreviously = false;
          }
        });
      },
    });
  };

  const appendResult = (element, url) => {
    // Clears Input
    $('input')[0].value = '';

    let resultUrl = element.urls.regular;
    $('.result').append(`
          <div class="resultDiv${runtime} searchResult"><div>
      `);
    $(`.resultDiv${runtime}`).css({
      'background-image': `url(${resultUrl})`,
      height: `${element.height / 12}px`,
      width: `400px`,
    });
    // console.table(element.height, element.width);

    runtime += 1;
  };

  const removeResult = (e) => {
    $('.searchResult').remove();
  };

  $('form').submit(function (e) {
    e.preventDefault();

    // ====Temporarily commented for Testing=====

    // let inputValue = $('input')[0].value;
    // if (inputValue !== '') {
    //   apiSearch(inputValue);
    // } else {
    //   console.log('Search Input is empty');
    // }

    createDivs();
  });

  startApi();
  let fakerun = 0;
  const createDivs = () => {
    $('.result').append(`
    <div class="searchResult fakeresult${fakerun}">${fakerun}</div>
  `);
    $(`.fakeresult${fakerun}`).css({
      background: 'whitesmoke',
      'text-align': 'center',
      height: `${Math.floor(Math.random() * 300) + 200}px`,
    });
    fakerun++;
  };
  // jQuery end
});
