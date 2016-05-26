
var pathUrl = "http://172.20.16.81:8081";
//初始化数据
function initData(){
    $.ajax({
        type: "post",
        //async: false,
        url: pathUrl+"/show/rest/ifans_redenvs/info",
        dataType:'jsonp',
        jsonp:'callback',
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
                //$('#dia_out').html(formatCurrency(data.cashingMaxPerDay-data.remainCashingToday));
                if(data.cashingOpen){
                    $('.rm-btn').css({'background-color':'#fc5c6c'});
                    cashAble = true;
                }
                if(data.remainCashingToday > 0){
                    $('.rm-btn').css({'background-color':'#fc5c6c'});
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
initData();

$('#turn_record').on('tap',function(){
    location.href='record.html';
});

$('.rm-btn').on('tap',function () {
    if(!cashAble) return;
    $('#dialog_confirm').css({'display':'block'});

});

$('#turn_btn').on('tap',function () {
    if(!turnAble) return;
    $.ajax({
        type: "post",
        url: pathUrl+"/show/rest/ifans_redenvs/cashing",
        dataType:'jsonp',
        jsonp:'callback',
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
        }
    });

});

$('#turn_cancle').on('tap',function () {
    $('#dialog_confirm').css({'display':'none'});
});

$('#ok_btn').on('tap',function () {
    $('#dialog_ok').css({'display':'none'});
});

