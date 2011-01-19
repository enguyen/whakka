var Mole = function(el) {

		var that = {};

		// Config/Init
		var el = $(el);
		var scoreEl = $('#score');
		var periodLength = 5000;
		var showLength = 500;
		var score = 0;

		// Transforms
		var toShown = {
				translateY: '-100%', rotate: '0deg', opacity: 1, scale: 1 
		};
		var toHidden = {
				translateY: '0', rotate: '0deg', opacity: 1, scale: 1
		};
		var toWhacked = {
				translateY: '-100%', rotate: '720deg', opacity: 0, scale: .5
		};

		that.start = function(moleDiv) {
				el.anim(toHidden, 0);
				el.bind('touchend click', that.whack);
				that.setNextPop();
		};

		that.setNextPop = function() {
				var delay = Math.random() * periodLength;
				setTimeout(function() {
						that.showMole();
				}, delay);
		};

		that.showMole = function() {
				console.log('showing');
				el.attr('data-vulnerable', 'true');
				
				var animLength = showLength/3/1000; // one third, in ms.
				el.anim(toShown, animLength, 'ease-out');
				
				setTimeout(function() {
						if (el.attr('data-whacked') !== 'true') {
								that.hideMole();
								that.setNextPop();
						}
				}, showLength);
		};

		that.hideMole = function() {
				console.log('hiding');
				el.attr('data-vulnerable', 'false');
				var animLength = showLength/10/1000; // one tenth, in ms.
				el.anim(toHidden, animLength, 'ease-out');
		};

		that.whack = function(e) {
				if (el.attr('data-vulnerable') === 'true') {
						console.log('WHACKED!');
						el.anim(toWhacked, 1, 'ease-out');
						el.attr('data-whacked', 'true');
						setTimeout(that.unWhack, 1000);
						score += 1;
						scoreEl.html('' + score);
				}
		};

		that.unWhack = function() {
				el.attr('data-whacked', 'false');
				el.anim(toHidden, 0);
				that.hideMole();
				that.setNextPop();
		};

		return that;
}