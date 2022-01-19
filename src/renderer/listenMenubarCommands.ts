import {ipcRenderer} from "electron";
import VueRouter from "vue-router";


export function listenMenubarCommands(router: VueRouter) {
    ipcRenderer.on('menubar-command', async (e, commandType: number) => {


        const maps = {}

        const command = maps[commandType]
        await command();

    })

}


