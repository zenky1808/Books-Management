import React from 'react';
import Search from './Search'


class Control extends React.Component {
    render() {
        return (
            <div className="row">
                <Search onSearch={ this.props.onSearch }></Search>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div className="dropdown">

                    </div>
                </div>
            </div>
        );
    }
}

export default Control;