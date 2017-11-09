import React from 'react';

const RepoList = ({repos}) => (
  <div>
    <h4> Repo List Component </h4>
    <p>There are {repos.length} repos</p>
    <ol>
      {repos.map(repo => (
            <li><a href="{repo.url}">{repo.name}</a></li>
          ))}
    </ol>
  </div>
)

export default RepoList;