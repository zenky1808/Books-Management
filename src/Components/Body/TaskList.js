import React from 'react';
import TaskItem from './TaskItem'
class TaskList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(event){
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.props.onFilter(name === 'filterName' ? value : this.state.filterName,
                             name === 'filterStatus' ? value : this.state.filterStatus)
        this.setState({
            [name]: value
        })
    }


    render() {
        let { tasks } = this.props;
        let { filterName, filterStatus } = this.state;
        let elmTasks = tasks.map((task, index) => {
            return <TaskItem 
                        key={ task.id } 
                        index={ index } 
                        task={ task }
                        onUpdateStatus= { this.props.onUpdateStatus}
                        onDelete= { this.props.onDelete }
                        onEdit = { this.props.onEdit }
                    ></TaskItem>
        })
        return (
            <table className="table table-bordered table-hover text-center">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input 
                                type="text" 
                                className="form-control"
                                name="filterName" 
                                value={ filterName }
                                onChange= { this.onChange }/>
                        </td>
                        <td>
                            <select className="form-control" 
                                    name="filterStatus"
                                    value={ filterStatus }
                                    onChange={ this.onChange }>
                                <option value="-1">All</option>
                                <option value="0">Hide</option>
                                <option value="1">Active</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    { elmTasks}
                </tbody>
            </table>
        );
    }
}

export default TaskList;