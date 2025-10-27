

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

  $('#show-result').on('click', function (e) {
    e.preventDefault();

    const $playArea = $('body.play');
    $playArea.removeClass('animate');
    setTimeout(() => $playArea.addClass('animate'), 50);

    // === 🌊 波紋アニメーションを順に表示 ===
    $('.ripple img').hide(); // 最初は全部非表示にしておく

    $('.ripple1 img').fadeIn(600).delay(400).fadeOut(800);
    setTimeout(() => {
      $('.ripple2 img').fadeIn(600).delay(400).fadeOut(800);
    }, 500);
    setTimeout(() => {
      $('.ripple3 img').fadeIn(600).delay(400).fadeOut(800);
    }, 1000);

    // === 🎴 おみくじ結果処理 ===
    const result = omikujiResults[Math.floor(Math.random() * omikujiResults.length)];
    const colors = Object.keys(colorMap);
    const luckyColor = settings.showLuckyItem
      ? colors[Math.floor(Math.random() * colors.length)]
      : null;

    // 履歴保存
    const history = JSON.parse(localStorage.getItem('omikujiHistory') || '[]');
    history.push({ result, lucky: luckyColor, date: new Date().toLocaleString() });
    localStorage.setItem('omikujiHistory', JSON.stringify(history));
    localStorage.setItem('omikujiCurrent', JSON.stringify({ result, lucky: luckyColor }));

    // 3.5秒後に結果ページへ（波紋が終わってから）
    setTimeout(() => {
      window.location.href = 'result.html';
    }, 2700);
  });
}




// ===== 結果ページの処理 =====
function handleResultPage() {
	
	// bodyにresultクラスがなければ終了
	if (!$('body').hasClass('result')) return;

	// localStorageから現在のおみくじ結果を取得
	const data = JSON.parse(localStorage.getItem('omikujiCurrent'));
	// データがなければ終了
	if (!data) return;


	// 画像の設定
	$('#result-img')
  		.attr('src', data.result.img)
  		.attr('alt', data.result.type);

	$('#result-text').text(data.result.type);
	// 結果に応じたクラスをbodyに追加	
	$('body').addClass('js-' + data.result.type);

	// ラッキーアイテムの表示（設定がONの場合のみ）
	if (settings.showLuckyItem && data.lucky) {
  		const color = colorMap[data.lucky] || "black"; // ←ここでcolorを定義！

		  $('#lucky-item').text(data.lucky);
 		  $('#lucky-circle').css('background-color', color); // 丸の色を設定
	} else {
  		$('#lucky-wrapper').remove();
	}
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
		const $li = $('<li>').html(
			`${item.date}：<strong>${item.result.type}</strong> - ${item.result.text}` +
			(item.lucky ? ` (ラッキーアイテム: ${item.lucky})` : '')
		);
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


