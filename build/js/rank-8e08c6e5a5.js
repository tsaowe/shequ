function initData(){$.ajax({type:"post",url:"../data/rank.json",dataType:"json",success:function(e){if(0===e.code){var a=e.data;$("#rb_count").html(a.liveGrade),$("#rb_percent").html(a.defeated),$("#re_prenum").html(a.liveGrade),$("#re_afternum").html(parseInt(a.liveGrade)+1),$("#re_expnum").html(a.empiricalValueToNextGrade),$("#re_progress").css({width:"40%"}),50==a.liveGrade&&($(".rank-exp").remove(),$(".rank-badge").animate({marginTop:"92px"},{duration:"slow",easing:"ease"}))}}})}initData();