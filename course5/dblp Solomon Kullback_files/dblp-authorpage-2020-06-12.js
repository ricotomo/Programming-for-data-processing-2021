if(!window.buckets){throw ("dblp-authorpage.js: buckets.js library has not been loaded.")}if(!window.encoder){throw ("dblp-authorpage.js: encoder.js library has not been loaded.")}if(!window.dblp){throw ("dblp-authorpage.js: dblp.js has not been loaded.")}dblp.authorpage=dblp.authorpage||{};dblp.authorpage.MAX_OPTIONS_TO_SHOW=10;dblp.authorpage.MAX_SIMILAR_NAMES_TO_SHOW=10;(function(D,h){var e={":facet:type:Books_and_Theses":0,":facet:type:Journal_Articles":1,":facet:type:Conference_and_Workshop_Papers":2,":facet:type:Parts_in_Books_or_Collections":3,":facet:type:Editorship":4,":facet:type:Reference_Works":5,":facet:type:Data_and_Artifacts":6,":facet:type:Informal_Publications":7,":facet:type:Withdrawn_Items":8};var m={Books_and_Theses:"book",Journal_Articles:"article",Conference_and_Workshop_Papers:"inproceedings",Parts_in_Books_or_Collections:"incollection",Editorship:"editor",Reference_Works:"reference",Data_and_Artifacts:"data",Informal_Publications:"informal",Withdrawn_Items:"withdrawn"};var x={book:"Books_and_Theses",article:"Journal_Articles",inproceedings:"Conference_and_Workshop_Papers",incollection:"Parts_in_Books_or_Collections",editor:"Editorship",reference:"Reference_Works",data:"Data_and_Artifacts",informal:"Informal_Publications",withdrawn:"Withdrawn_Items"};function q(){this.author=null;this.excludeTypeSet=new buckets.Set();this.queryInput=null;this.coauthorSet=new buckets.Set();this.venueSet=new buckets.Set();this.fromYearSelect=null;this.toYearSelect=null;this.firstYear=null;this.lastYear=null;this.getPublQuery=function(){var J=this.author;var E="author:"+J+":";var F,H;if(!this.coauthorSet.isEmpty()){F=this.coauthorSet.toArray();for(H=0;H<F.length;H++){E+=" author:"+F[H]+":"}}if(!this.venueSet.isEmpty()){F=this.venueSet.toArray();for(H=0;H<F.length;H++){E+=" venue:"+F[H]+":"}}if(!this.excludeTypeSet.isEmpty()){E+=" ";for(var G in x){if(!this.excludeTypeSet.contains(x[G])){E+="type:"+x[G]+":|"}}E=E.slice(0,-1)}if(this.queryInput!==null){var I=encoder.htmlDecode(this.queryInput.val().trim());if(I.length>0){I=I.split(/\s+/);for(H=0;H<I.length;H++){E+=" "+I[H]+"*"}}}return(E)};this.isActive=function(){if(this.excludeTypeSet.isEmpty()&&this.coauthorSet.isEmpty()&&this.venueSet.isEmpty()&&(this.queryInput===null||this.queryInput.val().trim().length==0)){return(false)}else{return(true)}}}D.RS=new q();function b(F,G){var E=F+"?";for(var H in G){E+=H+"="+G[H]+"&"}E=E.substring(0,E.length-1);return encodeURI(E)}function n(E){if(typeof E=="string"){str=E}else{str=E.toString()}return str.replace(/\B(?=(\d{3})+(?!\d))/g,",")}function w(){var E=$("#authorpage-refine");var G=E.data("lockBreakers").toArray();if(G.length>0){console.debug("clearing lock breakers",G)}for(var F=0;F<G.length;F++){clearTimeout(G[F])}E.data("lockBreakers").clear()}function l(){console.debug("start updating refine options");y();u();if(dblp.TEAM_MODE_ENABLED||dblp.MRA_MODE_ENABLED){c()}console.info("done updating refine options")}function B(){console.debug("resetting filter view to full list");var E=$("#authorpage-refine");var G=$("#publ-section");var F=$("#coauthor-section,#venue-section");G.find(".publ-list").invisible();G.find(".waiting").show();F.find(".index").invisible();F.find(".waiting").show();D.RS.excludeTypeSet.clear();D.RS.coauthorSet.clear();D.RS.venueSet.clear();E.find(".notifier").invisible();E.find("#record-info").text("showing all");E.find(".refine-by.type").find(".checkboxes").find("input").prop("checked",true);E.find(".refine-by.type").find(".checkboxes").find("label").removeClass("deselected");E.find(".refine-by.query").find(".clear").hide();E.find(".refine-by.query").find(".icon").invisible();E.find(".refine-by.query").find("input").val("");l();G.find("li.year").show();G.find("li.entry").show();G.find("li.no-pub").hide();G.find(".waiting").hide();G.find(".publ-list").visible();F.find("div.index > div").show();F.find("div.index > div > div:last-child > a").show();F.find(".no-pub").hide();G.find(".waiting").hide();G.find(".publ-list").visible();F.find(".waiting").hide();F.find(".index").visible();E.data("queryMutex",false)}function v(E,G,F){if(F==h){F=""}switch(E.which){case 1:window.location.href=dblp.BASE_URL+G+"?q="+D.RS.getPublQuery()+F;return false;case 2:window.open(dblp.BASE_URL+G+"?q="+D.RS.getPublQuery()+F,"_blank");return false;default:return true}}function o(){console.debug("start filtering publ list");var E=$("#authorpage-refine");var J=E.find(".notifier");var H=$("#publ-section");var G=$("#coauthor-section,#venue-section");if(E.data("queryMutex")){console.warn("filtering already in process, abort ajax");return(false)}else{E.data("queryMutex",true)}H.find(".publ-list").invisible();H.find(".waiting").show();G.find(".index").invisible();G.find(".waiting").show();if(!D.RS.isActive()){console.debug("no constraints for filter, abort ajax");B();return(true)}var I=setTimeout(function(){console.error("filter: received timeout while calling ajax");w();B()},7000);E.data("lockBreakers").add(I);var F=dblp.CS_PUBLS_API_URL;var K={q:D.RS.getPublQuery(),p:2,h:1000,c:0,format:"jsonp"};console.debug("calling: ",b(F,K));$.ajax({url:F,type:"GET",data:K,dataType:"jsonp"}).done(function(P,M,U){var L=P.result.hits.hit;var T=P.result.hits["@total"];var S=P.result.hits["@sent"];console.info("retrieving",S,"of",T,"hits");console.debug("result",P.result);var Q=new buckets.Set();var R,V,O;for(O=0;O<S;O++){if("urlpt" in L[O].info){Q.add(L[O].info.urlpt)}}var W=new buckets.Set(function(X){return(X.find("header").attr("id"))});var N=new buckets.Set();$.when().then(function(){H.find("li.year").hide();H.find("li.no-pub").show()}).then(function(){H.find("li.entry").each(function(){if(Q.contains($(this).attr("id"))){$(this).show();$(this).prevAll("li.year:first").show();W.add($(this).parent().parent().parent());N.add($(this).find("div.nr").text())}else{$(this).hide()}})}).then(function(){W.forEach(function(X){X.find("li.no-pub").hide()})}).then(function(){G.find("div.index > .no-pub").show();G.find("div.index > div").hide();G.find("div.index > div > div:last-child > a").each(function(){if(N.contains($(this).text())){G.find("div.index > .no-pub").hide();$(this).parent().parent().show();$(this).show()}else{$(this).hide()}})}).then(function(){var Y;var af=J.find("#refine-info-summary");var ac=J.find("#refine-info-cs-link");var aa=J.find("#refine-export-xml-link");var X=J.find("#refine-export-json-link");var ad=J.find("#refine-export-jsonp-link");var ae=J.find("#refine-export-bibtex-link");var ah=J.find("#refine-export-keys-link");E.find("#record-info").text("zoomed in on "+T+" of");J.find("#record-count").text(T);af.empty();Y=D.RS.excludeTypeSet.toArray();for(var ab=0;ab<Y.length;ab++){var Z=Y[ab].trim();var ag=Z.replace(/_/g," ").trim();af.append("<li>don't show type <em>"+unescape(ag)+"</em></li>")}if(D.RS.fromYearSelect!=D.RS.firstYear){af.append("<li>don't show before year <em>"+D.RS.fromYearSelect+"</em></li>")}if(D.RS.toYearSelect!=D.RS.lastYear){af.append("<li>don't show after year <em>"+D.RS.fromYearSelect+"</em></li>")}if(D.RS.queryInput.val().trim().length!=0){var ai=encoder.htmlEncode(D.RS.queryInput.val().trim());af.append("<li>must match prefix query <em>&quot;"+ai+"&quot;</em></li>")}Y=D.RS.coauthorSet.toArray();for(var ab=0;ab<Y.length;ab++){var Z=Y[ab].trim();var ag=Z.replace(/_/g," ").trim();af.append("<li>must involve <em>"+unescape(ag)+"</em></li>")}Y=D.RS.venueSet.toArray();for(var ab=0;ab<Y.length;ab++){var Z=Y[ab].trim();var ag=Z.replace(/_/g," ").trim();af.append("<li>must involve <em>"+unescape(ag)+"</em></li>")}ac.unbind("mouseup");ac.on("mouseup",function(aj){v(aj,"/search/publ")});aa.unbind("mouseup");aa.on("mouseup",function(aj){v(aj,"/search/publ/api","&h=1000&format=xml")});X.unbind("mouseup");X.on("mouseup",function(aj){v(aj,"/search/publ/api","&h=1000&format=json")});ad.unbind("mouseup");ad.on("mouseup",function(aj){v(aj,"/search/publ/api","&h=1000&format=jsonp")});ae.unbind("mouseup");ae.on("mouseup",function(aj){v(aj,"/search/publ/bibtex")});ah.unbind("mouseup");ah.on("mouseup",function(aj){v(aj,"/search/publ/hk")})})}).fail(function(L,N,M){console.error("filter: ["+N+"]",M)}).always(function(){console.info("done filtering publ list");J.visible();H.find(".waiting").hide();H.find(".publ-list").visible();G.find(".waiting").hide();G.find(".index").visible();E.data("lockBreakers").remove(I);clearTimeout(I);E.data("queryMutex",false);l()});return(true)}function s(){console.debug("start initializing refine-by-type options");var E='<div class="refine-by type"><p><b>refine by type</b></p><ul class="checkboxes options"></ul><ul class="checkbox-control"><li><button id="show-all-types" class="text">select all</button> | <button id="show-none-types" class="text">deselect all</button></li></ul><ul class="no-options"><li><i>no options</i></li></ul><ul class="waiting"><li><img src="'+dblp.BASE_URL+'/img/waiting.anim.gif" /></li></ul><ul class="error"><li><i>temporarily not available</i></li></ul></div>';$("#authorpage-refine").find(".hide-body").append(E);var F=$("#authorpage-refine");var L=F.find(".refine-by.type");var J=L.find(".checkboxes");var H=L.find(".checkbox-control");var K=L.find(".no-options");var N=L.find(".waiting");var M=L.find(".error");J.hide();H.show();K.hide();N.show();M.hide();L.show();H.find("#show-all-types").click(function(){if(F.data("queryMutex")){return(false)}else{J.find("input").each(function(){$(this).prop("checked",true);var P=$(this).attr("id").substring("show-".length);D.RS.excludeTypeSet.remove(x[P]);$(this).parent().find("label").removeClass("deselected")});var O=o();return(O)}});H.find("#show-none-types").click(function(){if(F.data("queryMutex")){return(false)}else{J.find("input").each(function(){$(this).prop("checked",false);var P=$(this).attr("id").substring("show-".length);D.RS.excludeTypeSet.add(x[P]);$(this).parent().find("label").addClass("deselected")});var O=o();return(O)}});var G=dblp.CS_PUBLS_API_URL;var I={q:D.RS.getPublQuery(),compl:"type",p:2,h:0,c:10,format:"jsonp"};console.debug("calling:",b(G,I));$.ajax({url:G,type:"GET",data:I,dataType:"jsonp"}).done(function(S,P,X){var Q=S.result.completions.c;var V=S.result.completions["@total"];var U=S.result.completions["@sent"];console.info("retrieving",U,"of",V,"hits");console.debug("result",S.result);var O,W,T;if(U==1){Q=[Q];H.hide()}if(U>0){Q.sort(function(ab,aa){var Z=ab.text.trim();var Y=aa.text.trim();return((e[Z]<e[Y])?-1:((e[Z]>e[Y])?1:0))});for(var R=0;R<U;R++){O=Q[R].text.substring(":facet:type:".length);W=O.replace(/_/g," ").trim();J.append('<li><input id="show-'+m[O]+'" type="checkbox" /><label for="show-'+m[O]+'">'+unescape(W)+'</label>&nbsp;<button class="text">(only)</button></li>')}J.find("input").prop("checked",true);J.find("label").css("cursor","pointer");J.show();K.hide()}else{J.hide();H.hide();K.show()}J.find("li").find("input").click(function(){var Z=$(this).attr("id").substring("show-".length);if($(this).prop("checked")){D.RS.excludeTypeSet.remove(x[Z]);$(this).parent().find("label").removeClass("deselected")}else{D.RS.excludeTypeSet.add(x[Z]);$(this).parent().find("label").addClass("deselected")}var Y=o();if(!Y){$(this).prop("checked",!$(this).prop("checked"))}return(Y)});J.find("li").find("button").click(function(){var Z=$(this).parent().find("input").attr("id");J.find("li").find("input").each(function(){if($(this).attr("id")==Z){$(this).prop("checked",true);var aa=$(this).attr("id").substring("show-".length);D.RS.excludeTypeSet.remove(x[aa]);$(this).parent().find("label").removeClass("deselected")}else{$(this).prop("checked",false);var aa=$(this).attr("id").substring("show-".length);D.RS.excludeTypeSet.add(x[aa]);$(this).parent().find("label").addClass("deselected")}});var Y=o();if(!Y){$(this).prop("checked",!$(this).prop("checked"))}return(Y)})}).fail(function(O,Q,P){console.error("type: ["+Q+"]",P);J.hide();H.hide();K.hide();M.show()}).always(function(){console.info("done initializing refine-by-type options");N.hide()})}function A(){console.debug("start initializing refine-by-year options");var E='<div class="refine-by year"><p><b>refine by year</b></p><div class="slider"><select id="show-from-year"></select> to <select id="show-to-year"></select></div><ul class="no-options"><li><i>no options</i></li></ul><ul class="waiting"><li><img src="'+dblp.BASE_URL+'/img/waiting.anim.gif" /></li></ul></div>';$("#authorpage-refine").find(".hide-body").append(E);var F=$("#authorpage-refine");var L=F.find(".refine-by.year");var G=L.find(".slider");var O=L.find("#show-from-year");var N=L.find("#show-to-year");var K=L.find(".no-options");var P=L.find(".waiting");var H=$("#publ-section");var M;var I=null;var J=null;H.find(".publ-list").each(function(){if(I===null){I=parseInt($(this).find("li.year:last").text())}else{M=parseInt($(this).find("li.year:last").text());I=(I<M)?I:M}if(J===null){J=parseInt($(this).find("li.year:first").text())}else{M=parseInt($(this).find("li.year:last").text());J=(J>M)?J:M}});for(M=J;M>=I;M--){O.append("<option>"+M+"</option>");N.append("<option>"+M+"</option>")}O.find("option:last").prop("selected",true);N.find("option:first").prop("selected",true);D.RS.fromYearSelect=O;D.RS.toYearSelect=N;D.RS.firstYear=I;D.RS.lastYear=J;K.hide();P.hide();G.show;L.show();O.find("option").click(function(){if(F.data("queryMutex")){return(false)}var Q=$(this).text();O.find("option").each(function(){if(Q==$(this).text()){$(this).prop("selected",true)}else{$(this).prop("selected",false)}});N.find("option").each(function(){if(Q>$(this).text()){$(this).hide()}else{$(this).show()}})});N.find("option").click(function(){if(F.data("queryMutex")){return(false)}var Q=$(this).text();N.find("option").each(function(){if(Q==$(this).text()){$(this).prop("selected",true)}else{$(this).prop("selected",false)}});O.find("option").each(function(){if(Q<$(this).text()){$(this).hide()}else{$(this).show()}})});K.hide();console.info("start initializing refine-by-year options")}function g(){console.debug("start initializing refine-by-query options");var H='<div class="refine-by query"><p><b>refine by search term</b></p><div><span><input /></span><img class="icon" title="filter active" alt="filter active" src="'+dblp.BASE_URL+'/img/filter-mark.12x12.png"></div></div>';$("#authorpage-refine").find(".hide-body").append(H);var F=$("#authorpage-refine");var J=F.find(".refine-by.query");var G=J.find("input");var I=J.find("img.icon");D.RS.queryInput=G;J.show();I.invisible();G.css("width",(G.innerWidth()-16)+"px");G.css("border-width","1px");G.css("padding","1px 20px 1px 1px");G.after('<img class="clear" src="'+dblp.BASE_URL+'/img/clear-mark.medium.16x16.png" alt="" title="clear"></img>');var E=J.find(".clear");E.parent("span").css("position","relative");E.css("position","absolute");E.css("cursor","pointer");E.css("top","50%");E.css("margin-top","-9px");E.css("right","4px");E.css("z-index","1");if(G.val().trim().length>0){E.show()}else{E.hide()}E.click(function(){E.hide();G.val("");G.get(0).focus();G.trigger("input")});G.on("input",function(){var K=$(this).val().trim().length;if(K===0){G.css("border-width","1px");G.css("padding","1px 20px 1px 1px");E.hide();I.invisible()}else{G.css("border-width","2px");G.css("padding","0px 19px 0px 0px");E.show();I.visible()}clearTimeout(F.data("queryTimer"));var L=setTimeout(o,dblp.UX_TYPING_QUERY_DELAY_MSECS(K));F.data("queryTimer",L)});console.info("done initializing refine-by-year options")}function y(J){if(typeof(J)==="undefined"){J=1}console.debug("start updating refine-by-author options");var E=$("#authorpage-refine");var I=E.find(".refine-by.author");var O=I.find(".options");var M=I.find(".more-options");var G=I.find(".no-options");var N=I.find(".waiting");var K=I.find(".error");O.hide();M.hide();G.hide();N.show();K.hide();I.show();var L=setTimeout(function(){console.error("author: received timeout while calling ajax");w();B()},7000);E.data("lockBreakers").add(L);var F=dblp.CS_PUBLS_API_URL;var H={q:D.RS.getPublQuery(),compl:"author",p:2,h:0,c:J*dblp.authorpage.MAX_OPTIONS_TO_SHOW+D.RS.coauthorSet.size()+1,format:"jsonp"};console.debug("calling:",b(F,H));$.ajax({url:F,type:"GET",data:H,dataType:"jsonp"}).done(function(U,R,ab){var T=U.result.completions.c;var Z=parseInt(U.result.completions["@total"]);var X=parseInt(U.result.completions["@sent"]);if(X==1){T=[T]}console.info("retrieving",X,"of",Z,"hits");console.debug("result",U.result);O.empty();var S={};for(var V=0;V<X;V++){var P=T[V].text.substring(":facet:author:".length).trim();var W=T[V]["@dc"];S[P]=parseInt(W)}var Q=function(ad){return(S[ad]?S[ad]:0)};constraint=D.RS.coauthorSet.toArray();constraint.sort(function(ae,ad){return((Q(ae)>Q(ad))?-1:((Q(ae)<Q(ad))?1:0))});for(var V=0;V<constraint.length;V++){var P=constraint[V].trim();var aa=P.replace(/_/g," ").trim();if(aa.match(/.*\s\d\d\d\d/)){aa=aa.substring(0,aa.length-4)+'<span class="homonym-nr">'+aa.substring(aa.length-4)+"</span>"}var W=Q(P);O.append('<li class="del"><img class="mark" src="'+dblp.BASE_URL+'/img/del-mark.12x12.png"><button class="text selected" value="'+P+'">'+unescape(aa)+"&nbsp;("+W+")&nbsp;&#10003;</button></li>")}var ac=J*dblp.authorpage.MAX_OPTIONS_TO_SHOW+1;if(ac>X){ac=X}for(var V=0;V<ac;V++){var P=T[V].text.substring(":facet:author:".length).trim();if(P==D.RS.author){continue}var aa=P.replace(/_/g," ").trim();if(aa.match(/.*\s\d\d\d\d/)){aa=aa.substring(0,aa.length-4)+'<span class="homonym-nr">'+aa.substring(aa.length-4)+"</span>"}var W=T[V]["@dc"];if(!D.RS.coauthorSet.contains(P)){O.append('<li class="add"><img class="mark" src="'+dblp.BASE_URL+'/img/add-mark.12x12.png"><button class="text" value="'+P+'">'+unescape(aa)+"&nbsp;("+W+")</button></li>")}}O.find("li.add").find("button").click(function(){if(E.data("queryMutex")){return(false)}else{var ae=$(this).prop("value");console.debug("clicked",ae);D.RS.coauthorSet.add(ae);var ad=o();return(ad)}});O.find("li.del").find("button").click(function(){if(E.data("queryMutex")){return(false)}else{var ae=$(this).prop("value");console.debug("clicked",ae);D.RS.coauthorSet.remove(ae);var ad=o();return(ad)}});if(!D.RS.coauthorSet.isEmpty()||X>=2){O.show();if(parseInt(Z)>ac){var Y=parseInt(Z)-X;var aa=n(Y)+" more options";if(Y==1){aa="1 more option"}M.html('<li class="more"><button class="text"><em>'+aa+"</em></button></li>");M.find("li.more").click(function(){y(J+1)});M.show()}G.hide()}else{O.hide();M.hide();G.show()}}).fail(function(P,R,Q){console.error("author: ["+R+"]",Q);K.show()}).always(function(){console.info("done updating refine-by-author options");N.hide();E.data("lockBreakers").remove(L);clearTimeout(L)})}function f(){console.debug("start initializing refine-by-author options");var G='<div class="refine-by author"><p><b>refine by coauthor</b></p><ul class="options"></ul><ul class="more-options"><li class="more"><button class="text"><em>more options</em></button></li></ul><ul class="no-options"><li><i>no options</i></li></ul><ul class="waiting"><li><img src="'+dblp.BASE_URL+'/img/waiting.anim.gif" /></li></ul><ul class="error"><li><i>temporarily not available</i></li></ul></div>';$("#authorpage-refine").find(".hide-body").append(G);var F=$("#authorpage-refine");var E=F.find(".refine-by.author");var I=E.find(".options");var K=E.find(".more-options");var J=E.find(".no-options");var L=E.find(".waiting");var H=E.find(".error");I.hide();K.hide();J.show();L.hide();H.hide();E.show();y();console.info("done initializing refine-by-author options")}function u(J){if(typeof(J)==="undefined"){J=1}console.debug("start updating refine-by-venue options");var E=$("#authorpage-refine");var H=E.find(".refine-by.venue");var O=H.find(".options");var M=H.find(".more-options");var G=H.find(".no-options");var N=H.find(".waiting");var K=H.find(".error");O.hide();M.hide();G.hide();N.show();K.hide();H.show();var L=setTimeout(function(){console.error("venue: received timeout while calling ajax");w();B()},7000);E.data("lockBreakers").add(L);var F=dblp.CS_PUBLS_API_URL;var I={q:D.RS.getPublQuery(),compl:"venue",p:2,h:0,c:J*dblp.authorpage.MAX_OPTIONS_TO_SHOW+D.RS.venueSet.size()+1,format:"jsonp"};console.debug("calling:",b(F,I));$.ajax({url:F,type:"GET",data:I,dataType:"jsonp"}).done(function(U,R,ab){var T=U.result.completions.c;var Z=parseInt(U.result.completions["@total"]);var X=parseInt(U.result.completions["@sent"]);if(X==1){T=[T]}console.info("retrieving",X,"of",Z,"hits");console.debug("result",U.result);O.empty();var S={};for(var V=0;V<X;V++){var P=T[V].text.substring(":facet:venue:".length).trim();var W=T[V]["@dc"];S[P]=parseInt(W)}var Q=function(ad){return(S[ad]?S[ad]:0)};constraint=D.RS.venueSet.toArray();constraint.sort(function(ae,ad){return((Q(ae)>Q(ad))?-1:((Q(ae)<Q(ad))?1:0))});for(var V=0;V<constraint.length;V++){var P=constraint[V];var aa=P.replace(/_/g," ").trim();var W=Q(P);O.append('<li class="del"><img class="mark" src="'+dblp.BASE_URL+'/img/del-mark.12x12.png"><button class="text selected" value="'+P+'">'+unescape(aa)+"&nbsp;("+W+")&nbsp;&#10003;</button></li>")}var ac=J*dblp.authorpage.MAX_OPTIONS_TO_SHOW+1;if(ac>X){ac=X}for(var V=0;V<ac;V++){var P=T[V].text.substring(":facet:venue:".length).trim();var aa=P.replace(/_/g," ").trim();var W=T[V]["@dc"];if(!D.RS.venueSet.contains(P)){O.append('<li class="add"><img class="mark" src="'+dblp.BASE_URL+'/img/add-mark.12x12.png"><button class="text" value="'+P+'">'+unescape(aa)+"&nbsp;("+W+")</button></li>")}}O.find("li.add").find("button").click(function(){if(E.data("queryMutex")){return(false)}else{var ae=$(this).prop("value");console.debug("clicked",ae);D.RS.venueSet.add(ae);var ad=o();return(ad)}});O.find("li.del").find("button").click(function(){if(E.data("queryMutex")){return(false)}else{var ae=$(this).prop("value");console.debug("clicked",ae);D.RS.venueSet.remove(ae);var ad=o();return(ad)}});if(!D.RS.venueSet.isEmpty()||X>0){O.show();if(parseInt(Z)>ac){var Y=parseInt(Z)-X;var aa=n(Y)+" more options";if(Y==1){aa="1 more option"}M.html('<li class="more"><button class="text"><em>'+aa+"</em></button></li>");M.find("li.more").click(function(){u(J+1)});M.show()}G.hide()}else{O.hide();M.hide();G.show()}}).fail(function(P,R,Q){console.error("venue: ["+R+"]",Q);K.show()}).always(function(){console.info("done updating refine-by-venue options");N.hide();E.data("lockBreakers").remove(L);clearTimeout(L)})}function k(){console.debug("start initializing refine-by-venue options");var F='<div class="refine-by venue"><p><b>refine by venue</b></p><ul class="options"></ul><ul class="more-options"><li class="more"><button class="text"><em>more options</em></button></li></ul><ul class="no-options"><li><i>no options</i></li></ul><ul class="waiting"><li><img src="'+dblp.BASE_URL+'/img/waiting.anim.gif" /></li></ul><ul class="error"><li><i>temporarily not available</i></li></ul></div>';$("#authorpage-refine").find(".hide-body").append(F);var E=$("#authorpage-refine");var K=E.find(".refine-by.venue");var H=K.find(".options");var J=K.find(".more-options");var I=K.find(".no-options");var L=K.find(".waiting");var G=K.find(".error");H.hide();J.hide();I.show();L.hide();G.hide();K.show();u();console.info("done initializing refine-by-venue options")}D.initRefine=function(){if($("#authorpage-refine").length==0){return}console.debug("start initializing author page filter elements");if($("#publ-section").length==0){$("#authorpage-refine").hide();return}var E=$("#headline").data("name").replace(/ /g,"_");D.RS.author=E;var F=$("#authorpage-refine");var H=F.find(".notifier");H.invisible();F.data("queryMutex",false);F.data("lockBreakers",new buckets.Set());H.find("#reset-refinements").click(function(){if(F.data("queryMutex")){return(false)}else{B();l()}});var G=dblp.CS_PUBLS_API_URL;var I={q:D.RS.getPublQuery(),p:2,h:0,c:0,format:"jsonp"};console.debug("calling:",b(G,I));$.ajax({url:G,type:"GET",data:I,dataType:"jsonp"}).done(function(L,N,K){var J=L.result.hits["@total"];console.info("retrieving a maximum of",J,"hits");H.find("#max-record-count").text(J);H.find("#record-count").text(J);F.find("#max-record-info").text(J);$("#publ-section").find("ul.publ-list").each(function(){$(this).append('<li class="no-pub"><em>no results</em></li>');$(this).find(".no-pub").hide();$(this).before('<p class="waiting"><img src="'+dblp.BASE_URL+'/img/waiting.anim.gif" /></p>');$(this).parent().find(".waiting").hide()});$("#coauthor-section,#venue-section").find("div.index").each(function(){$(this).append('<p class="no-pub"><em>no results</em></p>');$(this).find(".no-pub").hide();$(this).before('<p class="waiting"><img src="'+dblp.BASE_URL+'/img/waiting.anim.gif" /></p>');$(this).parent().find(".waiting").hide()});var M=$("nav#sorting-selector").find(".drop-down").find(".head").text().trim();g();if(M!="by type"){s()}f();k();if(D.RS.isActive()){o()}}).fail(function(J,L,K){console.error("venue: ["+L+"]",K);H.find("#max-record-count").text("??");H.find("#record-count").text("??");F.find("#max-record-info").text("??");F.find(".hide-body").append('<p><i class="warning">Service temporarily not available.</i></p><p>Please try again later.</p>')}).always(function(){console.info("done initializing author page filter elements")})};function r(J){console.debug("orcid: start filtering publ list");var I=$("#publ-section");var G=$("#coauthor-section,#venue-section");var E=$("#team-stuff");var H=E.find(".refine-by.orcid");var L=H.find(".waiting");I.find(".publ-list").invisible();I.find(".waiting").show();G.find(".index").invisible();G.find(".waiting").show();L.show();var F=dblp.CS_PUBLS_API_URL;if(J=="noorcid"){var K={q:D.RS.getPublQuery()+" tag:noorcid",p:0,h:1000,c:0,format:"jsonp"}}else{var K={q:D.RS.getPublQuery(),eid:"ORCID:"+J,p:0,h:1000,c:0,format:"jsonp"}}console.debug("calling: ",b(F,K));$.ajax({url:F,type:"GET",data:K,dataType:"jsonp"}).done(function(Q,N,U){var M=Q.result.hits.hit;var T=Q.result.hits["@total"];var S=Q.result.hits["@sent"];console.info("orcid: retrieving",S,"of",T,"hits");console.debug("orcid: result",Q.result);var R=new buckets.Set();var V=new buckets.Set(function(W){return(W.find("header").attr("id"))});var O=new buckets.Set();for(var P=0;P<S;P++){if("key" in M[P].info){R.add(M[P].info.key)}}$.when().then(function(){I.find("li.year").hide();I.find("li.no-pub").show()}).then(function(){I.find("li.entry").each(function(){if($(this).is(":visible")&&R.contains($(this).attr("id"))){$(this).show();$(this).prevAll("li.year:first").show();V.add($(this).parent().parent().parent());O.add($(this).find("div.nr").text())}else{$(this).hide()}})}).then(function(){V.forEach(function(W){W.find("li.no-pub").hide()})}).then(function(){G.find("div.index > .no-pub").show();G.find("div.index > div").hide();G.find("div.index > div > div:last-child > a").each(function(){if(O.contains($(this).text())){G.find("div.index > .no-pub").hide();$(this).parent().parent().show();$(this).show()}else{$(this).hide()}})})}).fail(function(M,O,N){console.error("orcid: ["+O+"]",N)}).always(function(){I.find(".waiting").hide();I.find(".publ-list").visible();G.find(".waiting").hide();G.find(".index").visible();L.hide();console.info("orcid: done filtering publ list")})}function c(){console.debug("start updating refine-by-orcid options");var E=$("#team-stuff");var H=E.find(".refine-by.orcid");var F=H.find(".options");var G=H.find(".no-options");F.hide();F.empty();var I=new buckets.BSTree();$("nav.head li.orcid a").each(function(){var J=$(this).attr("href");if(!J.startsWith("https://orcid.org/")){return}var K=J.substr("https://orcid.org/".length);I.add(K)});I.forEach(function(J){F.append('<li class="add"><img class="mark" src="'+dblp.BASE_URL+'/img/add-mark.12x12.png" alt="" /><button class="text" value="'+J+'">'+J+'</button><span class="check">&nbsp;&#10003;</span></li>')});if(dblp.MRA_MODE_ENABLED){F.append('<li class="add"><img class="mark" src="'+dblp.BASE_URL+'/img/add-mark.12x12.png" alt="" /><button class="text" value="noorcid">no ORCID for any author</button><span class="check">&nbsp;&#10003;</span></li>')}F.find("span.check").hide();F.find("li").click(function(){if($(this).hasClass("add")){F.find("li").removeClass("del");F.find("li").addClass("add");F.find("li").find("button").removeClass("selected");F.find("li").find("span.check").hide();F.find("li").hide();$(this).removeClass("add");$(this).addClass("del");$(this).find("button").addClass("selected");$(this).find("span.check").show();$(this).show();r($(this).find("button").val())}else{if($(this).hasClass("del")){F.find("li").removeClass("del");F.find("li").addClass("add");F.find("li").find("button").removeClass("selected");F.find("li").find("span.check").hide();o()}}});if(I.size()>0){F.show();G.hide()}console.info("done updating refine-by-orcid options")}function z(){console.debug("start initializing refine-by-orcid options");var F='<div class="refine-by orcid"><p><b>refine by ORCID</b>&nbsp;<img src="'+dblp.BASE_URL+'/img/faq-mark.dark.12x12.png" title="&#9642; note that ORCID filters do not interact properly\nwith the refinement options listed above" ></p><ul class="options"></ul><ul class="more-options"><li class="more"><button class="text"><em>more options</em></button></li></ul><ul class="no-options"><li><i>no options</i></li></ul><ul class="waiting"><li><img src="'+dblp.BASE_URL+'/img/waiting.anim.gif" /></li></ul><ul class="error"><li><i>temporarily not available</i></li></ul></div>';$("#team-stuff").find(".hide-body").prepend(F);var E=$("#team-stuff");var J=E.find(".refine-by.orcid");var H=J.find(".options");var K=J.find(".more-options");var I=J.find(".no-options");var L=J.find(".waiting");var G=J.find(".error");H.hide();K.hide();I.show();L.hide();G.hide();J.show();c();console.info("done initializing refine-by-orcid options")}D.initTeamFilters=function(){if($("#team-stuff").length==0){return}if($("#publ-section").length==0){return}$("#team-stuff").show();z()};D.initCompleteSearchLink=function(){var E=$("#headline").data("name").replace(/ /g,"_");var G=$("#headline nav.head li.search .body");var F='<p><em>view this author in</em></p><ul><li><a href="'+dblp.BASE_URL+"/search/publ?q=author:"+E+':"><img alt="" src="'+dblp.BASE_URL+'/img/dblp.dark.16x16.png" class="icon" />dblp search</a></li></ul>';G.append(F)};function d(){this.data=new buckets.Dictionary();this.indept=[];this.addData=function(E,G){var F;if(this.data.containsKey(E)){F=this.data.get(E);F.number+=1;F.score+=G}else{F={number:1,score:G}}this.data.set(E,F)};this.addIndept=function(E){this.indept.push(E)};this.getKeys=function(){return this.data.keys()};this.getScore=function(E){if(E&&this.data.containsKey(E)){var F=this.data.get(E);return(F.score/F.number)}else{throw"no such key: "+E}};this.getIndeptScores=function(){return this.indept};this.getTotalScore=function(){var E=0;var G=this.data.keys();for(var F=0;F<G.length;F++){E+=this.getScore(G[F])}for(var F=0;F<this.indept.length;F++){E+=this.indept[F]}return E}}D.CND=new d();function j(F,I){if(!F){return}var E=F.children("div").length;if(I<0||I>=E){return}var H=F.children("div:nth-child("+(I+1)+")").find(".person");var G=H.find("a").attr("href").replace("pers/hd/","pers/xx/");console.debug("calling: ",G);$.ajax({url:G,type:"GET",dataType:"xml"}).done(function(L,K,R){try{var T=H.parent().find("div.col-boxes");var S;if(T&&T.length){if(T.data("col")==-1){S="-1"}else{if(T.data("col")<9){S="group 0"+(parseInt(T.data("col"))+1)}else{S="group "+(parseInt(T.data("col"))+1)}}}else{S="-1"}var N=L.getElementsByTagName("r").length;if(N>1){N=parseInt(L.getElementsByTagName("coauthors")[0].getAttribute("nc"));var Q=L.getElementsByTagName("co");for(var M=0;M<Q.length;M++){var J=Q[M].getAttribute("c");if(J=="-1"){N++}}}var O="";var M=N;while(M>=2){O+=":";M-=2}while(M>=1){O+=".";M-=1}H.after('<div title="'+N+' communities"><small>'+O+"<small></div>");if(S=="-1"){D.CND.addIndept(N)}else{D.CND.addData(S,N)}}catch(P){console.error('coauths: errror reading "/dblpperson/coauthors[@n]" in ',G,"\n",P)}}).fail(function(J,L,K){console.error("coauths: ["+L+"]",K)}).always(function(){if(I+1<E){setTimeout(function(){j(F,I+1)},50)}else{$("#addon-section").append('<pre id="coauthor-addon-networkdata" />');var J=$("#coauthor-addon-networkdata");J.addClass("verbatim");var L=D.CND.getKeys();L.sort();J.append("community fragmentation\n");J.append("=======================\n");J.append("baseline            \t1\n");J.append("-----------------------\n");for(var K=0;K<L.length;K++){J.append("coauthor "+L[K]+":    \t"+D.CND.getScore(L[K]).toFixed(2)+"\n")}if(D.CND.getIndeptScores().length>0){J.append("independent coauthors:\t"+D.CND.getIndeptScores()+"\n")}J.append("-----------------------\n");if($("#publ-section").find(".entry").length>1){J.append("total of this author:\t"+D.CND.getTotalScore().toFixed(2))}else{J.append("score of this author:\t1")}console.info("done adding coauthors info")}})}function t(){var E=$("#coauthor-section .index");j(E,0)}function a(){this.data=new buckets.Dictionary();this.total=h;this.reference=120;this.addData=function(E,F){this.data.set(E,F)};this.getFreq=function(E){if(E&&this.data.containsKey(E)){return this.data.get(E)}else{throw"no such term: "+E}};this.setTotal=function(E){this.total=E};this.getTotal=function(){if(term&&this.data.containsKey(term)){return this.total}else{throw"no such term: "+term}};this.getTerms=function(){return this.data.keys()};this.getTfidf=function(E){if(E&&this.data.containsKey(E)){return Math.log(this.total/this.getFreq(E))}else{throw"no such term: "+E}};this.getFraction=function(E){if(E&&this.data.containsKey(E)){return this.getFreq(E)/this.total}else{throw"no such term: "+E}};this.getScore=function(E){if(E&&this.data.containsKey(E)){return Math.log(1+(this.getFreq(E)/this.reference))/Math.log(2)}else{throw"no such term: "+E}};this.getTotalScore=function(){var F=Infinity;terms=D.TFD.getTerms();for(var E=0;E<terms.length;E++){if(F>this.getScore(terms[E])){F=this.getScore(terms[E])}}return F}}D.TFD=new a();function C(G,H){if(!G){return}if(H<0||H>=G.length){return}var E=dblp.CS_NAMES_API_URL;var F={q:G[H]+"$",h:0,c:0,format:"jsonp",p:2};console.debug("calling: ",b(E,F));$.ajax({url:E,data:F,type:"GET",dataType:"jsonp"}).done(function(J,K,I){if(!/[0-9]+/.test(G[H])){D.TFD.addData(G[H],parseInt(J.result.hits["@total"]))}}).fail(function(I,K,J){console.error("nameTF: ["+K+"]",J)}).always(function(){if(H+1<G.length){setTimeout(function(){C(G,H+1)},50)}else{$("#addon-section").append('<pre id="coauthor-addon-tfidf" />');var I=$("#coauthor-addon-tfidf");I.addClass("verbatim");I.append("name ambiguity\n");I.append("==============\n");I.append("baseline:\t"+D.TFD.reference+"\t1\n");I.append("--------------\n");terms=D.TFD.getTerms();for(var J=0;J<terms.length;J++){I.append('term "'+terms[J]+'":\t'+D.TFD.getFreq(terms[J])+"\t"+D.TFD.getScore(terms[J]).toFixed(2)+"\n")}I.append("--------------\n");I.append("min of this author:\t\t"+D.TFD.getTotalScore().toFixed(2)+"\n");console.info("done adding name tf-idf info")}})}function p(){var E=dblp.CS_NAMES_API_URL;var F={q:"",h:0,c:0,format:"jsonp",p:2};console.debug("calling: ",b(E,F));$.ajax({url:E,data:F,type:"GET",dataType:"jsonp"}).done(function(I,K,H){D.TFD.setTotal(parseInt(I.result.hits["@total"]));var G=$("h1").find(".name.primary").text();var J=G.split(/[\s-]+/);C(J,0)}).fail(function(G,I,H){console.error("nameTF: ["+I+"]",H)}).always(function(){})}D.initAuthorpageAddons=function(){if($("#publ-section").length==0){return}if($("#authorpage-refine").length==0){return}var E=$("#footer");E.before('<div id="addon-section" class="section"/>');$("#addon-section").append("<header><h2>Experiemental Stuff</h2></header>");t();p()};D.initAuthorStatistics=function(){if($("#publ-section").length==0){return}if($("#author-statistics").length==0){return}$("#author-statistics").show();var G=$("#topic-word-cloud");var E=$("#headline").data("name").replace(/ /g,"_");var F=dblp.CS_CONCEPTS_INCLUDE_URL;var H={q:"author:"+E+":",c:15};console.debug("loading: ",b(F,H));G.load(b(F,H)+" .wordcloud>div",function(I,K,J){if(K=="error"){G.append('<li><em class="warning">service temporarily not available</em></li>');console.error("concepts: ["+J.status+"] "+J.statusText)}else{}})};D.initAuthorStatistics2=function(){if($("#publ-section").length==0){return}if($("#authorpage-refine").length==0){return}var F='<div id="author-statistics" class="hideable js-only"><header class="hide-head"><h2>Author statictics</h2></header><div class="hide-body hidden panel-section"><p><b>topic word cloud</b></p><div id="topic-word-cloud" class="wordcloud" /><p><small><em>(currently stemmed word rumps only)</em></small></p>';"</div></div>";$("#publ-side-panel").prepend(F);var H=$("#topic-word-cloud");var E=$("#headline").data("name").replace(/ /g,"_");var G=dblp.CS_CONCEPTS_INCLUDE_URL;var I={q:"author:"+E+":",c:15};console.debug("calling: ",b(G,I));$.ajax({url:G,type:"GET",data:I,dataType:"xml"}).done(function(K,N,L){var M=$(K).find("inc");var J=$(M.text());console.debug("concept",J);J.children().appendTo(H)}).fail(function(J,L,K){H.append('<li><em class="warning">service temporarily not available</em></li>');console.error("concepts: ["+L+"]",K)}).always(function(){console.info("done initializing author wordcloud")})};function i(){var K=250,E=250;var I=[];I.push("#606b70");for(var J=0;J<12;J++){I.push("hsl("+(50+J*150)%360+",100%,70%)")}for(var J=12;J<24;J++){I.push("hsl("+(65+J*150)%360+",100%,70%)")}var H=d3.scale.ordinal().domain(d3.range(25)).range(I);var L=d3.layout.force().charge(-120).linkDistance(40).size([K,E]);var G=d3.select("#coauthor-graph-container").append("svg").attr("width",K).attr("height",E).attr("style","border:2px dotted #cccccc;");var F=$("#headline").data("pid");d3.json(dblp.BASE_URL+"/pid/"+F+".json?view=coauthors",function(M,R){var N=R.nodes.length;var Q=R.nodes[N-1];var P=G.selectAll(".link").data(R.links).enter().append("line").attr("class","link").style("stroke-width",function(S){if(S.value<1){return 1}else{if(S.value>25){return 5}else{return Math.sqrt(S.value)}}});var O=G.selectAll(".node").data(R.nodes).enter().append("circle").attr("class","node").attr("r",function(S){if(S.publs<16){return 3}else{if(S.publs>256){return 12}else{return 0.75*Math.sqrt(S.publs)}}}).style("fill",function(S){return H(S.group)}).call(L.drag);O.append("title").text(function(S){return S.name});L.on("tick",function(){Q.x=K/2;Q.y=E/2;P.attr("x1",function(S){return S.source.x}).attr("y1",function(S){return S.source.y}).attr("x2",function(S){return S.target.x}).attr("y2",function(S){return S.target.y});O.attr("cx",function(S){return S.x}).attr("cy",function(S){return S.y})});L.nodes(R.nodes).links(R.links).start()})}D.initCoauthorGraph=function(){if($("#coauthor-section").length==0){return}var F='<div id="coauthor-graph" class="hideable js-only"><header class="hide-head"><h2>Coauthor network</h2></header><div class="hide-body hidden panel-section"><div id="coauthor-graph-container" /></div></div>';$("#coauthor-side-panel").append(F);var E=$("#coauthor-graph-container");E.html('<pre class="verbatim">click to load graph</pre>');E.click(function(){$(this).unbind("click");$(this).empty();i()})};D.init=function(){console.debug("start initializing authorpage functions");D.initRefine();if(dblp.TEAM_MODE_ENABLED||dblp.MRA_MODE_ENABLED){D.initTeamFilters()}D.initCompleteSearchLink();if(dblp.TEAM_MODE_ENABLED||dblp.MRA_MODE_ENABLED){D.initAuthorStatistics()}if(dblp.TEAM_MODE_ENABLED||dblp.LEY_MODE_ENABLED||dblp.MRA_MODE_ENABLED){D.initCoauthorGraph()}console.debug("done initializing authorpage functions")}})(dblp.authorpage);$(document).ready(dblp.authorpage.init());