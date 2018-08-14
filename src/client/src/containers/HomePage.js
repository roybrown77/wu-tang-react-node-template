import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route }from 'react-router-dom';
import PropTypes from 'prop-types';

import get from 'lodash/get';
import last from 'lodash/last';

import { searchHomes } from '../actions';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.handleSearchHomes = this.handleSearchHomes.bind(this);
    }

    componentDidMount() {
    }

    handleSearchHomes(zipCode) {
        this.props.searchHomes(zipCode);
    }

    render() {
        return (
            <div>
              	{'Wu-Tang React Node Template'}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const homeDomain = state.get('homeDomain').toJS();
    const dataLoading = get(homeDomain, 'dataLoading');
    const homes = get(homeDomain, 'homes', []);

    return {
        dataLoading,
        homes
    }
};

HomePage.propTypes = {
    dataLoading: PropTypes.bool,
    homes: PropTypes.array,
    searchHomes: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  searchHomes
})(HomePage);