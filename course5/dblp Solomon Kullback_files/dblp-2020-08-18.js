if(!window.jQuery)throw"dblp.js: jQuery library has not been loaded.";if(!window.encoder)throw"dblp.js: encoder.js library has not been loaded.";if(!window.dblp)var dblp={};else console.warn("global dblp object already exists",window.dblp);dblp.HOST_TR="dblp.uni-trier.de";dblp.HOST_TR1="dblp1.uni-trier.de";dblp.HOST_TR2="dblp2.uni-trier.de";dblp.HOST_DAG="dblp.dagstuhl.de";dblp.HOST_MRA="dblps.uni-trier.de/~mra/dblp";dblp.HOST_TEST="dblptest.uni-trier.de";dblp.HOST_ORG="dblp.org";dblp.MIRRORS={ORG:0,TR1:1,TR2:2,DAG:3,TEST:90,MRA:99};if(/^https?:\/\/dblp.uni-trier.de/.test(document.URL)){dblp.MIRROR=dblp.MIRRORS.TR}else if(/^https?:\/\/dblp1.uni-trier.de/.test(document.URL)){dblp.MIRROR=dblp.MIRRORS.TR1}else if(/^https?:\/\/dblp2.uni-trier.de/.test(document.URL)){dblp.MIRROR=dblp.MIRRORS.TR2}else if(/^https?:\/\/dblp.dagstuhl.de/.test(document.URL)){dblp.MIRROR=dblp.MIRRORS.DAG}else if(/^https?:\/\/(136.199.55.133|dblp(3|test).uni-trier.de)/.test(document.URL)){dblp.MIRROR=dblp.MIRRORS.TEST}else if(/^https?:\/\/dblps.uni-trier.de\/(~|%7e|%7E)mra\/dblp/.test(document.URL)){dblp.MIRROR=dblp.MIRRORS.MRA}else{dblp.MIRROR=dblp.MIRRORS.ORG}if(dblp.MIRROR==dblp.MIRRORS.MRA){dblp.BASE_URL=window.location.protocol+"//"+dblp.HOST_MRA}else{dblp.BASE_URL=window.location.protocol+"//"+window.location.hostname}var csHashQueryRegex=/[^#]*#query=(.*)$/i;var csHashQueryMatch=csHashQueryRegex.exec(window.location);if(csHashQueryMatch){var newUrl;if(csHashQueryMatch[1].startsWith("author:")){newUrl=dblp.BASE_URL+"/search?q="+csHashQueryMatch[1].substring(7);newUrl=newUrl.replace(/_/g,".")}else newUrl=dblp.BASE_URL+"/search?q="+csHashQueryMatch[1];window.location.replace(newUrl)}dblp.CS_PUBLS_API_URL=dblp.BASE_URL+"/search/publ/api";dblp.CS_PUBLS_INCLUDE_URL=dblp.BASE_URL+"/search/publ/inc";dblp.CS_PUBLS_DOI_INCLUDE_URL=dblp.BASE_URL+"/search/publ/doi";dblp.CS_PUBLS_KEYS_URL=dblp.BASE_URL+"/search/publ/hk";dblp.CS_PUBLS_BIBTEX_URL=dblp.BASE_URL+"/search/publ/bibtex";dblp.CS_AUTHORS_API_URL=dblp.BASE_URL+"/search/author/api";dblp.CS_VENUES_API_URL=dblp.BASE_URL+"/search/venue/api";dblp.CS_INSTS_API_URL=dblp.BASE_URL+"/search/inst/api";dblp.CS_NAMES_API_URL=dblp.BASE_URL+"/search/name/api";dblp.CS_CONCEPTS_INCLUDE_URL=dblp.BASE_URL+"/search/concept/inc";dblp.AJAX_CONTACT_EMAIL="ajax@dblp.org";dblp.COOKIE_EXPIRES_IN_DAYS=365;dblp.COOKIE_EXPIRES_IN_SECONDS=60*60*24*dblp.COOKIE_EXPIRES_IN_DAYS;$.cookie.defaults["path"]="/";$.cookie.defaults["samesite"]="lax";if(!window.console)var console={};if(!console.log)console.log=function(){};if(!console.debug)console.debug=console.log;if(!console.info)console.info=console.debug;if(!console.warn)console.warn=console.info;if(!console.error)console.error=console.warn;dblp.LOG_LEVELS={OFF:0,ERROR:10,WARN:20,INFO:30,DEBUG:40};dblp.LOG_LEVEL=dblp.LOG_LEVELS.WARN;if(dblp.MIRROR==dblp.MIRRORS.TEST)dblp.LOG_LEVEL=dblp.LOG_LEVELS.DEBUG;if(dblp.MIRROR==dblp.MIRRORS.MRA)dblp.LOG_LEVEL=dblp.LOG_LEVELS.DEBUG;if(dblp.LOG_LEVEL<dblp.LOG_LEVELS.DEBUG)console.debug=function(){};if(dblp.LOG_LEVEL<dblp.LOG_LEVELS.INFO)console.info=function(){};if(dblp.LOG_LEVEL<dblp.LOG_LEVELS.WARN)console.warn=function(){};if(dblp.LOG_LEVEL<dblp.LOG_LEVELS.ERROR)console.error=function(){};dblp.UX_AUTOCOMPLETE_DELAY_MSECS=100;dblp.UX_TYPING_QUERY_DELAY_MSECS=function(i){if(i<3)return 1e3;else if(i<5)return 500;else return 200};console.debug("this mirror: "+dblp.MIRROR);console.debug("this base URL: "+dblp.BASE_URL);console.debug("typing query delay: "+dblp.UX_TYPING_QUERY_DELAY_MSECS+"ms");if($.cookie("dblp-team-mode")=="true"){console.info("enabling team mode");dblp.TEAM_MODE_ENABLED=true}if($.cookie("dblp-ley-mode")=="true"){console.info("enabling ley mode");dblp.LEY_MODE_ENABLED=true}if($.cookie("dblp-mra-mode")=="true"){console.info("enabling MRA mode, use at your own risk!");dblp.MRA_MODE_ENABLED=true}if($.cookie("dblp-beta-inst-mode")=="true"){console.info("enabling beta-inst mode");dblp.BETA_INST_MODE_ENABLED=true}
