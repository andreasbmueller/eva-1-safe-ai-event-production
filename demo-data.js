/* Fictional sample data mirrored from demo-data/demo-event.json for file:// use. */
window.EVA_DEMO_DATA = {
  schemaVersion: "1.1", fictionalData: true,
  event: { eventId: "DEMO-261128-ALP", title: "Alpenlicht Collective", date: "2026-11-28", venue: "Werkhalle 17", city: "St. Gallen, Switzerland", productionLevel: "A · complex", doors: "19:30", showTime: "21:00", seatingType: "Concert seating", seatingNote: "Front three rows can be removed after soundcheck to create a small standing area.", productionStatus: "In production", eventLead: "Lea Keller" },
  contacts: [
    { id:"CNT-001", role:"Event lead", name:"Lea Keller", organization:"Werkhalle 17", email:"lea.keller@example.com", phone:"+41 00 000 00 01", preferred:"Email" },
    { id:"CNT-002", role:"Artist representative", name:"Marco Frei", organization:"Alpine Route Touring", email:"marco.frei@example.com", phone:"+41 00 000 00 02", preferred:"Email" },
    { id:"CNT-003", role:"Audio lead", name:"Nora Baumann", organization:"Werkhalle 17", email:"nora.baumann@example.com", phone:"+41 00 000 00 03", preferred:"Phone" },
    { id:"CNT-004", role:"Hospitality lead", name:"David Meier", organization:"Werkhalle 17", email:"david.meier@example.com", phone:"+41 00 000 00 04", preferred:"Email" }
  ],
  tasks: [
    { id:"ADM-001", title:"Confirm countersigned performance agreement", area:"Administration", dueDate:"2026-09-15", owner:"Lea Keller", priority:"High", status:"Completed", notes:"Fictional agreement confirmed for demo purposes." },
    { id:"AUD-001", title:"Confirm FOH console and input list", area:"Audio", dueDate:"2026-10-30", owner:"Nora Baumann", priority:"Critical", status:"Open", notes:"Artist representative requested confirmation of the available console." },
    { id:"BKL-001", title:"Confirm backline requirements", area:"Backline", dueDate:"2026-10-20", owner:"Lea Keller", priority:"High", status:"In progress", notes:"Review all detailed backline items with artist representative." },
    { id:"HOS-001", title:"Finalize rooming list", area:"Hospitality", dueDate:"2026-11-05", owner:"David Meier", priority:"Medium", status:"Open", notes:"Four single rooms and one twin room are currently expected." },
    { id:"TRA-001", title:"Confirm airport pickup", area:"Transport", dueDate:"2026-11-12", owner:"Lea Keller", priority:"Medium", status:"Open", notes:"Arrival time remains TBC." },
    { id:"STG-001", title:"Approve final stage plot", area:"Stage", dueDate:"2026-11-10", owner:"Nora Baumann", priority:"High", status:"Open", notes:"Latest version is attached to the fictional demo record." },
    { id:"PRM-001", title:"Approve event announcement copy", area:"Promotion", dueDate:"2026-09-30", owner:"Lea Keller", priority:"Low", status:"Completed", notes:"Approved." }
  ],
  subtasks: { "BKL-001": [
    ["BKL-001-01","Drum kit","Yes","Confirmed","Nora Baumann","22-inch kick, two rack toms, one floor tom.","Yes"],
    ["BKL-001-02","Hammond-style organ","TBC","Open","Lea Keller","Awaiting artist confirmation.","Yes"],
    ["BKL-001-03","Grand piano","Yes","In progress","Lea Keller","Tuning requested on show day.","Yes"],
    ["BKL-001-04","Bass amplifier","No","Not required","Nora Baumann","","No"],
    ["BKL-001-05","Guitar amplifier 1","Yes","Confirmed","Nora Baumann","Clean combo amplifier.","Yes"],
    ["BKL-001-06","Guitar amplifier 2","No","Not required","Nora Baumann","","No"],
    ["BKL-001-07","Voltage transformers","TBC","Open","Lea Keller","Confirm equipment voltage with touring party.","Yes"],
    ["BKL-001-08","Music stands","Yes","Confirmed","Nora Baumann","Five stands with lights.","Yes"],
    ["BKL-001-09","Additional requirements","TBC","Open","Lea Keller","No additional requirements reported yet.","No"]
  ].map(function(x){ return {id:x[0],item:x[1],required:x[2],status:x[3],owner:x[4],note:x[5],showSheetRelevant:x[6]}; }) },
  audit: [{ timestamp:"2026-07-18T10:00:00+02:00", action:"Demo initialized", entity:"Event DEMO-261128-ALP", before:"No local demo state", after:"Original fictional sample data loaded", initiatedBy:"System", result:"Success" }]
};
