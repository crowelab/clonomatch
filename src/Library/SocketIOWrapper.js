import openSocket from "socket.io-client";
import { BASE_URL } from "./Enums";

class SocketIOWrapper {
    constructor() {
        this.socket = openSocket(BASE_URL);
        this.callbacks = {}
    }

    setCallback(name, func) {
        if(name in this.callbacks) {
            this.socket.off(name, this.callbacks[name]);
        }

        this.socket.on(name, func);
        this.callbacks[name] = func;
    }

    emit(name, val) {
        this.socket.emit(name, val);
    }
}

export default SocketIOWrapper;