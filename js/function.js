$(function() {
  function init() {
    handlePlayPage();
    handleResultPage();
    handleHistoryPage(); // ←履歴ページも忘れずに！
  }
  init();
});

function handlePlayPage() {
  if (!$('body').hasClass('play')) return;

  $('.show-result').on('click', function(e) {
    e.preventDefault();

    const doorClass = $(this).parent().attr('class'); // 例："door3"
    const doorNumber = doorClass.replace('door', ''); // "3"

    const result = omikujiResults[Math.floor(Math.random() * omikujiResults.length)];
    const character = omikujiCharacter[Math.floor(Math.random() * omikujiCharacter.length)];
    const lucky = settings.showLuckyItem
      ? luckyItems[Math.floor(Math.random() * luckyItems.length)]
      : null;

    const history = JSON.parse(localStorage.getItem('omikujiHistory') || '[]');
    history.push({ result, character, lucky, door: doorNumber, date: new Date().toLocaleString() });
    localStorage.setItem('omikujiHistory', JSON.stringify(history));
    localStorage.setItem('omikujiCurrent', JSON.stringify({ result, character, lucky, door: doorNumber }));

    window.location.href = 'result.html';
  });
}

function handleResultPage() {
  if (!$('body').hasClass('result')) return;

  const data = JSON.parse(localStorage.getItem('omikujiCurrent'));
  if (!data) return;

  $('#result-text').text(`${data.result.type}：${data.result.text}`);
  $('#result-img').attr('src', data.result.img).attr('alt', data.result.type);

  if (data.character) {
    $('#result-character').attr('src', data.character.img).attr('alt', '結果キャラクター');
  }

  if (settings.showLuckyItem && data.lucky) {
    $('#lucky-item').text(data.lucky);
  } else {
    $('#lucky-wrapper').remove();
  }

  // ドア画像の表示
  const doorNumber = data.door;
  if (doorNumber) {
    const doorImagePath = `images/result/door${doorNumber}.png`;
    $('#selected-door-img').attr('src', doorImagePath).attr('alt', `選んだドア${doorNumber}`);
  }

  // 特別演出
  if (data.result.img.includes('lucky.png')) {
    $('#result-img').css({ width: 'auto', height: '400px' ,paddingRight:'60px'});
    $('#result-character').css({ marginTop: '-220px'});
  }

  if (data.result.img.includes('bad.png')) {
    $('.result').css({
      background: 'url("images/result/cloud_spider.png") no-repeat',
      backgroundSize: 'contain',
      backgroundPosition: 'top center',
      backgroundColor: '#270C37'
    });
  }
}

function handleHistoryPage() {
  if (!$('body').hasClass('history')) return;

  const history = JSON.parse(localStorage.getItem('omikujiHistory') || '[]');
  const $list = $('#history-list');

  history.forEach(item => {
    const $li = $('<li>').html(
      `${item.date}：<strong>${item.result.type}</strong> - ${item.result.text}` +
      (item.character ? `<br><img src="${item.character.img}" alt="キャラ" width="50">` : '') +
      (item.lucky ? `<br>ラッキーアイテム: ${item.lucky}` : '')
    );
    $list.append($li);
  });

  $('#clear-history').on('click', function() {
    if (confirm('履歴をすべて消していい？')) {
      localStorage.removeItem('omikujiHistory');
      $list.empty();
    }
  });
}