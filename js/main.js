
//初始化数据
function initData(){
    $.ajax({
        type: "post",
        //async: false,
        url: "../data/main.json",
        dataType:'json',
        //jsonp:'callback',
        //jsonpCallback:'jsonpCallback',
        success:function(res){
            if(res.code === 0){
                var data = res.data;
                //首页数据
                $('#today_count').html(formatCurrency(data.todayIncoming));
                $('#sum_count').html(formatCurrency(data.totalIncoming));
                $('#reset_count').html(formatCurrency(data.unCashingAmount));

                //弹窗数据
                $('#dia_reset').html(formatCurrency(data.remainCashingToday));
                $('#day_max').html(formatCurrency(data.cashingMaxPerDay));
                $('#dia_out').html(formatCurrency(data.todayCashing));
                if(data.cashingOpen){
                    $('.rm-btn').css({'background-color':'#fc5c6c'});
                    cashAble = true;
                }
                if(data.remainCashingToday && parseFloat(data.remainCashingToday)> 0){
                    $('#turn_btn').css({'background-color':'#fc5c6c'});
                    turnAble = true;
                }
            }else{
                if(res.action == 'toast'){
                    showMsg(res.message);
                }
            }

        }

    });
}

var cashAble = false;
var turnAble = false;
var isClick = false;
initData();

$('#turn_record').on('tap',function(){
    location.href='record.html';
});

$('.rm-btn').on('tap',function () {
    if(!cashAble) return;
    $('#dialog_confirm').css({'display':'block'});

});

$('#turn_btn').on('tap',function () {
    if(!turnAble || isClick) return;
    isClick = true;
    $('#turn_btn').text('转出中...').css({'background-color':'#fdbdc4'});
    $.ajax({
        type: "post",
        url: "../data/main2.json",
        dataType:'json',
        //jsonp:'callback',
        success:function(res){
            if(res.code === 0){
                initData();
                $('#dialog_confirm').css({'display':'none'});
                $('#dialog_ok').css({'display':'block'});
            }else{
                if(res.action == 'toast'){
                    showMsg(res.message);
                }
            }
        },
        error:function(){
            showMsg('转出失败，请再试试');
        },
        complete:function(){
            $('#turn_btn').text('转出').css({'background-color':'#fc5c6c'});
            isClick = false;
        }

    });

});

$('#turn_cancle').on('tap',function () {
    $('#dialog_confirm').css({'display':'none'});
});

$('#ok_btn').on('tap',function () {
    $('#dialog_ok').css({'display':'none'});
});

