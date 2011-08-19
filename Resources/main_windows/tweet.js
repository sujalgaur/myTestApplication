/**
 * @author Jitendra Gaur
 */

var tweetURL = 'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=wopg';
var win = Titanium.UI.currentWindow;

//function loadNews()
function loadTweets(){
	
	var loaderImage =  Titanium.UI.createLabel({
		text:'Loading...',
		color:'#CCC',
		font:{fontWeight:'bold'},
		top:50        
	});	
	win.add(loaderImage);
	
	//empty array rowData for out tableView	
	var rowData = [];
	
	//create HTTPClient 
	var loader = Titanium.Network.createHTTPClient();
	
	//send Http request method,and url to get data
	loader.open("GET",tweetURL)
	
	//runs the function when the data is ready for us to process
	loader.onload = function(){
		var tweets = eval('('+this.responseText+')');
		for(var i = 0;i < tweets.length; i++){
			var tweet 	= tweets[i].text;
			var user 	= tweets[i].user.screen_name;
			var avatar	= tweets[i].user.profile_image_url;
			
			//create a row and set its height auto
			//var row		= Titanium.UI.createTableViewRow();
			var row 		= Titanium.UI.createTableViewRow({height:'auto'});
			//create the view that will contain the text and avatar
			var postView = Titanium.UI.createView({				
				layout:'vertical',
				top:5,
				right:5,
				bottom:5,
				left:5
			});
			
			var avImage = Titanium.UI.createImageView({
				image:avatar, // the image for the image view
				top:0,
				left:0,
				height:48,
				width:48
			});
			postView.add(avImage);
			
			var userLabel = Titanium.UI.createLabel({
				text:user,
				left:54,
				width:120,
				top:-48,
				bottom:2,
				height:'auto',
				textAlign:'left',
				color:'#444444',
				font:{fontFamily:'verdana',fontSize:14,fontWeight:'bold'}
			});
			postView.add(userLabel);
			
			var tweetLabel = Titanium.UI.createLabel({
				text:tweet,
				left:54,
				top:0,
				bottom:2,
				width:'auto',
				height:'auto',
				textAlign:'left',
				font:{fontSize:14}
			});
			postView.add(tweetLabel);
			
			row.height = 'auto';
			row.add(postView);
			
			row.className = "item"+i;
			rowData[i] = row;
		}
		var tableView = Titanium.UI.createTableView({data:rowData});
		win.remove(loaderImage);
		win.add(tableView);
	}
	
	//send HTTP request
	loader.send();
}
loadTweets();
