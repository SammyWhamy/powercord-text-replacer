const { React } = require('powercord/webpack')
const { Button } = require('powercord/components')
const { TextInput } = require('powercord/components/settings')

const ReplaceOption = require('./ReplaceOption.jsx')

module.exports = class PluginList extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            search: '',
            settings: this.props.settings
        }
    }

    render () {
        return (
            <div>
                {
                    settings.map(setting => <ReplaceOption setting={setting}/>)
                }
            </div>
        )
    }
}
