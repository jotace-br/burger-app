import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>not found</div>
      <button onClick={() => navigate(-1)}>go back</button>
    </>
  );
};
