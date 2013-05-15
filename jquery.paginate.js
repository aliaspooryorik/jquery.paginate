/*
 * ----------------------------------------------------------------------
 * Simple Pager with on demand image loading
 * John Whish www.aliaspooryorik.com
 * ----------------------------------------------------------------------
 */
(function ($) {
	"use strict";

	// API	
	var methods = {
	};

	$.fn.paginate = function (options) {
		if (methods[options]) {
			// calling a method;
			var args = Array.prototype.slice.call(arguments, 1);
			this.each(function () {
				var instance = $.data(this, 'paginate');
				instance[options].apply(instance, args);
			});
		}
		else if (typeof options === 'object') {
			// initialise and attach to all the jQuery objects passed in
			this.each(function () {
				var instance = $.data(this, 'paginate');
				if (!instance) { // instance doesn't already exists so create it
					$.data(this, 'paginate', new $.paginate(options, this));
				}
			});
		}
		else {
			$.error('Method ' + options + ' does not exist on jQuery.paginate');
		}
		return this; // return for chaining    
	};
	
	// create a paginate class
	$.paginate = function (options, element) {
		this.$el = $(element);
		this.init(options); // initialise
	};
	
	
	$.paginate.prototype = {
		// constructor
		init: function (options) {
			this.options = $.extend({
				'itemsperpage'			: 9, // number of items to show
				'pagingtop'				: true, // show paging at the top
				'pagingbottom'			: true, // show paging at the bottom
				'classname'				: '', // class name to apply to the <ol>
				'lazyload'				: true, // load images when visible
				'element'				: 'div' // this is the HTML element type for each item
			}, options);
			
			
			var $this = this.$el, // the jQuery object referencing the divs we want to page (passed in on init)
				context = this,
				i = 0;
			
			this.currentPage = 1; // 1 based
			this.$items = $this.find('>'+this.options.element).hide(); // divs to page - hide by default
			this.pagecount = Math.ceil(this.$items.length / this.options.itemsperpage);
			this.$pager = $('<ol>').addClass('paging-control ' + this.options.classname);
			this.pagingcontrols = [];
			
			// check that we need paging
			if (this.pagecount > 1 && (this.options.pagingtop || this.options.pagingbottom)) {
				
				// we do need paging so check that lazyloading is required
				if (this.options.lazyload){
					this.$items.find('img').each(function () {
						$(this).data('src', this.src).removeAttr('src');
					});
				}
				// paging
				for (i = 1; i < this.pagecount + 1; i++) {
					$('<li>').text(i).attr('data-page', i).on('click', function () {
						var $self = $(this);
						context.showPage($self.attr('data-page'));
					}).appendTo(this.$pager);
				}
				
				if (this.options.pagingtop) {
					$('<div class="paginator top">').insertBefore($this).append(this.$pager);
				}
				if (this.options.pagingbottom) {
					$('<div class="paginator bottom">').insertAfter($this).append(this.$pager);
				}
				
				context.showPage(1);
			}
			else{
				// show all 
				this.$items.show();
			}
			
		},
		
		destroy : function () {
			return this.each(function () {
				$(window).unbind('.paginate');
			});
		},
		
		showPage : function (pageNumber) { // the page you want
			var start = (pageNumber - 1) * this.options.itemsperpage,
				$currentitems = this.$items.hide().slice(start, start + this.options.itemsperpage);
			if (this.pagingcontrols.length !== 0) {
				$('>li', this.pagingcontrols).removeClass('active').filter('[data-page=' + pageNumber + ']').addClass('active');
			}
			$currentitems.fadeIn().find('img').each(function () {
				if (this.src === '') {
					this.src = $(this).data('src');
				}
			});
		
		}
		
	};

	
})(jQuery);
