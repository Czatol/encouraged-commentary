/**
* Encouraged Commentary - A comment traverser to help manage conversations on web pages.
* Copyright (c) 2009 Jim Jeffers - jim(at)donttrustthisguy(dot)com | http://donttrustthisguy.com
* Dual licensed under MIT and GPL.
* Date: 1/09/2009
* @author Jim Jeffers
* @version 1.0
*
* Intro Article:
* http://donttrustthisguy.com/2009/01/04/encouraged-commentary/ 
*
* Source:
* http://github.com/jimjeffers/encouraged-commentary/tree/master
*/
var form;var commentList;var lightbox;var lightboxBackground;var quote;var preview;var noLightbox;var noPreview;var sortedCommentary;var noRelatives;var noReplies;var noQuoteControl;var noReplyControl;$(document).ready(function(){form=$('.encouraged-form').get(0);if(form){form=$(form)}else{form=false}commentList=$($('.commentlist').get(0));sortedCommentary=commentList.hasClass('sorted-commentary');noRelatives=commentList.hasClass('no-relatives');noReplies=commentList.hasClass('no-replies');noPreview=commentList.hasClass('no-preview');noQuoteControl=commentList.hasClass('no-quote-control');noReplyControl=commentList.hasClass('no-reply-control');noLightbox=commentList.hasClass('no-lightbox');$(document.body).append("<span id=\"comment-respond\">Respond</span>");var j=$('#comment-respond');j.css('position','absolute');j.fadeTo(10,0);var k="";var l="";$('.commentlist > .comment, .quotable').each(function(){$(this).mouseup(function(e){j.css('top',e.pageY+10);j.css('left',e.pageX+10);if(getSelText()){j.show();j.fadeTo("normal",0.3);var a=findCommentFor(e.target);if(a){k=findPermalinkFor(a).href;l=findAuthorFor(a).text}else{k=false;l=false}quote=getSelText()}})});j.hover(function(){$(this).fadeTo("fast",1)},function(){$(this).fadeTo("fast",0.3)});j.mousedown(function(e){var a="";if(k&&l){a="<p><a href=\""+k+"\">@"+l+"</a>:</p>\n"}quote=a+"<blockquote>"+quote+"</blockquote>\n<p>\n";if(noLightbox||!form){if(!form){$('#comment').val(quote+"<!-- Start your comment below this line. -->\n\n</p>")}$.scrollTo('#comment',{duration:1000})}else{setupLightbox()}if(!noPreview){preview.html(quote)}addOrShowDeleteQuoteControl(a);$(this).fadeTo(1,0);j.hide()});$(document.body).mousedown(function(){j.hide()});$('.commentlist .comment a').click(function(e){var a=getAnchor(this.href);if($('.commentlist '+a).length>0){setCurrentComment(a);$.scrollTo(a,{duration:1000});return false}});var m=new Array();var n=new Array();$('.commentlist .comment p:first-child a:first-child').each(function(){if($(this).text().substring(1,-1)=="@"){var a=$(this).text().substring(1,$(this).text().length);var b=findCommentFor(this);var c=findAuthorFor(b);var d=findPermalinkFor(b);var e=getAnchor(this.href);var f='<a href="'+d.href+'">'+c.innerHTML+'</a>';var g=$('.commentlist #'+e.substr(1,e.length));if(g.length>0&&sortedCommentary){$(g.get(0)).after(b.addClass('response'))}if(!n[e]){n[e]=new Array(f)}else{n[e][n[e].length]=f}}});var o='';if(!noQuoteControl){o+='<a href="#" class="comment-quote">Quote</a>'}if(!noReplyControl){o+='<a href="#" class="comment-reply">Reply</a>'}$('.commentlist > .comment').each(function(){var c=findAuthorFor(this);var d=findPermalinkFor(this);var f=getAnchor(d.href);var g='<a href="'+d.href+'">'+d.innerHTML+'</a>';if(!m[c.text]){m[c.text]=new Array(g)}else{m[c.text][m[c.text].length]=g}$(this).append('<div class="comment-controls">'+o+'</div>');$(this).find('.comment-reply, .comment-quote').each(function(){if($(this).hasClass('comment-reply')){$(this).click(function(e){setupComment(this,false);return false})}if($(this).hasClass('comment-quote')){$(this).click(function(e){setupComment(this,true);return false})}});var h=false;var i=$($(this).find('.comment-controls'));i.hide();$(this).hover(function(){if(m[c.text].length>1||n[f]){if($(this).find('div.comment-controls div.related-replies, div.comment-controls div.related-comments').length<1){if(n[f]&&!noReplies){var b="";(n[f].length>1)?b="replies":b="reply";i.append('<div class="related-replies"><h6>'+(n[f].length)+' '+b+' to this comment</h6><ol>'+printReplies(n[f])+'</ol></div>')}if(m[c.text].length>1&&!noRelatives){var b="";(m[c.text].length-1>1)?b="comments":b="comment";i.append('<div class="related-comments"><h6>'+(m[c.text].length-1)+' other '+b+' from '+c.text+'</h6><ol>'+printRelatives(m[c.text],g)+'</ol></div>')}$(this).find('div.comment-controls ol li a').click(function(e){var a=getAnchor(this.href);setCurrentComment(a);$.scrollTo(a,{duration:1000});return false})}}if(!i.is(':visible')&&!h){h=setTimeout(function(){i.fadeIn("fast");h=false},300)}else{clearTimeout(h);h=false}},function(){if(!i.is(':visible')&&h){clearTimeout(h);h=false}else if(i.is(':visible')&&!h){h=setTimeout(function(){i.fadeOut("fast");h=false},500)}})});if(form){if(form.find('input[type="submit"]').get(0)){$(form.find('input[type="submit"]').get(0)).removeAttr("disabled")}$(form.find('input[type="submit"]').get(0)).attr("disabled",false);if(!noPreview){form.append('<div id="encouraged-preview">&nbsp;</div>');preview=$($('#encouraged-preview').get(0));var p=$($('#comment').get(0));p.keyup(function(){preview.html(quote+fixWhiteSpace(p.val()));if(p.val().length>400&&!p.hasClass('extended')){p.addClass('extended')}else if(p.val().length<400&&p.hasClass('extended')){p.removeClass('extended')}})}}if(!noLightbox){$("body").append('<div id="comment-lightbox"></div><div id="comment-lightbox-background"></div>');lightbox=$('#comment-lightbox').hide();lightboxBackground=$('#comment-lightbox-background').hide();lightboxBackground.click(hideLightbox)}if(form){form.submit(function(){$($('#comment').get(0)).val(preview.html());if(form.find('input[type="submit"]').get(0)){$(form.find('input[type="submit"]').get(0)).attr("disabled",true)};return true})}});function findCommentFor(a){a=$(a);while(!a.hasClass('comment')){if(a.hasClass('quotable')){return false}a=$(a.parent())}return a};function findPermalinkFor(a){return $(a).find('.comment-permalink').get(0)};function findAuthorFor(a){return $(a).find('.comment-author-name').get(0)};function printRelatives(a,b){var c="";var d="";for(var i=0;i<=a.length-1;i++){(a[i]==b)?d="current":d="";c+='<li class="'+d+'">'+a[i]+'</li>'};return c};function printReplies(a){var b="";for(var i=0;i<=a.length-1;i++){b+='<li>'+a[i]+'</li>'};return b};function setCurrentComment(a){$('.commentlist .current-comment').removeClass('current-comment');$($('.commentlist '+a).get(0)).addClass('current-comment')};function getAnchor(a){return'#'+a.split("#")[1]};function setupLightbox(){if(form){if(!$('#encouraged-comment-form-anchor').get(0)){lightbox.after('<a href="#" id="encouraged-comment-form-anchor"></a>')}lightbox.html(form);lightbox.append('<a href="#" id="encouraged-comment-lightbox-toggle">Close</a>');$('#encouraged-comment-lightbox-toggle').click(hideLightbox);lightbox.fadeIn("normal");lightboxBackground.show().fadeTo("slow",0.3)}};function hideLightbox(){lightbox.hide();$($('#encouraged-comment-form-anchor').get(0)).after(form);lightboxBackground.fadeOut("slow");return false};function setupComment(b,c){var d=findCommentFor(b);var e='<p><a href="'+findPermalinkFor(d).href+'">@'+findAuthorFor(d).text+'</a></p>';if(c){quote="<blockquote>";if(d.find('.entry-content > p').length>0){d.find('.entry-content > p').each(function(){var a=false;if($(this).find("a:first-child").length>0){if($($(this).find("a:first-child").get(0)).text().substring(1,-1)=="@"){a=true}}if(!a){quote+="<p>"+this.innerHTML+"</p>"}})}else{quote=d.innerHTML}quote+="</blockquote>";quote=quote.replace("\n<!-- Start your comment below this line. -->\n\n","");quote=quote.replace("\n<!-- Start your comment below this line. -->\n","");quote=quote.replace("<!-- Start your comment below this line. -->","")}else{quote=""}quote=e+quote;if(noLightbox||!form){if(noPreview){$('#comment').val(quote+"\n<p>\n<!-- Start your comment below this line. -->\n\n</p>")}$.scrollTo('#comment',{duration:1000})}else{setupLightbox()}if(!noPreview){preview.html(quote)}};function addOrShowDeleteQuoteControl(a){var b=form.find('#encouraged-comment-delete').get(0);if(a==""){a="Article"}else{if($(a).find('a').get(0)){a=$($(a).find('a').get(0)).text().replace('@','')}}if(!b){form.append('<a href="#" id="encouraged-comment-delete">Quoting: '+a+' (click to cancel)</a>');b=$(form.find('#encouraged-comment-delete').get(0));b.click(function(){$(this).hide();quote="";if(!noPreview){preview.html(fixWhiteSpace($('#comment').val()))}return false})}else{$(b).show();$(b).html("Quoting: "+a+" (click to cancel)")}};function getSelText(){var a='';if(window.getSelection){a=window.getSelection()}else if(document.getSelection){a=document.getSelection()}else if(document.selection){a=document.selection.createRange().text}else return;if(String(a).length>2){return fixWhiteSpace(a)}else{return false}};function fixWhiteSpace(a){a=String(a).replace(/\n\n/g,"</p><p>").replace(/\n/g,"<br/>");return"<p>"+a+"</p>"};