import React from 'react';

class TaskForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id:  '' ,
            name:  '' ,
            status:  false 
        }

        this.onCloseForm = this.onCloseForm.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClear = this.onClear.bind(this);
    }

    componentWillMount(){
        if(this.props.task){
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status
            })
        }
    }

   componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.task){
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status
            })
        } else if(!nextProps.task) {
            this.setState({
                id:  '' ,
                name:  '' ,
                status:  false 
            })
        }
    }
    onCloseForm(){
        this.props.onCloseForm()
    }

    onChange(event){
        let target = event.target;
        let name = target.name;
        let value = target.value;
        if(name === 'status'){
            value = target.value === 'true' ? true : false
        }
        this.setState({
            [name]: value
        })
    }

    onSubmit(event){
        event.preventDefault();
        this.props.onSubmit(this.state);
        this.onClear();
        this.onCloseForm();
    }

    onClear(){
        this.setState({
            name: '',
            status: false
        })
    }
    render() {
        let { id } = this.state
        return (
            <div className="cad">
                <div className="card border-success mb-3" style={{ maxWidth: "18rem" }}>
                    <div className="card-header bg-transparent border-success alert alert-danger">
                        <h5>{ id === '' ? 'Add Books' : 'Update Books'}
                            <span>
                                <i 
                                className="fa fa-times-circle text-right"
                                onClick={ this.onCloseForm }></i>
                            </span>
                        </h5>
                    </div>
                    <div className="card-body ">
                        <form onSubmit={ this.onSubmit }>
                            <div className="form-group">
                                <label>Name Books</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={ this.state.name }
                                    onChange={ this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Status</label>
                                <select
                                    className="form-control"
                                    name="status"
                                    value={ this.state.status }
                                    onChange={ this.onChange }>
                                    <option value={true}>Active</option>
                                    <option value={false}>Hide</option>
                                </select>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-success">
                                    <span className="fa fa-plus">&nbsp;Save</span>
                                </button>&emsp;
                            <button type="button" 
                                    className="btn btn-danger"
                                    onClick={ this.onClear }>
                                    <span className="fa fa-times">&nbsp;Cancel</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskForm;