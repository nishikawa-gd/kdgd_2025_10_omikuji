

$(function () {
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
	$('#show-result').on('click', function (e) {

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
	if (!data) return;

	// 結果画像の設定
	$('#result-img')
		.attr('src', data.result.img)
		.attr('alt', data.result.type || 'おみくじ結果');

	// 結果に応じたクラスをbodyに追加
	if (data.result && data.result.type) {
		$('body').addClass('js-' + data.result.type);
	}

	// ラッキーアイテムの表示（設定がONの場合のみ）
	if (settings.showLuckyItem && data.lucky) {
		// data.lucky が { img: "～" } の形ならそのまま使う
		if (typeof data.lucky === 'object' && data.lucky.img) {
			$('#lucky-item-img')
				.attr('src', data.lucky.img)
				.attr('alt', 'ラッキーアイテム画像');
		}
		// data.lucky が文字列だった場合のフォールバック
		else if (typeof data.lucky === 'string') {
			$('#lucky-item-img')
				.attr('src', data.lucky)
				.attr('alt', 'ラッキーアイテム画像');
		}
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

	history.forEach(item => {
		let luckyText = '';
		if (item.lucky) {
			luckyText = ` (ラッキーアイテム: ${item.lucky.name})`;
		}

		const $li = $('<li>').html(
			`${item.date}：<strong>${item.result.type}</strong> - ${item.result.text}${luckyText}`
		);
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

$(function () {
	handleHistoryPage();
});



