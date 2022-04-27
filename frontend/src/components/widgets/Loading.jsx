import React from 'react';
import loading from '../../../static/images/Loading.gif';

const Loading = ({status=false}) => {
    return status ? <img src={require(loading)} alt="" /> : null;
}

export default Loading