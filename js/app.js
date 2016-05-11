$(function(){
	var MQ = MathQuill.getInterface(2);
	$('.formula').each(function(i, el){
		MQ.StaticMath($(el)[0]);
	});
	
	// init header
	$('.dropdown--list').children('li').addClass('dropdown--item')
	$('.dropdown--button').on('click', function(){
		var dropdown = $(this).closest('.dropdown')
		dropdown.find('.dropdown--list').slideToggle(function(){
			dropdown.toggleClass('dropdown-active')
		})
	});
	$('.search--button').on('click', function(){
		var search = $(this).closest('.search')
		search.find('.search--field').toggle('slide', {direction: 'right'}, function(){
			search.toggleClass('search-active')
		})
	});
	
	// init reference
	$('#reference > article').addClass('reference').each(function(i, el){
		$(el).children('h2').addClass('reference--title');
		$(el).children('header').addClass('reference--definition');
		$(el).children('p').addClass('reference--description');
		$(el).children('ul, ol').addClass('reference--list');
		$(el).find('figure').addClass('reference--illustration');
		$(el).children(':not(h2)').find('.formula').addClass('reference--formula');
		$(el).find('a').addClass('reference--link');
		
		var tags = $(el).attr('data-tags');
		if (tags) {
			$(el).children('h2').attr('title', tags.replace(/;/g, '; '));
		}
		
		var categories = $(el).attr('data-categories');
		if (categories) {
			categories = $.map(categories.split(';'), function(el, i){
				return '<a href="#" class="reference--category">'+el+'</a>';
			}).join(', ');
			$('<footer>').addClass('reference--categories').html(categories).appendTo($(el));
		}
	});
	$('.reference--link').on('click', function(e){
		e.preventDefault();
		console.log("GOTO", $(this).attr('href'));
	});
	$('.reference--category').on('click', function(e){
		e.preventDefault();
		console.log($(this).text());
	});
	
	// make categories
});