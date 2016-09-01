import React from 'react';
import Dialog from 'material-ui/Dialog';
import { browserHistory } from 'react-router';
import { List, ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';

import * as UniversityHelper from '../../../util/university';

const DialogListItem = ({ group, handleClose }) => {
  const goToGroup = () => { browserHistory.push(`/group/${group.id}`); handleClose(); };

  return (
    <ListItem
      primaryText={ `${group.year} ${group.term} - ${group.university.name}` }
      leftAvatar={ UniversityHelper.getImage(group.university, 40) }
      onTouchTap={ goToGroup } />
  );
};

const SwitchGroupDialog = ({ open, actions, user, groups }) => {
  const handleClose = actions.closeSwitchGroupDialog;

  const dialogActions = [
    <FlatButton label="cancel" onTouchTap={ handleClose } />
  ];

  return (
    <Dialog
      open={ open }
      onRequestClose={ handleClose }
      title="Switch Group"
      actions={ dialogActions }
      bodyStyle={{ overflowY: "auto" }} >

      <List>
        { groups.map((group, idx) => <DialogListItem key={idx} group={group} handleClose={handleClose} />) }
      </List>

    </Dialog>
  );
};

export default SwitchGroupDialog;
