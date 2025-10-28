

$(function() {
	function init() {
		handlePlayPage();
		handleResultPage();
		handleHistoryPage();
	}
	init();
});



// ===== 演出ページの処理 =====
function handlePlayPage() {

  if (!$('body').hasClass('play')) return;

  $('.keychain').on('click', function() {

    // おみくじ結果をランダムで選択
    const result = omikujiResults[Math.floor(Math.random() * omikujiResults.length)];

    // 履歴を取得・追加
    const history = JSON.parse(localStorage.getItem('omikujiHistory') || '[]');
    history.push({ result, date: new Date().toLocaleString() });
    localStorage.setItem('omikujiHistory', JSON.stringify(history));

    // 現在結果を保存（lucky関連は削除）
    localStorage.setItem('omikujiCurrent', JSON.stringify({ result }));

    // 結果ページへ遷移
    window.location.href = 'result.html';
  });
}



// ===== 結果ページの処理 =====
function handleResultPage() {
  
  // bodyにresultクラスがなければ終了
  if (!$('body').hasClass('result')) return;

  // localStorageから現在のおみくじ結果を取得
  const data = JSON.parse(localStorage.getItem('omikujiCurrent'));
  if (!data) return;

  // 結果表示
  $('#result-text').text(data.result.type);
  $('#result-img').attr('src', data.result.img).attr('alt', data.result.type);


  $('#result-text').html(`
  <img class="result-typeImg" src="${data.result.typeImg}" alt="${data.result.type}">
  <p class="result-comment">${data.result.comment}</p>`);


  // 結果に応じたクラスをbodyに追加
  $('body').addClass('js-' + data.result.type);
}



// ===== 履歴ページの処理 =====
function handleHistoryPage() {

	// bodyにhistoryクラスがなければ終了
	if (!$('body').hasClass('history')) return;

	// localStorageから履歴を取得
	const history = JSON.parse(localStorage.getItem('omikujiHistory') || '[]');

	// 履歴がなければメッセージを表示して終了
	const $list = $('#history-list');

	history.forEach(item => {
	const $li = $('<li>').html(`
		${item.date}：<strong>${item.result.type}</strong>
	`);
	$list.append($li);
	});

	// 履歴削除ボタン処理
	$('#clear-history').on('click', function() {
		if (confirm('履歴をすべて削除しますか？')) {
			localStorage.removeItem('omikujiHistory');
			$list.empty();
		}
	});
}


