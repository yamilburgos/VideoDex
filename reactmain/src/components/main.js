import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

// Import Components
import Header from "./header";
import Search from "./search";
import Data from "./data";

export default class Main extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ytData: [],
			tData: [],
			dmData: []
		};
	}

	// GetYouTubeVideos() {
	// 	console.log("Hey there!");
	// 	axios.post("https://videodex-database.herokuapp.com/auth/youtube", {
	// 		auth: false
	// 	}).then(function(res) {
	// 		console.log(res);
	// 	});
	// }

	SearchYouTube(query) {
		let key = 'AIzaSyCKMpw2nmPnon_gkh4EIXnbiAmrZNw-v4M'; // TEMP

		axios.get("https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + query + "&maxResults=10&order=viewCount&key=" + key)
		.then((response) => {
            var nextPageToken = response.nextPageToken;
            var prevPageToken = response.prevPageToken;

			this.setState({
				ytData: response.data.items
			});
		}).catch(function(error) {
        	console.log(error);
      	});
	}

	SearchTwitch(query) {
		console.log("Query Twitch videos with: ", query);

		axios.get("https://api.twitch.tv/kraken/search/streams?query=toy&client_id=6m6qtmmpe0op92ru1meprq5qwjboj2")
		.then((response) => {
			console.log(response);
		});
	}

	SearchDailyMotion(query) {
		axios.get("https://api.dailymotion.com/videos/?search=" + query + "&page=1&limit=10")
		.then((response) => {
			this.setState({
				dmData: response.data.list
			});
		}).catch(function(error) {
        	console.log(error);
      	});
	}

	render() {
		return (
			<Router>
				<div className="App-header">
					<Header/>
					<Search 
						youTubeSearch={this.SearchYouTube.bind(this)}
						twitchSearch={this.SearchTwitch.bind(this)}
						dailyMotionSearch={this.SearchDailyMotion.bind(this)}
						youTubeResults={(this.state.ytData !== undefined) ? this.state.ytData : []}
						twitchResults={(this.state.tData !== undefined) ? this.state.tData : []}
						dailyMotionResults={(this.state.dmData !== undefined) ? this.state.dmData : []}
					/>
					<Data/>
				</div>
			</Router>
		);
	}
}