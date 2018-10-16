;(function($){
	$.fn.extend({
		swipeSS: function( options ) {
			this.defaultOptions = {
				startSlide: 0,
				autoStart: true,
				delay: 3000,
				continuous: true,
				disableScroll: false,
				stopPropagation: false,
				callback: function(index, element) {},
				transitionEnd: function(index, element) {},
				selectorNav: '',
				selectorSlide: '',
				selectorPlay: '',
				selectorStop: '',
				selectorPrev: '',
				selectorNext: ''
			};
			var settings = $.extend({}, this.defaultOptions, options);

			function jqObject(selector) {
				return selector instanceof jQuery ? selector : this.find(selector);
			}

			return this.each(function() {
				var $this = $(this),
						$nav = jqObject.call($this, settings.selectorNav),
						$slide = jqObject.call($this, settings.selectorSlide),
						$play = jqObject.call($this, settings.selectorPlay),
						$stop = jqObject.call($this, settings.selectorStop),
						$prev = jqObject.call($this, settings.selectorPrev),
						$next = jqObject.call($this, settings.selectorNext),
						swipe = $this.data('Swipe');
				if(swipe) {
					swipe.setup();
					return;
				}
						
				swipe = Swipe($this[0], {
					startSlide: settings.startSlide,
					auto: settings.delay,
					continuous: settings.continuous,
					disableScroll: settings.disableScroll,
					stopPropagation: settings.stopPropagation,
					callback: function(index, element) {
						$nav.find('a').removeClass('on');
						$nav.parent().find('>*:eq(' + index + ')').find('a').addClass('on');
						setTimeout(function() { $this.scrollLeft(0); }, 0);
						settings.callback(index, element);
					},
					transitionEnd: function(index, element) {
						settings.transitionEnd(index, element);
					}
				});
				$this.data('Swipe', swipe);

				$slide.find('a').on('focus', function(e) {
					swipe.pause();
					swipe.slide($(this).parents('li').index());
				}).on('blur', function(e) {
					swipe.resume();
				});

				$nav.click(function() {
					$stop.trigger('click');
					swipe.slide($(this).index());
				});

				$play.click(function() {
					swipe.play();
					$play.hide();
					$stop.show();
				});
				$stop.click(function() {
					swipe.stop();
					$play.show();
					$stop.hide();
				});
				$next.click(function() {
					$stop.trigger('click');
					swipe.next();
				});
				$prev.click(function() {
					$stop.trigger('click');
					swipe.prev();
				});

				$slide.hover(swipe.pause, swipe.resume);

				if(!settings.autoStart) {
					swipe.stop();
					$play.show();
					$stop.hide();
				} else {
					swipe.play();
					$play.hide();
					$stop.show();
				}
			});
		}
	});
})(jQuery);