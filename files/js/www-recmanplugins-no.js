'use strict';

// fbq('track', "ViewContent");

/**
 * Singleton with "register" functionality.
 *
 * @see http://codereview.stackexchange.com/questions/15166/best-way-to-organize-javascript-for-website
 */

(function (exports) {

	'use strict';

	var initialized,
		registry = []; // Collection of module.

	// Adds module to collection:
	exports.register = function (moduleDeclaration) {

		registry.push(moduleDeclaration); // Add module to registry.

		if (initialized) {

			// If lib already initialized, register and execute module immediately:
			moduleDeclaration.call(this);

		}

	};

	// Executes every module:
	exports.init = function () {

		initialized = true; // Flippin' switches!

		// Loop through each module and execute:
		for (var i = 0, l = registry.length; i < l; i++) {

			registry[i].call(this); // Call and execute module.

		}

	};

}(window.GHB = window.GHB || {})); // Use existing namespace or make a new object of that namespace.

$(function () {

	window.Intercom('boot', {
		app_id: 'uiel53cc',
		widget: {
			activator: '#IntercomDefaultWidget'
		}
	});

	$('.customer-support').on("click", function (event) {

		event.preventDefault();

		if ($(this).hasClass('unauthorized-access')) {

			Intercom('showNewMessage', 'Notice on unauthorised use of RAMP Account.\n\nYour message: ');

		} else if ($(this).hasClass('copyright-violation')) {

			Intercom('showNewMessage', 'Notice on Copyright Violation.\n\nYour message: ');

		} else if ($(this).hasClass('sales-team')) {

			Intercom('showNewMessage', 'Request for Custom Pricing Options\n\nYour message: ');

		} else {

			Intercom('showNewMessage');

		}

	});

	var sH = $(window).height();
	var sW = $(window).width();

	if (sH < 768) {

		$('.control-btn.fui-arrow-down').hide();

	}

	if (sW < 992) {

		$('.control-btn.fui-arrow-down').hide();

	}

	$(window).resize(function () {

		$('.section.one').css('height', (sH - $('header').outerHeight()) + 'px');
		$('.section.two').css('height', (sH) + 'px');
		$('.section.three').css('height', (sH) + 'px');
		$('.section.four').css('height', (sH) + 'px');
		$('.section.five').css('height', (sH) + 'px');
		$('.section.six').css('height', (sH) + 'px');

		if (sH < 768) {

			$('.control-btn.fui-arrow-down').hide();

		}

		if (sW < 992) {

			$('.control-btn.fui-arrow-down').hide();

		}

	});

	$('.control, .control-btn').on('click', function () {
		$.scrollTo($(this).closest('.section').next(), {
			axis: 'y',
			duration: 500
		});
		return false;
	});


	$('body').scrollspy({
		target: 'header .navbar .navbar-collapse'
	});

	// $('header .navbar a.seven').attr('href', 'https://help.recmanplugins.no/').attr('target', '_blank');

	$('header .navbar a').on('click', function (event) {

		if (!$(this).hasClass('btn-default')) {

			event.preventDefault();

		}

		if ($(this).hasClass('one')) {

			$.scrollTo($('header'), {
				axis: 'y',
				duration: 500
			});
		} else if ($(this).hasClass('two')) {

			$.scrollTo($('#two'), {
				axis: 'y',
				duration: 500
			});


		} else if ($(this).hasClass('three')) {
			$.scrollTo($('#three'), {
				axis: 'y',
				duration: 500
			});


		} else if ($(this).hasClass('four')) {
			$.scrollTo($('#four'), {
				axis: 'y',
				duration: 500
			});


		} else if ($(this).hasClass('five')) {
			$.scrollTo($('#five'), {
				axis: 'y',
				duration: 500
			});


		} else if ($(this).hasClass('six')) {
			$.scrollTo($('#six'), {
				axis: 'y',
				duration: 500
			});

			fbq('trackCustom', 'Lead');

		} else if ($(this).hasClass('seven')) {

			window.open('https://help.recmanplugins.no/', '_blank');

		} else if ($(this).hasClass('home')) {
			window.location.href = "/";

		}

	});

	// Add segments to a slider
	$.fn.addSliderSegments = function () {
		return this.each(function () {
			var $this = $(this),
				option = $this.slider('option'),
				amount = (option.max - option.min) / option.step,
				orientation = option.orientation;
			if ('vertical' === orientation) {
				var output = '',
					i;
				console.log(amount);
				for (i = 1; i <= amount - 1; i++) {
					output += '<div class="ui-slider-segment" style="top:' + 100 / amount * i + '%;"></div>';
				}
				$this.prepend(output);
			} else {
				var segmentGap = 100 / (amount) + '%';
				var segment = '<div class="ui-slider-segment" style="margin-left: ' + segmentGap + ';"></div>';
				$this.prepend(segment.repeat(amount - 1));
			}
		});
	};

	// jQuery UI Spinner
	$.widget('ui.customspinner', $.ui.spinner, {

		widgetEventPrefix: $.ui.spinner.prototype.widgetEventPrefix,
		_buttonHtml: function () { // Remove arrows on the buttons

			return '' +
				'<a class="ui-spinner-button ui-spinner-up ui-corner-tr">' +
				'<span class="ui-icon ' + this.options.icons.up + '"></span>' +
				'</a>' +
				'<a class="ui-spinner-button ui-spinner-down ui-corner-br">' +
				'<span class="ui-icon ' + this.options.icons.down + '"></span>' +
				'</a>';

		}

	});

	$('#spinner-employees').customspinner({

		min: 1,
		max: 999999

	}).on('focus', function () {

		$(this).closest('.ui-spinner').addClass('focus');

	}).on('blur', function () {

		$(this).closest('.ui-spinner').removeClass('focus');

		fbq('trackCustom', 'Lead');

	});

	var customspinner_value = 10;

	$('#spinner-employees').customspinner('value', customspinner_value);

	var slider_value = $('#spinner-employees').customspinner('value');

	var recman_coworkers;

	var licence_per_month = 300;
	var price_per_user = 0;
	var total_price_per_month = 0;
	var subscription_plan = '';

	var tier_one = 0;
	var tier_two = 0;
	var tier_three = 0;
	var tier_four = 0;
	var tier_five = 0;

	var tier_one_price_per_user = 99;
	var tier_two_price_per_user = 89;
	var tier_three_price_per_user = 79;
	var tier_four_price_per_user = 69;
	var tier_five_price_per_user = 59;

	var tier_one_max_user = 4;
	var tier_two_max_user = 20;
	var tier_three_max_user = 25;
	var tier_four_max_user = 50;
	var tier_five_max_user = 51;

	var total_price_per_month_per_user;

	function calculate_monthly_cost() {

		if (recman_coworkers >= 1 && recman_coworkers <= 4) {
			subscription_plan = 'Solo';
			//console.log(subscription_plan);
		} else if (recman_coworkers >= 5 && recman_coworkers <= 24) {
			subscription_plan = 'Team';
			//console.log(subscription_plan);
		} else if (recman_coworkers >= 25 && recman_coworkers <= 99) {
			subscription_plan = 'Organization';
			//console.log(subscription_plan);
		} else if (recman_coworkers >= 50 && recman_coworkers <= 99) {
			subscription_plan = 'Enterprise 50';
			//console.log(subscription_plan);
		} else if (recman_coworkers >= 100 && recman_coworkers <= 149) {
			subscription_plan = 'Enterprise 100';
			//console.log(subscription_plan);
		} else if (recman_coworkers > 150) {
			subscription_plan = 'Dedicated';
			//console.log(subscription_plan);
		}

		if (recman_coworkers >= 1 && recman_coworkers <= 4) {

			tier_one = (recman_coworkers * tier_one_price_per_user);

			total_price_per_month = licence_per_month + tier_one;

			total_price_per_month_per_user = total_price_per_month / recman_coworkers;

			console.log(total_price_per_month);

		} else if (recman_coworkers >= 5 && recman_coworkers <= 24) {

			tier_one = (tier_one_max_user * tier_one_price_per_user) + licence_per_month;
			//console.log(tier_one);

			tier_two = ((recman_coworkers - tier_one_max_user) * tier_two_price_per_user);
			//console.log(tier_two);

			total_price_per_month = tier_one + tier_two;

			total_price_per_month_per_user = total_price_per_month / recman_coworkers;

			console.log(total_price_per_month);

		} else if (recman_coworkers >= 25 && recman_coworkers <= 49) {

			tier_one = (tier_one_max_user * tier_one_price_per_user) + licence_per_month;
			//console.log(tier_one);

			tier_two = tier_two_max_user * tier_two_price_per_user;
			//console.log(tier_two);

			tier_three = (recman_coworkers - (tier_one_max_user + tier_two_max_user)) * tier_three_price_per_user;
			//console.log(tier_three);

			total_price_per_month = tier_one + tier_two + tier_three;

			total_price_per_month_per_user = total_price_per_month / recman_coworkers;

			console.log(total_price_per_month);

		} else if (recman_coworkers >= 50  && recman_coworkers <= 99) {

			tier_one = (tier_one_max_user * tier_one_price_per_user) + licence_per_month;
			//console.log(tier_one);

			tier_two = tier_two_max_user * tier_two_price_per_user;
			//console.log(tier_two);

			tier_three = tier_three_max_user * tier_three_price_per_user;
			//console.log(tier_three);

			tier_four = (recman_coworkers - (tier_one_max_user + tier_two_max_user + tier_three_max_user)) * tier_four_price_per_user;
			//console.log(tier_four);

			total_price_per_month = tier_one + tier_two + tier_three + tier_four;

			total_price_per_month_per_user = total_price_per_month / recman_coworkers;

			console.log(total_price_per_month);

			// if (total_price_per_month <= 3999) {
			// 	total_price_per_month = total_price_per_month;
			//
			// 	total_price_per_month_per_user = total_price_per_month / recman_coworkers;
			//
			// 	console.log(total_price_per_month);
			//
			// } else {
			// 	total_price_per_month = 3999;
			//
			// 	total_price_per_month_per_user = 69;
			//
			// 	console.log(total_price_per_month);
			//
			// }
		} else if (recman_coworkers >= 100  && recman_coworkers <= 150) {

			tier_one = (tier_one_max_user * tier_one_price_per_user) + licence_per_month;
			//console.log(tier_one);

			tier_two = tier_two_max_user * tier_two_price_per_user;
			//console.log(tier_two);

			tier_three = tier_three_max_user * tier_three_price_per_user;
			//console.log(tier_three);

			tier_four = tier_four_max_user * tier_four_price_per_user;
			//console.log(tier_four);

			tier_five = (recman_coworkers - (tier_one_max_user + tier_two_max_user + tier_three_max_user + tier_four_max_user)) * tier_five_price_per_user;
			//console.log(tier_four);

			total_price_per_month = tier_one + tier_two + tier_three + tier_four + tier_five;

			total_price_per_month_per_user = total_price_per_month / recman_coworkers;

			console.log(total_price_per_month);

		} else if (recman_coworkers > 150) {

			console.log('More than 150 users, time to discuss custom pricing options...');
		}

		total_price_per_month = accounting.formatMoney(total_price_per_month, "", 0, " ", ""); // 4 999

		total_price_per_month_per_user = accounting.formatMoney(total_price_per_month_per_user, "", 0, " ", ""); // 4 999

		$('#monthlyCost span').text(total_price_per_month);

		$('#monthlyCostUser span').text(total_price_per_month_per_user);

	}

	// Slider

	var $slider = $("#slider-employees");
	if ($slider.length > 0) {
		$slider.slider({
			min: 1,
			max: 150,
			step: 1,
			value: slider_value,
			orientation: 'horizontal',
			range: 'min',
			change: function (event, ui) {

				slider_value = $slider.slider('value');

				$('#spinner-employees').customspinner('value', slider_value);

				// recman_coworkers = slider_value;

				// console.log(recman_coworkers + ' users equals');

				// calculate_monthly_cost();

			}
		});
	}

	$slider.on('slide', function (event, ui) {

		var slider_value = $slider.slider('value');

		$('#spinner-employees').customspinner('value', slider_value);

		recman_coworkers = slider_value;

		console.log(recman_coworkers + ' users equals');

		calculate_monthly_cost();

	});


	$('#spinner-employees').on('spinchange', function (event, ui) {

		customspinner_value = $('#spinner-employees').customspinner('value');

		$slider.slider('value', customspinner_value);

		recman_coworkers = slider_value;

		console.log(recman_coworkers + ' users equals');

		calculate_monthly_cost();

	});


	$('#spinner-employees').change(function () {

		customspinner_value = $('#spinner-employees').customspinner('value');

		$slider.slider('value', customspinner_value);

		recman_coworkers = slider_value;

		console.log(recman_coworkers + ' users equals');

		calculate_monthly_cost();

	});

	$('#spinner-employees').on('spinstop', function (event, ui) {

		customspinner_value = $('#spinner-employees').customspinner('value');

		$slider.slider('value', customspinner_value);

		recman_coworkers = slider_value;

		console.log(recman_coworkers + ' users equals');

		calculate_monthly_cost();

	});

	// Show ToS Modal
	$('.terms-of-service').on("click", function (event) {

		event.preventDefault();

		$('#termsModal').modal('show')

	});

	$('.call-to-action').on('click', function (e) {

		e.preventDefault();

		fbq('trackCustom', 'ButtonClickSignUp');
		console.log("Redirecting to Setup Page");

		setTimeout(function () {
			location.href = 'https://setup.recmanplugins.no/';
		}, 500);

	});

	var dteNow = new Date();
	var intYear = dteNow.getFullYear();
	console.log('Copyright © 2016 - ' + intYear + ' Recman Apps, Modules and Plugins');
	$('#copyrightYear').text(intYear);


	// $('#call_to_action').click(function(e) {
	// 	e.preventDefault();
	// 	fbq('track', 'InitiateCheckout');
	// 	console.log('Checkout initiated with ".click" function...');
	// });

});
