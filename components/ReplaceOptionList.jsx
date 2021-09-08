const { React } = require('powercord/webpack')
const { Button } = require('powercord/components')
const { TextInput } = require('powercord/components/settings')

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
                    this.props.settings.map(setting => <ReplaceOption setting={setting}/>)
                }
            </div>
        )
    }
}
