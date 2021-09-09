const { React } = require('powercord/webpack');

const ReplaceOption = require('./ReplaceOption.jsx')

module.exports = class PluginList extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            search: ''
        }
    }

    render () {
        return (
            <div>
                {
                    this.props.settings.map(setting => <ReplaceOption new='false' setting={setting} getSetting={this.props.getSetting} updateSetting={this.props.updateSetting}/>)
                }
                <ReplaceOption isNew={true} setting={{key: "", value: ""}} getSetting={this.props.getSetting} updateSetting={this.props.updateSetting}/>
            </div>
        )
    }
}
