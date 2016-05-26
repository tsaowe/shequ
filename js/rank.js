

//初始化数据
function initData(){
    $.ajax({
        type: "post",
        //async: false,
        //url: "http://172.20.81.19/show/rest/live/userLiveGrade",
        url:"http://show.jumeicd.com/show/rest/live/userLiveGrade",
        dataType:'jsonp',
        jsonp:'callback',
        //jsonpCallback:'jsonpCallback',
        success:function(res){
            if(res.code === 0){
                var data = res.data;
                $('#rb_count').html(data.liveGrade);
                $('#rb_percent').html(data.defeated);
                $('#re_prenum').html(data.liveGrade);
                $('#re_afternum').html(parseInt(data.liveGrade)+1);
                $('#re_expnum').html(data.empiricalValueToNextGrade);
                $('#re_progress').css({width:'40%'});

                if(data.liveGrade == 50){
                    $('.rank-exp').remove();
                    $('.rank-badge').animate({'marginTop':'35px'},{duration:'slow',easing:'ease'});

                }
            }

        }

    });
}

initData();