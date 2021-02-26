if(!window.encoder)throw"dblp-search.js: encoder.js library has not been loaded.";if(!window.dblp)throw"dblp-search.js: dblp.js has not been loaded.";dblp.search=dblp.search||{};dblp.search.GUI_URL=dblp.BASE_URL+"/search";dblp.search.CS_GUI_URL=dblp.BASE_URL+"/search/publ";dblp.search.MAX_HITS_TO_SHOW=5;dblp.search.MIN_CHARS_FOR_QUERY=2;(function(mod,undefined){function urldata(url,data){var result=url+"?";for(var prop in data){result+=prop+"="+data[prop]+"&"}result=result.substring(0,result.length-1);return encodeURI(result)}function numWithCommas(input){if(typeof input=="string")str=input;else str=input.toString();return str.replace(/\B(?=(\d{3})+(?!\d))/g,",")}function getQueryUrl(facet,query){var url;if(facet=="authors"){url=dblp.CS_AUTHORS_API_URL}else if(facet=="venues"){url=dblp.CS_VENUES_API_URL}else if(facet=="insts"){url=dblp.CS_INSTS_API_URL}else{console.error("getQueryUrl: unrecognized facet descriptor: "+facet);return}url+="?q="+encodeURIComponent(query)+"&p=2&h="+(dblp.search.MAX_HITS_TO_SHOW+1);url+="&c=0&rd=2d&format=jsonp&compl=score";return url}function getField(info,key){for(var nr in info["show"]){var show=info["show"][nr];if(typeof show=="string")continue;if("@field"in show&&show["@field"]==key){if("text"in show)return show["text"];else return""}}return null}function getListItem(facet,info){if(info==null)return"";var result;if(facet=="authors"){result='<li><a href="'+dblp.BASE_URL+"/pid/";result+=info["pid"]+'.html">';var name=info["author"].split("~*")[0];if(name.match(/.+ [0-9]{4}/)){result+=name.substring(0,name.length-5);result+=' <span class="homonym-nr">'+name.substring(name.length-4)+"</span></a>"}else{result+=name+"</a>"}if("note"in info&&info["note"].length>0){result+=" &mdash; <small>"+info["note"]+"</small>"}result+="</li>"}else if(facet=="venues"){result='<li><a href="'+dblp.BASE_URL+"/";result+=info["href"]+'">';var title=info["venue"].split("~*")[0];result+=title+"</a></li>"}else if(facet=="insts"){result='<li><a href="'+dblp.BASE_URL+"/";result+=info["key"]+'.html">';var title=info["institution"].split("~*")[0];result+=title+"</a>";if("location"in info){var locs=info["location"];if(jQuery.type(locs)=="string")locs=[locs];if(locs.length>0){result+=" &mdash; <small>"+locs[0]+"</small>"}}result+="</li>"}else if(facet=="publs"){result='<li><a href="'+dblp.BASE_URL+"/rec/"+info["urlpt"]+'.html">';var authors=info["authors"];if(authors&&"author"in authors){var author=authors["author"];if(jQuery.type(author)=="object")author=[author];else if(jQuery.type(author)!="array")author=[{text:author}];var parts=author[0].text.split(" ");var pos=parts.length-1;while(pos>0){part=parts[pos];if(!part.match(/^[0-9]{4}|Jr\.|II|III|IV$/))break;pos--}result+="<small>"+encoder.htmlEncode(parts[pos]);if(author.length>1)result+=" et al.";result+=":</small> "}var title=encoder.htmlDecode(info["title"]);if(title.length>65){var pos=64;while(pos>42&&title[pos]!=" ")pos--;title=title.substring(0,pos+1)+"..."}result+=encoder.htmlEncode(title);var year=info["year"];result+=" <small>("+year+")</small>";result+="</a></li>"}else{console.error("getListItem( facet, record ): unrecognized facet descriptor: "+facet);return null}return result}function getQuery(){var input=$('#search input[name="q"]');var query=encoder.htmlDecode(input.val().trim());return query.replace(/[^\u0000-~\u0080-þĀ-žƀ-Ɏ]/g,"?")}function getMode(){var mode=$("#search-mode-selector input:checked").val();if(!mode)mode=$.cookie("dblp-search-mode");if(!mode)mode="c";return mode}function updateUrlParameter(url,param,val){var anchor=null;var newAdditionalURL="";var tempArray=url.split("?");var baseURL=tempArray[0];var additionalURL=tempArray[1];var temp="";if(additionalURL){var tmpAnchor=additionalURL.split("#");var tmpParams=tmpAnchor[0];anchor=tmpAnchor[1];if(anchor)additionalURL=tmpParams;tempArray=additionalURL.split("&");for(var i=0;i<tempArray.length;i++){if(tempArray[i].split("=")[0]!=param){newAdditionalURL+=temp+tempArray[i];temp="&"}}}else{var tmpAnchor=baseURL.split("#");var tmpParams=tmpAnchor[0];anchor=tmpAnchor[1];if(tmpParams)baseURL=tmpParams}if(anchor)val+="#"+anchor;var rows_txt=temp+""+param+"="+val;return baseURL+"?"+newAdditionalURL+rows_txt}var updateUrls=function(doUpdateHistory){if(typeof doUpdateHistory==="undefined")doUpdateHistory=true;var query=getQuery();var newUrl=window.location.href;if(query&&query!=""){newUrl=updateUrlParameter(newUrl,"q",encodeURIComponent(query))}var newTitle=window.document.title;if(doUpdateHistory){history.replaceState({q:query},newTitle,newUrl)}var externallinks=$("#search-external a");externallinks.each(function(index,elem){var href=$(this).attr("href");var splitter="?q=";if(href.indexOf("deepdyve.com/")>1)splitter="?query=";else if(href.indexOf("orcid.org/")>1)splitter="?searchQuery=";var parts=href.split(splitter,2);if(query.trim().length==0)$(this).attr("href",parts[0]);else $(this).attr("href",parts[0]+splitter+encodeURIComponent(query))})};function query(facet){if(facet!="publs"&&facet!="authors"&&facet!="venues"&&facet!="insts"){console.error("unrecognized facet descriptor: "+facet+", aborting ajax");return}if(!(dblp.TEAM_MODE_ENABLED||dblp.LEY_MODE_ENABLED||dblp.MRA_MODE_ENABLED||dblp.BETA_INST_MODE_ENABLED)&&facet=="insts")return;var input=$("#search form input");if(input.data(facet+"QueryMutex")){console.warn(facet+": already querying, aborting ajax");return}input.data(facet+"QueryMutex",true);var results=$("#search .results");var waiting=results.find("."+facet+" .waiting");var matches=results.find("."+facet+" .matches");matches.hide();waiting.show();matches.empty();var mode=getMode();var query=getQuery();var url;var maxHits;if(facet=="publs"){url=dblp.CS_PUBLS_API_URL;if(mode=="p")maxHits=dblp.search.MAX_HITS_TO_SHOW;else maxHits=parseInt(dblp.search.MAX_HITS_TO_SHOW/2)}else if(facet=="authors"){url=dblp.CS_AUTHORS_API_URL;if(mode=="a")maxHits=2*dblp.search.MAX_HITS_TO_SHOW;else maxHits=dblp.search.MAX_HITS_TO_SHOW}else if(facet=="venues"){url=dblp.CS_VENUES_API_URL;if(mode=="v")maxHits=2*dblp.search.MAX_HITS_TO_SHOW;else maxHits=dblp.search.MAX_HITS_TO_SHOW}else if(facet=="insts"){url=dblp.CS_INSTS_API_URL;if(mode=="i")maxHits=2*dblp.search.MAX_HITS_TO_SHOW;else maxHits=dblp.search.MAX_HITS_TO_SHOW}var data={q:query,p:2,h:maxHits+1,c:0,format:"jsonp"};if(facet=="publs"){data.rd="1a"}else{data.compl="score";data.rd="2d"}console.debug("calling: ",urldata(url,data));$.ajax({url:url,type:"GET",data:data,dataType:"jsonp"}).done(function(data,textStatus,jqXHR){try{var hits=data.result.hits;var totalHits=parseInt(hits["@total"]);console.info(facet+": "+totalHits+" matches");console.debug("result",data.result);if(totalHits==0){matches.append("<li><i>no matches</i></li>")}else{var hitList=[];if("hit"in hits){hitList=hits["hit"]}if(hitList&&hitList.length>0){for(var i=0;i<hitList.length-1;i++){matches.append(getListItem(facet,hitList[i]["info"]))}if(totalHits>1e3&&facet!="publs"){matches.append("<li><i>more than 1000 hits, refine query</i></li>")}else if(totalHits>hitList.length){matches.append('<li><a href="'+dblp.search.GUI_URL+"/"+facet+"?q="+encodeURIComponent(query)+'"><i>show all '+numWithCommas(totalHits)+" matches</a></i></li>")}else if(totalHits==hitList.length){matches.append(getListItem(facet,hitList[hitList.length-1]["info"]))}}else{matches.append("<li><i>no matches</i></li>")}}}catch(exception){matches.append('<li><i class="warning">temporarily not available</i></li>');console.error(facet+": "+exception.toString())}}).fail(function(jqXHR,textStatus,errorThrown){matches.append('<li><i class="warning">temporarily not available</i></li>');console.error(facet+": ["+textStatus+"] "+errorThrown)}).always(function(jqXHR,textStatus){waiting.hide();matches.show();input.data(facet+"QueryMutex",false);console.info(facet+": done.")})}function updateMode(mode){if(!mode)mode=getMode();var img=$("#search-mode-selector .head img");var form=$("#search form");var input=$("#search form input");var results=$("#search").find(".results");if(mode=="a"){$("#search-mode-author").prop("checked",true);img.attr("src",dblp.BASE_URL+"/img/person.dark.16x16.png");form.attr("action",dblp.BASE_URL+"/search/author");input.attr("placeholder","search for authors");results.find("div").hide();results.find("div.authors").show();$.cookie("dblp-search-mode","a",{expires:dblp.COOKIE_EXPIRES_IN_DAYS})}else if(mode=="v"){$("#search-mode-venue").prop("checked",true);img.attr("src",dblp.BASE_URL+"/img/venues.dark.notitle.16x16.png");form.attr("action",dblp.BASE_URL+"/search/venue");input.attr("placeholder","search for venues");results.find("div").hide();results.find("div.venues").show();$.cookie("dblp-search-mode","v",{expires:dblp.COOKIE_EXPIRES_IN_DAYS})}else if(mode=="i"){$("#search-mode-inst").prop("checked",true);img.attr("src",dblp.BASE_URL+"/img/institution.dark.16x16.png");form.attr("action",dblp.BASE_URL+"/search/inst");input.attr("placeholder","search for institutions");results.find("div").hide();results.find("div.insts").show();$.cookie("dblp-search-mode","i",{expires:dblp.COOKIE_EXPIRES_IN_DAYS})}else if(mode=="p"){$("#search-mode-publ").prop("checked",true);img.attr("src",dblp.BASE_URL+"/img/paper.dark.16x16.png");form.attr("action",dblp.BASE_URL+"/search/publ");input.attr("placeholder","search for publications");results.find("div").hide();results.find("div.publs").show();$.cookie("dblp-search-mode","p",{expires:dblp.COOKIE_EXPIRES_IN_DAYS})}else{$("#search-mode-combined").prop("checked",true);img.attr("src",dblp.BASE_URL+"/img/search.dark.16x16.png");form.attr("action",dblp.BASE_URL+"/search");input.attr("placeholder","search dblp");results.find("div").show();$.cookie("dblp-search-mode","c",{expires:dblp.COOKIE_EXPIRES_IN_DAYS})}}mod.init=function(){if($("#search").length==0)return;var modeSelect=$('#search .drop-down .body input[name="search-mode"]');var mode=$.cookie("dblp-search-mode");updateMode(mode);updateUrls();var input=$("#search form input");input.attr("autocomplete","off");var results=$("#search .results");var offset=input.outerHeight()-parseInt(input.css("border-bottom-width"));results.css("top",offset+"px");results.find(".waiting").hide();input.css("width",input.innerWidth()-16+"px");input.css("padding-right","20px");var clear=$("#search .clear");clear.css("position","absolute");clear.css("cursor","pointer");clear.css("top","50%");clear.css("margin-top","-8px");clear.css("right","4px");clear.css("z-index","44");clear.hide();input.data("authorsQueryMutex",false);input.data("venuesQueryMutex",false);input.data("instsQueryMutex",false);input.on("input",function(){var qlen=$(this).val().trim().length;if(qlen==0)clear.hide();else clear.show();updateUrls();clearTimeout($.data(this,"authorsQueryTimer"));clearTimeout($.data(this,"venuesQueryTimer"));clearTimeout($.data(this,"instsQueryTimer"));clearTimeout($.data(this,"publsQueryTimer"));if(qlen<dblp.search.MIN_CHARS_FOR_QUERY){results.find(".matches").empty();results.find(".matches").append("<li><i>no matches</i></li>");results.find(".waiting").hide();results.find(".matches").show()}else{$(this).css("z-index","33");$(this).css("border-bottom-style","dotted");results.show();var mode=getMode();if(!mode||mode=="c"||mode=="a"){var authorsQueryTimer=setTimeout(function(){query("authors")},dblp.UX_TYPING_QUERY_DELAY_MSECS(qlen));$.data(this,"authorsQueryTimer",authorsQueryTimer)}if(!mode||mode=="c"||mode=="v"){var venuesQueryTimer=setTimeout(function(){query("venues")},dblp.UX_TYPING_QUERY_DELAY_MSECS(qlen));$.data(this,"venuesQueryTimer",venuesQueryTimer)}if(!mode||mode=="c"||mode=="i"){var instsQueryTimer=setTimeout(function(){query("insts")},dblp.UX_TYPING_QUERY_DELAY_MSECS(qlen));$.data(this,"instsQueryTimer",instsQueryTimer)}if(!mode||mode=="c"||mode=="p"){var publsQueryTimer=setTimeout(function(){query("publs")},dblp.UX_TYPING_QUERY_DELAY_MSECS(qlen));$.data(this,"publsQueryTimer",publsQueryTimer)}}});if(input.val().trim().length>=dblp.search.MIN_CHARS_FOR_QUERY){if(!mode||mode=="c"||mode=="a")query("authors");if(!mode||mode=="c"||mode=="v")query("venues");if(!mode||mode=="c"||mode=="i")query("insts");if(!mode||mode=="c"||mode=="p")query("publs");results.hide()}if(input.val().trim().length>0){clear.show()}$("#search").focusout(function(){if(results.is(":hover"))return;input.css("z-index","0");input.css("border-bottom-style","solid");results.hide()});$("#search").mouseleave(function(){if(input.is(":focus"))return;input.css("z-index","0");input.css("border-bottom-style","solid");results.hide()});input.focusin(function(){if($(this).val().trim().length>0){$(this).css("z-index","33");$(this).css("border-bottom-style","dotted");results.show()}});modeSelect.click(function(){var mode=$(this).val();updateMode(mode);if(mode=="c"||mode=="a")query("authors");if(mode=="c"||mode=="v")query("venues");if(mode=="c"||mode=="i")query("insts");if(mode=="c"||mode=="p")query("publs");$(this).blur();return true});clear.click(function(){input.css("z-index","0");input.css("border-bottom-style","solid");results.hide();clear.hide();input.val("");input.get(0).focus();updateUrls()})}})(dblp.search);$(document).ready(dblp.search.init());
