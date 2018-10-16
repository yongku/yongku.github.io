/*
 *jQuery carouFredSel 1.3.3
 *www.frebsite.nl
 *Copyright (c) 2010 Fred Heusschen
 *Licensed under the MIT license.
 *http://www.opensource.org/licenses/mit-license.php
*/


(function($jq) {
	$jq.fn.carouFredSel = function(options) {
		return this.each(function() {
			var opts = $jq.extend(true, {}, $jq.fn.carouFredSel.defaults, options),
				$jqul = $jq(this),
				$jqitems = $jq("li", $jqul),
				totalItems = $jqitems.length,
				nextItem = opts.visibleItems,
				prevItem = totalItems-1,
				itemWidth = $jqitems.outerWidth(),
				itemHeight = $jqitems.outerHeight(),
				autoInterval = null,
				direction = (opts.direction == "up" || opts.direction == "right") ? "next" : "prev";

			if (opts.visibleItems >= totalItems) {
				try { console.log('carouFredSel: Not enough items: terminating'); } catch(err) {}
				return;
			}

			if (opts.scroll.items == 0) 	opts.scroll.items = opts.visibleItems;
					
			opts.auto = $jq.extend({}, opts.scroll,opts.auto);
			opts.buttons = $jq.extend({}, opts.scroll,opts.buttons);
			opts.next = $jq.extend({}, opts.buttons,opts.next);
			opts.prev = $jq.extend({}, opts.buttons,opts.prev);

			if (!opts.auto.pauseDuration) opts.auto.pauseDuration = 2500;
			if ( opts.auto.pauseDuration == opts.auto.speed) opts.auto.speed--;

			opts.buttons = null;
			opts.scroll  = null;

			if (opts.direction == "right" ||
				opts.direction == "left"
			) {
				var cs1 = {
					width : itemWidth * totalItems * 2
				}
				var cs2 = {
					width : opts.width || itemWidth * opts.visibleItems,
					height : opts.height || itemHeight
				}
			} else {
				var cs1 = {
					height : itemHeight * totalItems * 2
				}
				var cs2 = {
					height : opts.height || itemHeight * opts.visibleItems,
					width : opts.width || itemWidth
				}
			}

			$jqul.css(cs1).css({
				position : "absolute"
			}).wrap('<div class="caroufredsel_wrapper" />').parent().css(cs2).css({ 
				position : "relative",
				overflow : "hidden"
			});

			$jqul
				.bind("pause", function() {
					if (autoInterval != null) {
						clearTimeout(autoInterval);
					}
				})
				.bind("play", function(e, d) {
					if (opts.autoPlay) {
						if (d == null ||
							d == '' ||
							typeof(d) == 'undefined'
						) {
							d = direction;
						}

						autoInterval = setTimeout(function() {
							if ($jqul.is(":animated")) 	$jqul.trigger("pause").trigger("play", d);//still animating, wait
							else $jqul.trigger(d, opts.auto);//scroll
						}, opts.auto.pauseDuration);
					}
				})
				.bind("next", function(e, sliderObj) {
					if ($jqul.is(":animated")) return;

						 if (typeof(sliderObj) == 'undefined')	sliderObj = opts.next;
						 if (typeof(sliderObj) == 'object') 	numItems  = sliderObj.items;
					else if (typeof(sliderObj) == 'number') {
						numItems  = sliderObj;
						sliderObj = opts.next;
					}
					if (!numItems || typeof(numItems) != 'number') return;

					if (totalItems < opts.visibleItems+numItems) {
						$jqul.find("li:lt("+((opts.visibleItems+numItems)-totalItems)+")").clone(true).appendTo($jqul);
					}

					var currentItems = $jq.fn.carouFredSel.getCurrentItems($jqul, opts, numItems);

					if (opts.direction == "right" ||
						opts.direction == "left"
					) {
						var pos = 'left',
							siz = itemWidth;
					} else {
						var pos = 'top',
							siz = itemHeight;
					}
					var ani = {},
						cal = {};

					ani[pos] = $jqul.offset()[pos]-currentItems[0].offset()[pos] || -(siz * numItems);
					cal[pos] = 0;

					if (sliderObj.onBefore) {
						sliderObj.onBefore(currentItems[0], currentItems[1], "next");
					}

					$jqul
						.data("numItems", numItems)
						.data("sliderObj", sliderObj)
						.data("oldItems", currentItems[0])
						.data("newItems", currentItems[1])
						.animate(ani, { 
							duration: sliderObj.speed,
							easing	: sliderObj.effect,
							complete: function() {
								if ($jqul.data("sliderObj").onAfter) {
									$jqul.data("sliderObj").onAfter($jqul.data("oldItems"), $jqul.data("newItems"), "next");
								}
								if (totalItems < opts.visibleItems+$jqul.data("numItems")) {
									$jqul.find("li:gt("+(totalItems-1)+")").remove();
								}
								$jqul.css(cal).find("li:lt("+$jqul.data("numItems")+")").appendTo($jqul);
							}
						});

					//	auto-play
					$jqul.trigger("pause").trigger("play", "next");
				})
				.bind("prev", function(e, sliderObj) {
					if ($jqul.is(":animated")) return;

						 if (typeof(sliderObj) == 'undefined')	sliderObj = opts.prev;
						 if (typeof(sliderObj) == 'object') 	numItems  = sliderObj.items;
					else if (typeof(sliderObj) == 'number') {
						numItems  = sliderObj;
						sliderObj = opts.prev;
					}
					if (!numItems || typeof(numItems) != 'number') return;

					$jqul.find("li:gt("+(totalItems-numItems-1)+")").prependTo($jqul);

					if (totalItems < opts.visibleItems+numItems) {
						$jqul.find("li:lt("+((opts.visibleItems+numItems)-totalItems)+")").clone(true).appendTo($jqul);
					}

					var currentItems = $jq.fn.carouFredSel.getCurrentItems($jqul, opts, numItems);

					if (opts.direction == "right" ||
						opts.direction == "left"
					) {
						var pos = 'left',
							siz = itemWidth;
					} else {
						var pos = 'top',
							siz = itemHeight;
					}

					var css = {},
						ani = {};

					css[pos] = $jqul.offset()[pos]-currentItems[1].offset()[pos] || -(siz * numItems);
					ani[pos] = 0;

					if (sliderObj.onBefore) {
						sliderObj.onBefore(currentItems[1], currentItems[0], "prev");
					}

					$jqul
						.data("numItems", numItems)
						.data("sliderObj", sliderObj)
						.data("oldItems", currentItems[1])
						.data("newItems", currentItems[0])
						.css(css)
						.animate(ani, { 
							duration: sliderObj.speed,
							easing	: sliderObj.effect,
							complete: function() {
								if (totalItems < opts.visibleItems+$jqul.data("numItems")) {
									$jqul.find("li:gt("+(totalItems-1)+")").remove();
								}
								if ($jqul.data("sliderObj").onAfter) {
									$jqul.data("sliderObj").onAfter($jqul.data("oldItems"), $jqul.data("newItems"), "next");
								}
							}
						});

					//	auto-play
					$jqul.trigger("pause").trigger("play", "prev");
				})
				.bind("slideTo", function(e, n, d) {
					if ($jqul.is(":animated")) return;

					if (typeof(n) == 'object') n = $jqul.find('li').index(n);
					if (typeof(n) == 'string') n = parseInt(n);
					if (typeof(d) == 'string') d = parseInt(d);
					if (typeof(d) != 'number') d = 0;

					if (typeof(n) != 'number') {
						try { console.log('carouFredSel: Not a valid number.'); } catch(err) {}
						return;
					}

					n += d;
					if (n < 0) n += totalItems;
					if (n >= totalItems)	n -= totalItems;
					if (n == 0) return;

					if (n < totalItems / 2) $jqul.trigger("next", n);
					else $jqul.trigger("prev", totalItems-n);
				});


			if (opts.auto.pauseOnHover && opts.autoPlay) {
				$jqul.hover(
					function() { $jqul.trigger("pause"); },
					function() { $jqul.trigger("play", direction); }
				);
			}

			//	via prev- en/of next-buttons
			if (opts.next.button != null) {
				opts.next.button.click(function() {
					$jqul.trigger("next");
					return false;
				});
				if (opts.next.pauseOnHover && opts.autoPlay) {
					opts.next.button.hover(
						function() { $jqul.trigger("pause"); },
						function() { $jqul.trigger("play", direction); }
					);
				}
			}
			if (opts.prev.button != null) {
				opts.prev.button.click(function() {
					$jqul.trigger("prev");
					return false;
				});
				if (opts.prev.pauseOnHover && opts.autoPlay) {
					opts.prev.button.hover(
						function() { $jqul.trigger("pause"); },
						function() { $jqul.trigger("play", direction); }
					);
				}
			}
			
			//	via keyboard
			if (opts.next.key != null ||
				opts.prev.key != null
			) {
				if (typeof(opts.next.key) == "string") opts.next.key = $jq.fn.carouFredSel.getKeyCode(opts.next.key);
				if (typeof(opts.prev.key) == "string") opts.prev.key = $jq.fn.carouFredSel.getKeyCode(opts.prev.key);

				$jq(window).keyup(function(event) {
					if (event.keyCode == opts.next.key)	$jqul.trigger("next");
					if (event.keyCode == opts.prev.key)	$jqul.trigger("prev");
				});
			}

			//	via auto-play
			$jqul.trigger("play", direction);
		});
	}

	$jq.fn.carouFredSel.defaults = {
		height : null,
		width : null,
		visibleItems : 5,
		autoPlay : true,
		direction : "right",
		scroll : {
			items : 0,
			effect : 'swing',
			speed : 500,
			pauseOnHover : false,
			onBefore : null,
			onAfter : null
		}
	}
	
	$jq.fn.carouFredSel.getKeyCode = function(string) {
		if (string == "right") return 39;
		if (string == "left") return 37;
		if (string == "up") return 38;
		if (string == "down") return 40;
		
		return -1;
	};
	
	$jq.fn.carouFredSel.getCurrentItems = function($jqu, o, n) {
		var oi = $jqu.find("li:lt("+o.visibleItems+")"),
			ni = $jqu.find("li:lt("+(o.visibleItems+n)+"):gt("+(n-1)+")");

		return [oi, ni];
	}
	
})(jQuery);