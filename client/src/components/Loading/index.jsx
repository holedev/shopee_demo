import { Spinner } from 'react-bootstrap';
import { useLoadingContext } from '~/hook';

function Loading() {
  const [loading] = useLoadingContext();

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        display: loading ? 'flex' : 'none',
      }}
    >
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    </div>
  );
}

export default Loading;
