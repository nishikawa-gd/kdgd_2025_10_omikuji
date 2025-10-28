

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


	// bodyにplayクラスがなければ終了
	if (!$('body').hasClass('play')) return;

	// show-resultボタン押下時の処理
	$('#show-result').on('click', function(e) {

		// デフォルトの動作をキャンセル
		e.preventDefault();

		// おみくじ結果とラッキーアイテムをランダムに選択
		const result = omikujiResults[Math.floor(Math.random() * omikujiResults.length)];

		// ラッキーアイテムの選択（設定がONの場合のみ）
		const lucky = settings.showLuckyItem
			? luckyItems[Math.floor(Math.random() * luckyItems.length)]
			: null;

		// 履歴保存
		const history = JSON.parse(localStorage.getItem('omikujiHistory') || '[]');
		
		// 履歴に追加
		history.push({ result, lucky, date: new Date().toLocaleString() });
		// 履歴をlocalStorageに保存
		localStorage.setItem('omikujiHistory', JSON.stringify(history));

		// 現在結果保存
		localStorage.setItem('omikujiCurrent', JSON.stringify({ result, lucky }));

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
	// データがなければ終了
	if (!data) return;

	// 結果表示
	$('#result-text').text(`${data.result.type}：${data.result.text}`);
	// 画像の設定
	$('#result-img').attr('src', data.result.img).attr('alt', data.result.type);

	// 結果に応じたクラスをbodyに追加	
	$('body').addClass('js-' + data.result.type);

	// ラッキーアイテムの表示（設定がONの場合のみ）
	if (settings.showLuckyItem && data.lucky) {
		$('#lucky-item').text(data.lucky);
	} else {
		$('#lucky-wrapper').remove();
	}
}


// 履歴ページ処理
function handleHistoryPage() {
	if (!$('body').hasClass('history')) return;
  
	const history = JSON.parse(localStorage.getItem('omikujiHistory') || '[]');
	const $list = $('#history-list');
  
	if (history.length === 0) {
	  $list.append('<li>履歴はまだありません。</li>');
	  return;
	}
  
	// ★ 最新3件だけ取り出す（新しい順に）
	const latestHistory = history.slice(-3).reverse();
  
	latestHistory.forEach(item => {
	  const luckyText = item.lucky ? item.lucky : '（なし）';
  
	  // ★ 改行して見やすく
	  const $li = $('<li>').html(`
		<div class="history-item">
		  <p class="history-date">${item.date}</p>
		  <p class="history-result"><strong>${item.result.type}</strong> - ${item.result.text}</p>
		  <p class="history-lucky">ラッキーアイテム：${luckyText}</p>
		</div>
	  `);
  
	  $list.append($li);
	});
  
	$('#clear-history').on('click', function () {
	  if (confirm('履歴をすべて削除しますか？')) {
		localStorage.removeItem('omikujiHistory');
		$list.empty();
		$list.append('<li>履歴はまだありません。</li>');
	  }
	});
  }
  
  