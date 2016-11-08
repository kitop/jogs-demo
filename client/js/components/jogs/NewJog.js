import React from "react";
import { isEmpty } from "lodash";
import styles from "./new_jog.scss";

class NewJog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: props.errors || {}
    }
  }

  submitJog(e) {
    e.preventDefault();

    let params = {
      date: this.refs.date.value,
      distance: this.formattedDistance(),
      duration: this.formattedDuration(),
    }

    let errors = this.validate(params)
    if(isEmpty(errors)) {
      this.props.onSubmitJog(params)
      this.setState({ errors: {} })
      this.refs.date.value = "";
      this.refs.distance.value = "";
      this.refs.duration.value = "";
    } else {
      this.setState({ errors: errors })
    }
  }

  formattedDistance() {
    let parsed = parseFloat(this.refs.distance.value) || 0
    return parsed * 1000;
  }

  formattedDuration() {
    let durationString = this.refs.duration.value;

    if(durationString.match(/:/)) {
      let [seconds, minutes, hours] = durationString.split(":").reverse();
      [seconds, minutes, hours] = [seconds, minutes, hours].map(n => parseInt(n, 10) || 0);
      return seconds + minutes * 60 + hours * 60;
    } else {
      return parseInt(durationString, 10) || 0;
    }
  }

  validate(params) {
    let errors = {}
    if(isEmpty(params.date)) {
      errors["date"] = "Please enter a valid date"
    } else if(!( params.date.match(/\d{4}-\d{2}-\d{2}/) || params.date.match(/\d{2}\/\d{2}\/\d{4}/) )) {
      errors["date"] = "Please enter a valid date (YYYY-MM-DD or DD/MM/YYYY)"
    }

    if(params.duration <= 0) {
      errors["duration"] = "Please enter a valid duration (bigger than 0)"
    }
    if(params.distance <= 0) {
      errors["distance"] = "Please enter a valid distance (bigger than 0)"
    }

    return errors;
  }

  render() {
    return(
      <div className={styles.root}>
        <h2>Track a jog</h2>
        <form onSubmit={this.submitJog.bind(this)}>
          <div className={ styles.fieldContainer }>
            <div className={ styles.field }>
              <label>Date</label>
              <input ref="date" type="date" />
              { this.errorsFor("date") }
            </div>
            <div className={ styles.field }>
              <label>Distance (in km)</label>
              <input ref="distance" type="number" min="0.1" step="0.01" />
              { this.errorsFor("distance") }
            </div>
            <div className={ styles.field }>
              <label>Duration ([HH:]MM:SS)</label>
              <input ref="duration" type="text" placeholder="e.g. 30:00 (= 30 minutes)"/>
              { this.errorsFor("duration") }
            </div>
          </div>
          <div className={ styles.submit }>
            <span className={styles.error}>{ this.props.error }</span>
            <button type="submit">Save Jog</button>
          </div>
        </form>
      </div>
    )
  }

  errorsFor(attribute) {
    return (
      <div className={ styles.error }>
        { this.state.errors && this.state.errors[attribute] }
      </div>
    )
  }
}

export default NewJog;
