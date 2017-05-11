function userDate(uData) {
	var myDate = new Date(uData * 1000);
	var year = myDate.getFullYear();
	var month = myDate.getMonth() + 1;
	var day = myDate.getDate();
	return year + '-' + month + '-' + day;
}
//当前时间转时间戳
function datetime_to_unix(datetime) {
	var tmp_datetime = datetime.replace(/:/g, '-');
	tmp_datetime = tmp_datetime.replace(/ /g, '-');
	var arr = tmp_datetime.split("-");
	var now = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4], arr[5]));
	return parseInt(now.getTime() / 1000);
}

function getNowFormatDate(newDate) {
	var date = new Date();
	date.setTime(newDate * 1000);
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();

	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	console.log(month);
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	console.log(strDate);
	var hours = date.getHours();
	if (hours < 10) {
		hours = '0' + hours;
	}
	var minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = '0' + minutes;
	}
	var seconds = date.getSeconds();
	if (seconds < 10) {
		seconds = '0' + seconds;
	}
	console.log(date.getMinutes());
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
		" " + hours + seperator2 + minutes +
		seperator2 + seconds;
	return currentdate;
}
function cutstr(str, len) {
	var str_length = 0;
	var str_len = 0;
	var str_cut = new String();
	str_len = str.length;
	for(var i = 0; i < str_len; i++) {
		var a = str.charAt(i);
		str_length++;
		if(escape(a).length > 4) {
			//中文字符的长度经编码之后大于4
			str_length++;
		}
		str_cut = str_cut.concat(a);
		if(str_length >= len) {
			str_cut = str_cut.concat("...");
			return str_cut;
		}
	}
	//如果给定字符串小于指定长度，则返回源字符串；
	if(str_length < len) {
		return str;
	}
}
//时间戳转换成八位日期2014-5-5 
function userDate(uData) {
	var myDate = new Date(uData * 1000);
	var year = myDate.getFullYear();
	var month = myDate.getMonth() + 1;
	var day = myDate.getDate();
	return year + '-' + month + '-' + day;
}
module.exports = {
	userDate: userDate,
	datetime_to_unix: datetime_to_unix,
	getNowFormatDate:getNowFormatDate,
	cutstr:cutstr,
	userDate:userDate
};
