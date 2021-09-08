const { Plugin } = require('powercord/entities');
const { getModule, React } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');

const Settings = require('./components/Settings');

module.exports = class Owoify extends Plugin {
    async startPlugin() {
        powercord.api.settings.registerSettings(this.entityID, {
            category: this.entityID,
            label: 'Text Replacer',
            render: (props) => React.createElement(Settings, {
                main: this,
                ...props
            }),
        });

        // let parentThis = this;

        function replacer() {

        }

        const messageEvents = await getModule(["sendMessage"]);

        inject("replacerSend", messageEvents, "sendMessage", function(args) {
            const enabled = this.settings.get('enabled');
            const replaceInCommands = this.settings.get('replaceInCommands');
            if (enabled && (replaceInCommands || !args[1].content.startsWith(powercord.api.commands.prefix))) {
                args[1].content = replacer(args[1].content);
            }
            return args;
        }, true);

        powercord.api.commands.registerCommand({
            command: 'togglereplacer',
            description: `Toggle text replacer`,
            executor: () => this.settings.set('enabled', !this.settings.get('enabled', false)),
        });
    }

    pluginWillUnload() {
        powercord.api.settings.unregisterSettings(this.entityID);
        uninject("replacerSend");
        powercord.api.commands.unregisterCommand('togglereplacer');
    }
};
