import React from 'react';

import './chatStyles.scss';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MessageFormSend from './MessageFormSend/MessageFormSend';
import MessagesList from './MessagesList/MessagesList';
import { MessageContextProvider } from '../../contexts/MessageContext';

function Chat() {
  const location = useLocation();
  const { pseudo, id } = location.state;

  return (
    <MessageContextProvider>
      <div className="chat">
        <Header />
        <div className="chat-content">
          <MessagesList />
          <MessageFormSend id={id} />
        </div>
        <Footer />
      </div>
    </MessageContextProvider>
  );
}

export default React.memo(Chat);