/**
 * 将数值四舍五入(保留2位小数)后格式化成金额形式
 *
 * @param num 数值(Number或者String)
 * @return 金额格式的字符串,如'1,234,567.45'
 * @type String
 */
function formatCurrency(num) {
    num = num.toString().replace(/\$|\,/g,'');
    if(isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num*100+0.50000000001);
    cents = num%100;
    num = Math.floor(num/100).toString();
    if(cents<10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
        num = num.substring(0,num.length-(4*i+3))+','+
        num.substring(num.length-(4*i+3));
    return (((sign)?'':'-') + num + '.' + cents);
}

/**
 * 时间戳转换日期
 * @param <int> timeNum  待时间戳(秒)
 * @param <bool> isFull  返回完整时间(Y-m-d 或者 Y-m-d H:i:s)
 */
function TimeToDate(timeNum, isFull) {
    isFull = isFull || true;
    function add0(m){return m<10?'0'+m:m }
    var time = new Date(timeNum*1000);
    var ymdhis = "";
    ymdhis += time.getFullYear() + "-";
    ymdhis += add0(time.getMonth()) + "-";
    ymdhis += add0(time.getDate());
    if (isFull === true)
    {
        ymdhis += " " + add0(time.getHours()) + ":";
        ymdhis += add0(time.getMinutes());
    }
    return ymdhis;
}


function initMsg(){
    var alertBox = document.createElement('div');
    var style="position:fixed;padding:22px;background:rgba(0, 0, 0, 0.5);color:#fff;border-radius:10px;font-size:24px;top:50%;left:50%;display:none;";
    alertBox.setAttribute('style',style);
    alertBox.setAttribute('id','alert_box');
    document.getElementsByTagName('body')[0].appendChild(alertBox);
}

function showMsg(msg,time){
    if(!document.getElementById('alert_box')) initMsg();
    time = time || 3;
    var alertBox = document.getElementById('alert_box');
    alertBox.innerHTML = msg;
    alertBox.style.display = 'block';
    alertBox.style.marginLeft = -(alertBox.offsetWidth/2)+'px';
    alertBox.style.marginTop = -(alertBox.offsetHeight/2)+'px';
    setTimeout(function(){ alertBox.style.display = 'none';},parseInt(time)*1000);
}