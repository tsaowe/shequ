function formatCurrency(t){if(!t)return"0.00";t=t.toString().replace(/\$|\,/g,""),isNaN(t)&&(t="0"),sign=t==(t=Math.abs(t)),t=Math.floor(100*t+.50000000001),cents=t%100,t=Math.floor(t/100).toString(),cents<10&&(cents="0"+cents);for(var e=0;e<Math.floor((t.length-(1+e))/3);e++)t=t.substring(0,t.length-(4*e+3))+","+t.substring(t.length-(4*e+3));return(sign?"":"-")+t+"."+cents}function TimeToDate(t,e){function n(t){return 10>t?"0"+t:t}e=e||!0;var o=new Date(1e3*t),r="";return r+=o.getFullYear()+"-",r+=n(o.getMonth()+1)+"-",r+=n(o.getDate()),e===!0&&(r+=" "+n(o.getHours())+":",r+=n(o.getMinutes())),r}function initMsg(){var t=document.createElement("div"),e="position:fixed;padding:22px;background:rgba(0, 0, 0, 0.5);color:#fff;border-radius:10px;font-size:24px;top:50%;left:50%;display:none;";t.setAttribute("style",e),t.setAttribute("id","alert_box"),document.getElementsByTagName("body")[0].appendChild(t)}function showMsg(t,e){document.getElementById("alert_box")||initMsg(),e=e||2;var n=document.getElementById("alert_box");n.innerHTML=t,n.style.display="block",n.style.marginLeft=-(n.offsetWidth/2)+"px",n.style.marginTop=-(n.offsetHeight/2)+"px",setTimeout(function(){n.style.display="none"},1e3*parseInt(e))}