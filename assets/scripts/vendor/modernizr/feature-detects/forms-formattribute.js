Modernizr.addTest("formattribute",function(){var attr,form=document.createElement("form"),input=document.createElement("input"),div=document.createElement("div"),id="formtest"+(new Date).getTime(),bool=!1;return form.id=id,document.createAttribute&&(attr=document.createAttribute("form"),attr.nodeValue=id,input.setAttributeNode(attr),div.appendChild(form),div.appendChild(input),document.documentElement.appendChild(div),bool=1===form.elements.length&&input.form==form,div.parentNode.removeChild(div)),bool});