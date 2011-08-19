//create variable win to refer to current window else return error
var newsURL = 'http://www.wopg.org/en/component/foobla_rss/32-news/';
var win = Titanium.UI.currentWindow;


//function loadNews()
function loadNews(){

	var loaderImage =  Titanium.UI.createLabel({
		text:'Loading...',
		color:'#CCC',
		font:{fontWeight:'bold'},
		top:100        
	});	
	win.add(loaderImage);
	
	//empty array rowData for out tableView
	var rowData = [];
	
	//create HTTPClient 
	var loader = Titanium.Network.createHTTPClient();
	
	//send Http request method,and url to get data
	loader.open("GET",newsURL)
	
	//runs the function when the data is ready for us to process
	loader.onload = function(){
		try{
			var document 	= this.responseXML.documentElement;
			var items		= document.getElementsByTagName("item");
			var docTitle	= document.evaluate("//channel/title/text()").item(0).nodeValue;
			for(var i = 0;i < items.length; i++)
			{
				var item 	= items.item(i);
		        
		        var title = item.getElementsByTagName("title").item(0).text;
		        var row = Ti.UI.createTableViewRow({height:'auto'});
		        var label = Ti.UI.createLabel({
		          		text:title,
		          		left:72,
		          		top:5,
		          		bottom:5,
		          		right:5,
		          		color:'#666'
		        	});
		        	row.add(label);		        			        	
		        	rowData[i] = row;
		        	row.url = item.getElementsByTagName("link").item(0).text;
		      }		
		    win.remove(loaderImage);      	
			var tableView = Titanium.UI.createTableView({data:rowData});
			win.add(tableView);	
					
		}
		catch(E)
		{
			alert(E);	
		}
	}
	
	//send HTTP request
	loader.send();
}
loadNews();
