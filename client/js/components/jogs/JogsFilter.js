import React from "react";
import isEmpty from "lodash/isEmpty";
import styles from "./styles.scss";

class JogsFilter extends React.Component {

  constructor(props) {
    super(props)
    this.submitFilter = this.submitFilter.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
    this.state = {
      errors: {}
    }
  }

  validate(params) {
    let errors = {}
    if(!params.from){
      errors["from"] = "Please enter Date From";
    }
    if(!params.to){
      errors["to"] = "Please enter Date To";
    }
    if( params.from && params.to && params.from > params.to) {
      errors["to"] = "Date To must be after Date From";
    }

    return errors;
  }

  submitFilter(e) {
    let params = {
      from: this.refs.dateFrom.value,
      to: this.refs.dateTo.value
    };

    let errors = this.validate(params);

    if(isEmpty(errors)){
      this.setState({ errors: {} })
      this.props.onSubmitFilter(params);
    } else {
      this.setState({ errors: errors })
    }
  }

  resetFilter(e) {
    e.preventDefault();

    this.refs.dateFrom.value = ""
    this.refs.dateTo.value = ""
    this.setState({ errors: {} })
    this.props.onResetFilter();
  }

  errorsFor(attribute) {
    return (
      <div className={ styles.error }>
        { this.state.errors && this.state.errors[attribute] }
      </div>
    )
  }

  render () {
    return (
      <div className={ styles.filters }>
        <h2>Filter</h2>
        <div>
          <label>From</label>
          <input type="date" ref="dateFrom" />
          { this.errorsFor("from") }
        </div>
        <div>
          <label>To</label>
          <input type="date" ref="dateTo" />
          { this.errorsFor("to") }
        </div>
        <div>
          <button onClick={ this.submitFilter } className={ styles.filterButton }>Filter</button>
          <br />
          <a href="#" onClick={ this.resetFilter }>Reset Filters</a>
        </div>
      </div>
    )
  }
}

export default JogsFilter;
