import { Button } from '@/components/button';
import { useWebSettings } from '@/theme-provider';
import { useNavigate } from 'react-router-dom';
import './not-found.css';
import bubbleGumError from '@assets/animations/bubble-gum-error-404.gif';
import { Header } from '@/components/header';

export const NotFound = () => {
  const navigate = useNavigate();
  const webSettings = useWebSettings();

  return (
    <>
      <Header />
      <div className='not-found-container'>
        <img
          className='not-found-image'
          src={bubbleGumError}
          alt='404 Illustration'
          width='300px'
          loading='lazy'
        />
        <h1 className='not-found-title'>404 Não Encontrado</h1>
        <p className='not-found-text'>
          Oops! A página que você está procurando não existe.
        </p>
        <Button
          $bgColor={webSettings?.primaryColour}
          onClick={() => navigate('/')}
        >
          Voltar para página principal
        </Button>
      </div>
    </>
  );
};
