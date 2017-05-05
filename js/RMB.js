
//中文大写金额
		function regInput(reg) {
		    var srcElem = event.srcElement;
		    var oSel = document.selection.createRange();
		    oSel = oSel.duplicate();
		    oSel.text = "";
		    var srcRange = srcElem.createTextRange();
		    oSel.setEndPoint("StartToStart", srcRange);
		    var num = oSel.text + String.fromCharCode(event.keyCode) + srcRange.text.substr(oSel.text.length);
		    event.returnvalue = reg.test(num);
		}
		
		function chineseNumber(num) {
		    if (isNaN(num) || num > Math.pow(10, 12)) 
		      return "";
		    var cn = "零壹贰叁肆伍陆柒捌玖" ;
		    var unit = new Array("拾佰仟", "分角") ;
		    var unit1 = new Array("万亿", "");
		    var numArray = num.toString().split(".") ;
		    var start = new Array(numArray[0].length - 1, 2);
		
		    function toChinese(num, index) {
		        var num = num.replace(/\d/g,
		        function($1) {
		            return cn.charAt($1) + unit[index].charAt(start--%4 ? start % 4 : -1)
		        });
		        return num
		    }
		
		    for (var i = 0; i < numArray.length; i++) {
		        var tmp = ""
		        for (var j = 0; j * 4 < numArray[i].length; j++) {
		            var strIndex = numArray[i].length - (j + 1) * 4;
		            var str = numArray[i].substring(strIndex, strIndex + 4) ;
		            var start = i ? 2 : str.length - 1
		            var tmp1 = toChinese(str, i); 
		            tmp1 = tmp1.replace(/(零.)+/g, "零").replace(/零+$/, "");
		            //tmp1 = tmp1.replace(/^壹拾/, "拾")
		            tmp = (tmp1 + unit1[i].charAt(j - 1)) + tmp
		        }
		        numArray[i] = tmp
		    }
		
		    numArray[1] = numArray[1] ? numArray[1] : "";
		    numArray[0] = numArray[0] ? numArray[0] + "圆": numArray[0],
		    numArray[1] = numArray[1].replace(/^零+/, "");
		    numArray[1] = numArray[1].match(/分/) ? numArray[1] : numArray[1] + "整";
		    return numArray[0] + numArray[1];
		}
		
		function aNumber(num) {
		    var numArray = new Array() ;
		    var unit = "亿万圆$";
		    for (var i = 0; i < unit.length; i++) {
		        var re = eval("/" + (numArray[i - 1] ? unit.charAt(i - 1) : "") + "(.*)" + unit.charAt(i) + "/");
		        if (num.match(re)) {
		            //numArray[i] = num.match(re)[1].replace(/^拾/, "壹拾")
		            numArray[i] = numArray[i].replace(/[零壹贰叁肆伍陆柒捌玖]/g,
		            function($1) {
		                return "零壹贰叁肆伍陆柒捌玖".indexOf($1)
		            });
		            numArray[i] = numArray[i].replace(/[分角拾佰仟]/g,
		            function($1) {
		                return "*" + Math.pow(10, "分角 拾佰仟 ".indexOf($1) - 2) + "+"
		            }).replace(/^\*|\+$/g, "").replace(/整/, "0") ;
		            numArray[i] = "(" + numArray[i] + ")*" + Math.ceil(Math.pow(10, (2 - i) * 4))
		        } 
		        else 
		            numArray[i] = 0;
		    }
		    return eval(numArray.join("+"))
		}
		