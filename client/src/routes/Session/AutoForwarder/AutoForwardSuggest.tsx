import Autosuggest, {
  AutosuggestPositionEnum,
} from 'components/Autosuggest';
import { useSessionContext } from 'contexts/SessionContext';
import useSetForwardUrl from 'hooks/useSetForwardUrl';
import { Endpoint } from 'types/Endpoint';

const AutoForwardSuggest = ({
  url,
  setUrl,
  endpoint,
  running,
}: {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  endpoint: Endpoint;
  running: boolean;
}) => {
  const { me } = useSessionContext();
  const { removeForwardUrl } = useSetForwardUrl(me, endpoint.id);

  return (
    <div className="form-group">
      <label>Auto-forward to</label>
      <Autosuggest
        type="url"
        placeholder="Forward to URL (e.g. http://localhost:8000/send-webhook-here)"
        userInput={url}
        setUserInput={setUrl}
        suggestions={endpoint.forwardUrls[me.id]}
        position={AutosuggestPositionEnum.Up}
        disabled={running}
        deleteForwardUrl={removeForwardUrl}
      />
    </div>
  );
};

export default AutoForwardSuggest;
