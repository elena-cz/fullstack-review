import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }

  componentDidMount () {
    this.getTopRepos();
  }

  getTopRepos () {

     $.ajax({
      type: "GET",
      url: '/repos',
      contentType: 'application/json',
      success: (results) => { 
        console.log('Getting response in client', results);
        this.setState({repos: results});
      }
    });

  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      type: "POST",
      url: `/repos?term=${term}`,
      data: term,
      contentType: 'text/plain',
      success: () => { 
        console.log(`${term} sent to /repos`);
        this.getTopRepos();
      }
    });


  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));