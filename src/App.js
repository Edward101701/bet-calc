import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';

const getBaseLog = (x, y) => {
  return Math.log(y) / Math.log(x);
};

const K = 2.2;
const STATES = {
  BANK: 'bank',
  ROUND_NUM: 'roundNum',
};

function App() {
  const [currentVariant, setCurrentVariant] = useState(STATES.BANK);
  const [bank, setBank] = useState(10000);
  const [initBet, setInitBet] = useState(100);
  const [roundNum, setRoundNum] = useState(0);

  const onBankChange = event => {
    const newBank = event.target.value ? +event.target.value : '';
    if (bank !== newBank) {
      setBank(newBank);
    }
  };
  
  const onInitBetChange = event => {
    const newInitBet = event.target.value ? +event.target.value : '';
    if (initBet !== newInitBet) {
      setInitBet(newInitBet);
    }
  };

  const onRoundNumChange = event => {
    const newRoundNum = event.target.value ? +event.target.value : '';
    if (roundNum !== newRoundNum) {
      setRoundNum(newRoundNum);
    }
  };

  const onVariantChange = (event, value) => {
    setCurrentVariant(value);
  };
  
  const useBank = () => {
    if (
      currentVariant === STATES.BANK &&
      bank > 0 &&
      initBet > 0
    ) {
      const arg = (bank * K - 1) / (initBet + 1);
      setRoundNum(Math.floor(getBaseLog(K, arg)));
    }
  };

  const useNumOfRounds = () => {
    if (
      currentVariant === STATES.ROUND_NUM &&
      initBet > 0 &&
      roundNum > 0
    ) {
      const arg = (initBet * (Math.pow(K, roundNum) - 1)) / (K - 1);
      setBank(Math.ceil(arg));
    }
  };


  useEffect(useBank, [bank, initBet, currentVariant]);
  useEffect(useNumOfRounds, [roundNum, initBet, currentVariant]);

  return (
    <Container>
      <Box>
        <Typography variant="subtitle2" gutterBottom>Укажите желаемый банк или кол-во раундов 👇</Typography>
        <RadioGroup
          aria-label="Gender"
          name="variant"
          value={currentVariant}
          onChange={onVariantChange}
        >
          <FormControlLabel value={STATES.BANK} control={<Radio />} label="Банк 🏦" />
          <FormControlLabel value={STATES.ROUND_NUM} control={<Radio />} label="Кол-во раундов 🎯🎯🎯" />
        </RadioGroup>
        <Divider variant="fullWidth" />
        { currentVariant === STATES.BANK && (
          <TextField
            label="Банк"
            variant="outlined"
            type="number"
            value={bank}
            onChange={onBankChange}
            margin="normal"
          />
        )}
        { currentVariant === STATES.ROUND_NUM && (
          <TextField
            label="Кол-во раундов"
            variant="outlined"
            type="number"
            value={roundNum}
            onChange={onRoundNumChange}
            margin="normal"
          />
        )}
        <TextField
          label="Первая ставка"
          variant="outlined"
          type="number"
          value={initBet}
          onChange={onInitBetChange}
          margin="normal"
        />
        <Divider variant="fullWidth" />
        { currentVariant === STATES.BANK && (
          <Typography variant="subtitle1">👉<strong style={{ color: 'green' }}>{bank}</strong> с первой ставкой в <strong style={{ color: 'green' }}>{initBet}</strong> хватит на <strong style={{ color: 'green' }}>{roundNum}</strong> раунда(ов) 🤑</Typography>
        )}
        { currentVariant === STATES.ROUND_NUM && (
          <Typography variant="subtitle1">👉Необходимо <strong style={{ color: 'green' }}>{bank}</strong> с первой ставкой в <strong style={{ color: 'green' }}>{initBet}</strong> что бы хватило на <strong style={{ color: 'green' }}>{roundNum}</strong> раунда(ов) 🤑</Typography>
        )}
        <Divider variant="fullWidth" />
      </Box>
    </Container>
  );
}

export default App;
