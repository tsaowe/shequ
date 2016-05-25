
//初始化数据
function initData(){
    $.ajax({
        type: "post",
        //async: false,
        url: "../data/main.json",
        //dataType:'jsonp',
        //jsonp:'callback',
        //jsonpCallback:'jsonpCallback',
        success:function(res){
            if(res.code === 0){
                var data = res.data;
                $('#today_count').html(formatCurrency(data.todayIncoming));
                $('#sum_count').html(formatCurrency(data.totalIncoming));
                $('#reset_count').html(formatCurrency(data.unCashingAmount));
                if(data.cashingOpen){
                    $('.rm-btn').css({'background-color':'#fc5c6c'});
                    cashAble = true;
                }
            }

        }

    });
}

var cashAble = false;
initData();

$('#turn_record').on('tap',function(){
    location.href='record.html';
});

$('.rm-btn').on('tap',function () {
    if(cashAble){
        $('#dialog_confirm').css({'display':'block'});
        $('#dia_reset').html(formatCurrency(888.33));
        $('#dia_out').html(formatCurrency(200.34));
    }

});

$('#turn_btn').on('tap',function () {
    $.ajax({
        type: "post",
        //async: false,
        url: "../data/main.json",
        //dataType:'jsonp',
        //jsonp:'callback',
        //jsonpCallback:'gdd',
        success:function(res){
            if(res.code === 0){
                $('#dialog_confirm').css({'display':'none'});
                $('#dialog_ok').css({'display':'block'});
            }else{
                //提示转出失败，请再次尝试
            }
        }
    });

});

$('#turn_cancle').on('tap',function () {
    $('#dialog_confirm').css({'display':'none'});
});

$('#ok_btn').on('tap',function () {
    $('#dialog_ok').css({'display':'none'});
});

