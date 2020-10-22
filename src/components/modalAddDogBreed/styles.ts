import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  font-size: 50px;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 30px;
  font-size: 30px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

  button {
    height: 40px;
    width: 100px;
    margin: 30px 30px 30px 30px;
    font-size: 24px;
  }

  input {
    font-size: 24px;
  }
`;
