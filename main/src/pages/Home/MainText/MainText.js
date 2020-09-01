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
		let _this = this;
		this.setState({
			cursorVisible: !this.state.cursorVisible
		})
		window.setTimeout(function () {
			_this.animateCursor();
		}, 500);
	}


	animate2 = () => {
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
			window.setTimeout(function () {
				_this.animate2();
			}, this.delay2 * 1000);
			return;
		}

		let curChar = this.characters.split("")[this.character]
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
		this.animateCursor();
	}

	render() {
		let content = this.props.seen ? this.characters : this.state.shownText
		return <div className={"main-text"}>
			<div className={"spacer"}>&nbsp;</div>
			&gt;
			<span dangerouslySetInnerHTML={{ __html: content }}></span>
			<span className={this.state.cursorVisible ? "white-cursor" : ""}>_</span>
		</div>
	}
}