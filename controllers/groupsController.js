const {createHash} = require('crypto');


class GroupController {
    constructor(host) {
        this.id = createHash('sha256').update(`${Date.now()}${host.ip}`).digest('base64').toString();
        this.host = host.id;
        this.members = [];
    }

    add_member(member) {
        this.members.push(member.id);
    }
}

module.exports = GroupController;