
    var todayCount =  $('#today_count').text();
    $('#today_count').html(formatCurrency(todayCount));

    var sumCount =  $('#sum_count').text();
    $('#sum_count').html(formatCurrency(sumCount));

    var resetCount = $('#reset_count').text();
    $('#reset_count').html(formatCurrency(resetCount));

    $('#turn_record').tap(function(){
        location.href='record.html';
    });
