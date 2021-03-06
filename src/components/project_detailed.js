import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import ContactForm from './contact_form';
import { Link } from "react-router-dom";
import { Tween } from 'react-gsap';
import ScrollTrigger from 'react-scroll-trigger';

export default class project_detailed extends Component {
	constructor() {
		super();
		this.renderSkills = this.renderSkills.bind(this);
		this.displayVideo = this.displayVideo.bind(this);
		this.hideVideo = this.hideVideo.bind(this);
		this.onBulletsEnterViewport = this.onBulletsEnterViewport.bind(this);
		this.state = {
			videoVisible: false,
			bulletsVisible: false
		}
	}
	componentWillMount() {
		window.scrollTo(0, 0);
	}
	displayVideo() {
		this.setState({
			'videoVisible': true
		});
	}
	hideVideo() {
		this.setState({
			'videoVisible': false
		});
	}
	onBulletsEnterViewport() {
		this.setState({
	      bulletsVisible: true,
	    });
	}
	renderHero() {
		if (this.props.project.video) {
			if (this.state.videoVisible) {
				return (
					<div className="project__image">
						<div className="video-banner position-relative">
							<div className="js-video-content video-aspect">
								<iframe src={`https://player.vimeo.com/video/${this.props.project.video}?autoplay=1&title=0&byline=0&portrait=0`} width="640" height="360" frameBorder="0" title="video" allowFullScreen></iframe>
								<div className="video-banner__link btn--primary js-video-close" onClick={this.hideVideo}>
									Exit Video
		     					</div>
		     				</div>
						</div>
					</div>
				);
			} else {
				return (
					<div className="project__image image">
						<div className="video-banner position-relative">
		     				<div className="js-video-placeholder">
								<img src={this.props.project.screenshot} alt={this.props.project.slug}/>
								<div className="video-banner__container">
									<div className="video-banner__content clearfix position-left">
										<div className="video-banner__title">
											Website Overview
										</div>
										<div className="video-banner__link btn--primary js-video-play" onClick={this.displayVideo}>
											Click to Play
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				);
			}
		} else {
			return (
				<div className="project__image">
					<img src={this.props.project.screenshot} alt={this.props.project.slug}/>
				</div>
			);
		}
	}
	renderProjectLink() {
		if (this.props.project.link) {
			return (
				<a href={this.props.project.link} target="_blank" className="link__underline">Website Link</a>
			);
		}
	}
	renderSkills(key, index) {
		if (key) {
			if (this.state.bulletsVisible) {
				return (
					<Tween from={{ opacity: 0, x: '200px', delay: 0.25 * index}} key={key}>
						<li className="">{key}</li>
					</Tween>
				); 
			} else {
				return (
					<li className="" key={key}>{key}</li>
				); 
			}
		}
	}
	renderAgencyTag() {
		if (this.props.project.agency) {
			return (
				<div className="agency__tag">* a {this.props.project.agency} project.</div>
			);
		}
	}
	render() {
		const { project } = this.props;
		// console.log(project);
		const {
	      bulletsVisible,
	    } = this.state;
		return (
			<div className="project-page container">
				<Helmet>
					<title>{`${project.companyName} | Justin Bond`} </title>
				</Helmet>
				<div className="row">
					<div className="col-md-10 col-md-push-1">
						<div className="project__container">

							{this.renderHero()}

							<div className="project__name">
								<h1>{project.companyName}</h1>
							</div>

							<div className="project__link">
								{this.renderProjectLink()}
							</div>

							<ScrollTrigger onEnter={this.onBulletsEnterViewport}>
								<div className={`project__skills ${bulletsVisible ? 'container-animate' : ''}`}>
									{project.skills.map(this.renderSkills)}
								</div>
							</ScrollTrigger>

							{this.renderAgencyTag()}

							<div className="project__home">
								<Link to="/" className="btn--primary">Back to Home</Link>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-10 col-md-push-1">
						<ContactForm />
					</div>
				</div>
			</div>
		);
	}
}
