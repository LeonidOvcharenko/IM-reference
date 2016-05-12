RegExp.quote = function(str) {
	return (str+'').replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
};
var reference_tags = new Object(null);
function filter_articles(text, callback){
	var reg = new RegExp(RegExp.quote(text), 'i');
	var array = []
	for (var key in reference_tags){
		var ret = callback('#'+reference_tags[key], !text || key.match(reg));
		if (ret && array.indexOf(ret) == -1) array.push(ret);
	}
	return array;
}
function show_filtered_articles(request){
	var articles = filter_articles(request, function(id, matches){
		return matches ? id : false;
	});
	articles = articles.join(',');
	$('.reference').addClass('reference-hidden');
	$(articles).removeClass('reference-hidden');
}
function search_hints(request, response){
	if (request.term.length < 2) {
		response([]);
		return;
	}
	var data = filter_articles(request.term, function(id, matches){
		return matches ? $(id).attr('data-title') : false;
	});
	response(data);
}
function init_header(){
	reference_categories = reference_categories.sort();
	var cat_list = $.map(reference_categories, function(el, i){
		return '<li class="dropdown--item">'+el+'</li>';
	})
	$('#categories').append(cat_list.join(''));
	$('.dropdown--list').menu({select: function(event,ui){
		show_category(ui.item.text());
		$(ui.item).closest('.dropdown').removeClass('dropdown-active').find('.dropdown--list').hide();
	}});
	$('.dropdown--button').on('click', function(){
		var dropdown = $(this).closest('.dropdown');
		dropdown.find('.dropdown--list').slideToggle(function(){
			dropdown.toggleClass('dropdown-active')
		});
	});
	$('.search--button').on('click', function(){
		var search = $(this).closest('.search')
		search.find('.search--field').toggle('slide', {direction: 'right'}, function(){
			search.toggleClass('search-active')
		})
	});
	var show_fn = function(event, ui){
		var request = ui.item ? ui.item.value : $(event.target).val();
		if (request.length == 1) return;
		show_filtered_articles(request);
	}
	$('.search--input').autocomplete({
		minLength: 0,
		source: search_hints,
		search: show_filtered_articles,
		select: show_filtered_articles
	});
}

function show_category(cat){
	$('.reference').addClass('reference-hidden');
	$(".reference--category:contains('"+cat+"')").each(function(i, el){
		$(el).closest('.reference').removeClass('reference-hidden');
	});
	scroll_to_article($('.reference:visible:first'));
}
var reference_categories = [];
function scroll_to_article(el){
	// Scroll
	var el_pos = el.position().top;
	var scroll_pos = $('.content').scrollTop();
	var padding = parseFloat($('.content').css('padding-top'));
	$('.content').animate({scrollTop: el_pos+scroll_pos-padding}, 'slow');
}
function init_reference(){
	var MQ = MathQuill.getInterface(2);
	$('.formula').each(function(i, el){
		MQ.StaticMath($(el)[0]);
	});
	$('#reference > article').addClass('reference').each(function(i, el){
		$(el).attr('id', 'ref_'+i);
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
		
		// fill search dictionary
		tags = tags.split(';');
		$(el).attr('data-title', tags[0] || '???');
		$.each(tags, function(t, tag){
			reference_tags[tag] = 'ref_'+i;
		});
		var definition = $(el).find('.reference--definition').text();
		if (definition) { reference_tags[definition] = 'ref_'+i; }
		
		// add categories links
		var categories = $(el).attr('data-categories');
		if (categories) {
			categories = categories.split(';');
			var cat_links = $.map(categories, function(el, i){
				return '<a href="#" class="reference--category">'+el+'</a>';
			}).join(', ');
			$('<footer>').addClass('reference--categories').html(cat_links).appendTo($(el));
			$.each(categories, function(j, cat){
				if (reference_categories.indexOf(cat) == -1) reference_categories.push(cat);
			});
		}
	});
	$('.reference--link').on('click', function(e){
		e.preventDefault();
		var link = $(this).attr('href');
		var target = $('#'+reference_tags[link]).removeClass('reference-hidden')
		scroll_to_article(target);
	});
	$('.reference--category').on('click', function(e){
		e.preventDefault();
		show_category($(this).text());
	});
}

$(function(){
	init_reference();
	init_header();
	
	// make categories
});