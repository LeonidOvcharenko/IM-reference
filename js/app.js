$(function(){
	var MQ = MathQuill.getInterface(2);
	MQ.StaticMath($('#test')[0]);
	
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
	
	// make categories
});