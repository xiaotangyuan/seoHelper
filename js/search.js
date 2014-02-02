$().ready(function(){
	console.log('ready');
	console.log('localStorage.now:'+localStorage.now);
	if(window.localStorage){
		 //alert('This browser supports localStorage');
	}else{
		 alert('看起来你的浏览器无法将查询数据保存到本地！请升级到支持html5的浏览器。');
		}
	localStorage.setItem('www.abc.com','{"keyWords":["abc"]}');
	//localStorage.now="www.nc.com";
	//筛选已保存的符合URL格式的网址，显示出来。
	a=0;
	hmpage=10;//查询前多少页
	nurl=localStorage.now;
	
	for (var i = 0; i < localStorage.length; i++) {
		url=localStorage.key(i);
		if(url.indexOf('.')>0){
			console.log('url:'+url);

			if(nurl==url){
				$("select").append('<option selected="selected" value ="'+url+'">'+url+'</option>');
				a=1;
			}else{
				$("select").append('<option value ="'+url+'">'+url+'</option>');
			}


		}
	};
	//如果新查询的这个url未在记录中，加进数据库中，然后刷新。
	if(a==0){
		localStorage.setItem(nurl,'{"keyWords":[]}');
				//obj=$.parseJSON(localStorage.url);
		alert('您是首次查询此站'+nurl+',已自动记录，您可以配置添加关键字，也可以通过"从查询列表中删除本站"将此站删除。');
		location.reload();
	}


	//alert(nurl);
	$("#url").text(nurl);
	pathurl="http://seo.chinaz.com/?host="+nurl;
	$("#url").next().attr({'href':pathurl});




	//keyWords=localStorage.keyWords;
	//keyWords='["新新贷","网络贷款","P2P借贷","投资理财","理财产品","民间借贷","P2P","O2O","无抵押贷款","信贷","网络贷款","网络借贷","企业融资"]';
	//keyWords='["网络借贷","p2p借贷平台"]';
	//localStorage.keyWords=keyWords;
	//objUrl=localStorage.getItem(url);
	//objUrl='{"keyWords":["网络借贷","p2p借贷平台"]}';
	
	keyWords=getKeyWordsFromUrl(nurl);

	console.log(keyWords);
	for (var i = 1; i <= keyWords.length; i++) {
		kw=keyWords[i-1];
		//html='<p class="p">'+i+',<span class="keyWord">'+kw+'</span><a href="">修改</a> 排名结果：</p>';
		//html=""
		$("tbody").append("<tr><td></td><td class='keyWord'></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
		$("tbody>tr").last().children().first().text(i).next().text(kw);
		//.children().last().append("<td></td>").text(kw);
	};



	//点击查询
	$("#getbdinfo").click(function(){
			//console.log('ajax,qian');
			//words=$('.keyWord');
			
			words=$(".keyWord");
			console.log("words数量："+words.length);
			//getNums("新新贷","www.xinxindai.com");
			
			for (var i = 0; i < words.length; i++) {
				word=$(words[i]).text();
				console.log("word:"+word);
				getNumsAllPages(word,nurl,hmpage);
			}
	});

	//选择网站
	//url="www.xinxindai.com";

	$("select").change(function(){
		url=$("select option:selected").text();
		//alert(url);
		localStorage.now=url;
		location.reload();
	});



	//添加关键字
	$("#addKeyWord").click(function(){
		
		console.log("开始执行添加关键字");
		addKeyWord(nurl);

	});


	//删除关键字
	$(".keyWord").hover(function(){
		//alert('hover');
		$(this).append("<a href='' id='deletWord'>删除</a>");
		$("#deletWord").click(function(){
			//alert('fds');
			word=$(this).empty().parent().text();
			//alert(word);
			deletWord(word);
		});
	},function(){
		$(this).children().last().remove();
	});


	//添加网址url
	$("#addUrl").click(function(){
		newUrl=$("#newUrl").val();
		if(newUrl.indexOf('.')<=0){
			alert('网址不正确');
			return;
		}
		console.log('newUrl:'+newUrl);
		//alert('newUrl:'+newUrl);
		addUrl(newUrl);
	});


	//删除网址记录
	$("#deletUrl").click(function(){
		url=$("#url").text();
		r=confirm('确认删除'+url);
		if(r==true){
			localStorage.removeItem(url);
			localStorage.now='www.abc.com';
			/*
			for (var i = 0; i < localStorage.length; i++) {
				key=localStorage.key[i];
				if (key.indexOf('.')>=0) {
					localStorage.now=key;
					break;
				};
			};*/

		//localStorage.now=firstUrl;
			//location.reload();
		}
	});

	//清理工作
	 someth();

});


//工具函数

//传入一个url的字符串，从localstorge中取出keywords,然后返回转换后的数组。
function getKeyWordsFromUrl(url){
	objUrl=localStorage.getItem(url);
	obj=$.parseJSON(objUrl);
	kws=obj.keyWords;
	return kws;
}

function urlAndKeyWordsToJson(url,keyWords){
	//objUrl=localStorage.getItem(url);
	//obj=$.parseJSON(objUrl);
	//kw=obj.keyWords;
	//kw.splice($.inArray(word,kw),1);
	obj={'keyWords':keyWords};
	jsonobj=JSON.stringify(obj);
	localStorage.setItem(url,jsonobj);
}






function getNumsAllPages(word,url,pages){
	for (var i = 1; i <= pages; i++) {
		 getNums(word,url,i);
	};

}


function getNums(word,url,page){
	xpage=(page-1)*10;
	ckurl='http://www.baidu.com/s?wd='+word+'&pn='+xpage;
	
	$.get(ckurl, function(data) {
				var nums=new Array();
				console.log("开始查询关键字url："+ckurl);
				console.log("现在的nums"+nums.join(','));
				//data=data.replace(/<[\s\S]{0,3}script[\s\S]{0,5}/g,"<br>");
				//console.log("data转换前类型："+typeof(data));
				//console.log(data);
				data=$.parseHTML(data);
				//console.log(data);
				//console.log("data转换后类型："+typeof(data));
				$("#bd_container").append(data);
				
				allids=$("*[id]");
				numids=[];

				for (var i = 1; i <= allids.length; i++) {
					id=$(allids[i]).attr('id');
					if(/^[1-9]{1,2}$/.test(id)){
						console.log(id);
						html=$(allids[i])//.text();//返回字符串
						//console.log(typeof(html));
						//console.log(url);
						if(checkUrl(html,url)){
							nums.push(id);
							console.log("nums:"+nums.join(','));
						}
						
					}
				}
				
				//显示关键字排名结果。
				//选取含有word关键字的元素
				$keyWords=$(".keyWord")//.next('span');
				console.log("$keyWords.length:"+$keyWords.length);
				for (var i = 0; i < $keyWords.length; i++) {
					$kw=$($keyWords[i]);
					console.log("循环keyword:"+$kw.text());
					if ($kw.text()==word) {
						console.log("匹配到了关键字num,执行改变num");
						//$kw.parent().append(',').append("第"+page+"页:"+nums.join(','));
						if(nums.length>0){
							$kw.nextAll('td').eq(page-1).text(nums.join(',')).css({'color':'red'});
						}else{
							$kw.nextAll('td').eq(page-1).text('无排名').css({"font-style":'italic'});

						}
						
						//nums='';
						//break;
					};
				};
				//$num.html('').append(nums.join(','));
				console.log("排名结果:"+nums.join(','));
				console.log(".get函数执行完毕");
				//nums=new Array();
				//必须清空
				$("#bd_container").html('');
			});

}


function checkUrl(idtab,url){
	//console.log(idtab.text());
	//$("#hasid").append(idtab);
	spans=idtab.find('span');
	//spans=$("#hasid span");
	console.log("#hasid:"+idtab.text());
	a=false;
	for (var i = 0; i < spans.length; i++) {
		if($(spans[i]).text().indexOf(url)>=0){
		a=true;
		break;
	}
	};
	//$("#hasid").html('');
	return a;
}

function addKeyWord(url){
	//newWord=$("#newWord").val();
	//alert("haaa");
	newWord=$("#newWord").val();
	//alert("newWord:"+newWord);
	if (newWord.length<=0) {
		alert('关键字长度错误');
		return;
	};
	//alert(newWord);
	
	keyWords=getKeyWordsFromUrl(url);
		
	keyWords.push(newWord);
	//alert(keyWords);
	jsonobj=JSON.stringify(obj);
	console.log("新添加关键词后的jsonobj:"+jsonobj);
	localStorage.setItem(url,jsonobj);
	location.reload();

}

function deletWord(word){

	kw=getKeyWordsFromUrl(nurl);
	kw.splice($.inArray(word,kw),1);
	urlAndKeyWordsToJson(nurl,kw);
	//alert(kw);
	//jsonobj=JSON.stringify(obj);
	//console.log("删除关键词后的jsonobj:"+jsonobj);
	//localStorage.setItem(url,jsonobj);
	location.reload();

}


function addUrl(newUrl){
	localStorage.setItem(newUrl,'{"keyWords":[]}');
	location.reload();
	//obj=$.parseJSON(localStorage.url);
}


function someth(){
	if(localStorage.now=='www.abc.com'){
		$("#deletUrl,#check").hide();
		$("#url").append('<span class="small">示例</span>');
	}else{
		$("#deletUrl,#check").show();
	}
	
}



