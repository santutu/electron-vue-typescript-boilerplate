import {app, BrowserWindow, Menu} from 'electron'

const isMac = process.platform === 'darwin'


export enum MenubarCommandType {
    DummyCommand,

}


export function createMenubar(mainWindow: BrowserWindow) {
    const menu = Menu.buildFromTemplate([


                                            {
                                                label: 'File',
                                                submenu: [
                                                    {
                                                        label: 'New',
                                                        accelerator: "Ctrl+N",
                                                        registerAccelerator: true,
                                                        click: () => {
                                                            mainWindow.webContents.send(
                                                                'menubar-command',
                                                                MenubarCommandType.DummyCommand,
                                                            )
                                                        },
                                                    },
                                                    // {role: 'hide'},
                                                    {type: 'separator'},
                                                    isMac ? {role: 'close'} : {role: 'quit'},

                                                ]
                                            },
                                            {
                                                label: app.name,
                                                submenu: [
                                                    {
                                                        label: "admin@admin.com"
                                                    }
                                                ]

                                            },

                                        ])
    Menu.setApplicationMenu(menu)

    return menu;

}

