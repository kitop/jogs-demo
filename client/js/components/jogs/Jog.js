import React from "react";
import styles from "./jog_item.scss";

class Jog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false
    }
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toggleEdit() {
    this.setState({ editing: !this.state.editing })
  }

  formatDistance(meters) {
    let km = meters / 1000;
    return `${km}km`
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
          <a onClick={this.toggleEdit}>Edit</a>
        </div>
      </div>
    )
  }

  renderEditMode() {
    return (
      <div className={styles.root}>
        Editing
        <a onClick={this.toggleEdit}>Cancel</a>
      </div>
    )
  }

  render() {
    return this.state.editing ? this.renderEditMode() : this.renderViewMode()
  }
}

export default Jog;
