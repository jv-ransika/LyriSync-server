const Group = require('./groupsController');
const Member = require('./membersController');

// tracking active members and groups
const members = new Map();
const groups = new Map();

// control all requests
function msgController(ws, msg) {
    let obj = JSON.parse(msg);
    let member = members.get(ws._socket.remoteAddress);

    switch (obj.action) {
        case "create_group":
            return new_group(member);
        case "new_member":
            return new_member(ws);
    }
}

// Helping functions

function new_group(host) {
    let ng = new Group(host);
    groups.set(ng.id, ng);
    host.groupHost = ng.id;
    console.log(groups)
    return ng.id
}

function new_member(ws) {
    let nm = new Member(ws);
    members.set(nm.id, nm);
    return nm.id;
}

module.exports = msgController;