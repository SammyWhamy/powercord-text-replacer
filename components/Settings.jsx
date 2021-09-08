const { React } = require('powercord/webpack');
const { SwitchItem } = require('powercord/components/settings');

module.exports = class TextReplaceSettings extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            enabled: this.props.getSetting('enabled', true),
        }
    }

    render() {
        return <>
            <SwitchItem
                value={this.state.enabled}
                onChange={ () => {
                    this.setState({enabled: !this.state.enabled}); this.props.toggleSetting('enabled')
                }}
            >
                Enabled text replacement
            </SwitchItem>


        </>;
    }
}
