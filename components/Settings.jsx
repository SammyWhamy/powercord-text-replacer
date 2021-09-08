const { React } = require('powercord/webpack');
const { SwitchItem, TextInput } = require('powercord/components/settings');
const ReplaceOptionList = require('./ReplaceOptionList.jsx');

module.exports = class TextReplaceSettings extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            enabled: this.props.getSetting('enabled', true),
            keyList: this.props.getSetting('keylist', [{key: "test", value: "testing"}]),
        }
    }

    render() {
        return (
            <div>
                <SwitchItem
                    value={this.state.enabled}
                    onChange={ () => {
                        this.setState({enabled: !this.state.enabled}); this.props.toggleSetting('enabled')
                    }}
                >
                    Enabled text replacement
                </SwitchItem>

                <ReplaceOptionList settings={this.state.keyList}/>
            </div>
        )
    }
}
