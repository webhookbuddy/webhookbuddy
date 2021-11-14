import { SyntheticEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useLazyCallFunction from 'hooks/useLazyCallFunction';
import FormLayout, { FormAlignment } from 'components/FormLayout';

const Create = () => {
  const { call } = useLazyCallFunction('callCreateEndpoint');
  const history = useHistory();

  const [state, setState] = useState<{
    loading: boolean;
    error: string | undefined;
  }>({ loading: false, error: undefined });

  const [name, setName] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setState({ loading: true, error: undefined });
    call(
      {
        name,
      },
      () => history.push('/'),
      (message: string) => {
        setState({
          loading: false,
          error: message,
        });
      },
    );
  };

  return (
    <FormLayout
      alignment={FormAlignment.CenterX}
      loading={state.loading}
      error={state.error}
    >
      <h2>New Endpoint</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            autoFocus
          />
          <small className="form-text text-muted">
            Give your new new endpoint a name so that it's easy to
            identify.
          </small>
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Create
        </button>
      </form>
    </FormLayout>
  );
};

export default Create;
