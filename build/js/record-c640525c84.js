function initData(){$.ajax({type:"post",url:"../data/record.json",dataType:"json",success:function(a){if(0===a.code)if(a.data&&a.data.length>0){var i=a.data,e=$("#record_list");e.find(".item").remove(),e.find(".re-block").remove(),$.each(i,function(a,i){var s='<div class="item"><div class="content"><div class="gap"></div><div class="event">转出到聚美余额</div><div class="gap-time"></div><div class="time">'+TimeToDate(i.createTime)+'</div></div><div class="fr sum">- '+formatCurrency(i.cashingAmount)+"</div></div>";e.append(s)})}else $(".no-record").css({display:"block"});else"toast"==a.action&&showMsg(a.message)}})}initData();