import React, { Component } from 'react';

import './MainText.css';

export default class MainText extends Component {
	constructor(props) {
		super(props);

		this.inTag = false;
		this.character = 0;

		this.state = {
			shownText: ``,
			done: false,
			cursorVisible: true
		}

		this.characters = `.<span class="accent-text">*</span> Dot <span class="accent-text">Star</span>&#013;&#10240;Programming`;

		this.fps = 12;
		this.delay = 0; //seconds
		this.delay2 = 1;
	}
	
	animateCursor = () => {
		this.setState({
			cursorVisible: !this.state.cursorVisible
		})
	}

	//Go to second page, if the user hasn't already interacted with the screen
	animateDone = () => {
		this.setState({
			done: true
		})
		if(this.props.currentPage === 0){
			this.props.setPage(1);
		}
	}


	animate = () => {
		let _this = this;

		if (this.state.shownText === this.characters) {
			//Go to next page 1 second after the animation is done
			window.setTimeout(function () {
				_this.animateDone();
			}, this.delay2 * 1000);
			return;
		}

		let curChar = this.characters.split("")[this.character]

		//Skip over tags and html codes
		if (curChar === "<") {
			this.inTag = true;
		}
		if (curChar === "&") {
			this.inTag = true;
		}
		if (curChar === ">") {
			this.inTag = false;
		}
		if (curChar === ";") {
			this.inTag = false;
		}

		//If we're on a regular character, show one more letter
		if (!this.inTag) {
			this.setState({
				shownText: this.characters.substring(0, this.character)
			})

			this.character++;

			window.setTimeout(function () {
				_this.animate();
			}, 1000 / this.fps);
			return;
		}
		
		this.character++;
		this.animate();
	}

	componentDidMount() {
		if(!this.props.seen){
			let _this = this;
			window.setTimeout(function () {
				_this.animate();
			}, this.delay * 1000);
		}

		let _this = this;
		this.cursorInterval = window.setInterval(function () {
			_this.animateCursor();
		}, 500);
	}

	componentWillUnmount(){
		window.clearInterval(this.cursorInterval);
	}

	render() {
		let content = this.props.seen ? this.characters : this.state.shownText
		return <div className={"main-text"} style={{height: this.props.height}}>
			<div className={"spacer"}>&nbsp;</div>
			&gt;
			<span dangerouslySetInnerHTML={{ __html: content }}></span>
			<span className={this.state.cursorVisible ? "white-cursor" : ""}>_</span>
		</div>
	}
}