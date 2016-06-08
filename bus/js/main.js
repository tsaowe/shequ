
$(document).ready(function(){

    //var height=window.innerHeight;
    //$('.full-page').css({'height':height+'px'});

    $('.po-phone').addClass('phone-animation');

    $(window).scroll(function(){
        var scrollHeight = $(this).scrollTop();
        if( scrollHeight>600 && scrollHeight<1200 && !$('.page-two').data('animate')){
           $('.page-two').data('animate',true).addClass('pt-animation');
        }

        if( scrollHeight>1300 && scrollHeight<1900 && !$('.page-three').data('animate')){
            $('.page-three').data('animate',true).addClass('pth-animation');
        }

        if( scrollHeight>2000 && scrollHeight<2700 && !$('.page-four').data('animate')){

            $('.page-four').data('animate',true).addClass('pf-animation');
        }
    })

});