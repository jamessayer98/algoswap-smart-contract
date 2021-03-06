import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {useHistory, useParams} from 'react-router-dom';
import {selectFirstToken, selectSecondToken} from '../redux/reducers/tokens';
import {setFirstToken, setSecondToken} from '../redux/actions';

import AddLiquidity from '../components/AddLiquidity/AddLiquidity';

const AddPage: React.FC = () => {
  const history = useHistory();
  const {first, second} = useParams<ParamTypes>();
  const dispatch = useDispatch();

  let firstToken = useSelector(selectFirstToken);
  let secondToken = useSelector(selectSecondToken);

  if (firstToken !== first) {
    dispatch(setFirstToken(first || ''));
    firstToken = first;
  } else if (secondToken !== second) {
    dispatch(setSecondToken(second || ''));
    secondToken = second;
  }

  return (
    <div className="add-page">
      <AddLiquidity
        firstToken={firstToken || ''}
        secondToken={secondToken || ''}
        updateTokens={(firstToken, secondToken) =>
          (firstToken !== '' || secondToken !== '') &&
          history.push(`/add/${firstToken}/${secondToken}`)
        }
      />
    </div>
  );
};

interface ParamTypes {
  first: string | undefined;
  second: string | undefined;
}

export default AddPage;
