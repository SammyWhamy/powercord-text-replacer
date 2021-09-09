const { React }  = require('powercord/webpack')
const { Button } = require('powercord/components')
const { TextInput } = require('powercord/components/settings');

module.exports = class Plugin extends React.Component {

    constructor (props) {
        super(props)

        this.state = {
            setting: this.props.setting,
            new: !!this.props.isNew,
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.setting !== this.props.setting) {
            this.setState({
                setting: this.props.setting,
                new: this.state.new,
            });
        }
    }

    updateSetting(key, value) {
        this.setState({
            setting: {
                key,
                value,
            },
            new: this.state.new,
        });

        const settings = this.props.getSetting('keylist', []);
        const error = settings.some(setting => setting.key === key)
        if(error) return;

        if(!this.state.new) {
            const index = settings.findIndex(setting => setting === this.state.setting);
            if(index === -1) return;
            settings[index] = {key, value};
            this.props.updateSetting('keylist', settings);
        }
    }

    deleteSetting() {
        const settings = this.props.getSetting('keylist', []);
        const index = settings.findIndex(setting => setting.key === this.state.setting.key);
        settings.splice(index, 1);
        this.props.updateSetting('keylist', settings);
    }

    addSetting() {
        const settings = this.props.getSetting('keylist', []);
        const error = settings.some(setting => setting.key === this.state.setting.key);
        if(error) return;
        console.log(this.state.setting);
        settings.push(this.state.setting);
        this.props.updateSetting('keylist', settings);
    }

    getSetting() {
        return this.state.new
            ? this.state.setting
            : this.props.getSetting('keylist').find(setting => setting.key === this.state.setting.key);
    }

    render () {
        return (
            <div className="settingContainer">
                <div className="inputContainer">
                    <span className="inlineText">Replace</span>
                    <TextInput
                        placeholder="New value"
                        className='inlineInput'
                        value={this.state.setting.key}
                        onChange={val => {
                            this.updateSetting(val, this.state.setting.value);
                        }}
                    />

                    <span className="inlineText">with</span>
                    <TextInput
                        placeholder="New value"
                        className='inlineInput'
                        value={this.state.setting.value}
                        onChange={val => {
                            this.updateSetting(this.state.setting.key, val);
                        }}
                    />
                </div>
                {
                    this.state.new ?
                        <Button className="deleteButton" color={Button.Colors.BLUE} onClick={() => this.addSetting()}>
                            Create
                        </Button>
                        :
                        <Button className="deleteButton" color={Button.Colors.RED} onClick={() => this.deleteSetting()}>
                            Delete
                        </Button>
                }
            </div>
        )
    }
}
