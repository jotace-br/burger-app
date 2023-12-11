import { Button } from '@/components/button';
import './thanks-modal.css';

interface ThanksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThanksModal = ({ isOpen, onClose }: ThanksModalProps) => {
  if (!isOpen) return null;

  return (
    <div className='thanks-modal' onClick={onClose}>
      <div className='thanks-modal-content'>
        <h1>Obrigado por poder usar minha demo! 🎊</h1>
        {/* <img
          src='https://media.tenor.com/lCKwsD2OW1kAAAAi/happy-cat-happy-happy-cat.gif'
          alt=''
          width='100%'
        /> */}
        <p>Espero que a experiência tenha sido excelente! 😉👍</p>
        <Button onClick={onClose}>Fechar</Button>
      </div>
    </div>
  );
};
