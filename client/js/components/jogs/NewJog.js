import React from "react";
import isEmpty from "lodash/isEmpty";
import validateJog from "../../utils/validate_jog";
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

    let errors = validateJog(params)
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
      return seconds + minutes * 60 + hours * 60 * 60;
    } else {
      return parseInt(durationString, 10) || 0;
    }
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
