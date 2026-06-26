import React, { useState } from 'react';
import { Modal } from '../../shared/ui/Modal/Modal';
import './modalDemo.css';
import { Button } from '../../shared/button/Button';

export function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');

  return (
    <div className="modal-demo">
      <input
        className="modal-demo__input"
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Введите текст..."
      />
      <Button primary label="Открыть модальное окно" onClick={() => setIsOpen(true)} />
      <Modal visible={isOpen} onClose={() => setIsOpen(false)} title="Модальное окно">
        <p>{inputText || 'Текст не введён'}</p>
      </Modal>
    </div>
  );
}
