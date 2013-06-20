/**
 * Neuron Client for GA Conductor
 */
"use strict"
DP.provide(["io/jsonp","event/live","util/json"],function(D,JSONP,Live,JSON){
    var $ = D.DOM;
    var SCRIPT_NODE = $("#ga-conductor");
    var attrs = {n:"{n}"};
    var funcs = {};

    function getDataAttrs(elem){
        elem = $(elem);
        var node = elem.el(0);
        var attrs = {},attr;
        var dataset = [];
        for (var i=0, node_attrs=node.attributes, l=node_attrs.length; i<l; i++){
            attr = node_attrs.item(i).nodeName;
            if(attr.indexOf("data-") == 0){
                dataset.push(attr);
            }
        }   
        dataset.forEach(function(k){
            attrs[k.split("data-")[1]] = elem.attr(k);
        });
        return attrs;
    }

    D.mix(attrs,getDataAttrs(SCRIPT_NODE)); 

    function appendRule(rule){
        var key = D.sub(rule.key,attrs);
        var action = rule.action;
        var cb = rule.cb;
        var delegate = rule.delegate;
        var parent = rule.parent;
        var selector = rule.selector;
        var els = $.all([parent,selector].join(" "));

        function logCurrent(){
            var n = els.el().indexOf(this) + 1;
            var func = funcs[cb] || dpga;
            var node_attrs = getDataAttrs(this);
            var att = {index:n}
            D.mix(att,attrs);
            D.mix(att,node_attrs);
            func.call(this,D.sub(key,{n:n}),action,att);
        }


        if(action == "hover"){
            action = "mouseenter";
        }

        if(action == "show" && els.count()){
            els.forEach(function(el){
                logCurrent.call(el)
            });
        }else{
            if(delegate){
                Live.on(parent,action,selector,logCurrent);   
            }else{
                els.on(action,logCurrent);
            }
        }
    }

    new JSONP({
        url:"http://conductor.dianping.com/api/page/"+attrs["pagekey"]
    }).on("success",function(json){
        var config,callback;

        try{
            callback = JSON.parse(json.callback);
            for(var cb in callback){
                funcs[cb] = new Function("key,action,attrs",callback[cb]);
            }
        }catch(e){}
        
        try{
            config = JSON.parse(json.config);
            config.pv && dpga(config.pv);
            config.rules.forEach(appendRule);
        }catch(e){}

    }).send();
});
