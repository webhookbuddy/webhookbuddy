import Autosuggest, {
  AutosuggestPositionEnum,
} from 'components/Autosuggest';
import useForwardUrls from 'hooks/useForwardUrls';

const AutoForwardSuggest = (props: {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  running: boolean;
  endpointId: string;
}) => {
  const { forwardUrls } = useForwardUrls(props.endpointId);
  return (
    <div className="form-group">
      <label>Auto-forward to</label>
      <Autosuggest
        type="url"
        placeholder="Forward to URL (e.g. http://localhost:8000/send-webhook-here)"
        userInput={props.url}
        setUserInput={props.setUrl}
        suggestions={forwardUrls}
        position={AutosuggestPositionEnum.Up}
        disabled={props.running}
      />
    </div>
  );
};

export default AutoForwardSuggest;
