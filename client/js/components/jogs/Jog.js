import React from "react";
import { isEmpty } from "lodash"
import styles from "./jog_item.scss";

class Jog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      errors: {}
    }
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toggleEdit() {
    this.setState({ editing: !this.state.editing })
  }

  formatDistance(meters, include_unit = true) {
    let km = meters / 1000;
    let unit = include_unit ? "km" : "";
    return `${km}${unit}`
  }

  formatDuration(time) {
    let hours, minutes, seconds;
    minutes = Math.floor(time / 60);
    seconds = time % 60;
    hours = Math.floor(minutes / 60);
    minutes = minutes % 60;

    return [hours, minutes, seconds].map(i => i > 10 ? i.toString() : `0${i}`).join(":")
  }

  formatSpeed(meters_per_second) {
    return `${meters_per_second} m/s`
  }

  onSave(e) {
    e.preventDefault();

    let params = {
      date: this.refs.date.value,
      distance: this.editedDistance(),
      duration: this.editedDuration(),
    }

    let errors = this.validate(params)
    if(isEmpty(errors)) {
      this.props.onEditJog(this.props.jog.id, params)
      this.setState({ errors: {}, editing: false })
    } else {
      this.setState({ errors: errors })
    }
  }

  editedDistance() {
    let parsed = parseFloat(this.refs.distance.value) || 0
    return parsed * 1000;
  }

  editedDuration() {
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
    }
    if(params.duration <= 0) {
      errors["duration"] = "Please enter a valid duration (bigger than 0)"
    }
    if(params.distance <= 0) {
      errors["distance"] = "Please enter a valid distance (bigger than 0)"
    }

    return errors;
  }


  errorsFor(attribute) {
    return (
      <div className={ styles.error }>
        { this.state.errors && this.state.errors[attribute] }
      </div>
    )
  }

  renderViewMode() {
    let jog = this.props.jog;
    return (
      <div className={ styles.root }>
        <div className={ styles.main }>
          <div className={ styles.date }>
            { jog.date }
          </div>
          <div className={ styles.distance }>
            { this.formatDistance(jog.distance) }
          </div>
          <div className={ styles.duration }>
            { this.formatDuration(jog.duration) }
          </div>
          <div className={ styles.average_speed }>
            { this.formatSpeed(jog.average_speed) }
          </div>
        </div>
        <div className={ styles.actions }>
          <a onClick={this.toggleEdit} className={styles.action}>Edit</a>
        </div>
      </div>
    )
  }

  renderEditMode() {
    let jog = this.props.jog;
    return (
      <div className={styles.root}>
        <form onSubmit={ this.onSave.bind(this) }>
          <div className={styles.main}>
            <div className={ styles.edit_field }>
              <label>Date</label>
              <input ref="date" type="date" defaultValue={jog.date}/>
              { this.errorsFor("date") }
            </div>
            <div className={ styles.edit_field }>
              <label>Distance (in km)</label>
              <input ref="distance" type="number" min="0.1" step="0.01" defaultValue={this.formatDistance(jog.distance, false) }/>
              { this.errorsFor("distance") }
            </div>
            <div className={ styles.edit_field }>
              <label>Duration ([HH:]MM:SS)</label>
              <input ref="duration" type="text" placeholder="e.g. 30:00 (= 30 minutes)" defaultValue={this.formatDuration(jog.duration)} />
              { this.errorsFor("duration") }
            </div>
          </div>
          <div className={styles.actions}>
            <button type="submit" className={styles.action}>Save</button>
            <a onClick={this.toggleEdit} className={styles.action}>Cancel</a>
          </div>
        </form>
      </div>
    )
  }

  render() {
    return this.state.editing ? this.renderEditMode() : this.renderViewMode()
  }
}

export default Jog;
