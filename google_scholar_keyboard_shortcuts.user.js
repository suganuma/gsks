// ==UserScript==
// @name			Google Scholar Keyboard Shortcut
// @namespace		http://www.mlab.t.u-tokyo.ac.jp/suganuma/
// @description		Enables keyboard shortcuts on Google Scholar
// @include			http://scholar.google.com/*
// @require			http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @excludes		
// ==/UserScript==	

(
function(){
	var i = -1;
	var d;
	var isInput = false;
	var nowpage = 0;
	$("form div[id='scife_hdr'] input[type='text']").attr("size" , "100");
	document.addEventListener('keydown',
							  function(event){
								  if(isInput){return;}
								  switch (event.keyCode){
									  
								  case 76:	//'l'key to jump reference page
									  if($("div[class^='gs_r'] div[class^='gs_rt'] a[class^='yC']")[i]){
										  var tmp = $("div[class^='gs_r'] div[class^='gs_rt'] a[class^='yC']")[i].href;
										  if(tmp){
											  //alert(tmp);
											  var tmp_parent = $("a[href^=" +'"'+ tmp +'"'+ "]").parent().parent().parent().get(0);
											  //alert(tmp_parent);
											  //var target = $("#target_ref_jquery_children")
											  //alert("a[href^=" +'"'+ tmp +'"'+ "]")
											  var ref = $(tmp_parent).children("font").children("span[class='gs_fl']").children("a[href^='/scholar?cites']").get(0);
											  //alert(ref);
											  if(ref){
												  var ref_url = ref.href;
												  window.open(ref_url , "_self");
											  }
										  }
										  //alert(tmp_parent);
										  //alert($(tmp_parent).children("span[class='gs_fl']").children("a[href^='/scholar?cites']"));
									  }
									  break;
								  
								  case 79: //'o'key to open focused link
									  if(i >= 0){
										  var url = $("div[class='gs_r'] div[class^='gs_rt']  a[class^='yC']")[i].href;
										  // alert(url);
										  //alert($("div[class='gs_r'] div[class^='gs_rt']	a[class^='yC']")[i]);
										  window.open(url , "_self");
									  }
									  break;
								
								  case 80: //'p' key to previous page if exists	 
									  if($("td[align='right'] a[href^='/scholar?start']")[0]){
										  var url = $("td[align='right'] a[href^='/scholar?start']")[0].href;
										  window.open(url , "_self");
									  }
									  break;
								  
								  case 78: // 'n' key to next page
									  if($("td[nowrap=''] a[href^='/scholar?start']")[0]){
										  var url;								
										  url = $("td[nowrap=''] a[href^='/scholar?start']")[0].href;
										  
										  if($("td[nowrap=''] a[href^='/scholar?start']")[1])
										  {
											  url = $("td[nowrap=''] a[href^='/scholar?start']")[1].href;
										  }
										  if(url){
											  window.open(url , "_self");
										  }
									  }
									  break;
								  
								  case 74: case 75: //'j' , 'k' keys to move forward and backward
									  if(event.keyCode == 74){ d = 1; } //go forward link
									  if(event.keyCode == 75){ d = -1;} //go backward link
									  
									  // the selected place
									  i += d;
									  
									  if($("div[class='gs_r'] div[class^='gs_rt']  a[class^='yC']")[i]){
										  $("div[class='gs_r'] div[class^='gs_rt']	a[class^='yC']")[i].style.background = "#999";
										  $("div[class='gs_r'] div[class^='gs_rt']	a[class^='yC']")[i].style.color = "#fff";

										  if($("div[class='gs_r'] div[class^='gs_rt']  a[class^='yC']")[i+d]){
											  $("div[class='gs_r'] div[class^='gs_rt']	a[class^='yC']")[i+d].focus();
										  }
										  $("div[class='gs_r'] div[class^='gs_rt']	a[class^='yC']")[i].focus();
										  if(i === 0){
											  window.scroll(0,0);
										  }
										  if($("div[class='gs_r'] div[class^='gs_rt']  a[class^='yC']")[i-d]){
											  $("div[class='gs_r'] div[class^='gs_rt']	a[class^='yC']")[i-d].style.background = "";
											  $("div[class='gs_r'] div[class^='gs_rt']	a[class^='yC']")[i-d].style.color = "";
										  }
									  }else{
										  i -= d;
									  }	
									  break;
									 
								  case 219: //'[' key to select paper title.
									  if($("div[class='gs_r'] div[class^='gs_rt']	 a[class^='yC']")[i]){
										  var ele = $("div[class='gs_r'] div[class^='gs_rt']	a[class^='yC']")[i];
										  var start = 0;
										  var length = ele.text.length
										  if (window.getSelection) {
											  var rng = window.content.document.createRange()
											  if (! start) {
												  rng.selectNodeContents(ele)
											  } else {
												  rng.setStart(ele.firstChild, start + 1)				 // 1始まり
												  rng.setEnd(ele.firstChild, start + 1 + length)	  // 1始まり
											  }
											  var sel = getSelection()
											  sel.removeAllRanges()	  // Selection は、複数の Range を持てるので、クリアしておく
											  sel.addRange(rng)
										  } else {
											  var rng = document.selection.createRange()
											  rng.moveToElementText(ele)
											  if (start) {
												  rng.collapse()
												  rng.moveStart("character", start)
												  rng.moveEnd("character", length)
											  }
											  rng.select()
										  }
									  }
									  break;
								  }
							  },
							  false);
							  
document.addEventListener('keyup',
	function(event) {
		if(event.keyCode == 27){
			if($("form div[id='scife_hdr'] input[type='text']")[0]){
				var form_bar = $("form div[id='scife_hdr'] input[type='text']")[0];
				//alert(form_bar.type);
				isInput = false;
				form_bar.blur();
				
			}
		}		
		if (isInput) {return;}
		switch(event.keyCode){	
		case 190: //'.'key
			
			if($("form div[id='scife_hdr'] input[type='text']")[0]){
				var form_bar = $("form div[id='scife_hdr'] input[type='text']")[0];
				//alert(form_bar.type);
				if($("div[class='gs_r'] div[class^='gs_rt']  a[class^='yC']")[i]){
					$("div[class='gs_r'] div[class^='gs_rt']	a[class^='yC']")[i].style.background = "";
					$("div[class='gs_r'] div[class^='gs_rt']	a[class^='yC']")[i].style.color = "";
				}
				i = -1;
				form_bar.focus();
				isInput = true;
				form_bar.select();
			}
			break;
		}
	}, false);
})();