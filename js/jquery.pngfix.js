/**
	fixPng JQuery Plugin
	Author: Wellington Ribeiro
	Version: 1.0.0 (24/04/2010 15:12)
	Copyright (c) 2008-2010 IdealMind ( www.idealmind.com.br )
	Licensed under the GPL license (http://www.idealmind.com.br/javascript/fix-png-transparente-ie6/)

*/
(function($){
	$.fn.extend(
	{
		fixPng: function( gif_file, attr, noreplace )
		{ 
			if( navigator.appVersion.match('MSIE 6') )
			{
				if( typeof gif_file == "undefined" )
				{
					gif_file = "pictures/null.gif";
				}
				
				if( typeof noreplace == "undefined" )
				{
					noreplace = "noreplace";
				}
				
				if( typeof attr == "undefined" )
				{
					attr = "rel";
				}
				
				$("img").each(function()
				{
					var src = $(this).attr("src");
					var width = $(this).attr("width");
					var height = $(this).attr("height");
					var atributo = $(this).attr(attr);
					
					if( typeof atributo == "undefined" )
					{
						atributo = "rel";
					}
					
					if (src.indexOf(".png") != -1 && atributo.indexOf(noreplace) == -1 )
					{
						$(this).attr("src", gif_file);
						$(this).attr("width", width);
						$(this).attr("height", height);
						$(this).css("filter","progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+ src + "',sizingMethod='scale')");
					}
				});
			}
		}
	});
})(jQuery);