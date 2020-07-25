import React from 'react';
import TaskForm from './TaskForm';
import Control from './Control';
import TaskList from './TaskList';
class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            isDisplayForm: false,
            taskEditing: null,
            filter: {
                name: '',
                status: -1
            },
            keyword: ''
        }
        this.onToggleForm = this.onToggleForm.bind(this);
        this.onCloseForm = this.onCloseForm.bind(this);
        this.onShowForm = this.onShowForm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onUpdateStatus = this.onUpdateStatus.bind(this);
        this.onDelete = this.onDelete.bind(this)
        this.onEdit = this.onEdit.bind(this);
        this.onFilter = this.onFilter.bind(this);
        this.onSearch = this.onSearch.bind(this)
    }

    componentDidMount() {
        if (localStorage && localStorage.getItem('tasks')) {
            let tasks = JSON.parse(localStorage.getItem('tasks'))
            this.setState({
                tasks: tasks
            })
        }
    }

    onToggleForm() {
        if(this.state.isDisplayForm && this.state.taskEditing !== null){
            this.setState({
                isDisplayForm: true,
                taskEditing: null
            })
        }else {
            this.setState({
                isDisplayForm: !this.state.isDisplayForm,
                taskEditing: null
            })
        }
    }

    onCloseForm() {
        this.setState({
            isDisplayForm: false
        })
    }
    onShowForm() {
        this.setState({
            isDisplayForm: true
        })
    }
    onSubmit(data) {
        let { tasks } = this.state;
        if (data.id === '') {
            data.id = this.idGenerate();
            tasks.push(data);
        } else {
            let index = this.findIndex(data.id);
            tasks[index] = data
        }
        this.setState({
            tasks: tasks,
            taskEditing: null
        })
        localStorage.setItem('tasks', JSON.stringify(tasks));

    }

    idGenerate() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    onUpdateStatus(id) {
        let { tasks } = this.state;
        let index = this.findIndex(id);
        if (index !== -1) {
            tasks[index].status = !tasks[index].status;
            this.setState({
                tasks: tasks
            })
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    findIndex = (id) => {
        let { tasks } = this.state;
        let result = -1;
        tasks.forEach((task, index) => {
            if (task.id === id) {
                result = index
            }
        });
        return result;
    }

    onDelete(id) {
        let { tasks } = this.state;
        let index = this.findIndex(id);
        if (index !== -1) {
            tasks.splice(index, 1)
            this.setState({
                tasks: tasks
            })
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    onEdit(id) {
        let { tasks } = this.state;
        let index = this.findIndex(id);
        let taskEditing = tasks[index]
        this.setState({
            taskEditing: taskEditing,
        })
        this.onShowForm()
    }

    onFilter(filterName, filterStatus){
        filterStatus = parseInt(filterStatus,10);
        this.setState({
            filter: {
                name: filterName.toLowerCase(),
                status: filterStatus
            }
        })
    }

    onSearch(keyword){
        this.setState({
            keyword: keyword
        })
        console.log(keyword)
    }

    render() {
        let { tasks, isDisplayForm, taskEditing, filter, keyword } = this.state;
        if(filter){
            if(filter.name){
                tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1;
                })
            }
            tasks = tasks.filter((task) => {
                if(filter.status === -1 ){
                    return task
                }else {
                    return task.status === (filter.status === 1 ? true : false)
                }
            })
        }
        if(keyword){
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
            })
        }
        const elmTaskForm = isDisplayForm
            ? <TaskForm
                onSubmit={this.onSubmit}
                onCloseForm={this.onCloseForm}
                task={taskEditing}
            /> : ''

        return (
            <div className="container">
                <div className="text">
                    <h1>Books Management</h1>
                    <hr />
                    <div className="row">
                        <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
                            {elmTaskForm}
                        </div>
                        <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                            <button
                                type="submit"
                                className="btn btn-info add-button"
                                onClick={this.onToggleForm}>
                                <span className="fa fa-plus">&nbsp; Add Book</span>
                            </button>
                            <Control onSearch={ this.onSearch }></Control>
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <TaskList
                                        tasks={tasks}
                                        onUpdateStatus={this.onUpdateStatus}
                                        onDelete={this.onDelete}
                                        onEdit={this.onEdit}
                                        onFilter={ this.onFilter }
                                    ></TaskList>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;