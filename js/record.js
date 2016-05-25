
//初始化数据
function initData(){
    $.ajax({
        type: "post",
        //async: false,
        url: "http://172.20.16.81:8081/show/rest/ifans_redenvs/cashing_list",
        dataType:'jsonp',
        jsonp:'callback',
        //jsonpCallback:'jsonpCallback',
        success:function(res){
            if(res.code === 0){
                var list = res.data;
                var recordList = $('#record_list');
                recordList.find('.item').remove();
                $.each(list,function(i,data){
                    var item = '<div class="item">'+
                    '<div class="content">'+
                    '<div class="gap"></div>'+
                    '<div class="event">转出到聚美余额</div>'+
                    '<div class="gap-time"></div>'+
                    '<div class="time">'+TimeToDate(data.createTime)+'</div>'+
                    '</div>'+
                    '<div class="fr sum">-'+data.cashingAmount+'</div>'+
                    '</div>';
                    recordList.append(item);

                });
            }else{
                if(res.action == 'toast'){
                    showMsg(res.message);
                }
            }
        }

    });
}

initData();