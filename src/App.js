import { useEffect, useState, useCallback } from 'react';
import Button from './components/Button';
import Input from './components/Input';
import styled from 'styled-components';

const App = () => {
  const [currentNumber, setCurrentNumber] = useState('0');
  const [firstNumber, setFirstNumber] = useState('0');
  const [operation, setOperation] = useState('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleOnClear = useCallback(() => {
    setCurrentNumber('0');
    setFirstNumber('0');
    setOperation('');
  });

  const handleAddNumber = useCallback(num => {
    if (num === '.' && currentNumber.includes('.')) {
      return;
    }
    setCurrentNumber(prev => (prev === '0' && num !== '.') ? num : prev + num);
  }, [currentNumber]);

  const calculate = useCallback((num1, op, num2) => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    switch (op) {
      case '+': return n1 + n2;
      case '-': return n1 - n2;
      case '*': return n1 * n2;
      case '/': return n1 / n2;
      default: return 0;
    }
  }, []);

  const handleOperation = useCallback(op => {
    if (firstNumber === '0') {
      setFirstNumber(currentNumber);
      setCurrentNumber('0');
      setOperation(op);
    } else {
      const result = calculate(firstNumber, operation, currentNumber);
      setCurrentNumber(String(result));
      setFirstNumber(String(result));
      setCurrentNumber('0');
      setOperation(op);
    }
  }, [calculate, currentNumber, firstNumber, operation]);

  const handleEquals = useCallback(() => {
    if (firstNumber !== '0' && operation !== '' && currentNumber !== '0') {
      const result = calculate(firstNumber, operation, currentNumber);
      setCurrentNumber(String(result));
      setFirstNumber('0');
      setOperation('');
    }
  }, [calculate, currentNumber, firstNumber, operation]);

  const handleBackspace = useCallback(() => {
    setCurrentNumber(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;

      if (key >= '0' && key <= '9') {
        handleAddNumber(key);
      } else if (key === '.') {
        handleAddNumber(key);
      } else if (['+', '-', '*', '/'].includes(key)) {
        handleOperation(key);
      } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        handleEquals();
      } else if (key === 'Escape') {
        handleOnClear();
      } else if (key === 'Backspace') {
        handleBackspace();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleAddNumber, handleOperation, handleEquals, handleOnClear, handleBackspace]);

  return (
    <Container>
      <Content>
        <Input value={currentNumber} />
        <Row>
          <Button label="C" onClick={handleOnClear} className="operator"/>
          <Button label="⌫" onClick={handleBackspace} className="operator"/>
          <Button label="/" onClick={() => handleOperation('/')} className="operator"/>
          <Button label="x" onClick={() => handleOperation('*')} className="operator"/>
        </Row>
        <Row>
          <Button label="7" onClick={() => handleAddNumber('7')} />
          <Button label="8" onClick={() => handleAddNumber('8')} />
          <Button label="9" onClick={() => handleAddNumber('9')} />
          <Button label="-" onClick={() => handleOperation('-')} className="operator"/>
        </Row>
        <Row>
          <Button label="4" onClick={() => handleAddNumber('4')} />
          <Button label="5" onClick={() => handleAddNumber('5')} />
          <Button label="6" onClick={() => handleAddNumber('6')} />
          <Button label="+" onClick={() => handleOperation('+')} className="operator"/>
        </Row>
        <Row>
          <Button label="1" onClick={() => handleAddNumber('1')} />
          <Button label="2" onClick={() => handleAddNumber('2')} />
          <Button label="3" onClick={() => handleAddNumber('3')}/>
          <Button label="=" onClick={handleEquals} className="operator"/>
        </Row>
        <Row>
          <Button label="0" onClick={() => handleAddNumber('0')} style={{flex: 2}}/>
          <Button label="." onClick={() => handleAddNumber('.')}/>
        </Row>
      </Content>
    </Container>
  );
}

export default App;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #CACACA;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Content = styled.div`
    background-color: #FFFFFF;
    width: 50%;
    min-width: 280px;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;