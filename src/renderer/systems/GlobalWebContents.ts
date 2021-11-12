import {remote} from "electron";

export default class GlobalWebContents {
    registerContextMenu() {
        let webContents = remote.getCurrentWebContents();
        let rightClickPosition;
        const contextMenu = new remote.Menu();
        const menuItem = new remote.MenuItem
        (
            {
                label: 'Inspect Element',
                click: () => {
                    webContents.inspectElement(rightClickPosition.x, rightClickPosition.y);
                }
            }
        );
        contextMenu.append(menuItem);
        webContents.on
        (
            'context-menu',
            (event, params) => {
                rightClickPosition = {x: params.x, y: params.y};
                contextMenu.popup();
            }
        );


    }

}