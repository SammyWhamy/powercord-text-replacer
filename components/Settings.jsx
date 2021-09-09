const { React } = require('powercord/webpack');
const { SwitchItem } = require('powercord/components/settings');
const ReplaceOptionList = require('./ReplaceOptionList.jsx');

module.exports = class TextReplaceSettings extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            enabled: this.props.getSetting('enabled', true),
            keyList: this.props.getSetting('keylist', []),
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

                <ReplaceOptionList settings={this.state.keyList} getSetting={this.props.getSetting} updateSetting={this.props.updateSetting}/>
            </div>
        )
    }
}
