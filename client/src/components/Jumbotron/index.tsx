const Jumbotron = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="m-2">
      <div className="jumbotron">
        <div className="lead">{children}</div>
      </div>
    </div>
  );
};

export default Jumbotron;
