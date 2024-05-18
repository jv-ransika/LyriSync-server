class MembersController {
    constructor(ws) {
        this.id = ws._socket.remoteAddress;
        this.ip = ws._socket.remoteAddress;
        this.groupID = '';
        this.groupHost = '';
        this.ws = ws;
    }
}

module.exports = MembersController;