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

export const FilterSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  font-size: 30px;

  button {
    height: 40px;
    width: 40px;
  }

  svg {
    font-size: 30px;
  }

  select {
    font-size: 24px;
    width: 560px;
  }
`;

export const ImageSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #232129;
  margin: 40px 20px 20px 20px;
  width: 600px;
  height: 600px;

  img {
    margin: 20px 20px 20px 20px;
    max-width: 90%;
    max-height: 90%;
  }
`;
