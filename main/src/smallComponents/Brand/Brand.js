import React, { Component } from 'react'

export default class Brand extends Component {
    render() {
        return (
            <>Dot&nbsp;<span className="accent-text">Star</span></>
        )
    }
}

export class BrandURL extends Component {
    render() {
        return (
            <><span className="accent-text">dotstar.ca</span></>
        )
    }
}

export class OfficeEmail extends Component {
    render() {
        return (
            <><span className="accent-text">office@dotstar.ca</span></>
        )
    }
}
