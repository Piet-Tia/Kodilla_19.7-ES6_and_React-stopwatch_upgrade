class Stopwatch extends React.Component {
	constructor() {
		super();
		this.startTimer = this.startTimer.bind(this);
		this.stopTimer = this.stopTimer.bind(this);
		this.resetTimer = this.resetTimer.bind(this);
		this.saveTime = this.saveTime.bind(this);
		this.clearTimes = this.clearTimes.bind(this);
		this.addTime = this.addTime.bind(this);
		this.state = {
			isRunning: false,
			runningTime: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			},
			savedTimes: []
		}
	}


	startTimer() {
		if (!this.state.isRunning) {
			this.setState({
				isRunning: true
			})
			this.myTimer = setInterval(this.addTime, 10)
		}
	}

	/*
		startTimer = () => {
			if (!this.state.isRunning) {
				this.setState({
					isRunning: true
				})
				this.myTimer = setInterval(this.addTime, 10)
			}
		}
	mamy tu property startTimer zamiast metody, niepotrzebny też będzie "bind" - no i uruchomienie stage 2 w Babelu !!
		*/


	stopTimer() {
		clearInterval(this.myTimer);
		this.setState({
			isRunning: false
		})
	}

	resetTimer() {
		let runningTime = this.state.runningTime
		Object.keys(runningTime).forEach(e => runningTime[e] = 0)
		this.setState({
			runningTime
		});
	}

	saveTime() {
		const currentTimeData = {
			time: this.format(this.state.runningTime),
			id: this.state.savedTimes.length + 1
		};
		const timeData = [...this.state.savedTimes , currentTimeData]
		this.setState({
			savedTimes: timeData
		})
	}

	clearTimes() {
		this.setState({
			savedTimes: []
		})
	}

	addTime() {
		this.setState(prevState => ({
			runningTime: {
				...prevState.runningTime,
				miliseconds: this.state.runningTime.miliseconds + 1,
			}
		}))
		if (this.state.runningTime.miliseconds >= 100) {
			this.setState(prevState => ({
				runningTime: {
					...prevState.runningTime,
					seconds: this.state.runningTime.seconds + 1,
					miliseconds: this.state.runningTime.miliseconds - 100
				}
			}))
		}
		if (this.state.runningTime.seconds >= 60) {
			this.setState(prevState => ({
				runningTime: {
					...prevState.runningTime,
					minutes: this.state.runningTime.minutes + 1,
					seconds: this.state.runningTime.seconds - 60
				}
			}))
		}
	}

	format(times) {
		return `${this.pad0(times.minutes)}:${this.pad0(times.seconds)}:${this.pad0(times.miliseconds)}`;
	}

	pad0(value) {
		let result = value.toString();
		if (result.length < 2) {
			result = '0' + result;
		}
		return result;
	}

	render() {
		return (
			<div className='stopwatch__module'>
				<nav className="stopwatch__controls">
					<StartButton onClick={this.startTimer} /><br />
					<StopButton onClick={this.stopTimer} /><br />
					<ResetButton onClick={this.resetTimer} /><br />
					<SaveTimeButton onClick={this.saveTime} /><br />
					<ClearTimesButton onClick={this.clearTimes} /><br />
				</nav>
				<Timer formattedRunningTime={this.format(this.state.runningTime)} />
				<SavedTimesList savedTimes={this.state.savedTimes} />
				
			</div>
		)
	}
}



class StartButton extends React.Component {
	render() {
		return <a href='#' className="stopwatch__button" id="start" onClick={this.props.onClick}>Start</a>
	}
}

class StopButton extends React.Component {
	render() {
		return <a href='#' className="stopwatch__button" id="stop" onClick={this.props.onClick}>Stop</a>
	}
}

class ResetButton extends React.Component {
	render() {
		return <a href='#' className="stopwatch__button" id="reset" onClick={this.props.onClick}>Reset</a>
	}
}

class SaveTimeButton extends React.Component {
	render() {
		return <a href='#' className="stopwatch__button" id="save_time" onClick={this.props.onClick}>Save current time</a>
	}
}

class ClearTimesButton extends React.Component {
	render() {
		return <a href='#' className="stopwatch__button" id="clear_times" onClick={this.props.onClick}>Clear saved times</a>
	}
}

class Timer extends React.Component {
	render() {
		return <div className="stopwatch__timer">
			{this.props.formattedRunningTime}
		</div>
	}
}

class SavedTimesList extends React.Component {
	render() {
		const singleTimes = this.props.savedTimes.map((singleSavedTime) =>
			<li key={singleSavedTime.id}>
			{singleSavedTime.time}
			</li>
			);
		return (
			<ul>
			{singleTimes}
			</ul>
		)
	}
}

const stopwatch = <Stopwatch />;
ReactDOM.render(stopwatch, document.getElementById('app'));
