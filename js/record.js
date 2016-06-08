
//初始化数据
function initData(){
    $.getJSON({
        url: "../data/record.json",
        dataType:'json',
        success:function(res){
            if(res.code === 0){
                if(res.data && res.data.length>0){
                    var list = res.data;
                    var recordList = $('#record_list');
                    recordList.find('.item').remove();
                    recordList.find('.re-block').remove();
                    $.each(list,function(i,data){
                        var item = '<div class="item">'+
                            '<div class="content">'+
                            '<div class="gap"></div>'+
                            '<div class="event">转出到聚美余额</div>'+
                            '<div class="gap-time"></div>'+
                            '<div class="time">'+TimeToDate(data.createTime)+'</div>'+
                            '</div>'+
                            '<div class="fr sum">- '+formatCurrency(data.cashingAmount)+'</div>'+
                            '</div>';
                        recordList.append(item);

                    });
                }else{
                    $('.no-record').css({'display':'block'});

                }
            }else{
                if(res.action == 'toast'){
                    showMsg(res.message);
                }
            }
        },
        error:function () {
            console.log(arguments)
        }

    });
}

initData();