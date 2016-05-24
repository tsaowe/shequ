
$.ajax({
    type: "post",               //也可以是type
    async: false,               //发送同步请求，此值可忽略,不影响结果
    url: "",    //请求地址
    dataType:'jsonp',               //固定值
    jsonp:'callback',               //值可变，名称随意，但一般设为callback就可以了
    jsonpCallback:'gdd',            //函数名，名称随意
    success:function(data){         //成功后的回调函数,返回的数据放在data参数里

    }

});