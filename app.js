(function () {
  "use strict";
  var STORAGE_KEY = "eva-demo-v1-state";
  var state = loadState();
  var pendingPlan = null;
  var pendingConfirm = null;
  var pendingConfirmApproved = false;
  var lastRefreshed = new Date();

  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function isObject(value) { return value !== null && typeof value === "object" && !Array.isArray(value); }
  function hasStrings(value, keys) { return isObject(value) && keys.every(function(key){ return typeof value[key] === "string"; }); }
  function isCompatibleState(value) {
    if (!isObject(value) || value.schemaVersion !== window.EVA_DEMO_DATA.schemaVersion) return false;
    if (!hasStrings(value.event, ["eventId","title","date","venue","city","productionLevel","doors","showTime","seatingType","seatingNote","productionStatus","eventLead"])) return false;
    if (!Array.isArray(value.tasks) || !value.tasks.length || !value.tasks.every(function(item){ return hasStrings(item,["id","title","area","dueDate","owner","priority","status","notes"]); })) return false;
    if (!Array.isArray(value.contacts) || !value.contacts.length || !value.contacts.every(function(item){ return hasStrings(item,["id","role","name","organization","email","phone","preferred"]); })) return false;
    if (!isObject(value.subtasks) || !Array.isArray(value.subtasks["BKL-001"]) || !value.subtasks["BKL-001"].length || !value.subtasks["BKL-001"].every(function(item){ return hasStrings(item,["id","item","required","status","owner","note","showSheetRelevant"]); })) return false;
    if (!Array.isArray(value.audit) || !value.audit.length || !value.audit.every(function(item){ return hasStrings(item,["timestamp","action","entity","before","after","initiatedBy","result"]); })) return false;
    return true;
  }
  function recoveredState(reason) {
    var fallback = clone(window.EVA_DEMO_DATA);
    fallback.audit.push({timestamp:new Date().toISOString(),action:"Local demo state recovered",entity:"EVA demo localStorage",before:reason,after:"Original fictional sample data restored",initiatedBy:"System",result:"Success"});
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(fallback)); } catch (storageError) { /* The in-memory fallback remains usable. */ }
    return fallback;
  }
  function loadState() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return clone(window.EVA_DEMO_DATA);
      var parsed = JSON.parse(saved);
      return isCompatibleState(parsed) ? parsed : recoveredState("Incompatible stored demo structure");
    } catch (error) { return recoveredState("Unreadable stored demo state"); }
  }
  function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function byId(id) { return document.getElementById(id); }
  function formatDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return value || "—";
    var parts = value.split("-");
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2])).toLocaleDateString("en-GB", {day:"numeric",month:"short",year:"numeric"});
  }
  function stamp() { return new Date().toISOString(); }
  function audit(action, entity, before, after, result) {
    state.audit.push({timestamp:stamp(),action:action,entity:entity,before:before,after:after,initiatedBy:"Demo user",result:result || "Success"});
  }
  function announce(message) {
    var notice = byId("notice"); notice.textContent = message; notice.hidden = false;
    window.clearTimeout(announce.timer); announce.timer = window.setTimeout(function(){ notice.hidden = true; }, 5000);
  }
  function setText(id, value) { byId(id).textContent = value; }

  function renderHeader() {
    var e = state.event;
    setText("event-title", e.title); setText("event-id", e.eventId); setText("seating-note", e.seatingNote);
    var facts = [["Date",formatDate(e.date)],["Venue",e.venue+", "+e.city],["Production level",e.productionLevel],["Doors",e.doors],["Show time",e.showTime],["Seating type",e.seatingType],["Status",e.productionStatus]];
    var dl = byId("event-facts"); dl.replaceChildren();
    facts.forEach(function(f){ var wrap=el("div"),dt=el("dt",null,f[0]),dd=el("dd",null,f[1]); wrap.append(dt,dd); dl.append(wrap); });
    byId("last-refreshed").dateTime = lastRefreshed.toISOString();
    setText("last-refreshed", lastRefreshed.toLocaleString("en-GB",{dateStyle:"medium",timeStyle:"short"}));
  }
  function summary() {
    var completed = state.tasks.filter(function(t){return t.status === "Completed";});
    var open = state.tasks.length-completed.length;
    var critical = state.tasks.filter(function(t){return t.priority === "Critical" && t.status !== "Completed";}).length;
    var eventDate = new Date(state.event.date+"T12:00:00");
    var weekStart = new Date(eventDate); weekStart.setDate(eventDate.getDate()-7);
    var dueWeek = state.tasks.filter(function(t){var d=new Date(t.dueDate+"T12:00:00"); return t.status!=="Completed" && d>=weekStart && d<=eventDate;}).length;
    var upcoming = state.tasks.filter(function(t){return t.status!=="Completed";}).sort(function(a,b){return a.dueDate.localeCompare(b.dueDate);})[0];
    return {open:open,completed:completed.length,critical:critical,dueWeek:dueWeek,next:upcoming,readiness:Math.round(completed.length/state.tasks.length*100)};
  }
  function renderOverview() {
    var s=summary(), metrics=[[s.open,"Open tasks"],[s.dueWeek,"Due in final week"],[s.critical,"Critical tasks"],[s.completed,"Completed tasks"]];
    var box=byId("metrics"); box.replaceChildren();
    metrics.forEach(function(m){var card=el("article","metric"),strong=el("strong",null,String(m[0])),span=el("span",null,m[1]);card.append(strong,span);box.append(card);});
    var nd=byId("next-deadline"); nd.replaceChildren();
    if(s.next){nd.append(el("strong",null,formatDate(s.next.dueDate)),el("p",null,s.next.id+" — "+s.next.title));}else nd.textContent="All tasks completed.";
    var owners=[]; state.tasks.forEach(function(t){if(owners.indexOf(t.owner)<0)owners.push(t.owner);});
    byId("team").textContent=owners.join(" · ");
    var readiness=byId("readiness"); readiness.replaceChildren();
    var label=el("p",null,s.readiness+"% task completion · "+(s.critical?"Attention required":"On track"));
    var bar=el("div","readiness-bar"); bar.setAttribute("role","progressbar");bar.setAttribute("aria-valuenow",String(s.readiness));bar.setAttribute("aria-valuemin","0");bar.setAttribute("aria-valuemax","100");
    var fill=el("span");fill.style.width=s.readiness+"%";bar.append(fill);readiness.append(label,bar);
  }
  function option(select,value){var o=el("option",null,value);o.value=value;select.append(o);}
  function initFilters(){
    [["filter-status","status"],["filter-area","area"],["filter-priority","priority"]].forEach(function(pair){var values=[];state.tasks.forEach(function(t){if(values.indexOf(t[pair[1]])<0)values.push(t[pair[1]]);});values.sort().forEach(function(v){option(byId(pair[0]),v);});});
  }
  function renderTasks(){
    var filters={status:byId("filter-status").value,area:byId("filter-area").value,priority:byId("filter-priority").value};
    var list=byId("task-list");list.replaceChildren();
    state.tasks.filter(function(t){return (!filters.status||t.status===filters.status)&&(!filters.area||t.area===filters.area)&&(!filters.priority||t.priority===filters.priority);}).forEach(function(t){
      var card=el("article","task"),body=el("div"),title=el("h3",null,t.id+" — "+t.title),meta=el("div","task-meta");
      [["Area",t.area],["Due",formatDate(t.dueDate)],["Owner",t.owner],["Priority",t.priority],["Status",t.status]].forEach(function(x){meta.append(el("span",(x[1]==="Critical"?"critical ":"")+(x[1]==="Completed"?"completed ":"")+"badge",x[0]+": "+x[1]));});
      body.append(title,meta,el("p",null,t.notes));var actions=el("div","task-actions");var button=el("button",null,t.status==="Completed"?"Reopen task":"Mark complete");button.dataset.taskId=t.id;button.dataset.action=t.status==="Completed"?"reopen":"complete";actions.append(button);card.append(body,actions);list.append(card);
    });
  }
  function field(labelText,type,value,key,options){var label=el("label",null,labelText),input;if(options){input=el("select");options.forEach(function(v){option(input,v);});input.value=value;}else{input=el(type==="textarea"?"textarea":"input");if(type!=="textarea")input.type=type;input.value=value;}input.name=key;label.append(input);return label;}
  function renderSubtasks(){var list=byId("subtask-list");list.replaceChildren();state.subtasks["BKL-001"].forEach(function(s){var card=el("fieldset","subtask"),legend=el("legend",null,s.id+" — "+s.item),fields=el("div","subtask-fields");fields.append(field("Required","select",s.required,s.id+"|required",["Yes","No","TBC"]),field("Status","select",s.status,s.id+"|status",["Open","In progress","Confirmed","Not required"]),field("Owner","text",s.owner,s.id+"|owner"),field("Note","textarea",s.note,s.id+"|note"),field("Show-sheet relevant","select",s.showSheetRelevant,s.id+"|showSheetRelevant",["Yes","No"]));card.append(legend,fields);list.append(card);});}
  function renderContacts(){var list=byId("contact-list");list.replaceChildren();state.contacts.forEach(function(c){var card=el("article","contact");card.append(el("p","kicker",c.role),el("h3",null,c.name),el("p",null,c.organization));var email=el("a",null,c.email);email.href="mailto:"+c.email;var phone=el("p",null,c.phone+" · Prefers "+c.preferred);card.append(email,phone);list.append(card);});}
  function renderAudit(){var list=byId("audit-list");list.replaceChildren();state.audit.slice().reverse().forEach(function(a){var card=el("article","audit-entry"),head=el("h3",null,a.action+" · "+a.result),meta=el("p",null,new Date(a.timestamp).toLocaleString("en-GB")+" · "+a.entity+" · Initiated by "+a.initiatedBy),details=el("div","audit-details");details.append(el("p",null,"Before: "+a.before),el("p",null,"After: "+a.after));card.append(head,meta,details);list.append(card);});}
  function renderAll(){renderHeader();renderOverview();renderTasks();renderSubtasks();renderContacts();renderAudit();}

  function showView(id){document.querySelectorAll(".view").forEach(function(v){v.classList.toggle("active",v.id===id);});document.querySelectorAll(".tabs button").forEach(function(b){b.setAttribute("aria-selected",String(b.dataset.view===id));});byId(id).querySelector("h2").focus({preventScroll:true});}
  function confirmAction(title,text,callback,confirmLabel){var dialog=byId("confirm-dialog");pendingConfirm=callback;pendingConfirmApproved=false;dialog.returnValue="";setText("confirm-title",title);setText("confirm-text",text);setText("confirm-action",confirmLabel||"Confirm");dialog.showModal();}
  function changeTask(id,action){
    var task=state.tasks.find(function(t){return t.id===id;});if(!task)return;
    var target=action==="complete"?"Completed":"Open";
    if(task.status===target){announce("No change needed: "+id+" is already "+target.toLowerCase()+".");return;}
    confirmAction(action==="complete"?"Mark task complete?":"Reopen task?","Confirm "+id+" — "+task.title+". Only this task will change.",function(){var before=task.status;task.status=target;audit(action==="complete"?"Task completed":"Task reopened","Task "+task.id,"Status: "+before,"Status: "+target);saveState();lastRefreshed=new Date();renderAll();announce(task.id+" was "+(action==="complete"?"marked complete.":"reopened."));},action==="complete"?"Mark complete":"Reopen task");
  }
  function openEventEditor(){
    var definitions=[["Event name","text","title"],["Date","date","date"],["Venue","text","venue"],["City","text","city"],["Production level","text","productionLevel"],["Doors","time","doors"],["Show time","time","showTime"],["Seating type","text","seatingType"],["Seating note","textarea","seatingNote"],["Production status","text","productionStatus"]];
    var box=byId("event-fields");box.replaceChildren();definitions.forEach(function(d){var f=field(d[0],d[1],state.event[d[2]],d[2]);if(d[2]==="title"||d[2]==="date"||d[2]==="venue")f.lastChild.required=true;box.append(f);});byId("event-dialog").showModal();
  }
  function collectChanges(form,source,entityLabel){var changes=[];new FormData(form).forEach(function(value,key){if(String(source[key])!==String(value))changes.push({key:key,label:key,before:String(source[key]),after:String(value),entity:entityLabel});});return changes;}
  function showPlan(type,changes){if(!changes.length){announce("No changes to plan.");return;}pendingPlan={type:type,changes:changes};var preview=byId("plan-preview");preview.replaceChildren();changes.forEach(function(c){var row=el("div","change");row.append(el("strong",null,c.entity+" · "+humanize(c.label)),el("del",null,"Before: "+(c.before||"(empty)")),el("ins",null,"After: "+(c.after||"(empty)")));preview.append(row);});byId("approve-plan").checked=false;byId("apply-plan").disabled=true;byId("plan-dialog").showModal();}
  function humanize(value){return value.replace(/([A-Z])/g," $1").replace(/^./,function(x){return x.toUpperCase();});}
  function createSubtaskPlan(form){var changes=[];new FormData(form).forEach(function(value,key){var parts=key.split("|"),item=state.subtasks["BKL-001"].find(function(s){return s.id===parts[0];});if(item&&String(item[parts[1]])!==String(value))changes.push({id:item.id,key:parts[1],label:parts[1],before:String(item[parts[1]]),after:String(value),entity:item.id+" — "+item.item});});showPlan("subtask",changes);}
  function applyPlan(){
    if(!pendingPlan||!byId("approve-plan").checked)return;
    var descriptions=[];
    pendingPlan.changes.forEach(function(c){if(pendingPlan.type==="event")state.event[c.key]=c.after;else{var item=state.subtasks["BKL-001"].find(function(s){return s.id===c.id;});if(item)item[c.key]=c.after;}descriptions.push(humanize(c.label)+": "+(c.before||"(empty)")+" → "+(c.after||"(empty)"));});
    audit(pendingPlan.type==="event"?"Event details updated":"Backline plan applied",pendingPlan.type==="event"?"Event "+state.event.eventId:"Task BKL-001",pendingPlan.changes.map(function(c){return humanize(c.label)+": "+(c.before||"(empty)");}).join("; "),pendingPlan.changes.map(function(c){return humanize(c.label)+": "+(c.after||"(empty)");}).join("; "));
    saveState();lastRefreshed=new Date();byId("plan-dialog").close();pendingPlan=null;renderAll();announce("Approved plan applied successfully. "+descriptions.length+" field"+(descriptions.length===1?"":"s")+" changed.");
  }
  function resetDemo(){confirmAction("Reset fictional demo?","This restores the original fictional sample data in this browser only. No files are touched.",function(){state=clone(window.EVA_DEMO_DATA);localStorage.setItem(STORAGE_KEY,JSON.stringify(state));lastRefreshed=new Date();document.querySelectorAll("#task-filters select").forEach(function(s){s.value="";});renderAll();announce("Demo reset to original fictional sample data.");},"Reset demo");}
  function bind(){
    document.querySelectorAll(".tabs button").forEach(function(b){b.addEventListener("click",function(){showView(b.dataset.view);});});
    byId("task-filters").addEventListener("change",renderTasks);byId("task-filters").addEventListener("reset",function(){window.setTimeout(renderTasks,0);});
    byId("task-list").addEventListener("click",function(e){var b=e.target.closest("button[data-task-id]");if(b)changeTask(b.dataset.taskId,b.dataset.action);});
    byId("confirm-action").addEventListener("click",function(){pendingConfirmApproved=true;});
    byId("confirm-dialog").addEventListener("cancel",function(){pendingConfirmApproved=false;});
    byId("confirm-dialog").addEventListener("close",function(){var callback=pendingConfirm,approved=pendingConfirmApproved&&byId("confirm-dialog").returnValue==="confirm";pendingConfirm=null;pendingConfirmApproved=false;if(approved&&callback)callback();});
    byId("update-dashboard").addEventListener("click",function(){lastRefreshed=new Date();audit("Dashboard refreshed","Event "+state.event.eventId,"Current local state","Summaries recalculated; no event or task values changed");saveState();renderAll();announce("Dashboard summaries updated without changing production data.");});
    byId("edit-event").addEventListener("click",openEventEditor);byId("reset-demo").addEventListener("click",resetDemo);
    document.querySelectorAll("[data-close]").forEach(function(b){b.addEventListener("click",function(){byId(b.dataset.close).close();});});
    byId("event-form").addEventListener("submit",function(e){e.preventDefault();if(!e.currentTarget.reportValidity())return;var changes=collectChanges(e.currentTarget,state.event,"Event header");byId("event-dialog").close();showPlan("event",changes);});
    byId("subtask-form").addEventListener("submit",function(e){e.preventDefault();createSubtaskPlan(e.currentTarget);});
    byId("cancel-subtask-draft").addEventListener("click",function(){renderSubtasks();announce("Subtask draft cancelled. Stored data was not changed.");});
    byId("approve-plan").addEventListener("change",function(){byId("apply-plan").disabled=!this.checked;});byId("apply-plan").addEventListener("click",applyPlan);byId("cancel-plan").addEventListener("click",function(){pendingPlan=null;byId("plan-dialog").close();renderSubtasks();announce("Plan cancelled. Stored data was not changed.");});
  }
  initFilters();bind();renderAll();
}());
