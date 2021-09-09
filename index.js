const { Plugin } = require('powercord/entities');
const { getModule, React } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');

const Settings = require('./components/Settings');

module.exports = class TextReplacer extends Plugin {
    async startPlugin() {
        this.loadStylesheet('./style.css');

        powercord.api.settings.registerSettings(this.entityID, {
            category: this.entityID,
            label: 'Text Replacer',
            render: (props) => React.createElement(Settings, {
                main: this,
                ...props
            }),
        });

        const parentThis = this;

        function replacer(string) {
            let newString = string;
            const settings = parentThis.settings.get('keylist', []);
            for(const setting of settings) {
                newString = newString.replace(setting.key, setting.value);
            }
            return newString;
        }

        const messageEvents = await getModule(["sendMessage"]);

        inject("replacerSend", messageEvents, "sendMessage", function(args) {
            const enabled = parentThis.settings.get('enabled', true);
            const replaceInCommands = parentThis.settings.get('replaceInCommands');
            if (enabled && (replaceInCommands || !args[1].content.startsWith(powercord.api.commands.prefix))) {
                args[1].content = replacer(args[1].content);
            }
            return args;
        }, true);

        powercord.api.commands.registerCommand({
            command: 'togglereplacer',
            description: `Toggle text replacer`,
            executor: () => {
                const enabled = this.settings.get('enabled', true);
                this.settings.set('enabled', !enabled)
            }
        });
    }

    pluginWillUnload() {
        powercord.api.settings.unregisterSettings(this.entityID);
        uninject("replacerSend");
        powercord.api.commands.unregisterCommand('togglereplacer');
    }
};
