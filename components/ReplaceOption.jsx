const { React }  = require('powercord/webpack')

module.exports = class Plugin extends React.Component {
    render () {
        return (
            <div>
                <p>Replace **{this.props.setting.key}** with **{this.props.setting.value}**</p>
            </div>
        )
    }
}
