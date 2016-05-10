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
		$(el).children('ul').addClass('reference--list');
		$(el).children('figure').addClass('reference--illustration');
		$(el).children(':not(h2)').find('.formula').addClass('reference--formula');
		var tags = $(el).attr('data-tags');
		if (tags) {
			tags = $.map(tags.split(';'), function(el, i){
				return '<a href="#" class="reference--tag">'+el+'</a>';
			});
			$('<footer>').addClass('reference--tags').html(tags.join(', ')).appendTo($(el))
		}
	});
	$('.reference--tag').on('click', function(e){
		e.preventDefault();
		console.log($(this).text())
	});
	
	// make categories
});