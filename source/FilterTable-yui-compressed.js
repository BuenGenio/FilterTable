/*
---
description: MooTools Plugin for filtering table rows.

authors:
  - Adrian Statescu (http://thinkphp.ro)

license:
  - MIT-style license

requires:
  core/1.3: '*'

provides:
  - [FilterTable]
...
*/

var FilterTable=new Class({Implements:Options,options:{filterClass:"filterable"},initialize:function(options){this.setOptions(options);var tables=document.getElements("table");tables.each(function(table,index){if(table.attributes["class"]&&table.hasClass(this.options.filterClass)){var form=new Element("form",{"class":"filter",id:"form_"+index});var input=new Element("input",{"class":"filter",id:"filter_"+index});input.addEvent("keyup",function(){this.filterTable(input,table)}.bind(this));form.appendChild(input);table.parentNode.insertBefore(form,table)}},this)},filterTable:function(term,table){this._dehighlight(table);var terms=term.value.toLowerCase().split(" ");for(var r=1,m=table.rows.length;r<m;r++){var display="";for(var i=0,j=terms.length;i<j;i++){if(table.rows[r].innerHTML.replace(/<[^>]+>/g,"").toLowerCase().indexOf(terms[i])<0){display="none"}else{if(terms[i].length){this._highlight(terms[i],table.rows[r])}}table.rows[r].style.display=display}}},_highlight:function(term,container){for(var i=0,j=container.childNodes.length;i<j;i++){var node=container.childNodes[i];if(node.nodeType==3){var data=node.data;var data_low=data.toLowerCase();if(data_low.indexOf(term)>=0){var new_node=document.createElement("span");node.parentNode.replaceChild(new_node,node);var result;while((result=data_low.indexOf(term))!=-1){new_node.appendChild(document.createTextNode(data.substr(0,result)));new_node.appendChild(this._createNode(document.createTextNode(data.substr(result,term.length))));data=data.substr(result+term.length);data_low=data_low.substr(result+term.length)}new_node.appendChild(document.createTextNode(data))}}else{this._highlight(term,node)}}}.protect(),_dehighlight:function(container){for(var i=0,j=container.childNodes.length;i<j;i++){var node=container.childNodes[i];if(node.attributes&&node.attributes["class"]&&node.hasClass("highlighted")){node.parentNode.parentNode.replaceChild(document.createTextNode(node.parentNode.innerHTML.replace(/<[^>]+>/g,"")),node.parentNode);return}else{if(node.nodeType!=3){this._dehighlight(node)}}}},_createNode:function(child){var node=new Element("span",{"class":"highlighted"});node.appendChild(child);return node}.protect()});
