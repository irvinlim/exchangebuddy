import React from 'react';

import { icon } from '../../../../../util/icons';

const GroupWelcome = ({ group }) => (
  <div className="group-welcome">
    <p>Welcome to your ExchangeBuddy group! This group is exclusively for students going on exchange to <strong>{ group.university.name }</strong> in <strong>{ group.term } { group.year }</strong>.</p>
    <p>{ icon('chat') } Introduce yourself in the group chat!</p>
    <p>{ icon('info') } Get up to date and informed with the information in the wiki. You can even contribute by editing it!</p>
    <p>{ icon('event') } Find out what events are happening in the vicinity of your university!</p>
  </div>
);

export default GroupWelcome;
