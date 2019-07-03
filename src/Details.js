import React from 'react';
import { K } from './constants';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

const Details = ({ bank, initBet }) => {
  const rounds = [];
  let currentBank = bank;
  let currentBet = initBet;

  while (currentBank > 0) {
    if (currentBank >= currentBet) {
      const round = {
        bank: Math.floor(currentBank),
        bet: Math.floor(currentBet),
      };
      rounds.push(round);
      currentBank -= round.bet;
      currentBet *= K;
    } else {
      break;
    }
  }

  return (
    <Grid container>
      <Grid item style={{ paddingTop: '15px' }}>
        {rounds.map((round, index) => (
          <Typography variant="subtitle2" gutterBottom key={index}>
            Раунд <strong style={{ color: 'green' }}>{index+1}</strong>.
            Банк <strong style={{ color: 'green' }}>{round.bank}</strong>.
            Ставка <strong style={{ color: 'green' }}>{round.bet}</strong>
          </Typography>
        ))}
      </Grid>
    </Grid>
  );
};

export default Details;
