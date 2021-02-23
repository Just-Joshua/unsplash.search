$(() => {
  // $('.container').css({
  //   background: `url("https://images.unsplash.com/photo-1595053863958-f966040f6eed?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=668&q=80")`,
  //   'background-position': 'center',
  //   'background-repeat': 'no-repeat',
  //   'background-size': '100%',
  // });

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
        applyBG(result);
        hasApiRun = true;
        loadContent();
      },
    });
    loadContent();
  };

  const applyBG = (e) => {
    let bgUrl = e.photos.results[Math.floor(Math.random() * 30)].urls.regular;
    $('.container').css({
      background: `url("${bgUrl}")`,
      'background-position': 'center',
      'background-repeat': 'no-repeat',
      'background-size': '100%',
      'min-height': '100vh',
      height: 'max-content',
    });
  };

  const loadContent = () => {
    if (hasApiRun == true) {
      $('#loader').hide();
      $('.container').show();
      // $('.result').hide();
    } else {
      $('#loader').show();
      $('.container').hide();
      // $('.result').hide();
    }
  };

  const apiSearch = (input) => {
    runCounter = 0;
    $.ajax({
      url: `${endpoint}&query=${input}&client_id=${apikey}`,
      contentType: 'application/json',
      success: (result) => {
        $('.imgForeground').css('backdrop-filter', 'blur(10px)');
        $('.result').show();
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
    // $('.queryName')[0].value = $('input')[0].value;
    // clear input
    $('input')[0].value = '';
    console.log(element);

    let resultUrl = element.urls.regular;
    $('.result').append(`
          <div class="resultDiv${runtime} searchResult"><div>
      `);
    $(`.resultDiv${runtime}`).css({
      'background-image': `url(${resultUrl})`,
      height: `${element.height / 12}px`,
      width: `400px`,
    });
    console.table(element.height, element.width);

    runtime += 1;
  };

  const removeResult = (e) => {
    $('.searchResult').remove();
  };

  $('form').submit(function (e) {
    e.preventDefault();
    let inputValue = $('input')[0].value;
    apiSearch(inputValue);
  });

  startApi();
});
