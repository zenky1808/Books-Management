import React from 'react';

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            keyword: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }
    onSearch(){
        this.props.onSearch(this.state.keyword)
    }

    onChange(event){
        let target = event.target;
        let name = target.name;
        let value = target.value;

        this.setState({
            [name] : value
        })
    }
    render() {
        let { keyword } = this.state;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        name="keyword"
                        value={ keyword }
                        onChange={ this.onChange }
                    />
                    <div className="input-group-append">
                        <button className="btn btn-outline-primary" 
                                type="button"
                                onClick={ this.onSearch }>
                            <span className="fa fa-search"></span>&nbsp;Search
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;