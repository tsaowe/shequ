


//初始化数据
function initData(){
    $.ajax({
        type: "post",
        url:"../data/rank.json",
        dataType:'json',
        //jsonp:'callback',
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
                    $('.rank-badge').animate({'marginTop':'92px'},{duration:'slow',easing:'ease'});

                }
            }

        }

    });
}

initData();

