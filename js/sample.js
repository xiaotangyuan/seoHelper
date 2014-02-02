chrome.contextMenus.create({'title':"本站seo查询(名榜SEO助手)","onclick":keyOnclick}, function(){
		  if (chrome.extension.lastError) {
		    console.log("Got expected error: " + chrome.extension.lastError.message);
			}
		});


function keyOnclick(){

		html = chrome.extension.getURL("../index.html");
		newtabId=0;
		oldtabId=1;
		chrome.tabs.getSelected(null,function(tab){
			url=tab.url.replace(/http[s]{0,1}:\/\//,'').replace(/(\/).+/,'').replace('/','');
			if(url.indexOf('.')<=0){
				alert('网址不正确');
				return;
			}
			localStorage.now=url;
			oldtabId=tab.id;
			console.log('oldtabId='+oldtabId);
			chrome.tabs.create({url:html+'?tabid='+tab.id},function(tab){
				newtabId=tab.id;
				console.log('newtabId='+newtabId);
			});
			/*
			chrome.tabs.sendRequest(oldtabId,{url:tab.url},function(response){
				console.log(oldtabId+' send url ');
			})
			*/	
		});


}
/*

function testOnclick(){

	//chrome.tabs.executeScript(null,{file: 'openSlider.js'},function(){
		//alert("hello");
	//});
	chrome.tabs.getSelected(null,function(tab){
		url=tab.url.replace('http://','').replace(/(\/).+/,'');
		chrome.tabs.create({url:"http://seo.chinaz.com/?host="+url});
		//alert(url);
		//console.log(url);
	});
	//chrome.tabs.create({url:"http://seo.chinaz.com/"});
}
*/
