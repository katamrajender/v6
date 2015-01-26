/*!
 * jQuery Validation Plugin v1.13.1
 *
 * http://jqueryvalidation.org/
 *
 * Copyright (c) 2014 Jörn Zaefferer
 * Released under the MIT license
 */
(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a)}else{a(jQuery)}}(function(d){d.extend(d.fn,{validate:function(e){if(!this.length){if(e&&e.debug&&window.console){console.warn("Nothing selected, can't validate, returning nothing.")}return}var f=d.data(this[0],"validator");if(f){return f}this.attr("novalidate","novalidate");f=new d.validator(e,this[0]);d.data(this[0],"validator",f);if(f.settings.onsubmit){this.validateDelegate(":submit","click",function(g){if(f.settings.submitHandler){f.submitButton=g.target}if(d(g.target).hasClass("cancel")){f.cancelSubmit=true}if(d(g.target).attr("formnovalidate")!==undefined){f.cancelSubmit=true}});this.submit(function(g){if(f.settings.debug){g.preventDefault()}function h(){var j,i;if(f.settings.submitHandler){if(f.submitButton){j=d("<input type='hidden'/>").attr("name",f.submitButton.name).val(d(f.submitButton).val()).appendTo(f.currentForm)}i=f.settings.submitHandler.call(f,f.currentForm,g);if(f.submitButton){j.remove()}if(i!==undefined){return i}return false}return true}if(f.cancelSubmit){f.cancelSubmit=false;return h()}if(f.form()){if(f.pendingRequest){f.formSubmitted=true;return false}return h()}else{f.focusInvalid();return false}})}return f},valid:function(){var f,e;if(d(this[0]).is("form")){f=this.validate().form()}else{f=true;e=d(this[0].form).validate();this.each(function(){f=e.element(this)&&f})}return f},removeAttrs:function(g){var e={},f=this;d.each(g.split(/\s/),function(h,i){e[i]=f.attr(i);f.removeAttr(i)});return e},rules:function(h,e){var j=this[0],g,l,m,i,f,k;if(h){g=d.data(j.form,"validator").settings;l=g.rules;m=d.validator.staticRules(j);switch(h){case"add":d.extend(m,d.validator.normalizeRule(e));delete m.messages;l[j.name]=m;if(e.messages){g.messages[j.name]=d.extend(g.messages[j.name],e.messages)}break;case"remove":if(!e){delete l[j.name];return m}k={};d.each(e.split(/\s/),function(n,o){k[o]=m[o];delete m[o];if(o==="required"){d(j).removeAttr("aria-required")}});return k}}i=d.validator.normalizeRules(d.extend({},d.validator.classRules(j),d.validator.attributeRules(j),d.validator.dataRules(j),d.validator.staticRules(j)),j);if(i.required){f=i.required;delete i.required;i=d.extend({required:f},i);d(j).attr("aria-required","true")}if(i.remote){f=i.remote;delete i.remote;i=d.extend(i,{remote:f})}return i}});d.extend(d.expr[":"],{blank:function(e){return !d.trim(""+d(e).val())},filled:function(e){return !!d.trim(""+d(e).val())},unchecked:function(e){return !d(e).prop("checked")}});d.validator=function(e,f){this.settings=d.extend(true,{},d.validator.defaults,e);this.currentForm=f;this.init()};d.validator.format=function(e,f){if(arguments.length===1){return function(){var g=d.makeArray(arguments);g.unshift(e);return d.validator.format.apply(this,g)}}if(arguments.length>2&&f.constructor!==Array){f=d.makeArray(arguments).slice(1)}if(f.constructor!==Array){f=[f]}d.each(f,function(g,h){e=e.replace(new RegExp("\\{"+g+"\\}","g"),function(){return h})});return e};d.extend(d.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusCleanup:false,focusInvalid:true,errorContainer:d([]),errorLabelContainer:d([]),onsubmit:true,ignore:":hidden",ignoreTitle:false,onfocusin:function(e){this.lastActive=e;if(this.settings.focusCleanup){if(this.settings.unhighlight){this.settings.unhighlight.call(this,e,this.settings.errorClass,this.settings.validClass)}this.hideThese(this.errorsFor(e))}},onfocusout:function(e){if(!this.checkable(e)&&(e.name in this.submitted||!this.optional(e))){this.element(e)}},onkeyup:function(e,f){if(f.which===9&&this.elementValue(e)===""){return}else{if(e.name in this.submitted||e===this.lastElement){this.element(e)}}},onclick:function(e){if(e.name in this.submitted){this.element(e)}else{if(e.parentNode.name in this.submitted){this.element(e.parentNode)}}},highlight:function(g,e,f){if(g.type==="radio"){this.findByName(g.name).addClass(e).removeClass(f)}else{d(g).addClass(e).removeClass(f)}},unhighlight:function(g,e,f){if(g.type==="radio"){this.findByName(g.name).removeClass(e).addClass(f)}else{d(g).removeClass(e).addClass(f)}}},setDefaults:function(e){d.extend(d.validator.defaults,e)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date ( ISO ).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:d.validator.format("Please enter no more than {0} characters."),minlength:d.validator.format("Please enter at least {0} characters."),rangelength:d.validator.format("Please enter a value between {0} and {1} characters long."),range:d.validator.format("Please enter a value between {0} and {1}."),max:d.validator.format("Please enter a value less than or equal to {0}."),min:d.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:false,prototype:{init:function(){this.labelContainer=d(this.settings.errorLabelContainer);
this.errorContext=this.labelContainer.length&&this.labelContainer||d(this.currentForm);this.containers=d(this.settings.errorContainer).add(this.settings.errorLabelContainer);this.submitted={};this.valueCache={};this.pendingRequest=0;this.pending={};this.invalid={};this.reset();var e=(this.groups={}),g;d.each(this.settings.groups,function(h,i){if(typeof i==="string"){i=i.split(/\s/)}d.each(i,function(k,j){e[j]=h})});g=this.settings.rules;d.each(g,function(h,i){g[h]=d.validator.normalizeRule(i)});function f(k){var i=d.data(this[0].form,"validator"),h="on"+k.type.replace(/^validate/,""),j=i.settings;if(j[h]&&!this.is(j.ignore)){j[h].call(i,this[0],k)}}d(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']","focusin focusout keyup",f).validateDelegate("select, option, [type='radio'], [type='checkbox']","click",f);if(this.settings.invalidHandler){d(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler)}d(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")},form:function(){this.checkForm();d.extend(this.submitted,this.errorMap);this.invalid=d.extend({},this.errorMap);if(!this.valid()){d(this.currentForm).triggerHandler("invalid-form",[this])}this.showErrors();return this.valid()},checkForm:function(){this.prepareForm();for(var e=0,f=(this.currentElements=this.elements());f[e];e++){this.check(f[e])}return this.valid()},element:function(g){var h=this.clean(g),f=this.validationTargetFor(h),e=true;this.lastElement=f;if(f===undefined){delete this.invalid[h.name]}else{this.prepareElement(f);this.currentElements=d(f);e=this.check(f)!==false;if(e){delete this.invalid[f.name]}else{this.invalid[f.name]=true}}d(g).attr("aria-invalid",!e);if(!this.numberOfInvalids()){this.toHide=this.toHide.add(this.containers)}this.showErrors();return e},showErrors:function(f){if(f){d.extend(this.errorMap,f);this.errorList=[];for(var e in f){this.errorList.push({message:f[e],element:this.findByName(e)[0]})}this.successList=d.grep(this.successList,function(g){return !(g.name in f)})}if(this.settings.showErrors){this.settings.showErrors.call(this,this.errorMap,this.errorList)}else{this.defaultShowErrors()}},resetForm:function(){if(d.fn.resetForm){d(this.currentForm).resetForm()}this.submitted={};this.lastElement=null;this.prepareForm();this.hideErrors();this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(g){var f=0,e;for(e in g){f++}return f},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(e){e.not(this.containers).text("");this.addWrapper(e).hide()},valid:function(){return this.size()===0},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid){try{d(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(f){}}},findLastActive:function(){var e=this.lastActive;return e&&d.grep(this.errorList,function(f){return f.element.name===e.name}).length===1&&e},elements:function(){var f=this,e={};return d(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled], [readonly]").not(this.settings.ignore).filter(function(){if(!this.name&&f.settings.debug&&window.console){console.error("%o has no name assigned",this)}if(this.name in e||!f.objectLength(d(this).rules())){return false}e[this.name]=true;return true})},clean:function(e){return d(e)[0]},errors:function(){var e=this.settings.errorClass.split(" ").join(".");return d(this.settings.errorElement+"."+e,this.errorContext)},reset:function(){this.successList=[];this.errorList=[];this.errorMap={};this.toShow=d([]);this.toHide=d([]);this.currentElements=d([])},prepareForm:function(){this.reset();this.toHide=this.errors().add(this.containers)},prepareElement:function(e){this.reset();this.toHide=this.errorsFor(e)},elementValue:function(f){var h,e=d(f),g=f.type;if(g==="radio"||g==="checkbox"){return d("input[name='"+f.name+"']:checked").val()}else{if(g==="number"&&typeof f.validity!=="undefined"){return f.validity.badInput?false:e.val()}}h=e.val();if(typeof h==="string"){return h.replace(/\r/g,"")}return h},check:function(h){h=this.validationTargetFor(this.clean(h));var l=d(h).rules(),j=d.map(l,function(o,e){return e}).length,m=false,g=this.elementValue(h),n,f,k;for(f in l){k={method:f,parameters:l[f]};try{n=d.validator.methods[f].call(this,g,h,k.parameters);if(n==="dependency-mismatch"&&j===1){m=true;continue}m=false;if(n==="pending"){this.toHide=this.toHide.not(this.errorsFor(h));return}if(!n){this.formatAndAdd(h,k);return false}}catch(i){if(this.settings.debug&&window.console){console.log("Exception occurred when checking element "+h.id+", check the '"+k.method+"' method.",i)
}throw i}}if(m){return}if(this.objectLength(l)){this.successList.push(h)}return true},customDataMessage:function(e,f){return d(e).data("msg"+f.charAt(0).toUpperCase()+f.substring(1).toLowerCase())||d(e).data("msg")},customMessage:function(f,g){var e=this.settings.messages[f];return e&&(e.constructor===String?e:e[g])},findDefined:function(){for(var e=0;e<arguments.length;e++){if(arguments[e]!==undefined){return arguments[e]}}return undefined},defaultMessage:function(e,f){return this.findDefined(this.customMessage(e.name,f),this.customDataMessage(e,f),!this.settings.ignoreTitle&&e.title||undefined,d.validator.messages[f],"<strong>Warning: No message defined for "+e.name+"</strong>")},formatAndAdd:function(f,h){var g=this.defaultMessage(f,h.method),e=/\$?\{(\d+)\}/g;if(typeof g==="function"){g=g.call(this,h.parameters,f)}else{if(e.test(g)){g=d.validator.format(g.replace(e,"{$1}"),h.parameters)}}this.errorList.push({message:g,element:f,method:h.method});this.errorMap[f.name]=g;this.submitted[f.name]=g},addWrapper:function(e){if(this.settings.wrapper){e=e.add(e.parent(this.settings.wrapper))}return e},defaultShowErrors:function(){var f,g,e;for(f=0;this.errorList[f];f++){e=this.errorList[f];if(this.settings.highlight){this.settings.highlight.call(this,e.element,this.settings.errorClass,this.settings.validClass)}this.showLabel(e.element,e.message)}if(this.errorList.length){this.toShow=this.toShow.add(this.containers)}if(this.settings.success){for(f=0;this.successList[f];f++){this.showLabel(this.successList[f])}}if(this.settings.unhighlight){for(f=0,g=this.validElements();g[f];f++){this.settings.unhighlight.call(this,g[f],this.settings.errorClass,this.settings.validClass)}}this.toHide=this.toHide.not(this.toShow);this.hideErrors();this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return d(this.errorList).map(function(){return this.element})},showLabel:function(i,j){var f,l,h,g=this.errorsFor(i),e=this.idOrName(i),k=d(i).attr("aria-describedby");if(g.length){g.removeClass(this.settings.validClass).addClass(this.settings.errorClass);g.html(j)}else{g=d("<"+this.settings.errorElement+">").attr("id",e+"-error").addClass(this.settings.errorClass).html(j||"");f=g;if(this.settings.wrapper){f=g.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()}if(this.labelContainer.length){this.labelContainer.append(f)}else{if(this.settings.errorPlacement){this.settings.errorPlacement(f,d(i))}else{f.insertAfter(i)}}if(g.is("label")){g.attr("for",e)}else{if(g.parents("label[for='"+e+"']").length===0){h=g.attr("id").replace(/(:|\.|\[|\])/g,"\\$1");if(!k){k=h}else{if(!k.match(new RegExp("\\b"+h+"\\b"))){k+=" "+h}}d(i).attr("aria-describedby",k);l=this.groups[i.name];if(l){d.each(this.groups,function(n,m){if(m===l){d("[name='"+n+"']",this.currentForm).attr("aria-describedby",g.attr("id"))}})}}}}if(!j&&this.settings.success){g.text("");if(typeof this.settings.success==="string"){g.addClass(this.settings.success)}else{this.settings.success(g,i)}}this.toShow=this.toShow.add(g)},errorsFor:function(g){var f=this.idOrName(g),h=d(g).attr("aria-describedby"),e="label[for='"+f+"'], label[for='"+f+"'] *";if(h){e=e+", #"+h.replace(/\s+/g,", #")}return this.errors().filter(e)},idOrName:function(e){return this.groups[e.name]||(this.checkable(e)?e.name:e.id||e.name)},validationTargetFor:function(e){if(this.checkable(e)){e=this.findByName(e.name)}return d(e).not(this.settings.ignore)[0]},checkable:function(e){return(/radio|checkbox/i).test(e.type)},findByName:function(e){return d(this.currentForm).find("[name='"+e+"']")},getLength:function(f,e){switch(e.nodeName.toLowerCase()){case"select":return d("option:selected",e).length;case"input":if(this.checkable(e)){return this.findByName(e.name).filter(":checked").length}}return f.length},depend:function(f,e){return this.dependTypes[typeof f]?this.dependTypes[typeof f](f,e):true},dependTypes:{"boolean":function(e){return e},string:function(f,e){return !!d(f,e.form).length},"function":function(f,e){return f(e)}},optional:function(e){var f=this.elementValue(e);return !d.validator.methods.required.call(this,f,e)&&"dependency-mismatch"},startRequest:function(e){if(!this.pending[e.name]){this.pendingRequest++;this.pending[e.name]=true}},stopRequest:function(e,f){this.pendingRequest--;if(this.pendingRequest<0){this.pendingRequest=0}delete this.pending[e.name];if(f&&this.pendingRequest===0&&this.formSubmitted&&this.form()){d(this.currentForm).submit();this.formSubmitted=false}else{if(!f&&this.pendingRequest===0&&this.formSubmitted){d(this.currentForm).triggerHandler("invalid-form",[this]);this.formSubmitted=false}}},previousValue:function(e){return d.data(e,"previousValue")||d.data(e,"previousValue",{old:null,valid:true,message:this.defaultMessage(e,"remote")})}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},number:{number:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(e,f){if(e.constructor===String){this.classRuleSettings[e]=f
}else{d.extend(this.classRuleSettings,e)}},classRules:function(f){var g={},e=d(f).attr("class");if(e){d.each(e.split(" "),function(){if(this in d.validator.classRuleSettings){d.extend(g,d.validator.classRuleSettings[this])}})}return g},attributeRules:function(f){var i={},e=d(f),g=f.getAttribute("type"),j,h;for(j in d.validator.methods){if(j==="required"){h=f.getAttribute(j);if(h===""){h=true}h=!!h}else{h=e.attr(j)}if(/min|max/.test(j)&&(g===null||/number|range|text/.test(g))){h=Number(h)}if(h||h===0){i[j]=h}else{if(g===j&&g!=="range"){i[j]=true}}}if(i.maxlength&&/-1|2147483647|524288/.test(i.maxlength)){delete i.maxlength}return i},dataRules:function(f){var i,g,h={},e=d(f);for(i in d.validator.methods){g=e.data("rule"+i.charAt(0).toUpperCase()+i.substring(1).toLowerCase());if(g!==undefined){h[i]=g}}return h},staticRules:function(f){var g={},e=d.data(f.form,"validator");if(e.settings.rules){g=d.validator.normalizeRule(e.settings.rules[f.name])||{}}return g},normalizeRules:function(f,e){d.each(f,function(i,h){if(h===false){delete f[i];return}if(h.param||h.depends){var g=true;switch(typeof h.depends){case"string":g=!!d(h.depends,e.form).length;break;case"function":g=h.depends.call(e,e);break}if(g){f[i]=h.param!==undefined?h.param:true}else{delete f[i]}}});d.each(f,function(g,h){f[g]=d.isFunction(h)?h(e):h});d.each(["minlength","maxlength"],function(){if(f[this]){f[this]=Number(f[this])}});d.each(["rangelength","range"],function(){var g;if(f[this]){if(d.isArray(f[this])){f[this]=[Number(f[this][0]),Number(f[this][1])]}else{if(typeof f[this]==="string"){g=f[this].replace(/[\[\]]/g,"").split(/[\s,]+/);f[this]=[Number(g[0]),Number(g[1])]}}}});if(d.validator.autoCreateRanges){if(f.min!=null&&f.max!=null){f.range=[f.min,f.max];delete f.min;delete f.max}if(f.minlength!=null&&f.maxlength!=null){f.rangelength=[f.minlength,f.maxlength];delete f.minlength;delete f.maxlength}}return f},normalizeRule:function(f){if(typeof f==="string"){var e={};d.each(f.split(/\s/),function(){e[this]=true});f=e}return f},addMethod:function(e,g,f){d.validator.methods[e]=g;d.validator.messages[e]=f!==undefined?f:d.validator.messages[e];if(g.length<3){d.validator.addClassRules(e,d.validator.normalizeRule(e))}},methods:{required:function(f,e,h){if(!this.depend(h,e)){return"dependency-mismatch"}if(e.nodeName.toLowerCase()==="select"){var g=d(e).val();return g&&g.length>0}if(this.checkable(e)){return this.getLength(f,e)>0}return d.trim(f).length>0},email:function(f,e){return this.optional(e)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(f)},url:function(f,e){return this.optional(e)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(f)},date:function(f,e){return this.optional(e)||!/Invalid|NaN/.test(new Date(f).toString())},dateISO:function(f,e){return this.optional(e)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(f)},number:function(f,e){return this.optional(e)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(f)},digits:function(f,e){return this.optional(e)||/^\d+$/.test(f)},creditcard:function(i,f){if(this.optional(f)){return"dependency-mismatch"}if(/[^0-9 \-]+/.test(i)){return false}var j=0,h=0,e=false,k,g;i=i.replace(/\D/g,"");if(i.length<13||i.length>19){return false}for(k=i.length-1;k>=0;k--){g=i.charAt(k);h=parseInt(g,10);if(e){if((h*=2)>9){h-=9}}j+=h;e=!e}return(j%10)===0},minlength:function(g,e,h){var f=d.isArray(g)?g.length:this.getLength(g,e);return this.optional(e)||f>=h},maxlength:function(g,e,h){var f=d.isArray(g)?g.length:this.getLength(g,e);return this.optional(e)||f<=h},rangelength:function(g,e,h){var f=d.isArray(g)?g.length:this.getLength(g,e);return this.optional(e)||(f>=h[0]&&f<=h[1])},min:function(f,e,g){return this.optional(e)||f>=g},max:function(f,e,g){return this.optional(e)||f<=g},range:function(f,e,g){return this.optional(e)||(f>=g[0]&&f<=g[1])
},equalTo:function(f,e,h){var g=d(h);if(this.settings.onfocusout){g.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){d(e).valid()})}return f===g.val()},remote:function(i,f,j){if(this.optional(f)){return"dependency-mismatch"}var g=this.previousValue(f),e,h;if(!this.settings.messages[f.name]){this.settings.messages[f.name]={}}g.originalMessage=this.settings.messages[f.name].remote;this.settings.messages[f.name].remote=g.message;j=typeof j==="string"&&{url:j}||j;if(g.old===i){return g.valid}g.old=i;e=this;this.startRequest(f);h={};h[f.name]=i;d.ajax(d.extend(true,{url:j,mode:"abort",port:"validate"+f.name,dataType:"json",data:h,context:e.currentForm,success:function(l){var n=l===true||l==="true",o,m,k;e.settings.messages[f.name].remote=g.originalMessage;if(n){k=e.formSubmitted;e.prepareElement(f);e.formSubmitted=k;e.successList.push(f);delete e.invalid[f.name];e.showErrors()}else{o={};m=l||e.defaultMessage(f,"remote");o[f.name]=g.message=d.isFunction(m)?m(i):m;e.invalid[f.name]=true;e.showErrors(o)}g.valid=n;e.stopRequest(f,n)}},j));return"pending"}}});d.format=function a(){throw"$.format has been deprecated. Please use $.validator.format instead."};var b={},c;if(d.ajaxPrefilter){d.ajaxPrefilter(function(g,f,h){var e=g.port;if(g.mode==="abort"){if(b[e]){b[e].abort()}b[e]=h}})}else{c=d.ajax;d.ajax=function(f){var g=("mode" in f?f:d.ajaxSettings).mode,e=("port" in f?f:d.ajaxSettings).port;if(g==="abort"){if(b[e]){b[e].abort()}b[e]=c.apply(this,arguments);return b[e]}return c.apply(this,arguments)}}d.extend(d.fn,{validateDelegate:function(g,f,e){return this.bind(f,function(h){var i=d(h.target);if(i.is(g)){return e.apply(i,arguments)}})}})}));