define([
    'jquery',
    'Blueskytechco_LayeredAjax/js/price/ion.rangeSlider.min',
    'jquery/ui',
    'Blueskytechco_LayeredAjax/js/layeredajax'
], function($,ionRangeSlider) {
    "use strict";

    $.widget('blueskytechco.layeredAjaxSlider', $.blueskytechco.layeredAjax, {
        options: {
            sliderElement: '#price-range-slider'
        },
        _create: function () {
            var self = this;
            $(this.options.sliderElement).ionRangeSlider({
				type: "double",
                min: self.options.selectedFromMin,
                max: self.options.selectedToMax, 
                from: self.options.selectedFrom,
                to: self.options.selectedTo,
                prettify_enabled: true,
                prefix: self.options.currency,
                grid: true,
                onFinish: function(obj) {
					self.ajaxSubmit(self.getUrl(obj.from, obj.to));
                }
            });
        }, 

        getUrl: function(from, to){
            return this.options.ajaxUrl.replace(encodeURI('{price_start}'), from).replace(encodeURI('{price_end}'), to);
        },
    });

    return $.blueskytechco.layeredAjaxSlider;
});
