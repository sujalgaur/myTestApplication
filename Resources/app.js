//this sets the background color for the master UIView
Titanium.UI.setBackgroundColor('#EFF2F3');

//create tab group
var tabGroup = Titanium.UI.createTabGroup();

//create base UI tab and root window
var newsWindow = Titanium.UI.createWindow({
	title:'Wopg News',
	backgroundColor:'#FFF',
	tabBarHidden:true,
	url:'main_windows/news_rss.js'
});

var newsTab = Titanium.UI.createTab({
	icon:'images/tabs/news.png',
	title:'News',
	window:newsWindow,
	backgroundColor:'#CCC'
});
tabGroup.addTab(newsTab);

var tweetWindow = Titanium.UI.createWindow({
	title:' Wopg Tweets',
	backgroundColor:'#FFF',
	tabBarHidden:true,	
	url:'main_windows/tweet.js'
});
var tweetTab = Titanium.UI.createTab({
	icon:'images/tabs/tweet.png',
	title:'Tweets',
	window:tweetWindow
});
tabGroup.addTab(tweetTab);
//open tab group
tabGroup.open();
