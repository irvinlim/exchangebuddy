import DataStore from '.';

if (Meteor.isServer) {

  export const updateStoreWithInterval = (dataKey, dataCallback, intervalHours) => {
    if (intervalHours <= 0)
      return;

    let timeTillUpdate;

    const intervalFn = () => {
      DataStore.findById(dataKey).then(function(result) {
        const existingRow = result && result.get();

        const newValues = { dataKey, dataValue: dataCallback(existingRow.value) };

        // Immediately upsert if no row exists/lastUpdated was too long ago.
        if (!existingRow || moment(existingRow.updatedAt).isBefore(moment().subtract(intervalHours, 'minutes'))) {
          timeTillUpdate = moment().add(intervalHours, 'minutes');
          DataStore.upsert(newValues);
        } else {
          const lastUpdated = existingRow.updatedAt;
          const nextUpdateTime = moment(lastUpdated).add(intervalHours, 'minutes');
          timeTillUpdate = nextUpdateTime.diff(moment());
        }

        setTimeout(intervalFn, timeTillUpdate);
      });
    };

  };

}
