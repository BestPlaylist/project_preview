$(document).ready(function(){
	var isBlind = $.cookie("CecutientCookie");
	if(isBlind==undefined || isBlind=='null'){
		$('#CecutientBlock').css('display','none');
	}else{
		$('#CecutientBlock').css('display','block');
	}
	if(isBlind==undefined || isBlind=='null'){
		$('#CecutientWrapper').css('display','none');
	}else{
		$('#CecutientWrapper').css('display','block');
	}
	/*Включение стилей для слабовидящих*/
    $('#CecutientOn').click(function(){		
		CecutientOn();
		//$.cookie("CecutientCookie", "on");
		$.removeCookie("fonts", null);
		$.removeCookie("style", null);
		$.removeCookie("image", null);
		$('#CecutientBlock').css('display','block');
		$('#CecutientWrapper').css('display','block');
		$('#MediumFonts').click();
		return false;
	});	
    /*alert($.cookie("fonts")+'&'+$.cookie("CecutientCookie"));*/
    
	if (isBlind === "on") {
        CecutientOn();
        if ($.cookie("fonts")=="small"){SmallFonts();}
        if ($.cookie("fonts")=="medium"){MediumFonts();}
        if ($.cookie("fonts")=="big"){BigFonts();}
        if ($.cookie("image")=="on"){ImageOn();}
        if ($.cookie("image")=="off"){ImageOff();}
        if ($.cookie("style")=="white"){WhiteStyle();}
        if ($.cookie("style")=="black"){BlackStyle();}
        if ($.cookie("style")=="blue"){BlueStyle();}
        if ($.cookie("style")=="green"){GreenStyle();}
    }

    /*Включение выключение изображений*/
    $('#ImageOn').click(function(){ImageOn();});
    $('#ImageOff').click(function(){ImageOff();});
    /*Размер шрифта*/
    $('#SmallFonts').click(function(){SmallFonts();});
    $('#MediumFonts').click(function(){MediumFonts();});
    $('#BigFonts').click(function(){BigFonts();});
    /*Цветовая схема*/
    $('#WhiteStyle').click(function(){WhiteStyle();});
    $('#BlackStyle').click(function(){BlackStyle();});	
    $('#BlueStyle').click(function(){BlueStyle();});
    $('#GreenStyle').click(function(){GreenStyle();});
    /*Функция обработчик включения стилей*/
    function CecutientOn(){
		$('#CecutientWrapper').addClass('vision');
        $('.Carousel').css("display","none");
        $('#CecutientOff').css("display","inline-block");		
		$('#all #header').css({"height":"auto"});
		$('#panel').css({"height":"40px","padding":"20px 0"});
        $('iframe').css("display","none");
        $('.all_wrapper, .all_full, #footer, #all').css({"padding":"0px"}).addClass('low_vision');
		$('.all_wrapper, .all_full, footer, .container *').css({"background":"#fff","color":"#000"});	
		$('.TopMenu').css({"border":"1px solid #000","marginTop":"10px"});
		$('.TopMenu li a').css({"background":"none","paddingTop":"0px","color":"#000"});
        $('#all #header,#all #header #slogan, #all #menu, #all #header #line').css({"background":"none","color":"#000"});
        $('.appointment').html("Записаться");
		$('.all_wrapper, .all_full, #footer').css({"padding":"0px"}).removeClass('whitestyle, blackstyle, bluestyle, greenstyle');
        $.cookie("CecutientCookie", "on", {
            expires: 365,
            path: '/'
        });
        return false;
    }
    /*Функции изменения размера шрифта*/
    function SmallFonts(){
        if ($.cookie("CecutientCookie")=="on"){
			$('body .logo_block_sb span').toggleClass('ttw')
            $('.all_wrapper, .all_wrapper a, .all_full, #footer, #all:not(.logo_block_sb), #CecutientWrapper').removeClass("MediumFonts BigFonts SmallFonts button_vers").addClass("SmallFonts");
            $.cookie("fonts", "small", {
                expires: 365,
                path: '/'
            });
            return false;
        }
    }
    function MediumFonts(){
        if ($.cookie("CecutientCookie")=="on"){
            $('.all_wrapper, .all_wrapper a, .all_full, #footer, #all:not(.logo_block_sb), #CecutientWrapper').removeClass("SmallFonts BigFonts").addClass("MediumFonts");
            $.cookie("fonts", "medium", {
                expires: 365,
                path: '/'
            });
            return false;
        }
    }
    function BigFonts(){
        if ($.cookie("CecutientCookie")=="on"){
            $('.all_wrapper, .all_wrapper a, #footer, #all:not(.logo_block_sb), #CecutientWrapper').removeClass("SmallFonts MediumFonts").addClass("BigFonts");
            $.cookie("fonts", "big", {
                expires: 365,
                path: '/'
            });
            return false;
        }
    }
	
	    function Block_one(){
        if ($.cookie("CecutientCookie")=="on"){
            $('#CecutientWrapper').removeClass("Block_none").addClass("Block_one");
            $.cookie("fonts", "big", {
                expires: 365,
                path: '/'
            });
            return false;
        }
    }
	
	$('#CecutientOn').click(function(e){
  $($('#CecutientWrapper')[($(this).index())]).toggleClass('Block_one');
  e.preventDefault();
});
	
    /*Функции обработчик отображения изображений*/
    function ImageOn(){
        if ($.cookie("CecutientCookie")=="on"){
            $('img:not(.bg-body, .img-1, .img-2, .img-3, #jpg_contact)').css("display","inline-block");
				
			$('.img-1').css("display","none");
            $('#ImageOff, .ipriem, img:not(.bg-body, .img-1, .img-2, .img-3, #jpg_contact)').css("display","inline-block");
            $('#ImageOn').css("display","none");
            $.cookie("image", "on", {
                expires: 365,
                path: '/'
            });
            return false;
        }
    }
    function ImageOff(){
        if ($.cookie("CecutientCookie")=="on"){
            $('img, .ipriem').css("display","none");
			$('.img-1').css("display","none");
            $('#ImageOff').css("display","none");
            $('#ImageOn, #CecutientBtn, img:not(.bg-body, .img-1, .img-2, .img-3, #jpg_contact)').css("display","inline-block");
            $.cookie("image", "off", {
                expires: 365,
                path: '/'
            });
            return false;
        }
    }
    /*Функции изменения цветовой схема*/
    function WhiteStyle(){
        if ($.cookie("CecutientCookie")=="on"){
			$('.all_wrapper, #footer, #all, #CecutientWrapper').removeClass("bluestyle blackstyle greenstyle").addClass("whitestyle");
            $('body, html, #all, .bg-body1, #all span, #albom_metd td, table:not(.tab), .grey-12pt, td b').css({"background":"#fff", "color":"#000"});	
			$('#line_footer').css('background','#000');
			if ($('.img-1') === 'display:none'){
				$(this).css('display','block');
			}
			$('.img').css('background','none');
			$('.photo_board').css("border", "0");
			$('.last_chil').css("opacity","0");	
			if ($('#block_news_none')){
				$('#block_news_none').addClass('block');
				$('#block_opac, .hide_menu, #jpg_contact').css('display','none');
				$('#block_vo_none').addClass('block_vo');
				$('#block_vo').css('display','none');
				$('.block_menu_top').css('display','flex');}
			$('#phone_footer_rg').css({'display':'block','float':'right', "color":"#000"});
            $('.bg-body').css({"display":"none"});		
			$('.logo_hide').css('display','none');
			$('.line_hide img').css('display','none');
			$('.line_hide div').css({'background': '#000','height' : '1px'});
			$('.logo_block_sb').css('display','block');
			$('table .navleft li *').css({"border-bottom":"2px solid #000"}); 
            $('.TopMenu').css({"border":"1px solid #000","marginTop":"10px"});
			$('table div .top').css({"background":"#fff", "box-shadow":"none"});
			$('table').css("box-shadow","none");
			 $('h1, #all a').css("color","#000");
            $('.TopMenu li a').css({"background":"none","paddingTop":"0px","color":"#000"});			
		
			$(' li .navright_but_a, li .navright_but').css("border-bottom","3px solid #000");
			
            $.cookie("style", "white", {
                expires: 365,
                path: '/'
            });
            return false;
        }
    }
    function BlackStyle(){
        if ($.cookie("CecutientCookie")=="on"){
			$('.all_wrapper, #footer, #all, #CecutientWrapper').removeClass("bluestyle whitestyle greenstyle").addClass("blackstyle");
            $('body, html, #all, .bg-body1, #all span, #albom_metd td, table:not(.tab), .grey-12pt').css({"background":"#000", "color":"#fff"});	
			$('.img').css('background','none');
			$('.photo_board').css("border", "0");
			$('.last_chil').css("opacity","0");	
			if ($('#block_news_none')){
				$('#block_news_none').addClass('block');
				$('#block_opac, .hide_menu, #jpg_contact').css('display','none');
				$('#block_vo_none').addClass('block_vo');
				$('#block_vo').css('display','none');
				$('.block_menu_top').css('display','flex');			}
            $('.bg-body').css({"display":"none"});     
			$('#phone_footer_rg').css({'display':'block','float':'right', "color":"#fff"});
			$('.logo_hide').css('display','none');
			$('.logo_block_sb').css('display','block');
			$('.centralimage_l, .news_page, #menu_black,  .footer_2, .footer_2 td').css({"background":"#000", "color":"#fff"});
			$('.footer_1').css({"background":"#000", "background-image":"url(../pictures/contraindications.png)", "background-repeat":"no-repeat", "background-position":"center bottom"});

			$('table div .top').css({"background":"#000", "box-shadow":"none"});	
			$('table').css("box-shadow","none");
			 $('h1, #all a').css("color","#fff");
       
            $('.TopMenu').css({"border":"1px solid #fff","marginTop":"10px"});
            $('.TopMenu li a').css({"background":"none","color":"#fff"});			
					
            $.cookie("style", "black", {
                expires: 365,
                path: '/'
            });
            return false;
        }
    }
    function BlueStyle(){
        if ($.cookie("CecutientCookie")=="on"){
			$('.all_wrapper, #footer, #all, #CecutientWrapper').removeClass("blackstyle whitestyle greenstyle").addClass("bluestyle");
             $('body, html, #all, .bg-body1, #all span, #albom_metd td, table:not(.tab), .grey-12pt').css({"background":"#9DD1FF", "color":"#063462"});	
			$('.img').css('background','none');
			$('.photo_board').css("border", "0");
			$('.last_chil').css("opacity","0");	
			if ($('#block_news_none')){
				$('#block_news_none').addClass('block');
				$('#block_opac, .hide_menu, #jpg_contact').css('display','none');
				$('#block_vo_none').addClass('block_vo');
				$('#block_vo').css('display','none');
				$('.block_menu_top').css('display','flex');			}
            $('.bg-body').css({"display":"none"});
			$('#phone_footer_rg').css({'display':'block','float':'right', "color":"#063462"});
			$('.logo_hide').css('display','none');
			$('.logo_block_sb').css('display','block');			
			$('table').css("box-shadow","none");
            $('.all_wrapper, #footer, .container, .navleft_ul li *, .basis_top_bg *, .all_wrapper .big_font, .footer_2').css({"background":"#9DD1FF","color":"#063462"});
            $('h1, #all a').css("color","#063462");
			$('.footer_1').css({"background-image":"url(../pictures/contraindications.png)", "background-repeat":"no-repeat", "background-position":"center bottom"});

            $.cookie("style", "blue", {
                expires: 365,
                path: '/'
            });
            return false;
        }
    }
    function GreenStyle(){
        if ($.cookie("CecutientCookie")=="on"){
			$('.all_wrapper, #footer, #all, #CecutientWrapper').removeClass("blackstyle whitestyle bluestyle").addClass("greenstyle");
			$('body, html, #all, .bg-body1, #all span, #albom_metd td, table:not(.tab), .grey-12pt').css({"background":"#3B2716", "color":"#A9E44D"});	
			$('.img').css('background','none');
			$('.photo_board').css("border", "0");
			$('.last_chil').css("opacity","0");	
			if ($('#block_news_none')){
				$('#block_news_none').addClass('block');
				$('#block_opac, .hide_menu, #jpg_contact').css('display','none');
				$('#block_vo_none').addClass('block_vo');
				$('#block_vo').css('display','none');
				$('.block_menu_top').css('display','flex');			}
            $('.bg-body').css({"display":"none"});  
			$('#phone_footer_rg').css({'display':'block','float':'right', "color":"#A9E44D"});
			$('.logo_hide').css('display','none');
			$('.logo_block_sb').css('display','block');
			$('h1, #all a').css("color","#A9E44D");		
		
			$('.footer_1').css({"background-image":"url(../pictures/contraindications.png)", "background-repeat":"no-repeat", "background-position":"center bottom"});
            $.cookie("style", "green", {
                expires: 365,
                path: '/'
            });
            return false;
        }
    }
	
		
    /*Отключение версии для слабовидящих*/
    $('#CecutientOff').click(function(){
		$.cookie('CecutientCookie', null, {path:'/'});
		//$.cookie("CecutientCookie", "off");		
		// $.removeCookie('CecutientCookie');
		$.removeCookie('style');
		$.removeCookie('image');
		$.removeCookie('fonts', null);
        window.location.reload();
		$('#CecutientBlock').css('display','none;')
		$('#CecutientWrapper').css('display','none;');
        return false;
    });
	
});$(document).ready(function(){
	var isBlind = $.cookie("CecutientCookie");
	if(isBlind==undefined || isBlind=='null'){
		$('#CecutientBlock').css('display','none');
	}else{
		$('#CecutientBlock').css('display','block');
	}
	if(isBlind==undefined || isBlind=='null'){
		$('#CecutientWrapper').css('display','none');
	}else{
		$('#CecutientWrapper').css('display','block');
	}
	/*Включение стилей для слабовидящих*/
    $('#CecutientOn').click(function(){		
		CecutientOn();
		//$.cookie("CecutientCookie", "on");
		$.removeCookie("fonts", null);
		$.removeCookie("style", null);
		$.removeCookie("image", null);
		$('#CecutientBlock').css('display','block');
		$('#CecutientWrapper').css('display','block');
		$('#MediumFonts').click();
		return false;
	});	
    /*alert($.cookie("fonts")+'&'+$.cookie("CecutientCookie"));*/
    
	if (isBlind === "on") {
        CecutientOn();
        if ($.cookie("fonts")=="small"){SmallFonts();}
        if ($.cookie("fonts")=="medium"){MediumFonts();}
        if ($.cookie("fonts")=="big"){BigFonts();}
        if ($.cookie("image")=="on"){ImageOn();}
        if ($.cookie("image")=="off"){ImageOff();}
        if ($.cookie("style")=="white"){WhiteStyle();}
        if ($.cookie("style")=="black"){BlackStyle();}
        if ($.cookie("style")=="blue"){BlueStyle();}
        if ($.cookie("style")=="green"){GreenStyle();}
    }

    /*Включение выключение изображений*/
    $('#ImageOn').click(function(){ImageOn();});
    $('#ImageOff').click(function(){ImageOff();});
    /*Размер шрифта*/
    $('#SmallFonts').click(function(){SmallFonts();});
    $('#MediumFonts').click(function(){MediumFonts();});
    $('#BigFonts').click(function(){BigFonts();});
    /*Цветовая схема*/
    $('#WhiteStyle').click(function(){WhiteStyle();});
    $('#BlackStyle').click(function(){BlackStyle();});	
    $('#BlueStyle').click(function(){BlueStyle();});
    $('#GreenStyle').click(function(){GreenStyle();});
    /*Функция обработчик включения стилей*/
    function CecutientOn(){
		$('#CecutientWrapper').addClass('vision');
        $('.Carousel').css("display","none");
        $('#CecutientOff').css("display","inline-block");		
		$('#all #header').css({"height":"auto"});
		$('#panel').css({"height":"40px","padding":"20px 0"});
        $('iframe').css("display","none");
        $('.all_wrapper, .all_full, #footer, #all').css({"padding":"0px"}).addClass('low_vision');
		$('.all_wrapper, .all_full, footer, .container *').css({"background":"#fff","color":"#000"});	
		$('.TopMenu').css({"border":"1px solid #000","marginTop":"10px"});
		$('.TopMenu li a').css({"background":"none","paddingTop":"0px","color":"#000"});
        $('#all #header,#all #header #slogan, #all #menu, #all #header #line').css({"background":"none","color":"#000"});
        $('.appointment').html("Записаться");
		$('.all_wrapper, .all_full, #footer').css({"padding":"0px"}).removeClass('whitestyle, blackstyle, bluestyle, greenstyle');
        $.cookie("CecutientCookie", "on", {
            expires: 365,
            path: '/'
        });
        return false;
    }
    /*Функции изменения размера шрифта*/
    function SmallFonts(){
        if ($.cookie("CecutientCookie")=="on"){
            $('.all_wrapper, .all_wrapper a, .all_full, #footer, #all, #CecutientWrapper').removeClass("MediumFonts BigFonts SmallFonts button_vers").addClass("SmallFonts");
            $.cookie("fonts", "small", {
                expires: 365,
                path: '/'
            });
            return false;
        }
    }
    function MediumFonts(){
        if ($.cookie("CecutientCookie")=="on"){
            $('.all_wrapper, .all_wrapper a, .all_full, #footer, #all, #CecutientWrapper').removeClass("SmallFonts BigFonts").addClass("MediumFonts");
            $.cookie("fonts", "medium", {
                expires: 365,
                path: '/'
            });
            return false;
        }
    }
    function BigFonts(){
        if ($.cookie("CecutientCookie")=="on"){
            $('.all_wrapper, .all_wrapper a, #footer, #all, #CecutientWrapper').removeClass("SmallFonts MediumFonts").addClass("BigFonts");
            $.cookie("fonts", "big", {
                expires: 365,
                path: '/'
            });
            return false;
        }
    }
	
	    function Block_one(){
        if ($.cookie("CecutientCookie")=="on"){
            $('#CecutientWrapper').removeClass("Block_none").addClass("Block_one");
            $.cookie("fonts", "big", {
                expires: 365,
                path: '/'
            });
            return false;
        }
    }
	
	$('#CecutientOn').click(function(e){
  $($('#CecutientWrapper')[($(this).index())]).toggleClass('Block_one');
  e.preventDefault();
});
	
    /*Функции обработчик отображения изображений*/
    function ImageOn(){
        if ($.cookie("CecutientCookie")=="on"){       
            $('#ImageOn, .img-3').css("display","none");
            $.cookie("image", "on", {
                expires: 365,
                path: '/'
            });
            return false;
        }
    }
    function ImageOff(){
        if ($.cookie("CecutientCookie")=="on"){
            $('img, .ipriem, .img-3').css("display","none");
            $('#ImageOff, .img-3').css("display","none");      

            $.cookie("image", "off", {
                expires: 365,
                path: '/'
            });
            return false;
        }
    }
    /*Функции изменения цветовой схема*/
    function WhiteStyle(){
        if ($.cookie("CecutientCookie")=="on"){
			$('.all_wrapper, #footer, #all, #CecutientWrapper').removeClass("bluestyle blackstyle greenstyle").addClass("whitestyle");
            $('body, html, #all, .bg-body1, #all span, #albom_metd td, table:not(.tab), .grey-12pt, table td').css({"background":"#fff", "color":"#000"});	
			$('.block_top_text p').css('text-align','center');
			$('#line_footer').css('background','#000');
			$('.img').css('background','none');
			$('.photo_board').css("border", "0");
			$('.img-1, .img-2, .img-3').css('display','none');
			$('.block_top_text').css({'width':'100%','margin':'47px -21px'});
			$('.last_chil').css("opacity","0");	
			if ($('#block_news_none')){
				$('#block_news_none').addClass('block');
				$('#block_opac, .hide_menu, #jpg_contact').css('display','none');
				$('#block_vo_none').addClass('block_vo');
				$('#block_vo').css('display','none');
				$('.block_menu_top').css('display','flex');}
			$('#phone_footer_rg').css({'display':'block','float':'right', "color":"#000"});
            $('.bg-body').css({"display":"none"});		
			$('.logo_hide').css('display','none');
			$('.line_hide img').css('display','none');
			$('.line_hide div').css({'background': '#000','height' : '1px'});
			$('.logo_block_sb').css('display','block');
			$('table .navleft li *').css({"border-bottom":"2px solid #000"}); 
            $('.TopMenu').css({"border":"1px solid #000","marginTop":"10px"});
			$('table div .top').css({"background":"#fff", "box-shadow":"none"});
			$('table').css("box-shadow","none");
			 $('h1, #all a').css("color","#000");
            $('.TopMenu li a').css({"background":"none","paddingTop":"0px","color":"#000"});			
		
			$(' li .navright_but_a, li .navright_but').css("border-bottom","3px solid #000");
			
            $.cookie("style", "white", {
                expires: 365,
                path: '/'
            });
            return false;
        }
    }
    function BlackStyle(){
        if ($.cookie("CecutientCookie")=="on"){
			$('.all_wrapper, #footer, #all, #CecutientWrapper').removeClass("bluestyle whitestyle greenstyle").addClass("blackstyle");
            $('body, html, #all, .bg-body1, #all span, #albom_metd td, table:not(.tab), .grey-12pt, table td').css({"background":"#000", "color":"#fff"});	
			$('.img').css('background','none');
			$('.block_top_text p').css('text-align','center');
			$('.photo_board').css("border", "0");
			$('.last_chil').css("opacity","0");	
			$('.img-1, .img-2, .img-3').css('display','none');
			$('.block_top_text').css({'width':'100%','margin':'47px -21px'});
			if ($('#block_news_none')){
				$('#block_news_none').addClass('block');
				$('#block_opac, .hide_menu, #jpg_contact').css('display','none');
				$('#block_vo_none').addClass('block_vo');
				$('#block_vo').css('display','none');
				$('.block_menu_top').css('display','flex');			}
            $('.bg-body').css({"display":"none"});     
			$('#phone_footer_rg').css({'display':'block','float':'right', "color":"#fff"});
			$('.logo_hide').css('display','none');
			$('.logo_block_sb').css('display','block');
			$('.centralimage_l, .news_page, #menu_black,  .footer_2, .footer_2 td').css({"background":"#000", "color":"#fff"});
			$('.footer_1').css({"background":"#000", "background-image":"url(../pictures/contraindications.png)", "background-repeat":"no-repeat", "background-position":"center bottom"});
			$('.line_hide img').css('display','none');
			$('.line_hide div').css({'background': '#fff','height' : '1px'});
			$('table div .top').css({"background":"#000", "box-shadow":"none"});	
			$('table').css("box-shadow","none");
			$('h1, #all a').css("color","#fff");
            $('.TopMenu').css({"border":"1px solid #fff","marginTop":"10px"});
            $('.TopMenu li a').css({"background":"none","color":"#fff"});			
					
            $.cookie("style", "black", {
                expires: 365,
                path: '/'
            });
            return false;
        }
    }
    function BlueStyle(){
        if ($.cookie("CecutientCookie")=="on"){
			$('.all_wrapper, #footer, #all, #CecutientWrapper').removeClass("blackstyle whitestyle greenstyle").addClass("bluestyle");
             $('body, html, #all, .bg-body1, #all span, #albom_metd td, table:not(.tab), .grey-12pt, table td').css({"background":"#9DD1FF", "color":"#063462"});	
			$('.img').css('background','none');
			$('.photo_board').css("border", "0");
			$('.block_top_text p').css('text-align','center');
			$('.last_chil').css("opacity","0");	
			$('.img-1, .img-2, .img-3').css('display','none');
			$('.block_top_text').css({'width':'100%','margin':'47px -21px'});
			if ($('#block_news_none')){
				$('#block_news_none').addClass('block');
				$('#block_opac, .hide_menu, #jpg_contact').css('display','none');
				$('#block_vo_none').addClass('block_vo');
				$('#block_vo').css('display','none');
				$('.block_menu_top').css('display','flex');			}
            $('.bg-body').css({"display":"none"});
			$('#phone_footer_rg').css({'display':'block','float':'right', "color":"#063462"});
			$('.logo_hide').css('display','none');
			$('.logo_block_sb').css('display','block');	
			$('.line_hide img').css('display','none');
			$('.line_hide div').css({'background': '#063462','height' : '1px'});			
			$('table').css("box-shadow","none");
            $('.all_wrapper, #footer, .container, .navleft_ul li *, .basis_top_bg *, .all_wrapper .big_font, .footer_2').css({"background":"#9DD1FF","color":"#063462"});
            $('h1, #all a').css("color","#063462");
			$('.footer_1').css({"background-image":"url(../pictures/contraindications.png)", "background-repeat":"no-repeat", "background-position":"center bottom"});

            $.cookie("style", "blue", {
                expires: 365,
                path: '/'
            });
            return false;
        }
    }
    function GreenStyle(){
        if ($.cookie("CecutientCookie")=="on"){
			$('.all_wrapper, #footer, #all, #CecutientWrapper').removeClass("blackstyle whitestyle bluestyle").addClass("greenstyle");
			$('body, html, #all, .bg-body1, #all span, #albom_metd td, table:not(.tab), .grey-12pt, table td').css({"background":"#3B2716", "color":"#A9E44D"});	
			$('.img').css('background','none');
			$('.photo_board').css("border", "0");
			$('.block_top_text p').css('text-align','center');
			$('.last_chil').css("opacity","0");	
			$('.img-1, .img-2, .img-3').css('display','none');
			$('.line_hide img').css('display','none');
			$('.line_hide div').css({'background': '#A9E44D','height' : '1px'});
			$('.block_top_text').css({'width':'100%','margin':'47px -21px'});
			if ($('#block_news_none')){
				$('#block_news_none').addClass('block');
				$('#block_opac, .hide_menu, #jpg_contact').css('display','none');
				$('#block_vo_none').addClass('block_vo');
				$('#block_vo').css('display','none');
				$('.block_menu_top').css('display','flex');			}
            $('.bg-body').css({"display":"none"});  
			$('#phone_footer_rg').css({'display':'block','float':'right', "color":"#A9E44D"});
			$('.logo_hide').css('display','none');
			$('.logo_block_sb').css('display','block');
			$('h1, #all a').css("color","#A9E44D");		
		
			$('.footer_1').css({"background-image":"url(../pictures/contraindications.png)", "background-repeat":"no-repeat", "background-position":"center bottom"});
            $.cookie("style", "green", {
                expires: 365,
                path: '/'
            });
            return false;
        }
    }
	
		
    /*Отключение версии для слабовидящих*/
    $('#CecutientOff').click(function(){
		$.cookie('CecutientCookie', null, {path:'/'});
		//$.cookie("CecutientCookie", "off");		
		// $.removeCookie('CecutientCookie');
		$.removeCookie('style');
		$.removeCookie('image');
		$.removeCookie('fonts', null);
        window.location.reload();
		$('#CecutientBlock').css('display','none;')
		$('#CecutientWrapper').css('display','none;');
        return false;
    });
	
});