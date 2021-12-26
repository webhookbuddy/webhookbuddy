import { useHistory } from 'react-router-dom';
import { Endpoint } from 'types/Endpoint';

const Team = ({
  endpoint,
  iconStyle,
}: {
  endpoint: Endpoint;
  iconStyle: string;
}) => {
  const history = useHistory();

  return (
    <i
      className={`fa fa-users pointer ${iconStyle}`}
      onClick={() => history.push(`/endpoints/${endpoint.id}/team`)}
      title="Team"
    ></i>
  );
};

export default Team;
