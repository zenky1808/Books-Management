import React from 'react';

class TaskItem extends React.Component {

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id)
    }

    onDelete = () => {
        this.props.onDelete(this.props.task.id)
    }

    onEdit = () => {
        this.props.onEdit(this.props.task.id)
    }

    render() {
        let {task, index} = this.props;
        return (
            <tr>
                <td>{ index + 1 }</td>
                <td>{ task.name}</td>
                <td className="text-center">
                    <span className={ task.status === true ? 'btn btn-success btn-sm' : 'btn btn-secondary btn-sm'}
                            onClick= { this.onUpdateStatus }>
                        { task.status === true ? 'Active' : 'Hide'}
                    </span>
                </td>
                <td className="text-center action">
                    <button 
                        type="button" 
                        className="btn btn-info"
                        onClick={ this.onEdit }>
                        <span className="fa fa-pencil mr-2"></span>Edit
                    </button>&nbsp;
                    <button 
                        type="button" 
                        className="btn btn-danger" 
                        onClick={ this.onDelete }>
                        <span className="fa fa-trash mr-2"></span>Delete
                    </button>
                </td>
            </tr>
        );
    }
}

export default TaskItem;